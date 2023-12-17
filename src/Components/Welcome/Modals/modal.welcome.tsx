import { Modal } from "react-bootstrap"
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const ModalWelcome = (
    {
        show = false,
        onConfirm = () => {},
    } :
    {
        show: boolean,
        onConfirm: () => void,
    }
) => {

    return (
        <Modal show={show}>
        <Modal.Body>
            <div className="d-flex justify-content-center">
                <Image src="/img/logo_text.png" width={250} />
            </div>
            <p className="text-center mt-4">
                Bem-vindo(a)! Estamos felizes por você estar aqui. <br />
                Essa é uma aplicação de chat para demonstração, fique a vontade para testar e explorar.
            </p>
            <Button 
            className="w-100" 
            variant="danger" 
            size="lg"
            onClick={() => onConfirm()}
            >
            Entrar no chat
            </Button>
        </Modal.Body>
        </Modal>
    )

}

export default ModalWelcome