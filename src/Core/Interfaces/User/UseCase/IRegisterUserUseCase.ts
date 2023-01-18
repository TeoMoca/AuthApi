import { Users } from "../../../../Domain/User/User";

export interface IRegisterUserUseCase {
  execute(user: Users, sponsorMail:string): Promise<Users>;
}
