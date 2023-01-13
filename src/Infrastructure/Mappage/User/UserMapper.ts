import { User } from "@prisma/client";
import { Users } from "../../../Domain/User/User";
import { Address } from "../../../Domain/Adress/Adress";
import { Roles } from "../../../Domain/Role/Role";
import { Orders } from "../../../Domain/Orders/Orders";

export class UserMapper {
  static ToDomain(
    entity: User,
    Adress: Address[],
    Role: Roles,
    orders: Orders[]
  ): Users {
    return {
      id: entity.Id,
      firstname: entity.FirstName,
      lastname: entity.LastName,
      phone: entity.Phone,
      roleId: entity.Id_Role,
      mail: entity.Mail,
      password: entity.Password,
      adress: Adress,
      role: Role,
      orders: orders,
    };
  }
}
