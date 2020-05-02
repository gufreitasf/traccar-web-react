import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/dashboard' component={DashboardPage} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
