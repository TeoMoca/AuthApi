import { IUserRepository } from "../Core/Interfaces/User/Repository/IUserRepository";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { Users } from "../Domain/User/User";
import { Address } from "../Domain/Adress/Adress";
import { RoleMapper } from "./Mappage/Role/RoleMapper";
import { UserMapper } from "./Mappage/User/UserMapper";
import { AdressMapper } from "./Mappage/Adress/AdressMapper";
import { OrdersMapper } from "./Mappage/Orders/OrdersMapper";
import { randomUUID } from "crypto";

export class UserRepository implements IUserRepository {
  userDataSource: PrismaClient;
  stripeDataSource: Stripe;
  constructor(userDataSource: PrismaClient, stripeDataSource: Stripe) {
    this.userDataSource = userDataSource;
    this.stripeDataSource = stripeDataSource;
  }

  async registerUser(User: Users, Adress: Address, sponsorMail:string): Promise<Users> {
    const mail = User.mail;
    const stripeId = await this.stripeDataSource.customers.create({
      phone: User.phone,
      name: User.firstname + "" + User.lastname,
    });

    const sponsor = await this.userDataSource.user.findFirst({
      where:{Mail: sponsorMail}
  })
 
  if(sponsor != null){          
      await this.userDataSource.user.update({
          where:{Id:sponsor.Id},
          data:{IsSponsor: true}
      })
      await this.userDataSource.refer.create({
        data:{
          Id: randomUUID(),
          CustomerId:User.id,
          ReferId:sponsor.Id,
          RoleId:User.roleId,
        },
      })
  }
    
    const data = await this.userDataSource.user.create({
      data: {
        Id_Role: User.roleId,
        IsDisabled: false,
        Id: User.id,
        FirstName: User.firstname,
        LastName: User.lastname,
        Mail: User.mail,
        Phone: User.phone,
        Password: User.password,
        stripeId: stripeId.id,
        IsSponsor: false,
        Lives: {
          create: [
            {
              Adress: {
                create: {
                  Id: Adress.id,
                  adressName: Adress.adress,
                  city: Adress.city,
                  postalCode: Adress.codePostal,
                  Country: Adress.country,
                  IsDisabled: false,
                },
              },
            },
          ],
        },
      },
      select: {
        Id_Role: true,
        IsDisabled: true,
        Id: true,
        FirstName: true,
        LastName: true,
        Mail: true,
        Phone: true,
        Password: true,
        stripeId: true,
        Role: true,
        Order: true,
        ReferCode:true,
        IsSponsor:true,
        Lives: { include: { Adress: true } },
      },
    });    
    const adress: Address[] = [];
    const role = RoleMapper.ToDomain(data.Role);
    const orders = OrdersMapper.ToDomainEnities(data.Order);
    for (const lives of data.Lives) {
      const userAdress = AdressMapper.ToDomain(lives.Adress);
      adress.push(userAdress);
    }
    const userCreated = UserMapper.ToDomain(data, adress, role, orders);

    return userCreated;
  }

  async LoginUser(mail: String, password: String): Promise<Users | undefined> {
    const datas = await this.userDataSource.user.findMany({
      include: {
        Role: true,
        Order: true,
        Lives: { include: { Adress: true } },
      },
    });

    for (const data of datas) {
      if (data.Mail == mail && data.Password == password) {
        const adress: Address[] = [];
        const role = RoleMapper.ToDomain(data.Role);
        const orders = OrdersMapper.ToDomainEnities(data.Order);
        for (const lives of data.Lives) {
          const userAdress = AdressMapper.ToDomain(lives.Adress);
          adress.push(userAdress);
        }
        const userCreated = UserMapper.ToDomain(data, adress, role, orders);

        return userCreated;
      }
    }
    return undefined;
  }
}
