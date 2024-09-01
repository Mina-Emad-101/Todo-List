import { Router } from "express";
import { resolveUserFromIdx, loggedIn } from "../utils/middlewares.js";
import { validationResult, checkSchema } from "express-validator";
import { createSchema, patchSchema, putSchema } from "../schemas/users.js";
import { User } from "../db/users.js";
import { hashPassword } from "../utils/hashing.js";

const router = Router();

router.post("/api/users", checkSchema(createSchema), async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) return res.status(400).send(result.array());

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
		return res.status(500).send({ error: err.errorResponse.errmsg });
	}

	return res.send(user);
});

// All next routes must be logged in

router.get("/api/users", loggedIn, (req, res) => {
	const user = req.user;

	return res.send(user);
});

router.put("/api/users", loggedIn, checkSchema(putSchema), async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) return res.status(400).send(result.array());

	const {
		body: { username, email, password },
	} = req;

	const user = req.user;

	user.username = username;
	user.email = email;
	user.password = password;

	try {
		await user.save();
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: err.errorResponse.errmsg });
	}

	return res.sendStatus(200);
});

router.patch(
	"/api/users",
	loggedIn,
	checkSchema(patchSchema),
	async (req, res) => {
		const result = validationResult(req);
		if (!result.isEmpty()) return res.status(400).send(result.array());

		const user = req.user;

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

		try {
			await user.save();
		} catch (err) {
			return res.status(400).send({ error: err });
		}

		return res.sendStatus(200);
	},
);

router.delete("/api/users", loggedIn, async (req, res) => {
	const user = req.user;

	await user.deleteOne();

	req.session.destroy((err) => {
		if (err) return res.status(500).send({ error: err });
	});
	return res.send(user);
});

export default router;
