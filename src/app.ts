import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { NotFoundError, ApiError, InternalError } from "./utils/error-util";
import { corsUrl, environment } from "./config";

process.on("uncaughtException", (e) => {});

const app = express();

app.use(helmet());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes

// catch 404 and forward to error handler
// app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line consistent-return
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === "development") {
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export { app };
