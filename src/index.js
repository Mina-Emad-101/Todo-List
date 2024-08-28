import express from "express";
import usersRouter from "./routes/users.js";

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(usersRouter);

app.get("/api", (req, res) => {
  return res.send({
    msg: "Hello",
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`);
});
