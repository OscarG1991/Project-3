import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "../App.css";

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    state = {
        events: [
            {
                start: '2019-03-21',
                end: '2019-03-25',
                rendering: 'background',
                color: '#5f91e2',
                name: 'meeting'
            }
        ]
    };

    render() {
        return(
            <div className="container">
            <button type="submit">Add Event</button>
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
