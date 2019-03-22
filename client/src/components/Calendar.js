import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "../App.css";

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    state = {
        events: [
            // {
            //     title: 'meeting',
            //     allDay: false,
            //     start: moment('2019-03-25T00:00:00-06:00').toDate(),
            //     end: moment('2019-03-25T00:00:00-06:00').add(4, 'hours').toDate()
            // }
        ]
    };

    componentDidMount() {
        this.findEvents();
    }

    // findEvents = () => {
    //     API.
    // }

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

//store in UNIX timestamp, UTC time
