import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "../App.css";
import API from "../utils/API";
import MyModal from "./Modal";

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
        console.log(moment('2019-03-25T13:00:00').toDate());
        this.runCalendar();
    }

    show() {
        this.setState({showModal: true});

    };

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

    handleSelectEvent(event, target) {
        console.log(event);
    }

    render() {
        return(
            <div className="container">
            <MyModal className="ReactModalPortal" />
                <BigCalendar
                localizer={localizer}
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
                defaultView={'month'}
                views={['day','week','month']}
                onSelectEvent = {this.handleSelectEvent}
                />
            </div>
        )
    }
}

export default Calendar;

//store in UNIX timestamp, UTC time
