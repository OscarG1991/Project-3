import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
// import Home from './Home';
import Calendar from './components/Calendar';
import SignIn from './components/HomePage';

const config = {
  issuer: 'https://dev-374171.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oacmx3xfVfi8nOvn356'
}

class App extends Component {
  
  render() {
    return (
      <Router>
        <Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
        >
          <Route path='/home' exact={true} component={SignIn}/>
          <Route path='/implicit/callback' component={ImplicitCallback}/>
          <SecureRoute exact path="/calendar" component={Calendar} />
          {/* <Route path='/Home' component={SignIn} /> */}
        </Security>
      </Router>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
