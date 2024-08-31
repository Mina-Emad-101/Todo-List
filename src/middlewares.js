import { Task } from "./db/tasks.js";
import { User } from "./db/users.js";

export const resolveUserFromIdx = async (req, res, next) => {
	const id = req.params.id;

	const user = await User.findById(id);

	if (!user) return res.sendStatus(404);

	req.resolvedUser = user;
	return next();
};

export const resolveTaskFromIdx = async (req, res, next) => {
	const id = req.params.id;

	const task = await Task.findById(id);

	if (!task) return res.sendStatus(404);

	req.task = task;
	return next();
};
