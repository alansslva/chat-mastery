import { ChatInterface, UserInterface } from "@/types";
import { useState } from "react";
import { Card, Col, Dropdown, Row, Tab, Image, ListGroup } from "react-bootstrap";
import ModalEmojiSelect from "../Modals/ModalEmojiSelect";

const ChatScreen = (
    { 
        chat,
        loggedUser,
        chatSelected,
        sendMessage
     } :
     {
        chat: ChatInterface;
        chatSelected: number;
        loggedUser: UserInterface;
        sendMessage: Function;
     }
) => {

  const [ showEmojiModal, setShowEmojiModal ] = useState(false)

  const rollToBottom = (id :number ) => {
    const element = document.getElementById(`panel-${id.toString()}`);
    if (element) {
        setTimeout(() => {
            element.scrollTop = element.scrollHeight;
        }, 100);
    }
}


  const addEmojiToMessage = (emoji: string) => {
    setMessage(message + emoji)
  }

  const hideEmojiModal = () => {
    setShowEmojiModal(false)
  }
    const [message, setMessage] = useState('')
    
    return (
      <>
        <ModalEmojiSelect 
        show={showEmojiModal}
        onSelect={addEmojiToMessage}
        onClose={hideEmojiModal}
         />
         
         <div className={`${chatSelected == chat.id ? 'd-block' : 'd-none'} col-md-9 chat-body`}>
                <div className={`${chatSelected == chat.id ? 'd-block' : 'd-none'}`}>
                  <div className="bg-dark chat-body-header">
                    <div className="row">
                      <div className="d-flex justify-content-center">
                          <h3 className="ml-3 mt-3 ml-2" style={{color: 'white'}} >{'  ' + chat.name}</h3>
                      </div>
                    </div>
                        
                  </div>
                  <div 
                  id={`panel-${chat.id.toString()}`}
                  className="chat-content" style={{ 
                      maxHeight: 'calc(100vh - 200px)', 
                      height: 'calc(100vh - 200px)',
                      width: 'auto',
                      }}>
                          {chat.messages.map((message) => (
                            <div key={`message-${message.id}`}  className={`d-flex chat-message ${message.user.id === loggedUser.id ?  "justify-content-end" : ''} `}>
                              <div 
                                  className="bg-danger chat-message-card mt-3"
                                  style={
                                    {
                                      padding: '20px',
                                      width: 'max-content',
                                      color: 'white',
                                    }
                                  }
                                  >
                                    <div>
                                        <p className="mb-0" >{message.message}</p>
                                        <p>
                                          <Image src={message.user.avatar} className="img-fluid rounded-circle mr-5" width={20} />
                                          <small> {message.user.name}  { new Date(message.date).toLocaleString() }</small>
                                        </p>
                        
                                    </div>
                              </div>

                            </div>
                          

                          ))}
                  </div>
                  <div className="chat-footer">
                  <Row>
                      <Col sm={9}>
                        <div className="form-group mb-3 mb-md-0">
                          <textarea 
                            className="form-control" 
                            placeholder="Digite sua mensagem"
                            value={message}
                            onChange={(ev) => setMessage(ev.target.value)}
                            onKeyUp={(ev) => {
                              if(ev.key === 'Enter') {
                                sendMessage(chat.id, message);
                                setMessage('');
                                setTimeout(() => {
                                  rollToBottom(chat.id);
                                }, 500);
                              }

                            } }
                          />
                    </div>
                    </Col>
                    <Col className='d-flex justify-content-between'>
                    <button className="btn btn-warning mr-3" onClick={() => setShowEmojiModal(true)}>😀</button>

                      <button style={{width: '80%'}} className="btn btn-danger ml-3" onClick={() =>  {
                        sendMessage(chat.id, message);
                        setMessage('');
                        setTimeout(() => {
                          rollToBottom(chat.id);
                        }, 500);
                      }}>Enviar</button>
                    </Col>
                  </Row>
                </div>
                </div>
            </div>
            <div className={`${chatSelected == chat.id ? 'd-block' : 'd-none'} col-md-1 bg-dark`}>
              <h4 className="mt-3" style={{color: 'white'}}>Pessoas</h4>
              <ListGroup>
                  {chat.users.map((user) => (
                      <ListGroup.Item 
                      key={`user-${user.id}`} 
                      className="bg-dark text-white"
                      style={
                        {
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }
                      }
                      >
                        <Image src={user.avatar} className="img-fluid rounded-circle mr-5" width={20} />
                        {' ' + user.name}
                      </ListGroup.Item>               
                    ))}
              </ListGroup>
            </div>
      </>
    );
    }

    export default ChatScreen;