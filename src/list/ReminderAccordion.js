import React, {useState} from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody} from 'reactstrap';
import ReminderListItem from './ReminderListItem'


export default ({reminders, deleteItem, toggleItem}) => {
    const [current, setCurrent] = useState();
    return (
        <div>
            <Accordion
                open={`${current}`}
                toggle={(item) => {current === item ? setCurrent() : setCurrent(item)}}
            >
                {reminders.map((item) => {
                    const time = new Date(item.time);
                    const isPast = new Date() > time;
                    return (
                        <AccordionItem key={item.id}>
                            <AccordionHeader targetId={`${item.id}`} className={isPast ? 'disabled-list-item' : ''}>
                                <span className={`fw-bold ${!item.isActive ? 'text-disabled' : ''}`}>{item.title}</span>
                            </AccordionHeader>
                            <AccordionBody accordionId={`${item.id}`}>
                                <ReminderListItem item={item} deleteItem={deleteItem} toggleItem={toggleItem}/>
                            </AccordionBody>
                            <div className="separator" />
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    );
}