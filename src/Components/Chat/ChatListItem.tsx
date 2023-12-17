import { ChatInterface, UserInterface } from "@/types"
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import {Row, Col} from "react-bootstrap"

const ChatListItem = (
    {
        chats,
        loggedUser,
        chatSelected,
        setChatSelected
    }: {
        chats: ChatInterface[],
        loggedUser: UserInterface,
        chatSelected: number,
        setChatSelected: (id: number) => void
    
    }
) => {

    const rollToBottom = (id :number ) => {
        const element = document.getElementById(`panel-${id.toString()}`);
        if (element) {
            setTimeout(() => {
                element.scrollTop = element.scrollHeight;
                const body = document.querySelector('body');

                if(body){
                    window.scrollTo(0, document.body.scrollHeight);
                }
                    
            }, 100)  ;
        }
    }

    return (
        <>
        {chats.map((chat) => (
            <Card key={`button-chat-${chat.id}`} className={`mt-2 chat-button chat-button-${chat.id}`} bg={`${chat.id ==chatSelected ? 'danger' : 'white' }`} onClick={() => {
                setChatSelected(chat.id)
                rollToBottom(chat.id)
            }}>
               <Row>
                <div className="col-2">
                <Image src={`${chat.id ==chatSelected ? '/img/logo_white.png' : '/img/logo.png' }`} roundedCircle width={30} />
                </div>
                <div 
                className="col-10 d-flex align-items-center"
                style={{color: `${chat.id ==chatSelected ? 'white' : 'black' }` }}
                >
                    {chat.name}
                </div>
               </Row>
            </Card>
            ))}
        </>
    )

}
export default ChatListItem