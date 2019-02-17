import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Confirm from './Confirm';
import { Route, Switch } from 'react-router-dom';
import { redirected } from '../actions/common';
import Header from './Header';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      nextProps.history.push(nextProps.redirectTo);
      nextProps.redirected();
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/confirm" component={Confirm} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    inProgress: state.common.inProgress,
    redirectTo: state.common.redirectTo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    redirected: () => dispatch(redirected())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
