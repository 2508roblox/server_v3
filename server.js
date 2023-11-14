import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./src/router/authRoute";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware";

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Connected on port " + port);
});