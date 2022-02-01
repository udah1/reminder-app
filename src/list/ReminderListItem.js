import React, {useState} from 'react';
import {Button} from 'reactstrap';
import Switch from 'react-switch';
import ConfirmDeleteModal from './ConfirmDeleteModal'


export default ({item, deleteItem, toggleItem}) => {
    const [isModalStatus, setModalStatus] = useState(false);
    const time = new Date(item.time);
    const isPast = new Date() > time;

    const toTwoDigits = (str) => {
        return ("0" + str).slice(-2);
    };
    const parseTime = (time) => {
        return `${toTwoDigits(time.getHours())}:${toTwoDigits(time.getMinutes())}:${toTwoDigits(time.getSeconds())}`;
    };

    return (
        <div className="row m-auto" >

            <Switch
                className="col-1"
                onChange={()=> toggleItem(item.id)}
                disabled={isPast}
                checkedHandleIcon={
                    <i className="ps-1 bi bi-alarm"/>
                }
                uncheckedHandleIcon={
                    <i className="ps-1 bi bi-alarm"/>
                }
                checked={item.isActive} />
            <span className={`col-5 ${!item.isActive ? 'text-disabled' : ''} ${isPast ? 'text-decoration-line-through' : ''}`}>
                {item.description}
            </span>
            <span className={`col-5 ${!item.isActive ? 'text-disabled' : ''} ${isPast ? 'text-decoration-line-through' : ''}`}>
                {parseTime(time)}
            </span>
            <span className="col-1">
                <Button color="danger" className="col-6 d-inline-flex justify-content-center btn-block" onClick={() => setModalStatus(true)}>
                    <i className="bi bi-trash" />
                </Button>
            </span>
            {isModalStatus && <ConfirmDeleteModal close={() => setModalStatus(false)} deleteItem={() => deleteItem(item.id)}/>}
        </div>
    );
}