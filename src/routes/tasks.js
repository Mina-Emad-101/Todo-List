import { Router } from "express";
import { loggedIn, resolveTaskFromIdx } from "../utils/middlewares.js";
import { validationResult, checkSchema } from "express-validator";
import { createSchema, patchSchema } from "../schemas/tasks.js";
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
	if (!result.isEmpty()) return res.send(result.array());

	const {
		body: { title, description, owner_id },
	} = req;

	const task = new Task({
		title: title,
		description: description,
		done: false,
		owner_id: owner_id,
	});

	try {
		await task.save();
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	return res.send(task);
});

router.patch(
	"/api/tasks/:id",
	checkSchema(patchSchema),
	resolveTaskFromIdx,
	async (req, res) => {
		const result = validationResult(req);
		if (!result.isEmpty()) return res.send(result.array());

		const task = req.task;

		const {
			body: { title, description, done, owner_id },
		} = req;

		if (title) task.title = title;
		if (description) task.description = description;
		if (owner_id) task.owner_id = owner_id;
		if (done) task.done = done;

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
