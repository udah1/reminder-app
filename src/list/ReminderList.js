import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import ReminderListItem from './ReminderListItem'

export default ({reminders, deleteItem, toggleItem}) => {
    return (
        <div>
            <ListGroup open="1">
                {reminders.map((item, key) => {
                    const time = new Date(item.time);
                    const isPast = new Date() > time;
                    return (
                        <ListGroupItem
                            key={key}
                            className={isPast ? 'disabled-list-item' : ''}
                        >
                            <ListGroupItemHeading className={`fw-bold ${!item.isActive ? 'text-disabled' : ''}`}>
                                {item.title}
                            </ListGroupItemHeading>

                            <ReminderListItem item={item} deleteItem={deleteItem} toggleItem={toggleItem} />

                        </ListGroupItem >
                    )
                })}
            </ListGroup>
        </div>
    );
}