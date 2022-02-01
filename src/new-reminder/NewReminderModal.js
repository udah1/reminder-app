import React, {useRef, useState} from 'react';
import TimePicker from 'react-time-picker';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form,
    Label, FormGroup, Col, Input, FormFeedback } from 'reactstrap';



export default ({addItem, close}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [clicked, setClicked] = useState(false);

    const getCurrentPlus10Seconds = () => {
        const time = new Date();
        return new Date(time.setSeconds(time.getSeconds() + 15));
    };
    const [time, setTime] = useState(getCurrentPlus10Seconds());

    let titleValid = true;
    let descriptionValid = true;

    const validateAll = () => {
        titleValid = title.length !== 0;
        descriptionValid = description.length !== 0;
        const isTimeValid = time > new Date();

        return titleValid && descriptionValid && isTimeValid;
    };
    const titleRef = useRef();

    const focus = () => {
        titleRef.current && titleRef.current.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClicked(true);
        if (validateAll()) {
            addItem({title, description, time});
            close();
        }
    }
    return (
        <Modal isOpen toggle={close} onOpened={focus}>
            <ModalHeader toggle={close}>
                Add new reminder
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <FormGroup>
                        <Label for="title" sm={2}>
                            Title
                        </Label>
                        <Col sm={10}>
                            <Input
                                innerRef={titleRef}
                                invalid={clicked && title.length === 0}
                                id="title"
                                name="title"
                                placeholder="Reminder title"
                                type="text"
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                            />
                            <FormFeedback>
                                Title is mandatory
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description" sm={2}>
                            Description
                        </Label>
                        <Col sm={10}>
                            <Input
                                invalid={clicked && description.length === 0}
                                id="description"
                                name="description"
                                placeholder="Reminder description"
                                type="text"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                            <FormFeedback>
                                Description is mandatory
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="time" sm={2}>
                            Time
                        </Label>
                        <Col sm={10}>
                            <TimePicker
                                onChange={(time) => {
                                    const hours = time.substring(0,2);
                                    const minutes = time.substring(3,5);
                                    const seconds = time.substring(6,8);
                                    const date = new Date();
                                    date.setHours(hours);
                                    date.setMinutes(minutes);
                                    date.setSeconds(seconds);
                                    setTime(date);
                                }}
                                value={time}
                                format="HH:mm:ss"
                                maxDetail="second"
                            />
                            <span className={clicked && time <= new Date() ? 'is-invalid' : 'aa'} />
                            <FormFeedback>
                                {!time ? 'Time is invalid' : 'Time must be later then right now'}
                            </FormFeedback>
                        </Col>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button
                        type="submit"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Add
                    </Button>
                    {' '}
                    <Button onClick={close}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}
