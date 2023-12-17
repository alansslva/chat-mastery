import { ChatInterface, UserInterface } from '@/types';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { UserProvider } from '@/Providers/user.provider';
import { ChatProvider } from '@/Providers/chat.provider'
import ChatScreen from './common/ChatScreen';
import { MessageFactory } from '@/Factories/message.factory';
import ModalSelectUser from "@/Components/Users/Modals/user.modal.select";
import ChatListItem from './ChatListItem';
import { NotifyService } from '@/Services/notify.service';


export default function Chat(
    { 
        loggedUser,
        chatProvider,
    } :
    {
        loggedUser: UserInterface;
        chatProvider: ChatProvider;
    }
) {


  const [ newChatModal, setNewChatModal ] = useState(false)
  const [ selectChatModal, setSelectChatModal ] = useState(false)
  const [ chatSelected, setChatSelected ] = useState<number>(0)

  const hideNewModal = () => {
    setNewChatModal(false)
  }

  const openNewChatModal = () => {
    setNewChatModal(true)
  }



  const userProvider : UserProvider = new UserProvider()
  const [chats, setChats] = useState<ChatInterface[]>(chatProvider.getService().all())
  const[ myChats, setMyChats ] = useState<ChatInterface[]>(chatProvider.getService().getMyChats(loggedUser.id) || [])
  const [filter, setFilter] = useState<string>('')


  const sendMessage = (chat_id : number, message: string) => {
    if(message === '') {
      NotifyService.send('Mensagem não pode ser vazia', 'error')
      return;
    }
    const newMessage = MessageFactory.createMessage(loggedUser, message, 'text')
    const chatToAddMessage = chatProvider.getService().find(chat_id)
    if (chatToAddMessage) {
      chatProvider.getService().sendMessage(chat_id, newMessage)
      setChats(chatProvider.getService().all())
      setMyChats(chatProvider.getService().getMyChats(loggedUser.id) || [])
    }
  }

  const createNewChat = (data: {user : UserInterface, name: string}) => {
    chatProvider.getService().create(data.name, loggedUser, data.user)
    setMyChats(chatProvider.getService().getMyChats(loggedUser.id) || [])
  }

  useEffect(() => {

    const addUsersGeneralChat = () => {
      const users = userProvider.getService().getusers()
      users.map((user) => {
        chatProvider.getService().addUser(1, user.id)
      } )
      setChats(chatProvider.getService().all())
      setMyChats(chatProvider.getService().getMyChats(loggedUser.id) || [])
    } 

    addUsersGeneralChat()

    window.addEventListener('storage', (ev) => {
        setChats(chatProvider.getService().all())
        setMyChats(chatProvider.getService().getMyChats(loggedUser.id) || [])
        addUsersGeneralChat()
       
    } )
   }, []);

  return (
    <>


        <ModalSelectUser 
          show={newChatModal} 
          handleClose={hideNewModal}
          handleReturn={hideNewModal}
          onSelect={createNewChat} 
          withChatName={true}
          withoutMe={true}
          user_id={loggedUser.id}
          />

          <div className="vh-100">
              <Row>
                <div className="col-md-2 bg-dark card-chat-list desktop-height" style={{
                  overflow: 'scroll'
                }}>
                  <div className="row">
                    <div className="col-12 bg-danger w-100 d-flex justify-content-center" style={{margin: 0, padding: 0, height: '50px'}}>
                      <Image src="/img/logo_white.png" roundedCircle width={50} />
                    </div>
                  </div>
                    <Container>
                        <div className="form-group mt-3">
                            <input 
                            type="text"
                             className="form-control" 
                             placeholder="Pesquisar"
                              value={filter}
                              onChange={(ev) => setFilter(ev.target.value)}
                              />
                        </div>
                        <div className="form-group mt-3 ">
                            <button  onClick={openNewChatModal}  className="btn btn-danger w-100">Novo Chat</button>
                        </div>
                        <ChatListItem
                        key={`chat-list-${loggedUser.id}`}
                          chats={
                            myChats.filter((chat) => {
                              if(filter === '') {
                                return true
                              }
                              return chat.name.toLowerCase().includes(filter.toLowerCase())
                            })
                          }
                          loggedUser={loggedUser}
                          chatSelected={chatSelected}
                          setChatSelected={setChatSelected}
                        />
                    </Container>
                </div>
               
                 {myChats.map((chat: ChatInterface) => (
                    <ChatScreen
                      key={`chat-${chat.id}`}
                      loggedUser={loggedUser}
                      chat={chat}
                      sendMessage={sendMessage}
                      chatSelected={chatSelected}
                      />
                  ))}
          
              </Row>
          </div>



    </>
  );
}
