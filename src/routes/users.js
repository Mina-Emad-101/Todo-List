import { Router } from "express";
import { resolveUserFromIdx } from "../middlewares.js";
import { validationResult, checkSchema } from "express-validator";
import { createSchema, patchSchema } from "../schemas/users.js";
import { User } from "../db/users.js";
import { hashPassword } from "../utils/hashing.js";

const router = Router();

router.get("/api/users", async (req, res) => {
	return res.send({ data: await User.find() });
});

router.get("/api/users/:id", resolveUserFromIdx, (req, res) => {
	const user = req.resolvedUser;

	return res.send(user);
});

router.post("/api/users", checkSchema(createSchema), async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) return res.send(result.array());

	const {
		body: { username, email, password },
	} = req;

	const user = new User({
		username: username,
		email: email,
		password: hashPassword(password),
	});

	try {
		await user.save();
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	return res.send(user);
});

router.patch(
	"/api/users/:id",
	resolveUserFromIdx,
	checkSchema(patchSchema),
	async (req, res) => {
		const result = validationResult(req);
		if (!result.isEmpty()) return res.send(result.array());

		const user = req.resolvedUser;

		const {
			body: { username, email, password, password_confirm },
		} = req;

		if (username) user.username = username;
		if (email) user.email = email;
		if (password) {
			if (!password_confirm) return res.sendStatus(400);
			if (password !== password_confirm) return res.sendStatus(400);
			user.password = hashPassword(password);
		}

		await user.save();

		return res.sendStatus(200);
	},
);

router.delete("/api/users/:id", resolveUserFromIdx, async (req, res) => {
	const user = req.resolvedUser;

	await user.deleteOne();

	return res.send(user);
});

export default router;
