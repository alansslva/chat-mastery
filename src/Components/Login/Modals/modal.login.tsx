import { Modal } from "react-bootstrap"
import SelectUser from "@/Components/Users/Resources/select.users"
import { useState } from "react"
import { UserInterface } from "@/types"
import { NotifyService } from "@/Services/notify.service"


const ModalLogin = (
    {
        show = false,
        confirmAction = () => {},
        cancelAction = () => {},
    } :
    {
        show: boolean,
        confirmAction: (user: UserInterface) => void,
        cancelAction: () => void,
    }
) => {

    const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null)

    const login = () => {
        if(!selectedUser) {
            NotifyService.send('Selecione um usuario', 'error')
            return;
        }
        confirmAction(selectedUser)
    }

    return (
        <>
        <Modal show={show} size="lg" >
            <Modal.Body>
                <h5 className="text-center"> Login! </h5>
                <p className='text-center'>
                    Selecione um usuario para continuar
                </p>
                <SelectUser 
                selectAction={(user: UserInterface) => {
                    setSelectedUser(user)
                }}
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => cancelAction()}>Voltar</button>
                <button className="btn btn-danger" onClick={() => login()}>Confirmar</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModalLogin