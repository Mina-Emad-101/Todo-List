export const createSchema = {
	title: {
		notEmpty: { errorMessage: "Title can't be empty" },
	},
	description: {
		optional: true,
	},
	priority: {
		notEmpty: { errorMessage: "Priority can't be empty" },
		isIn: {
			options: [["high", "medium", "low"]],
			errorMessage: "Priority must be ( high / medium / low )",
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
	priority: {
		notEmpty: { errorMessage: "Priority can't be empty" },
		isIn: {
			options: [["high", "medium", "low"]],
			errorMessage: "Priority must be ( high / medium / low )",
		},
	},
	status: {
		notEmpty: { errorMessage: "Status can't be empty" },
	},
};

export const patchSchema = {
	title: {
		optional: true,
	},
	description: {
		optional: true,
	},
	priority: {
		notEmpty: { errorMessage: "Priority can't be empty" },
		isIn: {
			options: [["high", "medium", "low"]],
			errorMessage: "Priority must be ( high / medium / low )",
		},
	},
	status: {
		optional: true,
		isNumber: { errorMessage: "Status field must be Number" },
	},
};
