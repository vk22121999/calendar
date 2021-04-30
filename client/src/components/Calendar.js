import React, { useEffect, useState } from "react";
import moment from "moment";
import { makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card"
import Container from "@material-ui/core/Container"
import { Button, Grid, IconButton, Typography, useTheme } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const setEventsOnDate = (events,currentDate) =>
{
 return events.filter( i => {

  // console.log("",i.title,new Date(i.startDate).getTime() < currentDate.getTime() &&currentDate.getTime()< new Date(i.endDate).getTime())
  return ((moment(currentDate).isSame(new Date(i.startDate),"day")&& moment(new Date(i.endDate)).isAfter(moment(),"minutes"))
  ||(new Date(i.startDate).getTime() < currentDate.getTime()&&currentDate.getTime()< new Date(i.endDate).getTime())
  )})
  

}
const getWidth = (day,startDate,endDate) =>
{
    if(moment(endDate).isAfter(day,"days"))
    {
        return "100%"
    }
    else
    {
        let diff =moment(endDate).diff(day,"hours")
        if(diff<=23&&diff>=20)
        {
            return "80%"
        }
        if(diff>=13&&diff<=19)
        {
            return "60%"
        }
        if(diff>=7&&diff>=13)
        {
            return "40%"
        }
        return "20%"
    }
}
const useStyles = makeStyles(theme=>({
 
    calendarMainContainer:{
        
        
        backgroundColor:"white",
        width:"100%",
       height:"29.1rem",
        borderRadius:"6px",
        padding:0,
    },
    calendarHeader:
    {
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-around",
        padding:theme.spacing(2),
        backgroundColor:"pink",
      
        height:"3rem"
    },
    calendarDay:
    {
        width:"14.28%",
        textAlign:"center",
        height:"2rem",
        border:"solid 0.5px #efefef",        
        padding:theme.spacing(1)
    },
    calendarDate:
    {
        
        width:"100%",
        borderRadius:0,
        height:"100%",
        
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        border:"solid 0.5px #efefef",        
        padding:0
        
    },
    calendarDateMain:{
        width:"14.28%",
        borderRadius:0,
        textAlign:"right",
        padding:0,
        height:"4rem",
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
    disabled:{
        backgroundColor:"#ffefef"
    }

  
  }))


function Calendar(props)
{   const classes = useStyles();
    const theme = useTheme()
    const value = moment();
    const [calendar,setCalendar] = useState([])
    const [month,setMonth] = useState(moment())
    let startDay = value.clone().startOf("month").startOf("week");
    let endDay = value.clone().endOf("month").endOf("week");
    let day = startDay.clone().subtract(1,"day");
    
    const handlenextMonth = () =>
    {
        const val = month.clone().add(1,"month");
        setMonth(val)
        startDay = val.clone().startOf("month").startOf("week");
        endDay = val.clone().endOf("month").endOf("week");
        day = startDay.clone().subtract(1,"day");
        const calendarTemp = []
        while(day.isBefore(endDay,"day"))
        {
            calendarTemp.push(Array(7).fill(0).map(()=>day.add(1,"day").clone()))
        }
        setCalendar(calendarTemp)
        
      
    }
    const handleprevMonth = () =>
    {
        const val = month.clone().subtract(1,"month");
        setMonth(val)
        startDay = val.clone().startOf("month").startOf("week");
        endDay = val.clone().endOf("month").endOf("week");
        day = startDay.clone().subtract(1,"day");
        const calendarTemp = []
        while(day.isBefore(endDay,"day"))
        {
            calendarTemp.push(Array(7).fill(0).map(()=>day.add(1,"day").clone()))
        }
        setCalendar(calendarTemp)
        
      
    }

    useEffect(() => {
        const calendarTemp = []
        while(day.isBefore(endDay,"day"))
        {
            calendarTemp.push(Array(7).fill(0).map(()=>day.add(1,"day").clone()))
        }
        setCalendar(calendarTemp)
        
      },[]);

       
  
    return(<Card elevation={3} className={classes.calendarMainContainer}>
        <Container className={classes.calendarHeader}>
            <Button size="medium" onClick={e=>{ handleprevMonth()}} color="textPrimary" startIcon={<ArrowBackIcon/>}>

            </Button>
            <Typography variant="body1" color="textPrimary">
            {month.format("MMMM YYYY")}
            </Typography>
            <Button size="medium" onClick={e=>{handlenextMonth()}}  color="textPrimary" startIcon={<ArrowForwardIcon/>}>

            </Button>
        </Container>
      <Container style={{width:"100%",display:"flex",padding:0}} >
          {["sun","mon","tue","wed","thu","fri","sat"].map(i=>{
              return(<Typography className={classes.calendarDay} variant="div" >
                  {i}
                  </Typography>)
          })

          }

      </Container>
      {calendar.map(week=>{
         
            return( <Container style={{width:"100%",display:"flex",padding:0}}>
                     {week.map(day=>{

              return(
              <Button onClick={e=>{ props.handleCurrentDate(day.toDate())}} classes={{label:classes.calendarDate}} 
              disabled={!month.isSame(day,"month")}  className={classes.calendarDateMain} 
              style={{border:moment(props.currentDate).isSame(month,"month")&&day.isSame(moment(props.currentDate),"day")?"solid 2px red":"solid 0.5px #efefef"}} >

                  <Typography style={{width:"100%",textAlign:"right",color:day.isSame(moment(),"day")?"red":"gray",paddingRight:"8px",opacity:month.isSame(day,"month")||day.isSame(moment(),"days")?1:0.3}} variant="body2" color="textSecondary">
                        {day.format("D")}
                  </Typography>
                  <Container style={{padding:0,display:"flex",flexDirection:"column-reverse",height:"4rem",width:"100%"}} >

                 
                  {month.isSame(day,'month')?setEventsOnDate(props.events,day.toDate()).map(i=>{
                       return(<Container style={{width:getWidth(day,i.startDate,i.endDate),flex:1,margin:0,padding:0,backgroundColor:i.color}}>
                           
                       </Container>)
                  }):<span></span>}
                   </Container>
                  </Button>
                  )
          })

          }
                </Container>)
      })

      }
    

    </Card>)
}

export default Calendar;