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
        endDate: "",
        from: undefined,
        to: undefined,
        start: "",
        end: "",
    };
    
    // react-modal 
    constructor() {
        super();
    
        this.state = {
          modalIsOpen: false
        };

        this.startTime = React.createRef();
        this.endTime = React.createRef();
        this.startSelector = React.createRef();
        this.endSelector = React.createRef();

    }

    afterOpenModal = () => {
        this.setState({ showModal: true });
    }
    openModal = () =>  {
        this.setState({ modalIsOpen: true });
    }
    closeModal = () => {
        this.setState({ modalIsOpen: false });
        //window.location.reload(); 
    }

    // react day picker
    static defaultProps = {
        numberOfMonths: 1,
    };
    
    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
        // console.log(range.from.toLocaleDateString());
        const newFrom = moment(range.from).format("YYYY-MM-DD");
        const newTo = moment(range.to).format("YYYY-MM-DD");
        this.setState({ startDate: newFrom },() => console.log(this.state.startDate));
        this.setState({ endDate: newTo },() => console.log(this.state.endDate));

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

        // API.saveEvent({
        //     title: "Lunch",
        //     start: "Mon Apr 08 2019 08:00:00 GMT-0600 (Mountain Daylight Time)",
        //     end: "Mon Apr 08 2019 09:00:00 GMT-0600 (Mountain Daylight Time)"
        // })
        // .then(this.closeModal(), this.showEvents())
        // .catch(err => console.log(err));

        this.formatTime();

        
    }

    // showEvents = () => {
    //     API.findEvents()
    //     .then(res => {
    //         let items = res.data;
    //         for (let i = 0; i < items.length; i++) {
    //             items[i].start= moment(items[i].start).toDate();
    //             items[i].end= moment(items[i].end).toDate();
    //         }
    //         this.setState({events: items})   
    //     })
    //     .catch(err => console.log(err));
    // }

    //Timepicker
    formatTime = () => {
        let st;
        let et;
        if(this.startSelector.current.value === "pm") {
            st = moment(this.startTime.current.value + ' pm', 'hh:mm a').format('HH:mm');
        } else {
            st = moment(this.startTime.current.value + ' am', 'hh:mm a').format('HH:mm');
        };
        
        if(this.endSelector.current.value === "pm") {
            console.log("test");
            et = moment(this.endTime.current.value + ' pm', 'hh:mm a').format('HH:mm');
        } else {
            et = moment(this.endTime.current.value + ' am', 'hh:mm a').format('HH:mm');
        };
        
        let e = {
            title: this.state.title,
            start: this.state.startDate + "T" + st,
            end: this.state.endDate + "T" + et,
        };
        console.log(e);

        if(this.state.title && this.state.startDate && this.state.endDate && st && et) {
            if(st >= et) {
                console.log("choose later time")
            }else{
                API.saveEvent({
                    title: this.state.title,
                    start: this.state.startDate + "T" + st,
                    end: this.state.endDate + "T" + et
                })
                .then(this.closeModal())
                .catch(err => console.log(err));
            }
        }else{
            console.log("error");
        }
    };

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        
        return(
            <div>
                
            {/* <MuiThemeProvider theme={theme}>
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
            </MuiThemeProvider> */}

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
                     value={this.state.title || ""}
                     onChange={this.handleInputChange}
                     name="title"
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
                        defaultValue={this.state.startTime}
                        ref={this.startTime}
                        >
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="01:00">1:00</option>
                        <option value="01:30">1:30</option>
                        <option value="02:00">2:00</option>
                        <option value="02:30">2:30</option>
                        <option value="03:00">3:00</option>
                        <option value="03:30">3:30</option>
                        <option value="04:00">4:00</option>
                        <option value="04:30">4:30</option>
                        <option value="05:00">5:00</option>
                        <option value="05:30">5:30</option>
                        <option value="06:00">6:00</option>
                        <option value="06:30">6:30</option>
                        <option value="07:00">7:00</option>
                        <option value="07:30">7:30</option>
                        <option value="08:00">8:00</option>
                        <option value="08:30">8:30</option>
                        <option value="09:00">9:00</option>
                        <option value="09:30">9:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                    </select>
                    <select name="timeSelectStart"
                        ref={this.startSelector}
                        >
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>

                    {/* <label for="endTime">End:</label> */}
                    <select name="endTime" id="endTime"

                        ref={this.endTime}
                        >
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="01:00">1:00</option>
                        <option value="01:30">1:30</option>
                        <option value="02:00">2:00</option>
                        <option value="02:30">2:30</option>
                        <option value="03:00">3:00</option>
                        <option value="03:30">3:30</option>
                        <option value="04:00">4:00</option>
                        <option value="04:30">4:30</option>
                        <option value="05:00">5:00</option>
                        <option value="05:30">5:30</option>
                        <option value="06:00">6:00</option>
                        <option value="06:30">6:30</option>
                        <option value="07:00">7:00</option>
                        <option value="07:30">7:30</option>
                        <option value="08:00">8:00</option>
                        <option value="08:30">8:30</option>
                        <option value="09:00">9:00</option>
                        <option value="09:30">9:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                    </select>
                    <select name="timeSelectEnd"
                        ref={this.endSelector}
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