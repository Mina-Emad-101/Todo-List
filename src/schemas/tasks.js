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
	due_date: {
		notEmpty: { errorMessage: "Due Date can't be empty" },
		isISO8601: { errorMessage: "Due Date must be in this format: yyyy-mm-dd" },
		toDate: true,
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
	due_date: {
		notEmpty: { errorMessage: "Due Date can't be empty" },
		isISO8601: { errorMessage: "Due Date must be in this format: yyyy-mm-dd" },
		toDate: true,
	},
	archived: {
		notEmpty: { errorMessage: "Archived Field is required" },
		isBoolean: { errorMessage: "Archived Field must be Boolean" },
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
		optional: true,
		isIn: {
			options: [["high", "medium", "low"]],
			errorMessage: "Priority must be ( high / medium / low )",
		},
	},
	status: {
		optional: true,
		isNumber: { errorMessage: "Status field must be Number" },
	},
	due_date: {
		optional: true,
		isISO8601: { errorMessage: "Due Date must be in this format: yyyy-mm-dd" },
		toDate: true,
	},
	archived: {
		optional: { errorMessage: "Archived Field is required" },
		isBoolean: { errorMessage: "Archived Field must be Boolean" },
	},
};
