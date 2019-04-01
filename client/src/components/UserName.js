import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

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
    }
  }

  render() {
    const { user } = this.state;
    return(
        <div>
            Hello, {user && user.name}!
        </div>
    );
    
}});