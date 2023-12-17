import { Modal } from "react-bootstrap"
import { useEffect, useState } from "react";
import { UserInterface } from "@/types";
import { UserProvider } from "@/Providers/user.provider";

const ModalSelectUser = (
    {
        show = false,
        handleReturn = () => {},
        handleClose = () => {},
        onSelect = () => {},
        withChatName = false,
        withoutMe = false,
        user_id = 0
    } :
    {
        show: boolean;
        handleReturn: () => void;
        handleClose: () => void;
        onSelect: (data: any ) => void;
        withChatName?: boolean;
        withoutMe?: boolean;
        user_id?: number;
    }
) => {

    const [ users, setUsers ] = useState<UserInterface[]>([]);
    const [name, setName] = useState<string>('');
    const userProvider : UserProvider = new UserProvider();



    const login = (user: UserInterface) => {
        if(withChatName){
            if(name === '') {
                alert('Digite o nome do chat');
                return;
            }
        }
        onSelect({
            user,
            name
        });
        handleClose();
    }


    const updateUserList = () => {
        if(withoutMe) {
            setUsers(userProvider.getService().getUsersWhitoutMe(user_id));
            return;
        }
        setUsers(userProvider.getService().getusers());
    }
    

    useEffect(() => {
        if(withoutMe) {
            setUsers(userProvider.getService().getUsersWhitoutMe(user_id));
            return;
        }
        setUsers(userProvider.getService().getusers());

        window.addEventListener('storage', (ev) => {
            if(withoutMe) {
                setUsers(userProvider.getService().getUsersWhitoutMe(user_id));
                return;
            }
            setUsers(userProvider.getService().getusers());
          } )
        
    }, []);

    return (
        <Modal show={show} onEntered={updateUserList} size="lg">
            <Modal.Header>
                <Modal.Title>Selecione seu usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    {withChatName && (
                        <div className="row mb-5">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="">Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Digite o nome do chat"
                                        value={name}
                                        onChange={(ev) => setName(ev.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        {users.map((user: UserInterface) => (
                            <div key={user.id} onClick={() => login(user)}  className="col-12 col-md-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div  className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title">{user.name}</h5>
                                            <img src={user.avatar} className="img-fluid rounded-circle mr-5" width="50" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleReturn}>Voltar</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalSelectUser;