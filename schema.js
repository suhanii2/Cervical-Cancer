const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		enum: ["male", "female", "other"],
		required: true,
	},
	symptoms: {
		type: Array,
		required: true,
	},
});

// const symptomSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 	},
// });

const User = mongoose.model("User", userSchema);
// const Symptom = mongoose.model("Symptom", symptomSchema);

module.exports = { User };
