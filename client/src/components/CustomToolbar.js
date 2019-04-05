import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowForwardIosOutlined from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { Typography, Toolbar } from '@material-ui/core';
import cn from 'classnames';

export let navigate = {
    PREVIOUS: 'PREV',
    NEXT: 'NEXT',
    TODAY: 'TODAY'
}

const styles = {
    toolbarStyle: {
        float: "left",
        width: "100%",
        fontSize: "24px"        
    },
    viewButtons: {
        fontSize: "1.2em",
        textAlign: "center",
        verticalAlign: "center",
        textTransform: "none",
        color: "white",
        backgroundColor: "#4caf50"
    },
    navButtons: {
        fontSize: "1.2em",
        textAlign: "center",
        verticalAlign: "center",
        textTransform: "none",
        color: "white",
        backgroundColor: "#4caf50"
    }

}

class CustomToolbar extends React.Component {    

    render() {

    let { localizer: { messages }, label } = this.props;

    return (
        <Toolbar>
        <div className="rbc-toolbar" style={styles.toolbarStyle}>

            <span className="rbc-btn-group"> 
                <Button
                    style={styles.navButtons} 
                    onClick={this.navigate.bind(null, navigate.PREVIOUS)}
                >
                    <ArrowBackIosOutlined />                    
                </Button>

                <Button 
                    style={styles.navButtons}
                    onClick={this.navigate.bind(null, navigate.TODAY)}
                >
                        Today
                </Button>

                <Button
                    style={styles.navButtons}
                    onClick={this.navigate.bind(null, navigate.NEXT)}
                >
                    <ArrowForwardIosOutlined />
                </Button>
            </span>
        
            <span className="rbc-toolbar-label">
                <Typography variant="h3">
                    { label }
                </Typography>
            </span>
        
            <div className="filter-container">
                <span className="rbc-btn-group" >

                    {this.viewNamesGroup(messages)}

                </span>
            </div>

        </div>
        </Toolbar>
    )
  }

  navigate = action => {
      this.props.onNavigate(action)
  }

  view = view => {
      this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views;
    const view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <Button
          style={styles.viewButtons}
          key={name}
          className={cn({
            active: view === name,
            'btn-primary': view === name
          })}
          onClick={this.view.bind(null, name)}
        >
            {messages[name]}

        </Button>
      ));
    }

  }

};

export default CustomToolbar;