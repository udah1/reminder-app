import React, {Component} from 'react';
import Switch from 'react-switch';
import ReminderAccordion from './list/ReminderAccordion';
import ReminderList from './list/ReminderList';
import NewReminder from './new-reminder/NewReminder';
import ReminderModal from './new-reminder/ReminderModal';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isList: true,
            list: [],
            activeReminders: []
        };
    };

    componentWillMount() {
        try {
            let list = JSON.parse(localStorage.getItem('remindersList')) || this.state.list;
            list = list.map((item) => {
                const ms = (new Date(item.time).getTime() - new Date().getTime());
                if (ms > 0) {
                    item.timeout = setTimeout(() => this.remind(item), ms);
                }
                return item;
            });
            this.setState({list});
        } catch (e) {
            console.error(e);
        }
        try {
            let isList = JSON.parse(localStorage.getItem('isList'));
            if (isList === undefined || isList === null) {
                isList = true;
            }
            this.setState({isList});
        } catch (e) {
            console.error(e);
        }
    }

    remind = (reminder) => {
        if (reminder.isActive) {
            const activeReminders = [...this.state.activeReminders, reminder];
            this.setState({activeReminders});
        }
    };

    addItem = (item) => {
        const origList = this.state.list;
        const id = origList.length > 0 ? origList[origList.length - 1].id + 1 : 1;
        const createdItem = {id, ...item, isActive: true};
        const ms = (createdItem.time.getTime() - new Date().getTime());
        createdItem.timeout = setTimeout(() => this.remind(createdItem), ms);
        const list = [...origList, createdItem];
        this.setState({list});
        localStorage.setItem('remindersList', JSON.stringify(list));
    };

    toggleItem = (id) => {
        const list = this.state.list.map((item) => {
            if (item.id !== id) {
                return item;
            }
            item.isActive = !item.isActive;
            clearTimeout(item.timeout);

            const ms = (new Date(item.time).getTime() - new Date().getTime());
            if (ms > 0) {
                item.timeout = setTimeout(() => this.remind(item), ms);
            }

            return item;
        });
        this.setState({list});
        localStorage.setItem('remindersList', JSON.stringify(list));
    };

    deleteItem = (id) => {
        const toBeDeleted = this.state.list.find(item => item.id === id);
        if (toBeDeleted) {
            clearTimeout(toBeDeleted.timeout);
        }
        const list = this.state.list.filter(item => item.id !== id);
        this.setState({list});
        localStorage.setItem('remindersList', JSON.stringify(list));
    };

    render() {
        const {isList, list = []} = this.state;
        let sortedList = [...list];
        sortedList && sortedList.sort((a, b) => {
            const aTime = new Date(a.time);
            const bTime = new Date(b.time);
            const date = new Date();
            const aPassed = date > aTime;
            const bPassed = date > bTime;

            if (aPassed && !bPassed) {
                return 1;
            }
            if (!aPassed && bPassed) {
                return -1;
            }
            return new Date(a.time) - new Date(b.time);
        });
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">My Reminders</h1>
                    <label>
                        Accordion
                        <Switch
                            className="ps-3 pe-3"
                            onChange={() => {
                                this.setState({isList: !isList});
                                localStorage.setItem('isList', JSON.stringify(!isList));
                            }}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            checked={isList} />
                        List
                    </label>
                </header>
                {isList ?
                    <ReminderList reminders={sortedList} deleteItem={this.deleteItem} toggleItem={this.toggleItem} /> :
                    <ReminderAccordion reminders={sortedList} deleteItem={this.deleteItem} toggleItem={this.toggleItem} />
                }
                <NewReminder addItem={this.addItem} />
                {this.state.activeReminders.map((reminder, key) => {
                    return <ReminderModal
                        key={key}
                        reminder={reminder}
                        close={() => {
                            const activeReminders = this.state.activeReminders.filter((item => item.id !== reminder.id));
                            this.setState({activeReminders});
                        }}
                    />;
                })}
            </div>
        );
    }
}

export default App;
