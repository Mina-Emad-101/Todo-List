import { Router } from "express";
import { loggedIn, resolveTaskFromIdx } from "../utils/middlewares.js";
import { validationResult, checkSchema, body } from "express-validator";
import { createSchema, patchSchema, putSchema } from "../schemas/tasks.js";
import { Task } from "../db/tasks.js";

const router = Router();

router.use(loggedIn);

router.get("/api/tasks", async (req, res) => {
	return res.send({ data: await Task.find({ owner_id: req.user.id }) });
});

router.get("/api/tasks/:id", resolveTaskFromIdx, async (req, res) => {
	return res.send(req.task);
});

router.post("/api/tasks", checkSchema(createSchema), async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) return res.status(400).send(result.array());

	const {
		body: { title, description, priority, due_date },
	} = req;

	const task = new Task({
		title: title,
		description: description,
		priority: priority,
		status: 1,
		due_date: due_date,
		archived: false,
		owner_id: req.user.id,
	});

	try {
		await task.save();
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	return res.send(task);
});

router.put(
	"/api/tasks/:id",
	checkSchema(putSchema),
	resolveTaskFromIdx,
	async (req, res) => {
		const result = validationResult(req);
		if (!result.isEmpty()) return res.status(400).send(result.array());

		const {
			body: { title, description, priority, status, due_date, archived },
		} = req;

		const task = req.task;

		task.title = title;
		task.description = description;
		task.priority = priority;
		task.status = status;
		task.due_date = due_date;
		task.archived = archived;

		try {
			await task.save();
		} catch (err) {
			return res.status(500).send({ error: err });
		}

		return res.sendStatus(200);
	},
);

router.patch(
	"/api/tasks/:id",
	checkSchema(patchSchema),
	resolveTaskFromIdx,
	async (req, res) => {
		const result = validationResult(req);
		if (!result.isEmpty()) return res.status(400).send(result.array());

		const task = req.task;

		const {
			body: { title, description, priority, status, due_date, archived },
		} = req;

		if (title) task.title = title;
		if (description) task.description = description;
		if (priority) task.priority = priority;
		if (status) task.status = status;
		if (due_date) task.due_date = due_date;
		if (archived) task.archived = archived;

		await task.save();

		return res.sendStatus(200);
	},
);

router.delete("/api/tasks/:id", resolveTaskFromIdx, async (req, res) => {
	const task = req.task;
	await task.deleteOne();
	return res.send(task);
});

export default router;
