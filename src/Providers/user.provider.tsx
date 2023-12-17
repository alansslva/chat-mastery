import { UserFactory } from "@/Factories/user.factory";
import { UserRepository } from "@/Repositories/user.repository";
import { UserService } from "@/Services/user.service";

export class UserProvider {
   
    private userRepository = new UserRepository();
    private userService = new UserService(this.userRepository);
    private userFactory = new UserFactory();


    getService(): UserService {
        return this.userService;
    }

    getFactory(): UserFactory {
        return this.userFactory;
    } 

}