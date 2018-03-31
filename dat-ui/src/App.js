import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { Router } from 'react-router-dom'
import AddUser from './user/AddUser'
import AppBar from 'material-ui/AppBar';

const history = createHistory({ basename: '/' })

class App extends Component {
  render() {
    return (
        <Router history={history}>
          <MuiThemeProvider>
            <div width="100%" height="100%">
            <AppBar title="Dat App" />
                <div>
                  <Route path="/" component={AddUser}/>
                </div>
            </div>
          </MuiThemeProvider>
        </Router>
    );
  }
}

export default App;
  