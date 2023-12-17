import { UserProvider } from "@/Providers/user.provider"
import { UserInterface } from "@/types"
import { useEffect, useState } from "react"
import { Col, Row, Card, Container } from "react-bootstrap"

const SelectUser = (
    {
        showMyself = true,
        myId = 0,
        selectAction = () => {},
    } :
    {
        showMyself? : boolean,
        myId?: number,
        selectAction: (user: UserInterface) => void,
    }
) => {

    const userProvider = new UserProvider()
    const [users, setUsers] = useState<UserInterface[]>([])
    const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null)

    useEffect(() => {
        const userService = userProvider.getService()
        const users = userService.getusers()
        setUsers(users)
    }, [])

    useEffect(() => {
        if(!selectedUser) {
            return;
        }
        selectAction(selectedUser)
    }, [selectedUser])


    return (
        <Container>
            <Row>
                {users.map((user) => {
                        if(!showMyself && user.id === myId) {
                            return null;
                        }
                        return (
                            <Col 
                            xs={6} 
                            sm={6}
                            md={4}
                            key={user.id} 
                            onClick={() => setSelectedUser(user)} 
                            className={`mt-2`}
                            >
                            <Card 
                            bg={`${selectedUser?.id === user.id ? 'danger' : 'light'}`}
                            text={`${selectedUser?.id === user.id ? 'white' : 'dark'}`}
                            >
                                <Card.Body>
                                    <Row>
                                        <Col sm={4}>
                                            <img src={user.avatar} alt={user.name} className="img-fluid rounded-circle" />
                                        </Col>
                                        <Col sm={8}>
                                            <p className="text-center mt-2">{user.name}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            </Col>

                        )
                } )}
            </Row>
        </Container>
    )

}

export default SelectUser