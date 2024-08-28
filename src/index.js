import express from "express";

const HOST = "127.0.0.1";
const PORT = 8000;

const app = express();

app.get("/api", (req, res) => {
	return res.send({
		msg: "Hello"
	});
});

app.listen(PORT, HOST, () => {
	console.log(`Listening on ${HOST}:${PORT}`);
});
