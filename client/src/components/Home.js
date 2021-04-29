import React from 'react';
import agent from '../agent';
import { store } from '../store';
import { connect } from 'react-redux';

import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  LOGOUT,
  REDIRECT_TO_MAIN

} from '../constants/actionTypes';

import { push } from 'connected-react-router';
import { Button, Grid } from '@material-ui/core';
import ResponsiveDrawer from './ResponsiveDrawer';

const mapStateToProps = state => ({
  ...state.home,
  ...state.common,
 
});

const mapDispatchToProps = dispatch => ({

  onLoad: (payload) =>
    dispatch({ type: HOME_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED }),
  logout:()=>
  dispatch({type:LOGOUT})  ,
  backtoMain:() =>
    dispatch({ type: REDIRECT_TO_MAIN})
});

class Home extends React.Component {
  componentDidMount() {

    if(this.props.token===null)
    {
       this.props.backtoMain();
    }
   else{
     agent.setToken(this.props.token)
    this.props.onLoad(agent.Events.all());
   }
    
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="">
  

        
     
        <Button onClick={e=>{ this.props.logout() }} variant="contained" >
        Logout
      </Button>
        <ResponsiveDrawer/>
    
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
