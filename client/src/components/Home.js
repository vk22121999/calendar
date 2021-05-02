import React from 'react';
import agent from '../agent';
import { store } from '../store';
import { connect } from 'react-redux';
import { withStyles} from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  LOGOUT,
  REDIRECT_TO_MAIN,
  SET_CURRENT_DATE

} from '../constants/actionTypes';

import { LinearProgress } from '@material-ui/core';
import { Button, Grid, Typography } from '@material-ui/core';
import ResponsiveDrawer from './ResponsiveDrawer';
import moment from 'moment';
import Events from './Events';
import Calendar from './Calendar';

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
    dispatch({ type: REDIRECT_TO_MAIN}),
  updateCurrentDate:(val)=>
    dispatch({ type:SET_CURRENT_DATE,payload:{val}})
  
});

const useStyles = theme=>({
 
  main:{
      
      padding:theme.spacing(2),
      backgroundColor:"white",
      margin:'auto',
      width:"100%",

  },
  header:{
      width:"100%",
    
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      padding:theme.spacing(1)
  },

  titleContainer:
  {
    display:"flex",
    alignItems:"center",
    
  },
  img:{
    width:"8rem",
    [theme.breakpoints.down('sm')]: {
      width: "8rem",
      
    },
  },
  title:{
    [theme.breakpoints.down('xs')]: {
    display:"none",
      
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "2rem",
      
    },
  }
,
subheader:
{
  
  padding:theme.spacing(1),
  
}
,item:
{
  display:"flex",
  flexDirection:"row-reverse",
  alignItems:"center",
  padding:"8px"

}
,
today:
{  
  
width:"100%",
  [theme.breakpoints.down('sm')]: {
    fontSize: "1rem",
    fontWeight:"700"
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: "0.8rem",
    fontWeight:"900"
    
  },
}

})

class Home extends React.Component {
  

  
 handleCurrentDate = (val) =>
  {
    this.props.updateCurrentDate(val)
  }
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
    const {classes,theme} = this.props; 
    if(this.props.homeLoaded)

      return (
      <Grid className={classes.main} spacing={2} container>
  <Grid className={classes.header} item xs={12} lg={12} sm={12}>
     <Grid className={classes.titleContainer} item xs={3}>
     <img className={classes.img} src="/images/calendar_MainIcon.png" />
      
      <Typography className={classes.title} variant="h3" color="textSecondary">
        Calendar
      </Typography>
       </Grid>

       <Grid className={classes.item}  xs={4} item>
  
     <ResponsiveDrawer/>
      </Grid>
      <Grid className={classes.item} xs={5} item>
      <Button onClick={e=>{ this.props.logout() }} variant="contained" >
        Logout
      </Button>

      </Grid>
    
  

  </Grid>
<Grid  xs={12} lg={12} sm={12}
 item
 className={classes.header}>
 
</Grid>

        <Grid item xs ={12} sm ={12} lg={7}>
        <Calendar events={this.props.events} currentDate={this.props.currentDate} handleCurrentDate={this.handleCurrentDate} />
        </Grid>

        <Grid item xs ={12} sm ={12} lg={5}>
    <Events events={this.props.currentEvents} currentDate={this.props.currentDate} />
        </Grid>

      
    
      </Grid>
    );
    else
        return(
          <LinearProgress/>
        )
  }
}

export default withStyles(useStyles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)));
