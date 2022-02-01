import React from 'react';
import { Button } from 'reactstrap';

export default ({addItem}) => {
    return (
        <Button color="primary" className="add-reminder-button" onClick={() => addItem({title: 'new', description: 'description of new'})}>
            Add a reminder
        </Button>
    );
}