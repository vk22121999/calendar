import React, { useState } from 'react';


import { Alert,AlertTitle } from '@material-ui/lab';

function AlertComponent(props)
{
    
    
    if(props.error===null)
    {
        return(<span>

        </span>)
    }
    if(props.error)
    {
        // setInterval(()=>{
        //     if(props.error)
        //         props.handleAlert()
        // },3000)
        return(
            <Alert style={{position:"absolute",zIndex:2,top:0,width:"50%",margin:"auto",left:0,right:0}} severity="error">
                 <AlertTitle>Error</AlertTitle>
                {props.message}</Alert>
        )
    }
    else 
    {
        // setInterval(()=>{
        //     if(props.error!==null)
        //         props.handleAlert()
        // },3000)
        return(
            <Alert severity="success"  style={{position:"absolute",zIndex:2,top:0,width:"50%",margin:"auto",left:0,right:0}}>
                 <AlertTitle>Success</AlertTitle>
                {props.message}</Alert>
        )
    }
}


export default AlertComponent