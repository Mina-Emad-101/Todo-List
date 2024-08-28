import { Router } from "express";
import mockUsers from "../data/mockUsers.js";
import { resolveUserFromIdx } from "../middlewares.js";
import { validationResult, checkSchema } from "express-validator";
import { createSchema, patchSchema } from "../schemas/users.js";

const router = Router();

router.get("/api/users", (req, res) => {
	return res.send({ data: mockUsers });
});

router.get("/api/users/:id", resolveUserFromIdx, (req, res) => {
	const user = req.resolvedUser;

	return res.send(user);
});

router.post("/api/users", checkSchema(createSchema), (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) return res.send(result.array());

	const {
		body: { username, email, password },
	} = req;

	const user = {
		id: mockUsers[mockUsers.length - 1].id + 1,
		username: username,
		email: email,
		password: password,
	};

	mockUsers.push(user);
	return res.send(user);
});

router.patch(
	"/api/users/:id",
	resolveUserFromIdx,
	checkSchema(patchSchema),
	(req, res) => {
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
			user.password = password;
		}

		return res.sendStatus(200);
	},
);

router.delete("/api/users/:id", resolveUserFromIdx, (req, res) => {
	const userIdx = mockUsers.findIndex(
		(user) => user.id === req.resolvedUser.id,
	);

	const deletedUser = mockUsers.splice(userIdx, 1)[0];

	return res.send(deletedUser);
});

export default router;
