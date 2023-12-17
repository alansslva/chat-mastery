'use client';
import { UserInterface } from "@/types"
import { useEffect, useState } from "react"
import Chat from "@/Components/Chat/Chat";
import toast, { Toaster } from 'react-hot-toast';
import { ChatProvider } from "@/Providers/chat.provider";
import WelcomeComponent from "@/Components/Welcome/welcome";

export default function Home() {

  const [loggedUser, setLoggedUser] = useState<UserInterface | null>(null)
  const chatProvider = new ChatProvider()
  const [ enableNotifications, setEnableNotifications ] = useState<boolean>(false)


  useEffect(() => {

    if(!enableNotifications) { return }

    const broadCastChannel = new BroadcastChannel('toast');
    broadCastChannel.onmessage = (ev) => {  
      if(ev.data.type === 'error') {
        toast.error(ev.data.message, ev.data.options);
      }
    }
  }, [enableNotifications])




  useEffect(() => {

   

      if(loggedUser) {

        const broadCastChannelUser = new BroadcastChannel('toast');
        broadCastChannelUser.onmessage = (ev) => { 
        if(ev.data.type === 'chat') {
          if(ev.data.message.user_ids.includes(loggedUser.id)) {
            toast(ev.data.message.message, ev.data.options);
            const elementNav = document.querySelector('.chat-button-'+ev.data.message.chat_id)
            if(elementNav){

              //if has class danger dont do nothing
              if(elementNav.classList.contains('bg-danger')) {
                return
              }
              
              elementNav.classList.remove('bg-white')
              elementNav.classList.add('bg-warning')
            }
          }
        }
      }
     
    }


  }, [loggedUser] );



  useEffect(() => {
  
    const chatService = chatProvider.getService()
      chatService.initialize()
      setEnableNotifications(true);

    
  
  }, []);

  return (
    <>
      

      <WelcomeComponent
      loginAction={(user : UserInterface) => setLoggedUser(user)}
      ></WelcomeComponent>

      {loggedUser && (
        <>
        <div className="vh-100 mb-400 bg-secondary">
          <div className="container-fluid">
            <div className="row">
              <Chat 
              loggedUser={loggedUser}
              chatProvider={chatProvider}
                />
            </div>
          </div>
         </div>

       
        </>

      
          )
        }
          

          <Toaster />

    </>
  )
}
