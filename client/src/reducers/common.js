import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    LOGIN,
    REGISTER,
    REDIRECT_TO_MAIN,
    ASYNC_START,
    ASYNC_END,
    ALERT_HIDE,
    EVENT_ADD,
    EVENT_UPDATE,
    EVENT_DELETE
 
  } from '../constants/actionTypes';
  
  const defaultState = {
    token: window.localStorage.getItem('token')||null,
    viewChangeCounter: 0,
    error:null,
    message:"",
    appLoaded:false,
  };
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case APP_LOAD:
        return {
          ...state,
          token:window.localStorage.getItem('token')||null,
          appLoaded: true,
          currentUser: action.payload ? action.payload.user : null
        };
      case REDIRECT:
        return { ...state, redirectTo: null };
     case REDIRECT_TO_MAIN:
            return{
                ...state,
                redirectTo:"/"
            }
      case LOGOUT:
        return { ...state, redirectTo: '/', token: null, currentUser: null };
      case ASYNC_START:      
      case ALERT_HIDE:
          return {
            ...state,
            error:null,
            message:""
          }
      case ASYNC_END:
      
        if(action.error&&action.promise.status!==null&&action.promise.status!==undefined)
        {
          
          return {...state,error:action.error,message:action.promise.message,redirectTo:"/"}
        }
        return {...state,redirectTo:null}  
      case LOGIN:
      case REGISTER:
        return {
          ...state,
          redirectTo: action.error ? null : '/home',
          error:action.error===undefined?null:action.error,
          message:action.error===undefined?"":action.payload.message,
          token: action.error ? null : action.payload.user.token,
          currentUser: action.error ? null : action.payload.user
        };
      
      case EVENT_ADD:
      case EVENT_UPDATE:
      case EVENT_DELETE:
        return{
          ...state,
          error:action.error===undefined?false:action.error,
          message:action.payload.message,
          
        }

       
      default:
        return state;
    }
  };
  