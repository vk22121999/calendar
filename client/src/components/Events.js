import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';

import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  LOGOUT,
  REDIRECT_TO_MAIN

} from '../constants/actionTypes';


import { Button, Grid,Card, Typography,Container,AppBar,Toolbar, IconButton,List, ListItem,CardActionArea,CardActions,CardContent, CardHeader } from '@material-ui/core';
import moment from 'moment';
import { dirname } from 'path';



const useStyles = theme=>({
 
  mainEvents:{
      
      
      backgroundColor:"#efefef",
      width:"100%",
     height:"60vh",
      borderRadius:"6px",
      padding:0,
      position:"realtive",
    
  },
  headerEvents:{
      width:"100%",
      
      backgroundColor:"lightblue",
      boxShadow:"0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
      borderRadius:"6px",
      borderBottomLeftRadius:0,
      position:"sticky",
      zIndex:1,
      borderBottomRightRadius:0,
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      padding:theme.spacing(2),
      paddingBottom:theme.spacing(1),

  },
  cardContainer:
  {
      width:"100%",
      height:"fit-content",
      padding:theme.spacing(1),
      borderRadius:"4px"
  },
  timeJ:
  {
    backgroundColor:"blue",
    [theme.breakpoints.down('sm')]: {
     
      fontSize:"0.2rem",
   
    },
    [theme.breakpoints.down('lg')]: {
     
      fontSize:"0.5rem",
      backgroundColor:"red"
   
    },

  },
 list:{
    height:"80%",
    overflowY:"auto",
    '&::-webkit-scrollbar': {
       display:"none"
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
      }
 }

})
const getFormatDate = (val) =>
{
  return moment(val).format("Do MMM LT")
}
class Events extends React.Component {
 



  render() {
    const {classes,theme,events} = this.props; 
 return(<Container className={classes.mainEvents
 }>
  <Typography className={classes.headerEvents} variant="div" >
    <Grid conatiner>
        <Grid item>
              
        <Typography variant="body1" color="textSecondary">
        Events
    </Typography>
        </Grid>
        <Grid item>
  
        <Typography variant="body2" color="textPrimary">
      {moment(this.props.currentDate).format("LL")}
    </Typography>
        </Grid>
        </Grid> 
      
  </Typography>
  {events.length===0?
  
  <Container  style={{padding:0,display:"flex",marginTop:"2rem",alignItems:"center",justifyContent:"center",flexDirection:"column-reverse"}}>
    <Typography variant="h4" style={{color:"black",fontWeight:"100",width:"fit-content",padding:0}}>
    No events on this day
  </Typography>
     <img style={{width:"30%",height:"15rem",padding:0,display:"flex",margin:"auto"}} src="/images/noEvents.png"/>
    </Container>
 

  :
  <List className={classes.list}>
      {events.map(item=>{
          return(<ListItem key={item.eventid}>
             <Card className={classes.cardContainer}>
      <CardHeader
    avatar={
        <Avatar variant="rounded" style={{backgroundColor:item.color}} className={classes.avatar}>
          E
        </Avatar>
      }
      title={item.title}
      subheader={
          <Typography noWrap style={{fontSize:"0.9rem",textOverflow:"ellipsis",width:"90%"}} color="textSecondary">
   {getFormatDate(item.startDate)+" - "+getFormatDate(item.endDate)}
          </Typography>
      } 
       
       />
          
    
        <CardContent>
          <Typography variant="body2" style={{ textOverflow:"ellipsis",overflow:"hidden"}} color="textSecondary" >
          {item.description}
          </Typography>
        </CardContent>

      <CardActions style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Button size="small"  color="primary">
          Edit
        </Button>
        <Button startIcon={<DeleteIcon/>} size="small" color="secondary">
          delete
        </Button>
      </CardActions>
    </Card>
          </ListItem>)
      })}
  </List>}
 </Container>)
  }
}

export default withStyles(useStyles, { withTheme: true })(Events);
