import { Address } from "../Adress/Adress";
import { Orders } from "../Orders/Orders";
import { Roles } from "../Role/Role";

export interface Users {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  roleId: number;
  mail: string;
  password: string;
  adress: Address[];
  role: Roles;
  orders: Orders[];
}

export class Users implements Users {
  constructor(
    public id: string,
    public roleId: number,
    public firstname: string,
    public lastname: string,
    public phone: string,
    public mail: string,
    public password: string,
    public adress: Address[],
    public role: Roles,
    public orders: Orders[]
  ) {}
}
