import express from "express";
import router from "./routes/routes";

const app = express();
const port = 9000;

app.get("/", (req, res) => {
  console.log("connected");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

app.use("/game/", router);
