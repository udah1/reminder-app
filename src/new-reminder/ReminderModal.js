import React, {useRef} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form } from 'reactstrap';

export default ({reminder, close}) => {
    const approveRef = useRef();

    const focus = () => {
        approveRef.current && approveRef.current.focus();
    };
    return (
        <Modal isOpen toggle={close} onOpened={focus}>
            <ModalHeader toggle={close}>
                {reminder.title}
            </ModalHeader>
            <Form>
                <ModalBody>
                    {reminder.description}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" innerRef={approveRef} onClick={close}>
                        OK
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}
