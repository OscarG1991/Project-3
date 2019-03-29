import React from "react";
import Modal from 'react-modal';
import "./style.css";
import API from "../../utils/API";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import grid from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Send from '@material-ui/icons/Send';
import moment from 'moment';


const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: {
      useNextVariants: true,
    },
    overrides: {
      AddEvent: {
        raisedPrimary: {
          color: 'white',
        },
      },
    },
  });

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
    //   marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : 'rgb(219, 219, 219)',
      height                : 'auto',
      width                 : '20%',
      overflow              : "auto",
    },
    overlay: {
        zIndex: 10
      }
  };

Modal.setAppElement('div');

class MyModal extends React.Component {

    state= {
        title: "",
        startDate: "",
        from: undefined,
        to: undefined,
        start: "",
        end: "",
        startSelector: "am",
        endSelector: "am"
    };
    
    // react-modal 
    constructor() {
        super();
    
        this.state = {
          modalIsOpen: false
        };
    
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    afterOpenModal () {
        this.setState({ showModal: true });
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    // react day picker
    static defaultProps = {
        numberOfMonths: 1,
    };
    
    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
        console.log(range.from.toLocaleDateString());
    }
    handleResetClick = () => {
        this.setState(this.setState({from: undefined, to: undefined}));
    }

    // form input handling
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]:value
        });
    }
//Do we want an allDay descriptor?
    handleFormSubmit = event => {
        event.preventDefault();
        console.log("click");
        // if(this.state.title && this.state.startDate && this.state.endDate && this.state.start && this.state.end) {
        //     API.saveEvent({
        //         title: this.state.title,
        //         // startDate: this.state.startDate,
        //         // endDate: this.state.endDate,
        //         start: this.state.startDate + this.state.start,
        //         end: this.state.end
        //     })
        //     .then(res => this.showEvents(res)
        //     .catch(err => console.log(err)));
        // }
        API.saveEvent({
            title: "Lunch",
            start: "Mon Apr 08 2019 08:00:00 GMT-0600 (Mountain Daylight Time)",
            end: "Mon Apr 08 2019 09:00:00 GMT-0600 (Mountain Daylight Time)"
        })
        .then(this.closeModal(), this.showEvents())
        .catch(err => console.log(err));

        if(this.state.startSelector === "pm") {
            var start = parseInt(this.state.start) + 1200;
            var t = start.toString().slice(0, 2) + ':' + start.toString().slice(2,4);
            this.setState({start: t}, ()=> console.log(this.state.start));

        };
    }

    showEvents = () => {
        API.findEvents()
        .then(res => {
            let items = res.data;
            for (let i = 0; i < items.length; i++) {
                items[i].start= moment(items[i].start).toDate();
                items[i].end= moment(items[i].end).toDate();
            }
            this.setState({events: items})    
        })
        .catch(err => console.log(err));
    }

    //Timepicker
    handleChange = (event) => {
        var option = event.currentTarget.value;
        this.setState({start: option},() => console.log(this.state.start));
    }
    handleTime = (e, event) => {
       var selection = event.currentTarget.value;

       if(e === "start") {
           this.setState({startSelector: selection});
           console.log(this.state.startSelector);
       } else {
            this.setState({endSelector: selection});
            console.log(this.state.endSelector);
       }
    }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        
        return(
            <div>
                
            <MuiThemeProvider theme={theme}>
                <Fab 
                color="primary"  
                variant="extended" 
                type="submit" 
                name="AddEvent" 
                style={{ 
                    color: "white",
                    margin: "1vh" }}
                    onClick={this.openModal}>
                    <AddIcon />Add Event
                </Fab>
            </MuiThemeProvider>

            
            
            {/* <button type="submit" onClick={this.openModal}>Add Event</button> */}

              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <span className="close" onClick={this.closeModal}>&times;</span>
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center">
                <form>
                    <TextField
                    //  required
                     id="outlined-name"
                     label="Event"
                     value={this.state.title}
                     onChange={this.handleInputChange}
                     name="event-title"
                     placeholder="What're You Doing?"
                     margin = "normal"
                     variant="outlined"
                     />
                    {/* <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Event"
                    /> */}
                    <div className="day-pick">
                        <p>
                        {!from && !to && 'Please select the first day.'}
                        {from && !to && 'Please select the last day.'}
                        {from &&
                            to &&
                            `Selected from ${from.toLocaleDateString()} to
                                ${to.toLocaleDateString()}`}{' '}
                        {from &&
                            to && (
                            <button className="link" onClick={this.handleResetClick}>
                                Reset
                            </button>
                            )}
                        </p>
                        <DayPicker
                            className="Selectable"
                            numberOfMonths={this.props.numberOfMonths}
                            selectedDays={[from, { from, to }]}
                            modifiers={modifiers}
                            onDayClick={this.handleDayClick}
                        />
                    </div>
                    {/* Timepicker code */}
                    <select name="startTime" id="startTime"
                        defaultValue={this.state.start}
                        onChange={this.handleChange}
                        >
                        <option value="1200">12:00</option>
                        <option value="1230">12:30</option>
                        <option value="0100">1:00</option>
                        <option value="0130">1:30</option>
                        <option value="0200">2:00</option>
                        <option value="0230">2:30</option>
                        <option value="0300">3:00</option>
                        <option value="0330">3:30</option>
                        <option value="0400">4:00</option>
                        <option value="0430">4:30</option>
                        <option value="0500">5:00</option>
                        <option value="0530">5:30</option>
                        <option value="0600">6:00</option>
                        <option value="0630">6:30</option>
                        <option value="0700">7:00</option>
                        <option value="0730">7:30</option>
                        <option value="0800">8:00</option>
                        <option value="0830">8:30</option>
                        <option value="0900">9:00</option>
                        <option value="0930">9:30</option>
                        <option value="1000">10:00</option>
                        <option value="1030">10:30</option>
                        <option value="1100">11:00</option>
                        <option value="1130">11:30</option>
                    </select>
                    <select name="timeSelectStart"
                        onChange={(e) => this.handleTime('start', e)}
                        >
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>

                    {/* <label for="endTime">End:</label> */}
                    <select name="endTime" id="endTime">
                        <option value="1200">12:00</option>
                        <option value="1230">12:30</option>
                        <option value="0100">1:00</option>
                        <option value="0130">1:30</option>
                        <option value="0200">2:00</option>
                        <option value="0230">2:30</option>
                        <option value="0300">3:00</option>
                        <option value="0330">3:30</option>
                        <option value="0400">4:00</option>
                        <option value="0430">4:30</option>
                        <option value="0500">5:00</option>
                        <option value="0530">5:30</option>
                        <option value="0600">6:00</option>
                        <option value="0630">6:30</option>
                        <option value="0700">7:00</option>
                        <option value="0730">7:30</option>
                        <option value="0800">8:00</option>
                        <option value="0830">8:30</option>
                        <option value="0900">9:00</option>
                        <option value="0930">9:30</option>
                        <option value="1000">10:00</option>
                        <option value="1030">10:30</option>
                        <option value="1100">11:00</option>
                        <option value="1130">11:30</option>
                    </select>
                    <select name="timeSelectEnd"
                        onChange={(e) => this.handleTime('end', e)}
                        >
                        <option value="am">AM</option>
                        <option value="pm">PM</option>

                    </select>
                </form>
                {/* <button type="submit" onClick={this.handleFormSubmit}>Create Event</button> */}
                {/* <MuiThemeProvider theme={theme}>
                    <Fab
                      color="primary"  
                      variant="extended" 
                      type="submit"
                      name="AddEvent"
                      style={{ 
                        color: "white",
                        margin: "1vh"}}
                    onClick={this.handleFormSubmit}>
                        <Send style={{padding: "1vh"}}/> Create Event
                    </Fab>
                </MuiThemeProvider> */}
                <MuiThemeProvider theme={theme}>
                    <Button
                      color="primary"  
                      variant="contained" 
                      type="submit"
                      name="AddEvent"
                      style={{ 
                        color: "white",
                        margin: "1vh"}}
                    onClick={this.handleFormSubmit}>
                        <Send style={{padding: "1vh"}}/> Create Event
                    </Button>
                </MuiThemeProvider>
                </Grid>    
            </Modal>
            
            </div>
        );
    }
}

export default MyModal;