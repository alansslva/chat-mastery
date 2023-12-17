import { AvatarRepository } from "@/Repositories/avatar.repository";
import { useEffect, useState } from "react";
import {Row, Col, Image} from "react-bootstrap";

const SelectAvatar = (
    {
        onConfirm = () => {},
    } :
    {
        onConfirm: (avatar: string) => void,
    }
) => {

    const [ avatars, setAvatars ] = useState<string[]>([]);
    const [ selectedAvatar, setSelectedAvatar ] = useState<string>('');


    useEffect(() => {
        const avatarRepository = new AvatarRepository();
        setAvatars(avatarRepository.all());
    }, [])

    useEffect(() => {
        if(selectedAvatar !== ''){
            onConfirm(selectedAvatar);
        }
    }, [selectedAvatar])

    return (
        <Row>
            {
                avatars.map((avatar, index) => {
                    return (
                        <Col 
                        onClick={() => setSelectedAvatar(avatar)}  
                        sm={4} 
                        xs={4} 
                        md={4} 

                        key={index}
                        >
                            <Image className={`${selectedAvatar === avatar ? 'avatar-item-selected' : 'avatar-item'}`} src={avatar} alt="" fluid />
                        </Col>
                    )
                })
            }
        </Row>
    )


};

export default SelectAvatar;