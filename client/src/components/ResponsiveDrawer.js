  import React, { useEffect } from 'react';
  import AddIcon from '@material-ui/icons/Add';
  import agent from "../agent";
  import CssBaseline from '@material-ui/core/CssBaseline';
  import Button from '@material-ui/core/Button';
  import { connect } from 'react-redux';
  import Drawer from '@material-ui/core/Drawer';
  import Hidden from '@material-ui/core/Hidden';
  import FormControl from '@material-ui/core/FormControl';
  import FormHelperText from '@material-ui/core/FormHelperText';
  import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Typography,TextField } from '@material-ui/core';
  import moment from "moment";
  import { v4 as uuidv4 } from 'uuid';
import { EVENT_ADD, UPDATE_EVENT_FIELD } from '../constants/actionTypes';
  const drawerWidth = "30%";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    field:{
     
        padding:theme.spacing(1),
      
        margin:8,
        width:"90%",
    },

    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      [theme.breakpoints.down('sm')]: {
        width: "50%",
        flexShrink: 0,
      },
      [theme.breakpoints.down('xs')]: {
        width: "85%",
        flexShrink: 0,
      },
    }

  }));

  const getMinDate = () =>
  {
      return moment().format("yyyy-MM-DD")+"T"+moment().format("hh:mm")
  }
  const getFormatDate = (val) =>
  {
      return moment(val).format("yyyy-MM-DDThh:mm")
  }
  const parseDate =(val) =>
  {
     return moment(val,"yyyy-MM-DDThh:mm").toDate()
  }
  const mapStateToProps = state => ({
    ...state.event,
    ...state.home
   
  });
  
  const mapDispatchToProps = dispatch => ({

    onUpdatefield:(key,value) =>
      dispatch({ type: UPDATE_EVENT_FIELD , payload:{ key,value  }})
    ,
    onAddEvent:(payload) =>
     dispatch({type:EVENT_ADD,payload})  
    });

  
  function ResponsiveDrawer(props) {
    const { window,title,description,startDate,endDate,onAddEvent,onUpdatefield } = props;
    const classes = useStyles();
    const handleChange = (name,value) =>
    {
        
        onUpdatefield(name,value)
    }
    const submitForm = (val) => e =>
    {
        e.preventDefault();
        onAddEvent(agent.Events.create({...val,eventid:uuidv4()}))
    } 
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
        
      setMobileOpen(!mobileOpen);
    };
  
    const drawer =  (
      <Container style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <Typography style={{ padding:"24px"}} variant="h4" color="secondary">
            Add & Event
          </Typography>

          <form noValidate onSubmit={submitForm({title,description,startDate,endDate})} >
          <FormControl className={classes.field}>

<TextField type="text"id="title" name="title" aria-describedby="titleError" label="Enter the event title" variant="outlined"
  value={title}
  onChange={e=>{ handleChange(e.target.name,e.target.value) }}
  color="secondary" />
<FormHelperText  id="titleError"></FormHelperText>
</FormControl>
<FormControl className={classes.field}>

<TextField  multiline rows="5" type="text"id="description" aria-describedby="descriptionError" label="Enter the event description" variant="outlined"
  color="secondary"
  name="description"
  value={description}
  onChange={e=>{ handleChange(e.target.name,e.target.value) }} />
<FormHelperText  id="descriptionError"></FormHelperText>
</FormControl>
<TextField
        id="StartDate"
        label="start of the event"
        type="datetime-local"
        inputProps={{min: getMinDate()}}
        color="secondary"
        value={getFormatDate(startDate)}
        variant="outlined"
        name="startDate"
        className={classes.field}
        onChange={e=>{ handleChange(e.target.name,parseDate(e.target.value)) }}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <TextField
        id="endDate"
        label="end of the event"
        color="secondary"
        variant="outlined"
        type="datetime-local"
        name="endDate"
        inputProps={{min: getMinDate()}}
        onChange={e=>{ handleChange(e.target.name,parseDate(e.target.value)) }}
        value={getFormatDate(endDate)}
        className={classes.field}
        InputLabelProps={{
          shrink: true,
        }}
      />
            <Button 
            className={classes.field}
            disabled={title===""||description===""||startDate===""||endDate===""}
            type="submit" 
            variant="contained" color="secondary">
                SUBMIT
            </Button>

          </form>
 
      </Container>
    )

  
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <div className={classes.root}>
        <CssBaseline />
       
        <Button startIcon={<AddIcon/>} onClick={e=>{ handleDrawerToggle() }} variant="contained" color="secondary" >
        ADD TASK
      </Button>
        
    
          <Hidden only={['lg', 'md', 'sm', 'xl', 'xs']} implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden only={['lg', 'md', 'sm', 'xl', 'xs']} implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
             {drawer}
            </Drawer>
          </Hidden>

             </div>
    );
  }
  

  
  export default connect(mapStateToProps,mapDispatchToProps)(ResponsiveDrawer);