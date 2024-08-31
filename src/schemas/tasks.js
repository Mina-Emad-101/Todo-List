import { validateOwnerId } from "../utils/custom-validators.js";

export const createSchema = {
	title: {
		notEmpty: { errorMessage: "Title can't be empty" },
	},
	description: {
		optional: true,
	},
	owner_id: {
		notEmpty: { errorMessage: "Owner ID can't be empty" },
		custom: {
			options: validateOwnerId,
			errorMessage: "ID doesn't belong to a User",
		},
	},
};

export const patchSchema = {
	title: {
		optional: true,
	},
	description: {
		optional: true,
	},
	done: {
		optional: true,
		isBoolean: { errorMessage: "Done field has to be true or false" },
	},
	owner_id: {
		optional: true,
		custom: {
			options: validateOwnerId,
			errorMessage: "ID doesn't belong to a User",
		},
	},
};
