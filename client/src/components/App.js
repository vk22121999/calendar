import agent from '../agent';
import React from 'react';
import { connect } from 'react-redux';
import { ALERT_HIDE, APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import MainPage from '../components/MainPage';
import { store } from '../store';
import { push } from 'connected-react-router';
import PrivateRoute from "../utils/PrivateRoute";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, LinearProgress } from '@material-ui/core';
import Reigister from './Reigister';
import AlertComponent from "./Alert"

const mapStateToProps = state => {
  return {
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
    appLoaded:state.common.appLoaded,
    error:state.common.error,
    message:state.common.message
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onAlertHide:() =>
  dispatch({type:ALERT_HIDE}),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});
const theme = createMuiTheme({

    typography:{
        fontFamily: 'Quicksand, sans-serif'
    }
})

class App extends React.Component {
    constructor(props)
    {   super()
        this.state = {}
    }

  
    static getDerivedStateFromProps(nextProps,prevState) {
    if (nextProps.redirectTo) {
     
      store.dispatch(push(nextProps.redirectTo))
      nextProps.onRedirect()
    
    }
    return null
    
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');

    if (token) {
      agent.setToken(token);
      
    }

    this.props.onLoad(token ?agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
          <ThemeProvider theme={theme}>
        <div onClick={e=>{ if(this.props.error!==null) this.props.onAlertHide() }}>
        <AlertComponent error={this.props.error} message={this.props.message} />
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/register" component={Reigister}/>
            <PrivateRoute path="/home" component={Home} />
         
            </Switch>
        </div>
        </ThemeProvider>
       
      );
    }
    else
    {
      return (
        <LinearProgress/>
      );
    }
  
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
