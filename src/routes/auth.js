import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/api/auth", passport.authenticate("local"), (req, res) => {
	return res.sendStatus(200);
});

router.get("/api/auth", (req, res) => {
	return res.send(req.user ?? 401);
});

export default router;
