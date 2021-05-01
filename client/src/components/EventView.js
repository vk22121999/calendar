import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {getMinDate,getFormatDate,parseDate,getDiff} from "../utils/dateFormat";
import { Container, Typography,TextField } from '@material-ui/core';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import moment from "moment";
import { EVENT_UPDATE } from '../constants/actionTypes';

import agent from '../agent';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin:"auto",
    width:"40%",
    [theme.breakpoints.down('lg')]: {
      width: "50%",
    
    },
    [theme.breakpoints.down('sm')]: {
      width: "70%",
    
    },
  }, field:{
     
    padding:theme.spacing(1),
  
    margin:8,
    width:"90%",
},
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius:"8px",
    boxShadow: theme.shadows[5],
    height:"fit-content",
    padding: theme.spacing(2, 4, 3),
  },
}));
const mapStateToProps = state => ({

  ...state.home,
  ...state.common
 
});

const mapDispatchToProps = dispatch => ({


  UpdateEvent:(payload) =>
   dispatch({type:EVENT_UPDATE,payload:payload})  
  });

function EventView({event,UpdateEvent}) {


  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isUpdate,setIsUpdate] = useState(false)
  const [startDateError,setStartDateError] = useState("");
  const [endDateError,setEndDateError] = useState("")
  const [eventState,setEvent] = useState({...event,startDate:new Date(event.startDate),endDate:new Date(event.endDate)})
  const [eventPrevState,seteventPrevSate] = useState({...event,startDate:new Date(event.startDate),endDate:new Date(event.endDate)})

  const handleChange = (name,value) =>
  {
    setIsUpdate(true)
   
      if(name==="startDate")
      {  value = new Date(value)
        if(value.getTime()<=new Date().getTime())
        {
          
          setStartDateError("Event start date is not valid")
        }
        else if(eventState.endDate!==""&&value.getTime()>=new Date(eventState.endDate).getTime())
        {
          setStartDateError("Event start date is after end date")
         
        }
        else if(eventState.endDate!==""&&getDiff(value,eventState.endDate)<5)
        {
          
          setEndDateError("Event duration must be greater than 5 minutes")
          
        }
        else
        {
          setStartDateError("")
        }
      

      }
      else if(name==="endDate")
      {
        value = new Date(value)
        if(value.getTime()<=new Date().getTime())
        {
          setEndDateError("Event end date is not valid")
         
        }
        else if(eventState.startDate!==""&&value.getTime()<=new Date(eventState.startDate).getTime())
        {
          setEndDateError("Event end date is before start date")
         
        }
       else if(eventState.startDate!==""&&getDiff(eventState.startDate,value)<5)
        {
          
          setEndDateError("Event duration must be greater than 5 minutes")
          
        }
        else
        {
          setEndDateError("")
        }
     
      }


    
      setEvent({...eventState,[name]:value})
      
      
  }
  const submitForm = () => e =>
  {
      e.preventDefault();
      handleClose();
      
      UpdateEvent(agent.Events.update(eventState))
  } 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" onClick={e=>{ handleOpen() }} color="primary">
          Edit
        </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
       <div className={classes.paper}>
      <Container style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <Typography style={{ padding:"24px"}} variant="h4" color="primary">
            Event Details
          </Typography>
       <Container style={{display:"flex",flexDirection:"row-reverse",alignItems:"center"}} >
        <Button startIcon={<RotateLeftIcon/>}
        onClick={e=>{ 
          if(isUpdate)
          {
            setEvent(eventPrevState);
            setIsUpdate(false)
          }
        }}>
          RESET
        </Button>
       </Container>
          <form noValidate onSubmit={submitForm()} >
          <FormControl className={classes.field}>

<TextField type="text"id="title" name="title" aria-describedby="titleError" label="Title" variant="outlined"
  value={eventState.title}
  onChange={e=>{ handleChange(e.target.name,e.target.value) }}
  color="primary" />
<FormHelperText  id="titleError"></FormHelperText>
</FormControl>
<FormControl className={classes.field}>

<TextField  multiline rows="5" type="text"id="description" aria-describedby="descriptionError" label="Description" variant="outlined"
  color="primary"
  name="description"
  value={eventState.description}
  onChange={e=>{ handleChange(e.target.name,e.target.value) }} />
<FormHelperText  id="descriptionError"></FormHelperText>
</FormControl>
<FormControl className={classes.field}>
<TextField
        id="StartDate"
        label="start of the event"
        type="datetime-local"
        inputProps={{min: getMinDate()}}
        color="primary"
        value={getFormatDate(eventState.startDate)}
        variant="outlined"
        name="startDate"
        error={startDateError !== ""}
        aria-describedby="startDateError"
        onChange={e=>{ handleChange(e.target.name,parseDate(e.target.value)) }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormHelperText  id="startDateError">{startDateError}</FormHelperText>
      </FormControl>
      <FormControl className={classes.field}>
        <TextField
        id="endDate"
        label="end of the event"
        color="primary"
        variant="outlined"
        type="datetime-local"
        name="endDate"
        aria-describedby="endDateError"
        error={endDateError !== ""}
        inputProps={{min: getMinDate()}}
        onChange={e=>{ handleChange(e.target.name,parseDate(e.target.value)) }}
        value={getFormatDate(eventState.endDate)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormHelperText  id="endDateError">{endDateError}</FormHelperText>
      </FormControl>
            <Button 
            className={classes.field}
            disabled={!isUpdate||eventState.title===""||eventState.description===""||eventState.startDate===""||eventState.endDate===""||startDateError!==""||endDateError!==""}
            type="submit" 
            variant="contained" color="primary">
               UPDATE
            </Button>

          </form>
 
      </Container>
    
      </div>
      </Modal>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(EventView)