import { UserRepository } from "@/Repositories/user.repository";
import { UserInterface } from "@/types";
import { AvatarRepository } from "@/Repositories/avatar.repository";

export class UserService {
    private userRepository: UserRepository;
    private avatarRepository: AvatarRepository;


    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.avatarRepository = new AvatarRepository();
    }

    save(user: UserInterface): UserInterface {
        this.userRepository.create(user);
        return user;
    }

    find(id: number): UserInterface | undefined {
        return this.userRepository.find(id);
    }

    getusers(): UserInterface[] {
        return this.userRepository.all();
    }

    getUsersWhitoutMe(id: number): UserInterface[] {
        return this.userRepository.all().filter((user) => user.id !== id);
    }

    getAvatars(): string[] {
        return this.avatarRepository.all();
    }
}
