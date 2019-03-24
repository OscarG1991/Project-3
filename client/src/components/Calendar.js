import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "../App.css";
import API from "../utils/API";

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
        this.runCalendar();
    }

    runCalendar = () => {
        API.findEvents()
        .then(res => {
            let item = {
                title: res.data[0].title,
                allDay: res.data[0].allDay,
                start: moment(res.data[0].startDate).toDate(),
                end: moment(res.data[0].endDate).toDate()
            }
            this.setState({ events: [ item ] })
        })
        // .then(res => {
        //     console.log(res.data)
        // })
        .catch(err => console.log(err));
    }

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
