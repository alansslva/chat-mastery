import { Modal } from "react-bootstrap"
import {Row, Col, Button, Image, Card} from "react-bootstrap"


const ModalOnBoarding = (
    {
        show = false,
        loginAction = () => {},
        registerAction = () => {},
        exitAction = () => {},
    } :
    {
        show: boolean,
        loginAction: () => void,
        registerAction: () => void,
        exitAction: () => void,
    }
) => {

    return (
        <>
        <Modal
        show={show}
        size="lg"
        >
            <Modal.Header>
                <Modal.Title>Bem Vindo!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="text-center"> Vamos Começar ! </h5>
                <p className='text-center'>Para continuar é necessario que você faça login ou selecione um usuario existente em nossa base</p>
                <Row>
                    <Col sm={6} >
                        <Card>
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Card.Text>
                                    Caso você ja tenha um usuario cadastrado, faça login para continuar
                                </Card.Text>
                                <Image src="/img/select-user.jpeg" fluid /> <br />
                                <Button variant="danger w-100" onClick={() => loginAction()}>Login</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Registrar</Card.Title>
                                <Card.Text>
                                    Caso você não tenha um usuario cadastrado, faça o registro para continuar
                                </Card.Text>
                                <Image src="/img/create-user.jpeg" fluid /> <br />
                                <Button variant="danger w-100" onClick={() => registerAction()}>Registrar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
        </>
    )

}

export default ModalOnBoarding