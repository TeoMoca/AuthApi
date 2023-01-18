import { Users } from "../../../../Domain/User/User";
import { Address } from "../../../../Domain/Adress/Adress";

export interface IUserRepository {
  registerUser(user: Users, Adress: Address, sponsorMail:string): Promise<Users>;
  LoginUser(mail: String, password: String): Promise<Users | undefined>;
}
