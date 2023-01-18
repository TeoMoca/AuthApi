import { Users } from "../../../Domain/User/User";
import { IUserRepository } from "../../Interfaces/User/Repository/IUserRepository";
import { IRegisterUserUseCase } from "../../Interfaces/User/UseCase/IRegisterUserUseCase";
import { randomUUID } from "crypto";

export class RegisterUserUseCase implements IRegisterUserUseCase {
  userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: Users, sponsorMail:string): Promise<Users> {
    user.id = randomUUID();
    const userCreated = await this.userRepository.registerUser(
      user,
      user.adress[0], 
      sponsorMail
    );

    return userCreated;
  }
}
