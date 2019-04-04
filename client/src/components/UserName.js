import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';

export default withAuth(class UserName extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      authenticated: null,
      user: null
       };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      const user = await this.props.auth.getUser();
      this.setState({ authenticated, user });
      sessionStorage.setItem('user', user.sub);
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
    
  }

  render() {
    const { user } = this.state;
    return(
        <div>
            Hello, {user && user.name}!
        </div>
    );
    
}});