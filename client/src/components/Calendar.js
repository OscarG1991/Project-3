import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "../App.css";
import API from "../utils/API";
//import MyModal from "./Modal";
import ButtonAppBar from '../components/AppBar';
import AddEvent from '../components/AddEvent';
import EditEvent from '../components/EditEvent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CustomToolbar from '../components/CustomToolbar';

const localizer = BigCalendar.momentLocalizer(moment);


class Calendar extends Component {
    state = {
        events: [],
        showModal: false,
        openAdd: false,
        openEdit: false,
        title: "",
        id:"",
        sTime: "",
        eTime: ""
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
        this.runCalendar();
    }

    runCalendar = () => {
        let newArr = []
        API.findEvents()
        .then(res => {
            setTimeout(() => {
                   if( window.localStorage )
  {
    if( !localStorage.getItem( 'firstLoad' ) )
    {
      localStorage[ 'firstLoad' ] = true;
      window.location.reload();
    }  

    else
      localStorage.removeItem( 'firstLoad' );
  }
            }, 500);
            let items = res.data;
            let userSub = sessionStorage.getItem('user');
            for (let i = 0; i < items.length; i++) {
                items[i].start= moment(items[i].start).toDate();
                items[i].end= moment(items[i].end).toDate();
                if (userSub === items[i].sub) {
                    newArr.push(items[i])
                }
            }
            this.setState({events: newArr})
            console.log(this.state.events);    
        })
        .catch(err => console.log(err));

    }


    handleSelectEvent = (event, target) => {
        console.log(event);
        this.setState({ id:event._id, sTime:event.start, eTime:event.end });
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
                    sTime = {this.state.sTime}
                    eTime = {this.state.eTime}
                    
                />
            </div>
        )
    }
}

export default Calendar;

//store in UNIX timestamp, UTC time
