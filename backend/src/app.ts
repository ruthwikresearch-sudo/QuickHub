import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import routes from "./api/v1/routes";
import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorHandler);

export default app;