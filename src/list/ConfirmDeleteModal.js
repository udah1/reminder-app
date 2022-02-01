import React, {useRef} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form } from 'reactstrap';


export default ({deleteItem, close}) => {
    const approveRef = useRef();

    const focus = () => {
        approveRef.current && approveRef.current.focus();
    };

    return (
        <Modal isOpen toggle={close} onOpened={focus}>
            <ModalHeader toggle={close}>
                Confirm Deletion
            </ModalHeader>
            <Form>
                <ModalBody>
                    Are you sure you want to delete this reminder?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" innerRef={approveRef} onClick={() => {
                        deleteItem();
                        close();
                    }}>
                        Yes
                    </Button>
                    {' '}
                    <Button onClick={close}>
                        No
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}
