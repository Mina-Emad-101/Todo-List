import passport from "passport";
import { Strategy } from "passport-local";
import mockUsers from "../data/mockUsers.js";

export default passport.use(
	new Strategy({ usernameField: "email" }, (email, password, done) => {
		const user = mockUsers.find((user) => user.email === email);

		try {
			if (!user) throw new Error("User Not Found");
			if (user.password !== password) throw new Error("Incorrect Password");
		} catch (err) {
			done(err, null);
		}
		done(null, user);
	}),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	const user = mockUsers.find((user) => user.id === id);

	try {
		if (!user) throw new Error("User Not Found");
	} catch (err) {
		done(err, null);
	}

	done(null, user);
});
