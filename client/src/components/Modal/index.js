import React from "react";
import Modal from 'react-modal';
import "./style.css";
import API from "../../utils/API";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : 'rgb(219, 219, 219)',
      height                : '70%',
      width                 : '30%',
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
        end: "",
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

    handleFormSubmit = event => {
        event.preventDefault();
        if(this.state.title && this.state.startDate && this.state.endDate && this.state.start && this.state.end) {
            API.saveEvent({
                title: this.state.title,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                start: this.state.startDate + this.state.start,
                end: this.state.end
            })
            .then(res => this.showEvents()
            .catch(err => console.log(err)));
        }
    }

    showEvents = () => {
        // retrieve events from mongo
        // push to events array 
        // return this.setState({events: events})
    }
    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        
        return(
            <div>
            <button type="submit" onClick={this.openModal}>Add Event</button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <span className="close" onClick={this.closeModal}>&times;</span>
                <form>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Event"
                    />
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
                </form>
                <button type="submit" onClick={this.handleFormSubmit}>Create Event</button>
            </Modal>
            </div>
        );
    }
}

export default MyModal;