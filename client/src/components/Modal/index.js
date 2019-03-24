import React from "react";
import Modal from 'react-modal';
import "./style.css";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : 'rgba(76, 87, 104, 1.0)'
    }
  };

Modal.setAppElement('body');

class MyModal extends React.Component {

    state= {
        title: "",
        date: "",
        start: "",
        end: "",
    };
    
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]:value
        });
    }
    handleFormSubmit = event => {
        event.preventDefault();
        this.showEvents();
    }
     
    showEvents = () => {
        // retrieve events from mongo
        // push to events array 
        // return this.setState({events: events})
    }
    render() {
        
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
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Event"
                    />
                    <input
                        value={this.state.startDate}
                        onChange={this.handleInputChange}
                        name="startDate"
                        placeholder="YYYY-MM-DD"
                    />
                    <input
                        value={this.state.endDate}
                        onChange={this.handleInputChange}
                        name="endDate"
                        placeholder="YYYY-MM-DD"
                    />
                    <input
                        value={this.state.start}
                        onChange={this.handleInputChange}
                        name="start"
                        placeholder="Start (00:00)"
                    />
                    <input
                        value={this.state.end}
                        onChange={this.handleInputChange}
                        name="end"
                        placeholder="End (00:00)"
                    />
                </form>
                <button type="submit" onClick={this.handleFormSubmit}>Create Event</button>
            </Modal>
            </div>
        );
    }
}

export default MyModal;