import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';


const styles = {
    card: {
      minWidth: 275,
      maxWidth: 500,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

function Welcome(props) {
    const { classes } = props;
    return(
        
        <Typography>
            <Grid
        container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center">
            <h1>Welcome to <i>placeholder</i>!</h1>
            <h2>Your personal organizer, event planner, and calendar tracker!</h2>
            </Grid>
        </Typography>
        
         
    )
};

export default withStyles(styles)(Welcome);