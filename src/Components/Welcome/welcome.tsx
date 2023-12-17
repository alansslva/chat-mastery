import { useEffect, useState } from "react";
import ModalWelcome from "./Modals/modal.welcome";
import ModalOnBoarding from "../Login/Modals/modal.onboarding";
import ModalRegister from "../Login/Modals/modal.register";
import ModalLogin from "../Login/Modals/modal.login";
import { UserInterface } from "@/types";

const WelcomeComponent = (
    {
        loginAction = () => {},    
    } :
    {
        loginAction: (user : UserInterface) => void,
    }
) => {

  const [showModalWelcome, setShowModalWelcome] = useState(false);
  const [showModalOnBoarding, setShowModalOnBoarding] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);


    useEffect(() => {
       setShowModalWelcome(true);
    }, [])



    return (
        <>
            <ModalWelcome 
            show={showModalWelcome}
            onConfirm={
                () => {
                    setShowModalWelcome(false);
                    setShowModalOnBoarding(true);
                }
            }
            ></ModalWelcome>

            <ModalOnBoarding
            show={showModalOnBoarding}
            loginAction={() => {
                setShowModalOnBoarding(false);
                setShowModalLogin(true);
            }}
            registerAction={() => {
                setShowModalOnBoarding(false);
                setShowModalRegister(true);
            }}
            exitAction={() => {
                setShowModalOnBoarding(false);
                setShowModalWelcome(true);
            }}
            ></ModalOnBoarding>

            <ModalRegister
            show={showModalRegister}
            cancelAction={() => {
                setShowModalRegister(false);
                setShowModalOnBoarding(true);
            }}
            registerAction={(user: UserInterface) => {
                setShowModalRegister(false);
                loginAction(user);
            }}
            ></ModalRegister>

            <ModalLogin
            show={showModalLogin}
            cancelAction={() => {
                setShowModalLogin(false);
                setShowModalOnBoarding(true);
            }}
            confirmAction={(user: UserInterface) => {
                setShowModalLogin(false);
                loginAction(user);
            }}
            ></ModalLogin>

        </>
    )
}

export default WelcomeComponent