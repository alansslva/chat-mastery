export class ChatFactory{
    
    static createDefaultChat(){
        return {
            id: 1,
            all: true,
            name: "Grupo Geral",
            users: [],
            messages: [],
            lastUpdate: new Date()
        }
    } 

}