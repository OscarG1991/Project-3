import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Welcome from './pages/Welcome';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/');
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ?
    <Card>
      <Button justify="center" variant="contained" size="large" color="Secondary" className=""onClick={this.logout}>Logout</Button>
    </Card> :

    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    > 
    <Card>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: '20px' }}>
      
      <Welcome/>
      <Button variant="contained" size="large" color="primary" style={{ margin: "10px" }} onClick={this.login}>Login</Button>
      <Button variant="contained" size="large" color="primary" style={{ margin: "10px" }} onClick={this.login}>Sign Up</Button>
      </Grid>
    </Card>
    </Grid>;
  }
});