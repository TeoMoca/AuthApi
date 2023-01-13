import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import UsersRouter from "./Routers/User/User-Router";
import { RegisterUserUseCase } from "./Core/UseCase/User/RegisterUserUseCase";
import { UserRepository } from "./Infrastructure/UserRepository";
import { LoginUserUseCase } from "./Core/UseCase/User/LoginUserUseCase";
import Stripe from "stripe";
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["http://localhost:8080"];

const options: cors.CorsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(options));
app.use(express.json());

const userMiddleware = UsersRouter(
  new RegisterUserUseCase(new UserRepository(prisma, stripe)),
  new LoginUserUseCase(new UserRepository(prisma, stripe))
);

app.use("/users", userMiddleware);

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});
