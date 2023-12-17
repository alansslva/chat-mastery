import { MessageInterface, UserInterface } from "@/types";

export class MessageFactory {
    static createMessage(user : UserInterface, text: string, type: string) {
        const message : MessageInterface = {
            id: new Date().getTime(),
            user: user,
            message: text,
            type: type,
            date: new Date().getTime()
        };

        return message;
    }
}