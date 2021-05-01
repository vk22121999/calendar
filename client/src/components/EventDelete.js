import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Container, Typography,TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";
import { EVENT_DELETE } from '../constants/actionTypes';
import agent from '../agent';

const getFormatDate = (val) =>
{
  return moment(val).format("Do MMM LT")
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    margin:"auto"
  },
  paper: {
    backgroundColor: "white",
    width:"35%",
    borderRadius:"6px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const mapStateToProps = state => ({

    ...state.home,
    ...state.common
   
  });
  
  const mapDispatchToProps = dispatch => ({
  
  
    deleteEvent:(payload) =>
     dispatch({type:EVENT_DELETE,payload:payload})  
    });

function EventDelete({event,deleteEvent}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = () =>
  {
      setOpen(false);
      deleteEvent(agent.Events.del(event.eventid))
  }

  return (
    <div>
         <Button startIcon={<DeleteIcon/>} onClick={e=>{ handleOpen()}} size="small" color="secondary">
          delete
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
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{event.title}</h2>
            <p id="transition-modal-description">{getFormatDate(event.startDate)+" - "+getFormatDate(event.endDate)}</p>
            <h3 style={{fontWeight:"400",color:"red"}}>
            Are you sure on deleting this event ?
            </h3>
            <div style={{display:"flex",width:"100%",padding:"16px",alignItems:"center",justifyContent:"space-between"}}>
                <Button color="primary" onClick={e=>{ handleClose()}} variant="contained">
                    Cancel
                </Button>
                <Button onClick={e=>{ deleteHandler()}} color="secondary" variant="outlined">
                    CONFIRM
                </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default connect(mapStateToProps,mapDispatchToProps)(EventDelete)