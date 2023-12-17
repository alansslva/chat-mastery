export interface UserInterface {
    id: number;
    name: string;
    avatar: string;
}

export interface MessageInterface {
    id: number;
    user: UserInterface;
    message: string;
    type: string;
    date: number;
}

export interface ChatInterface {
    id: number;
    all: boolean;
    name: string;
    users: UserInterface[];
    messages: MessageInterface[];
    lastUpdate: Date;
}