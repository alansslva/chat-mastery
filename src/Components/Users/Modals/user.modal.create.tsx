import { Modal } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { UserInterface } from "@/types"
import { ResourceService } from "@/Services/resources.service"
import { useState } from "react"
import { UserProvider } from "@/Providers/user.provider"


export default function ModalCreateUsers(
    {
        show = false,
        onLoggin = () => {},
        handleClose = () => {},
        handleReturn = () => {}
    } :
    {
        show: boolean,
        onLoggin: (data: any) => void,
        handleClose: () => void,
        handleReturn: () => void
    }
) {
    const images = ResourceService.getAvatarImages();
    const [ selectedImage, setSelectedImage ] = useState<string>('');
    const [ name, setName ] = useState<string>('');
    const userProvider = new UserProvider();

    const createUser = () => {


        if(!name || !selectedImage) {
            alert('Por favor, preencha todos os campos')
            return;
        }

        const user = userProvider.getFactory().createWithNameAndAvatar(name, selectedImage);
        userProvider.getService().save(user);
        onLoggin({
          user: user,
        });
        handleClose();
    }


    return (
        <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Ainda não tenho usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">

          <p>
            Não tem problema, vamos criar o seu usuário agora, são apenas 2 passos, por favor, digite o nome pelo qual quer ser chamado e escolha um dos avatares
          </p>
          <small>Você pode alterar estes dados posteriormente</small>
            <div className="row">
              <div className="col-12">
                <div className="form-group mt-4">
                  <input 
                  type="text" 
                  className="form-control" 
                  placeholder='Insira o nome pelo qual quer ser chamado'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                   />
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="row">
                  <p className="text-center">Selecione o seu Avatar:</p>
                {images.map((src, index) => (
                 <div key={index} className="col-4">
                    <Card className='mb-1'>
                      <Card.Img variant="top" src={src} onClick={() => setSelectedImage(src)} />
                    </Card>
                  </div>
                ))}
                </div>
              </div>
             
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReturn}>
            Voltar
          </Button>
          <Button variant="primary" onClick={createUser}>
            Criar meu usuário e entrar no chat
          </Button>
        </Modal.Footer>
      </Modal>
    )
}