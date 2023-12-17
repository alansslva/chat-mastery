import { Modal, Form, Row, Button } from "react-bootstrap"
import SelectAvatar from "@/Components/Users/Resources/select.avatar"
import { useState } from "react"
import { UserInterface } from "@/types"
import { UserProvider } from "@/Providers/user.provider"
import { NotifyService } from "@/Services/notify.service"

const ModalRegister = (
    {
        show = false,
        cancelAction = () => { },
        registerAction = () => { }
    } :
    {
        show: boolean,
        cancelAction: () => void,
        registerAction: (user: UserInterface) => void
    }
) => {

    const [selectedAvatar, setSelectedAvatar] = useState<string>('')
    const [name, setName] = useState<string>('')
    const userProvider = new UserProvider()

    const register = () => {
        if (!name || !selectedAvatar) {
            NotifyService.send('Preencha todos os campos', 'error')
            return;  
        }

        const user = userProvider.getFactory().createWithNameAndAvatar(name, selectedAvatar);
        userProvider.getService().save(user);

        registerAction(user);


    }

    return (
        <>
            <Modal show={show}>
                <Modal.Body>
                    <Row>
                        <h5 className="text-center"> Registro! </h5>
                        <p className='text-center'>
                            Insira seu nome e selecione um avatar para continuar
                        </p>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Digite seu nome" onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Avatar</Form.Label>
                                <SelectAvatar onConfirm={(avatar: string) => {
                                    setSelectedAvatar(avatar)
                                }} />
                            </Form.Group>
                        </Form>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => cancelAction()}>Voltar</Button>
                    <Button variant="danger" onClick={() => register()}>Registrar</Button>
                </Modal.Footer>
            </Modal>
        </> 
    )
}

export default ModalRegister