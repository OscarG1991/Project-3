import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Grid from '@material-ui/core/Grid';
import Send from '@material-ui/icons/Send';
import moment from 'moment';
import API from "../../utils/API";

let st;
let et;

export default class EditEvent extends React.Component {
    constructor() {
        super();
    
        this.state = {
            title: "",
            startDate: "",
            endDate: "",
            from: undefined,
            to: undefined,
            start: "",
            end: "",
            sub: ""
        };
        

        this.startTime = React.createRef();
        this.endTime = React.createRef();
        this.startSelector = React.createRef();
        this.endSelector = React.createRef();

    }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  static defaultProps = {
    numberOfMonths: 1,
};

handleDayClick = (day) => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    if(!range.to) {
        range.to = range.from
    }
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
handleFormSubmit = event => {
    event.preventDefault();
    console.log("click");
    this.formatTime();
    if(st < et) {
        this.editEvent();  
        window.location.reload();
    }else{
        console.log("error")
    }
}
handleFormSubmitDelete = event => {
    event.preventDefault();
    console.log("click");
    this.formatTime();
    this.deleteEvent();
    window.location.reload();
}

formatTime = () => {
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
        sub: sessionStorage.getItem('user'),
    };
    console.log(e);

};

addEvent = () => {
    if(this.state.title && this.state.startDate && this.state.endDate && st && et) {
        if(st >= et) {
            console.log("choose later time")
        }else{
            API.saveEvent({
                title: this.state.title,
                start: this.state.startDate + "T" + st,
                end: this.state.endDate + "T" + et
            })
            .then(this.handleClose())
            .catch(err => console.log(err));
        }
    }else{
        console.log("error");
    }
}
editEvent = () => {
    console.log(this.state.title);
    let id = this.props.id;
        if(!this.state.title && !this.state.startDate && !this.state.endDate) {
            API.updateEvent(
                (id),
                {
                    title: this.props.title,
                    start: moment(this.props.sTime).format("YYYY-MM-DD") + "T" + st,
                    end: moment(this.props.eTime).format("YYYY-MM-DD") + "T" + et
                }
            )
            .then(this.handleClose())
            .catch(err => console.log(err)); 
        }else if(!this.state.title){
            API.updateEvent(
                (id),
                {
                    title: this.props.title,
                    start: this.state.startDate + "T" + st,
                    end: this.state.endDate + "T" + et
                }
            )
            .then(this.handleClose())
            .catch(err => console.log(err)); 
        }else if(!this.state.startDate && !this.state.endDate){
            API.updateEvent(
                (id),
                {
                    title: this.state.title,
                    start: moment(this.props.sTime).format("YYYY-MM-DD") + "T" + st,
                    end: moment(this.props.eTime).format("YYYY-MM-DD") + "T" + et
                }
            )
            .then(this.handleClose())
            .catch(err => console.log(err)); 
        }else{
            API.updateEvent(
                (id),
                {
                    title: this.state.title,
                    start: this.state.startDate + "T" + st,
                    end: this.state.endDate + "T" + et,
                    sub: sessionStorage.getItem('user')
                }
            )
            .then(this.handleClose())
            .catch(err => console.log(err)); 
        }
}

deleteEvent = () => {
    console.log(this.props.id);
    let id = this.props.id;
    API.deleteEvent(id)
        .then(this.handleClose())
        .catch(err => console.log(err));
}

onClose = (i) => {
    this.props.handleClose(i);
}
findDate = (from, to, eFrom, eTo) => {
    if(!from && !to) {
        return [eFrom, { eFrom, eTo }];
    }else{
        return [from, {from, to}];
    }
}

  render() {
    const sTime = moment(this.props.sTime).format('hh:mm');
    const sTimeSelector = moment(this.props.sTime).format('hh:mm a');
    let s = sTimeSelector.split(' ')[1];
    const eTime = moment(this.props.eTime).format('hh:mm');
    let eTimeSelector = moment(this.props.eTime).format('hh:mm a');
    let e = eTimeSelector.split(' ')[1];
    const { from, to } = this.state;
    let eFrom = this.props.sTime;
    let eTo = this.props.eTime;
    const modifiers = { start: from, end: to };
    const { classes, open, handleClose } = this.props;
    return (
        <div>
        <Dialog
          open={open}
          onClose={()=> handleClose('cancel')}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          //maxWidth = {'md'}
        >
        <Grid
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        item xs={12}>
        <Grid
            container
            alignItems="center"
            >
            <DialogTitle id="form-dialog-title">Edit Event</DialogTitle>
        </Grid>
        <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                item xs={12}>
                <form>
                    <TextField
                    //  required
                     id="outlined-name"
                     label={this.props.title}
                     value={this.state.title || ""}
                     onChange={this.handleInputChange}
                     name="title"
                     placeholder="What're You Doing?"
                     margin = "normal"
                     variant="outlined"
                     />
                    <div className="day-pick">
                        <p>
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
                            //selectedDays={[from, { from, to }]}
                            selectedDays={this.findDate(from, to, eFrom, eTo)}
                            modifiers={modifiers}
                            onDayClick={this.handleDayClick}
                        />
                    </div>
                    {/* Timepicker code */}
                    <select name="startTime" id="startTime"
                        defaultValue={sTime}
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
                        defaultValue={s}
                        >
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>

                    {/* <label for="endTime">End:</label> */}
                    <select name="endTime" id="endTime"
                        defaultValue={eTime}
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
                        defaultValue={e}
                        >
                        <option value="am">AM</option>
                        <option value="pm">PM</option>

                    </select>
                    </form>
                </Grid>  
                <Grid
                container
                alignItems="center"
                justify="center"
                item xs={12}>
                    <br></br>
                    <Button
                        color="primary"  
                        variant="contained" 
                        type="submit"
                        name="DeleteEvent"
                        style={{ 
                            color: "white",
                            margin: "1vh"}}
                        onClick={this.handleFormSubmitDelete}>
                            <Send style={{padding: "1vh"}}/> Delete Event
                        </Button>
                        <Button
                        color="primary"  
                        variant="contained" 
                        type="submit"
                        name="EditEvent"
                        style={{ 
                            color: "white",
                            margin: "1vh"}}
                        onClick={this.handleFormSubmit}>
                            <Send style={{padding: "1vh"}}/> Edit Event
                        </Button>
                    </Grid>
                </Grid>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </div>
    );
  } 
}
