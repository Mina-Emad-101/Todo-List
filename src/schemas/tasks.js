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

export const putSchema = {
	title: {
		notEmpty: { errorMessage: "Title can't be empty" },
	},
	description: {
		optional: true,
	},
	done: {
		notEmpty: { errorMessage: "You must specify whether task is done or not" },
		isBoolean: { errorMessage: "The Done field must be a boolean" },
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
