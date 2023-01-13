import { Users } from "../../../../Domain/User/User";

export interface ILoginUserUseCase {
  execute(mail: String, password: String): Promise<Users | undefined>;
}
