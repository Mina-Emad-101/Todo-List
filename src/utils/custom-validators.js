import { User } from "../db/users.js";

export const passwordConfirmation = (password_confirm, { req }) => {
	if (password_confirm !== req.body.password) {
		return false;
	}
	return true;
};

export const validateOwnerId = async (id) => {
	const user = await User.findById(id);

	if (user) return true;
	else return false;
};
