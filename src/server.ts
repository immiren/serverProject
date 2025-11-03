import express from "express";
import saveRouter from "./routes/saveRoutes";
import gameRouter from "./routes/gameRoutes";

const app = express();
const port = 9000;

app.use(express.json());

// TODO: combine routes
app.use("/", gameRouter);

app.use("/saves", saveRouter);

app.use("/game", express.static("public"));

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
