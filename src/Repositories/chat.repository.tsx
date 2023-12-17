import { ChatInterface, MessageInterface, UserInterface } from "@/types";
import { RepositoryInterface } from "./_repository.interface";
import { chatRepositoryKey } from "@/Helpers/repository.helper";

export class ChatRepository implements RepositoryInterface {
    

        private checkChatExists(chat: ChatInterface): boolean {
            const chats = this.all();
            return chats.find((c: ChatInterface) => c.id === chat.id) ? true : false;
        }

        all(): ChatInterface[] {
            return JSON.parse(localStorage.getItem(chatRepositoryKey) || "[]");
        }

        create(data: ChatInterface): void {
            const chats = this.all();
            if (this.checkChatExists(data)) {
                alert('Chat já existe')
                return;
            }
            chats.push(data);
            localStorage.setItem(chatRepositoryKey, JSON.stringify(chats));
        }

        find(id: number): ChatInterface | undefined {
            const chats = this.all();
            return chats.find((chat: ChatInterface) => chat.id === id);
        }

        getMessages(chat_id: number): MessageInterface[] {
            const chat = this.find(chat_id);
            return chat?.messages || [];
        }

        addUser(chat: ChatInterface, user: UserInterface): void {
            const chats = this.all();
            const chatIndex = chats.findIndex((c: ChatInterface) => c.id === chat.id);
            if (chatIndex === -1) {
                alert('Chat não existe')
                return;
            }

            //check if user exists
            const userIndex = chats[chatIndex].users.findIndex((u: UserInterface) => u.id === user.id);
            if (userIndex !== -1) {
                return;
            }


            chats[chatIndex].users.push(user);
            localStorage.setItem(chatRepositoryKey, JSON.stringify(chats));
        }
        
        update(data: ChatInterface): void {
            const chats = this.all();
            const chatIndex = chats.findIndex((chat: ChatInterface) => chat.id === data.id);
            if (chatIndex === -1) {
                alert('Chat não existe')
                return;
            }
            chats[chatIndex] = data;
            localStorage.setItem(chatRepositoryKey, JSON.stringify(chats));
        }

        sendMessage (chat_id: number, message: MessageInterface) {
            const chat = this.find(chat_id);
            if (!chat) {
                alert('Chat não existe')
                return;
            }
            chat.messages.push(message);
            this.update(chat);
        }

        getMyChats(user_id: number): ChatInterface[] {
            const chats = this.all();
            return chats.filter((chat: ChatInterface) => chat.users.find((user: UserInterface) => user.id === user_id));
        }
}