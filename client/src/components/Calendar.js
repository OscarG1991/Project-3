import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "../App.css";
import API from "../utils/API";
import MyModal from "./Modal";
import ButtonAppBar from '../components/AppBar';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    state = {
        events: [
            {
                title: 'Event',
                allDay: false,
                start: moment().toDate(),
                end: moment().add(4, 'hours').toDate()
            },
            {
                title: 'Meeting',
                allDay: false,
                start: moment('2019-03-25T00:00').toDate(),
                end: moment('2019-03-25T00:00').add(4, 'hours').toDate()
            },
            {
                title: 'Meeting',
                allDay: false,
                start: moment('2019-03-25T13:00:00').toDate(),
                end: moment('2019-03-25T13:00:00').add(1, 'hours').toDate()
            }
        ],
        showModal: false
    };

    componentDidMount() {
        this.runCalendar();
        console.log("Hard coded: ", moment('2019-03-25T13:00:00').toDate());
        
    }

    show() {
        this.setState({showModal: true});

    };

    runCalendar = () => {
        API.findEvents()
        .then(res => {
            let items = res.data;
            for (let i = 0; i < items.length; i++) {
                items[i].start= moment(items[i].start).toDate();
                items[i].end= moment(items[i].end).toDate();
            }
            this.setState({events: items})
            console.log(this.state.events);    
        })
        .catch(err => console.log(err));

    }


    render() {
        return(
            <div className="container">
            <ButtonAppBar />
            <MyModal className="ReactModalPortal" />
                <BigCalendar
                localizer={localizer}
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
                defaultView={'month'}
                views={['day','month','week']}
                style={{ margin: '1vh' }}
                />
            </div>
        )
    }
}

export default Calendar;

//store in UNIX timestamp, UTC time
