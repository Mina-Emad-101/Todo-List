import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../db/users.js";

export default passport.use(
	new Strategy({ usernameField: "email" }, async (email, password, done) => {
		const user = await User.findOne({ email: email });

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

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		if (!user) throw new Error("User Not Found");
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});
