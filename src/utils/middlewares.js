import { Task } from "../db/tasks.js";
import { User } from "../db/users.js";

export const resolveUserFromIdx = async (req, res, next) => {
	const id = req.params.id;

	const user = await User.findById(id);

	if (!user) return res.sendStatus(404);

	req.resolvedUser = user;
	return next();
};

export const resolveTaskFromIdx = async (req, res, next) => {
	const id = req.params.id;

	try {
		const task = await Task.findById(id);

		if (!task) return res.sendStatus(404);

		if (task.owner_id !== req.user.id) return res.sendStatus(403);

		req.task = task;
		return next();
	} catch (err) {
		return res.status(400).send({ error: err.message });
	}
};

export const loggedIn = (req, res, next) => {
	if (!req.user) return res.sendStatus(401);
	return next();
};
