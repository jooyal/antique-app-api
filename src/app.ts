import express, { Express } from "express";
import { config } from "./utilities/index.js";

const app: Express = express();
const port: number = config.port;

app.use(express.json());
app.use(express.urlencoded());

// app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
