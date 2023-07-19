import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv"
import http from "http";
import router from "./router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);
app.use(cors());
app.use("/api", router);

const server = http.createServer(app);

async function startApp() {
  try {
    server.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
  } catch (error) {
    console.log("Error with start server")
  }
}

startApp();

