import express from "express";
import { Request, Response } from "express";
import { Address } from "../../Domain/Adress/Adress";
import { randomUUID } from "crypto";
import { Roles } from "../../Domain/Role/Role";
import { Orders } from "../../Domain/Orders/Orders";
import { Users } from "../../Domain/User/User";
import { IRegisterUserUseCase } from "../../Core/Interfaces/User/UseCase/IRegisterUserUseCase";
import { ILoginUserUseCase } from "../../Core/Interfaces/User/UseCase/ILoginUserUseCase";
import jwt from "jsonwebtoken";

export default function UsersRouter(
  RegisterUserUseCase: IRegisterUserUseCase,
  LoginUserUseCase: ILoginUserUseCase
) {
  const router = express.Router();

  router.post("/register", async (req: Request, res: Response) => {
    try {
      const adress: Address[] = [];
      const userAdress = new Address(
        randomUUID(),
        req.body.adress,
        req.body.codePostal,
        req.body.city,
        req.body.country
      );
      adress.push(userAdress);
      const role = new Roles(req.body.IdRole, req.body.Label, false);
      const order: Orders[] = [];
      const user = new Users(
        "",
        req.body.IdRole,
        req.body.firstname,
        req.body.lastname,
        req.body.phone,
        req.body.mail,
        req.body.password,
        adress,
        role,
        order
      );

      const userCreated = await RegisterUserUseCase.execute(user);

      res.send(userCreated);
    } catch (err) {
      res.status(500).send({ message: "Error adding data" });
    }
  });

  router.post("/login", async (req: Request, res: Response) => {
    const { mail, password } = req.body;

    const data = await LoginUserUseCase.execute(mail, password);

    if (data != undefined) {
      const token = jwt.sign(
        { user_id: data.id, mail },
        process.env.TOKEN_KEY as string,
        { expiresIn: "2h" }
      );
      const userInfo = { data, message: "User Connected", token: token };
      return res.status(200).json(userInfo);
    }

    res.status(400).json({ message: "All input is required" });
  });

  return router;
}
