import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local.js";
import usersRouter from "./routes/users.js";

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser("secret"));
app.use(
	session({
		secret: "secret",
		cookie: { maxAge: 60 * 60 * 24 },
	}),
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(usersRouter);

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
	return res.sendStatus(200);
});

app.get("/api/auth", (req, res) => {
	return res.send(req.user ?? 401);
});

app.listen(PORT, HOST, () => {
	console.log(`Listening on ${HOST}:${PORT}`);
});
