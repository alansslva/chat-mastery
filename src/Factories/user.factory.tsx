import { UserInterface } from "@/types";

export class UserFactory {
    
    createWithNameAndAvatar(name: string, avatar: string): any {
        const user : UserInterface = {
            id: Date.now(),
            name,
            avatar
        };
        return user;
    }

}