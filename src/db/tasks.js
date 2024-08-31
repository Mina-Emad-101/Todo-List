import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
	title: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
	description: {
		type: mongoose.Schema.Types.String,
	},
	done: {
		type: mongoose.Schema.Types.Boolean,
		required: true,
	},
	owner_id: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
});

export const Task = mongoose.model("Task", tasksSchema);
