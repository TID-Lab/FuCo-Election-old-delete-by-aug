import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import cors from "cors";
import { env } from "./envConfig";

import { apiRouter } from "@/next/api/apiRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// app.use(rateLimiter);

// // Request logging
// app.use(requestLogger);

// Routes

app.use("/api/next", apiRouter);

// // Swagger UI
// app.use(openAPIRouter);

// Error handlers
//app.use(errorHandler());

export { app, logger };
