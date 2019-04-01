import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      authenticated: null,
      user: null
       };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      const user = await this.props.auth.getUser();
      this.setState({ authenticated, user });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/Calendar' after login
    this.props.auth.login('/Calendar');
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }

  render() {
    // const { user } = this.state;
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ?
    
    <Button 
    color="inherit"
    variant="outlined"
    onClick={this.logout}>
      <Typography 
        style={{ textTransform: "none", color: "white" }}>
          Logout
      </Typography>
    </Button>
    
    :

    <Button 
      variant="contained" 
      fullWidth
      color="primary" 
      style={{ margin: "1vh" }} 
      onClick={this.login}>
        Sign In
    </Button>;
    
  }
});