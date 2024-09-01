import { Router } from "express";
import passport from "passport";
import { loggedIn } from "../utils/middlewares.js";

const router = Router();

router.post("/api/auth", passport.authenticate("local"), (req, res) => {
	return res.sendStatus(200);
});

// All next routes need authentication

router.get("/api/auth", loggedIn, (req, res) => {
	return res.send(req.user ?? 401);
});

router.delete("/api/auth", loggedIn, (req, res) => {
	req.session.destroy((err) => {
		if (err) return res.status(500).send({ error: err });

		return res.sendStatus(200);
	});
});

export default router;
