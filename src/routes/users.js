import { Router } from "express";
import mockUsers from "../data/mockUsers.js";
import { resolveUserFromIdx } from "../middlewares.js";
import { query, body, validationResult } from "express-validator";
import { passwordConfirmation } from "../custom-validators.js";

const router = Router();

router.get("/api/users", (req, res) => {
	return res.send({ data: mockUsers });
});

router.get("/api/users/:id", resolveUserFromIdx, (req, res) => {
	const user = req.resolvedUser;

	return res.send(user);
});

router.post(
	"/api/users",
	body("username")
		.notEmpty()
		.withMessage("Username can't be empty")
		.isAlphanumeric()
		.withMessage("Username has to be Alphanumeric"),
	body("email")
		.notEmpty()
		.withMessage("Email can't be empty")
		.isEmail()
		.withMessage("Email invalid, Email: john@doe.end"),
	body("password")
		.notEmpty()
		.withMessage("Password can't be empty")
		.isStrongPassword()
		.withMessage("Password has to be strong"),
	body("password_confirm")
		.notEmpty()
		.withMessage("Password Confirmation can't be empty")
		.custom(passwordConfirmation)
		.withMessage("Password and Password Confirmation not equal"),
	(req, res) => {
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
	},
);

router.patch(
	"/api/users/:id",
	resolveUserFromIdx,
	body("username")
		.optional()
		.isAlphanumeric()
		.withMessage("Username has to be Alphanumeric"),
	body("email")
		.optional()
		.isEmail()
		.withMessage("Email invalid, Email: john@doe.end"),
	body("password")
		.if(body("password_confirm").notEmpty())
		.isStrongPassword()
		.withMessage("Password has to be strong")
		.notEmpty()
		.withMessage("Password can't be empty"),
	body("password_confirm")
		.if(body("password").notEmpty())
		.custom(passwordConfirmation)
		.withMessage("Password and Password Confirmation not equal")
		.notEmpty()
		.withMessage("Password Confirmation can't be empty"),
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
