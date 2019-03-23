import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "../App.css";
import MyModal from "./Modal";

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    state = {
        events: [
            {
                // start: '2019-03-19',
                // end: '2019-03-25',
                // rendering: 'background',
                // color: '#5f91e2',
                // name: 'meeting'
                title: 'Event',
                allDay: false,
                start: moment().toDate(),
                end: moment().add(4, 'hours').toDate()
            },
            {
                title: 'Meeting',
                allDay: false,
                start: moment('2019-03-25T00:00:00-06:00').toDate(),
                end: moment('2019-03-25T00:00:00-06:00').add(4, 'hours').toDate()
            },
            {
                title: 'Meeting',
                allDay: false,
                start: moment('2019-03-25T13:00:00-06:00').toDate(),
                end: moment('2019-03-25T13:00:00-06:00').add(1, 'hours').toDate()
            }
        ],
        showModal: false
    };

    show() {
        this.setState({showModal: true});
    };

    render() {
        return(
            <div className="container">
            <MyModal />
                <BigCalendar
                localizer={localizer}
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
                defaultView={'month'}
                views={['day','month']}
                />
            </div>
        )
    }
}

export default Calendar;
