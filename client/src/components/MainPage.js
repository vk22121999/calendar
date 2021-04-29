import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';

import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  MAIN_PAGE_UNLOADED,
  REGISTER
} from '../constants/actionTypes';
import { withStyles} from '@material-ui/core/styles';
import { Button, Card, CardContent, Input,FormHelperText,InputLabel } from '@material-ui/core';

const mapStateToProps = state => ({email:"",password:"", ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: MAIN_PAGE_UNLOADED })
});

const useStyles = theme=>({
 
    title:{
        
        padding:theme.spacing(2),
        paddingLeft:0,
        margin:0,
        height:'fit-content'
    },
    container:{
        width:"100%",

        alignItems:"center",
        justifyContent:"center"
    },
    field:{
     
        padding:theme.spacing(1),
      
        margin:8,
        width:"90%",
    }
,
  

})
class MainPage extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
   const {classes,theme} = this.props; 
 
    const email = this.props.email;
    const password = this.props.password;
  
    return (

       <Container style={{width:"100%",maxWidth:"100%"}}>
      <div className="main">
      <div className="heading">
           <img className="main-icon" src="/images/calendar_MainIcon.png"/>
           <Typography className={classes.title}   variant="h1" color="textSecondary">
            Calendar
            </Typography>
           </div>
           <Grid className={classes.container}  container>
               <Grid  xs={12} sm={9} lg={5} item>
               <Card style={{ padding:theme.spacing(2),height:"60vh"}} elevation={5} >
           <CardContent>
                <Typography style={{textAlign:"center",marginBottom:theme.spacing(5)}} variant="h4" color="primary">
                    Login
                </Typography>
           <form noValidate onSubmit={this.submitForm(email,password)}>
                <Container style={{ width:"90%",alignItems:"center",margin:"auto",justifyContent:"center" ,display:"flex",flexDirection:"column" }}>
                <FormControl className={classes.field}>

  <TextField 
  type="email"
  id="email" 
  aria-describedby="emailError" 
  label="email" 
  variant="outlined"
  value={email}
  onChange={e=>{ this.props.onChangeEmail(e.target.value) }}
  color="primary" />
  <FormHelperText  id="emailError"></FormHelperText>
</FormControl>
<FormControl className={classes.field}>
  
  <TextField id="password" aria-describedby="passwordError" type="password" label="password" variant="outlined"
    color="primary" 
    value={password}
    onChange={e=>{ this.props.onChangePassword(e.target.value) }} />
  <FormHelperText id="passwordError"></FormHelperText>
</FormControl>
<Button variant="contained" 
 className={classes.field} 
  color="primary"
  type="submit"
  disabled={email===""||password===""}>
                    Submit
           
                    </Button>
          <Link style={{textDecoration:"none"}} to="/register">
          <Button color="secondary"  style={{fontWeight:600,fontSize:"1.2rem"}} variant="text">
          New user ?
          </Button>
      
          
          </Link>
           
            
                </Container>
              
                </form>
            </CardContent>
                  
        </Card>
               </Grid>
            
           </Grid>
     
      </div>
    
       
      
        
      </Container>

    );
  }
}

export default withStyles(useStyles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage)));
