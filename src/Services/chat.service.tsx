import { ChatFactory } from "@/Factories/chat.factory";
import { ChatRepository } from "@/Repositories/chat.repository";
import { ChatInterface, MessageInterface, UserInterface } from "@/types";
import { UserService } from "./user.service";
import { UserRepository } from "@/Repositories/user.repository";
import { NotifyService } from "./notify.service";


export class ChatService {

    private chatRepository : ChatRepository;
    private userService : UserService;

    constructor(chatRepository : ChatRepository) {
        this.chatRepository = chatRepository;
        this.userService = new UserService(new UserRepository());
    }

    initialize() {
        const chat = this.chatRepository.find(1);
        if (!chat) {
            const newChat = ChatFactory.createDefaultChat();
            this.chatRepository.create(newChat);
        }
    }

    all() : ChatInterface[] {
        return this.chatRepository.all();
    }

    getMyChats(user_id: number) : ChatInterface[] {
        return this.chatRepository.getMyChats(user_id);
    }

    create(name: string, user_open : UserInterface, user_from: UserInterface) : ChatInterface {
        const newChat : ChatInterface = {
            id: new Date().getTime(),
            all: false,
            name: name,
            users: [user_open, user_from],
            messages: [],
            lastUpdate: new Date()
        }

        this.chatRepository.create(newChat);
        return newChat;
    }

    find(id: number) : ChatInterface | undefined {
        return this.chatRepository.find(id);
    }

    getMessages(chat_id: number) : MessageInterface[] {
        return this.chatRepository.getMessages(chat_id);
    }

    addUser(chat_id: number, user_id: number) {
        const chat = this.chatRepository.find(chat_id);
        const user = this.userService.find(user_id);
        if (chat && user) {
            this.chatRepository.addUser(chat, user);
        }
    }

    sendMessage (chat_id: number, message: MessageInterface) {
        this.chatRepository.sendMessage(chat_id, message);
        const chat = this.chatRepository.find(chat_id);
        const userName = message.user.name;
        const userIdsWithourMe = chat?.users.filter((user) => user.id !== message.user.id).map((user) => user.id) || [];
        const broadcastMessage = {
            user_ids: userIdsWithourMe ,
            chat_id: chat_id,
            message: `${userName} enviou uma mensagem no chat: ${chat?.name}`
        }

        NotifyService.send(broadcastMessage.message, 'chat', {
            user_ids: userIdsWithourMe ,
            chat_id: chat_id,
            message: `${userName} enviou uma mensagem no chat: ${chat?.name}`
        });
    }





}