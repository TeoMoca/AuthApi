import { Users } from "../../../../Domain/User/User";

export interface IRegisterUserUseCase {
  execute(user: Users): Promise<Users>;
}
