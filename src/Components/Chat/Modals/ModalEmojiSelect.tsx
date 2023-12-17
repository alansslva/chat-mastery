import { Modal } from "react-bootstrap"
import { EmojiRepository } from "@/Repositories/emoji.repository";
import { useEffect, useState } from "react";

const ModalEmojiSelect = (
    { 
        show = false,
        onSelect = () => {},
        onClose = () => {}
    }
    :
    {
        show: boolean;
        onSelect: Function;
        onClose?: Function;
    }

) => {

    const [ emojis, setEmojis ] = useState<string[]>([])

    const selectEmoji = (emoji: string) => {
        onSelect(emoji)
        onClose()
    }

    useEffect(() => {
        const emojiRepository = new EmojiRepository()
        setEmojis(emojiRepository.all())
    }, [])

    return (
        <Modal show={show} onHide={() => onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Selecione um emoji</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-wrap" style={{cursor: 'pointer'}}>
                    {emojis.map((emoji, index) => (
                        <div key={index} className="m-1" onClick={() => selectEmoji(emoji)}>
                            <span>{emoji}</span>
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalEmojiSelect;