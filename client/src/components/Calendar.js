import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "../App.css";
import API from "../utils/API";
import MyModal from "./Modal";
import ButtonAppBar from '../components/AppBar';
import AddEvent from '../components/AddEvent';
import EditEvent from '../components/EditEvent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CustomToolbar from '../components/CustomToolbar';

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
        showModal: false,
        openAdd: false,
        openEdit: false,
        title: "",
        id:""
        //superprops
    };

    handleClickOpen = () => {
        this.setState({ openAdd: true });
    };
    
    handleClose = () => {
        this.setState({ openAdd: false });
    };
    handleOpenEdit = () => {
        this.setState({ openEdit: true});
    };
    handleCloseEdit = () => {
        this.setState({ openEdit: false});
    }

    componentDidMount() {
        //console.log(moment('2019-03-25T13:00:00').toDate());
        this.runCalendar();
        //console.log("Hard coded: ", moment('2019-03-25T13:00:00').toDate());  
    }

    // show = () => {
    //     this.setState({showModal: true});
    // };


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


    handleSelectEvent = (event, target) => {
        console.log(event);
        this.setState({ id:event._id });
        this.setState({ openEdit: true, title: event.title}, () => console.log(this.state.title));

    }
    eventStyleGetter(event, start, end, isSelected) {
        var backgroundColor = 'green';
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.5,
            color: 'white',
            border: '0px',
            display: 'block',
            margin: '2px',
            textAlign: 'center'
        };

        if (isSelected === true) {
            style.backgroundColor = 'purple';
        };

        return {
            style: style
        };
    };

    render() {
        return(
            <div className="container">
            <ButtonAppBar />
                <Fab 
                color="primary"  
                variant="extended" 
                type="submit" 
                name="AddEvent" 
                style={{ 
                    color: "white",
                    margin: "1vh" }}
                    onClick={this.handleClickOpen}>
                    <AddIcon />Add Event
                </Fab>
                <BigCalendar
                localizer={localizer}
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
                defaultView={'month'}
                views={['day','week','month']}
                onSelectEvent = {this.handleSelectEvent}
                style={{ margin: '1vh' }}
                eventPropGetter={(this.eventStyleGetter)}
                //onUpdate={this.runCalendar}
                components={{
                    toolbar: CustomToolbar 
                }}
                />
                <AddEvent
                    open={this.state.openAdd}
                    handleClose = {this.handleClose}
                />
                <EditEvent
                    open={this.state.openEdit}
                    handleClose = {this.handleCloseEdit}
                    title = {this.state.title}
                    id= {this.state.id}
                    
                />
            </div>
        )
    }
}

export default Calendar;

//store in UNIX timestamp, UTC time
