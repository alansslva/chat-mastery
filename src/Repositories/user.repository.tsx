import { UserInterface } from "@/types";
import { RepositoryInterface } from "./_repository.interface";
import { userRepositoryKey } from "@/Helpers/repository.helper";

export class UserRepository  implements RepositoryInterface {

    all(): UserInterface[] {
        return JSON.parse(localStorage.getItem(userRepositoryKey) || "[]");
    }

    create(data: UserInterface): void {
        const users = this.all();
        users.push(data);
        localStorage.setItem(userRepositoryKey, JSON.stringify(users));
    }

    find(id: number): UserInterface | undefined {
        const users = this.all();
        return users.find((user: UserInterface) => user.id === id);
    }

}