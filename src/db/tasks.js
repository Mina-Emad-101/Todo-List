import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
	title: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
	description: {
		type: mongoose.Schema.Types.String,
	},
	priority: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
	status: {
		type: mongoose.Schema.Types.Number,
		required: true,
	},
	owner_id: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
});

export const Task = mongoose.model("Task", tasksSchema);
