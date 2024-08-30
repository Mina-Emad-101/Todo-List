import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local.js";
import authRouter from "./routes/auth.js";
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
app.use(authRouter);
app.use(usersRouter);

app.listen(PORT, HOST, () => {
	console.log(`Listening on ${HOST}:${PORT}`);
});
