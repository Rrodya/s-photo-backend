import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv"
import http from "http";
import router from "./router";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//add swagger

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
  },
  apis: [
    `${__dirname}/router.ts`,
  ], // Specify the path to your router file
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
console.log('swagerSpec');
console.log(swaggerSpec);
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const jsonBodyMiddleware = express.json();

app.use(express.urlencoded({extended: true}))
app.use(jsonBodyMiddleware);
app.use('/image', express.static('uploads'));
app.use(cors());
app.use("/api", router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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

