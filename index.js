const express = require("express");
const app = express();
const path = require("path");
const port = 8080
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
const ejsMate = require("ejs-mate");
app.use(methodOverride("_method"));
const { default: mongoose } = require("mongoose");
app.engine("ejs", ejsMate); // formate ejs file
const { User } = require("./schema.js");

main()
	.then((res) => {
		console.log("connection succcessful");
	})
	.catch((err) => {
		console.log(err);
	});

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/CancerAwareness");
}

app.get("/", (req, res) => {
	console.log("show page/ index.ejs");
	res.render("index");
});

app.get("/ask", (req, res) => {
	console.log("asked page");
	res.render("askForm");
});
app.get("/link", (req, res) => {
	console.log("asked page");
	res.render("page2");
});
app.post("/submit", async (req, res) => {
	console.log(req.body);
	// const { name, age, city, gender } = req.body;
	// const user = new User({ name, age, city, gender });
	const user = new User(req.body);
	const newUser = await user.save();
	console.log(newUser);
	console.log("asked page");
	res.redirect(`/user/${newUser._id}`);
});

app.get("/user", async (req, res) => {
	const users = await User.find({});
	console.log(users);
	res.render("user", { users });
});
app.delete("/user/:id", async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id);
	console.log(user);
	console.log("deleted user");
	res.redirect("/user");
});
app.get("/user/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	console.log(user);
	console.log("show user");
	res.render("userPage", { user });
});

app.listen(port , (req, res) => {
	console.log("server is listening on 8080");
});
