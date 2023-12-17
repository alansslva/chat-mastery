import { ChatRepository } from "@/Repositories/chat.repository";
import { ChatService } from "@/Services/chat.service";

export class ChatProvider{

    private chatRepository = new ChatRepository();
    private chatService = new ChatService(this.chatRepository);


    getService(): ChatService {
        return this.chatService;
    }

    getRepository(): ChatRepository {
        return this.chatRepository;
    }

}