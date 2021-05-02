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

const mapStateToProps = state => ({ email:"",password:"",username:"",...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onChangeUserName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onSubmitRegister:(username,email,password) =>
    dispatch({type:REGISTER,payload:agent.Auth.register(username,email,password)}),
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
class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);

    this.submitFormRegister = (username,email, password) => ev => {
        ev.preventDefault();
        this.props.onSubmitRegister(username,email, password);
      };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
   const {classes,theme} = this.props; 
 
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;
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
               <Card style={{ padding:theme.spacing(2),height:"70vh"}} elevation={5} >
           <CardContent>
                <Typography style={{textAlign:"center",marginBottom:theme.spacing(3)}} variant="h4" color="secondary">
                    Register
                </Typography>
           <form onSubmit={ this.submitFormRegister(username,email,password)}>
                <Container style={{ width:"90%",alignItems:"center",margin:"auto",justifyContent:"center" ,display:"flex",flexDirection:"column" }}>
                <FormControl className={classes.field}>

<TextField type="text"id="username" aria-describedby="usernameError" label="username" variant="outlined"
  color="secondary" value={username} onChange={e=>{ this.props.onChangeUserName(e.target.value) }} />
<FormHelperText  id="usernameError"></FormHelperText>
</FormControl>
                <FormControl className={classes.field}>

  <TextField type="email"id="email" aria-describedby="emailError" label="email" variant="outlined"
    color="secondary" value={email} onChange={e=>{ this.props.onChangeEmail(e.target.value) }} />
  <FormHelperText  id="emailError"></FormHelperText>
</FormControl>
<FormControl className={classes.field}>
  
  <TextField id="password" value={password} onChange={e=>{ this.props.onChangePassword(e.target.value)}} aria-describedby="passwordError" type="password" label="password" variant="outlined"
    color="secondary"  />
  <FormHelperText id="passwordError"></FormHelperText>
</FormControl>
<Button 
disabled={(!username||!password||!email)||(username===""||email===""||password==="")} variant="contained" type="submit"  className={classes.field}  color="secondary">
                    Submit
                    </Button>
                    <Link style={{textDecoration:"none"}} to="/">
          <Button color="primary"  style={{fontWeight:600,fontSize:"1.2rem"}} variant="text">
          SIGN IN
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

export default withStyles(useStyles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(Register)));
