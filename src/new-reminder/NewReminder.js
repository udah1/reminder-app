import React, {useState} from 'react'
import NewReminderModal from './NewReminderModal'
import {Button} from "reactstrap";

export default ({addItem}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <Button color="primary" className="add-reminder-button" onClick={() => {
                setShowModal(true)
            }}>
                Add a reminder
            </Button>

            {showModal &&
                <NewReminderModal addItem={addItem} close={() => setShowModal(false)}/>
            }
        </div>
    )
}