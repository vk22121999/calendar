import React, { useEffect, useState } from "react";
import moment from "moment";
import { makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { Button, Hidden, Typography, useTheme } from "@material-ui/core";
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
       height:"64vh",
        borderRadius:"6px",
        padding:0,
        [theme.breakpoints.down('xs')]: {
       
            height:"fit-content"
         
          },
    },
    calendarHeader:
    {
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-around",
        padding:theme.spacing(2),
        backgroundColor:"pink",
      
        height:"6vh"
    },
    calendarDay:
    {
        width:"14.28%",
        textAlign:"center",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"4vh",
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
    buttonLabelMobile:{
        minWidth:"15vh",height:"15vh",
        display:"flex",
        padding:"2px",
        flexDirection:"column",
        border:"solid 0.5px #efefef",        

    },
    calendarDateMain:{
        width:"14.28%",
        borderRadius:0,
        textAlign:"right",
        padding:0,
        height:"9vh",
    },
   calendarDateMainMobile:{
    padding:theme.spacing(1),overflowY:"auto",display:"flex",backgroundColor:"#efefef",height:"fit-content",
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
        <Hidden 
        xsDown
        >

      <Container style={{width:"100%",display:"flex",padding:0}} >
          {["sun","mon","tue","wed","thu","fri","sat"].map(i=>{
              return(<Typography className={classes.calendarDay}>
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
                       return(<Container style={{
                         boxShadow:"0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                        maxHeight:"14px",
                           width:getWidth(day,i.startDate,i.endDate),flex:1,margin:0,padding:0,backgroundColor:i.color}}>
                           
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
          </Hidden>        

        <Hidden smUp>
            <Container className={classes.calendarDateMainMobile}>

        {calendar.map(week=>{
         
         return( 
                  week.map(day=>{
        if(month.isSame(day,"month"))
                return(
           <Button onClick={e=>{ props.handleCurrentDate(day.toDate())}}
           classes={{label:classes.buttonLabelMobile}} 
           style={{minWidth:"15vh",height:"15vh",textAlign:"right",padding:0,
           display:"flex",flexDirection:"column",
           padding:"2px",
           margin:"8px",
           backgroundColor:"white", boxShadow:"0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
               border:moment(props.currentDate).isSame(month,"month")&&day.isSame(moment(props.currentDate),"day")?"solid 2px red":"solid 1px #efefef"}} >

               <Typography style={{textAlign:"right",paddingRight:"10px",width:"95%",flex:1,color:day.isSame(moment(),"day")?"red":"gray",opacity:month.isSame(day,"month")||day.isSame(moment(),"days")?1:0.3}} variant="body2" color="textSecondary">
                     {day.format("D")}
               </Typography>
               <Container style={{padding:0,display:"flex",flexDirection:"column-reverse",flex:2,margin:0}} >
               {props.events&&setEventsOnDate(props.events,day.toDate()).map(i=>{
                       return(<Container style={{
                           maxHeight:"8px",
                        boxShadow:"0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                           width:getWidth(day,i.startDate,i.endDate),flex:1,margin:0,padding:0,backgroundColor:i.color}}>
                           
                       </Container>)
                })
                }
               </Container>
               </Button>
               )
       })

       
            )
   })

   }
                   
                   </Container>
        </Hidden>

    </Card>)
}

export default Calendar;