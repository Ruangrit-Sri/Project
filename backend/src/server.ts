import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { pino } from "pino";

import { env } from "@common/utils/envConfig";
import errorHandler from "@common/middleware/errorHandler";

const logger = pino({ name: "server start" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Routes

// test
app.use("/test", (req: Request, res: Response) => {
  return res.json("Hello world!");
});

// Error handlers
app.use(errorHandler());

export { app, logger };
