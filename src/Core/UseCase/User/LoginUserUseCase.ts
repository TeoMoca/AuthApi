import { Users } from "../../../Domain/User/User";
import { IUserRepository } from "../../Interfaces/User/Repository/IUserRepository";
import { ILoginUserUseCase } from "../../Interfaces/User/UseCase/ILoginUserUseCase";

export class LoginUserUseCase implements ILoginUserUseCase {
  userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(mail: String, password: String): Promise<Users | undefined> {
    const data = await this.userRepository.LoginUser(mail, password);

    return data;
  }
}
