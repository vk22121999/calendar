import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    LOGIN,
    REGISTER,
    REDIRECT_TO_MAIN
 
  } from '../constants/actionTypes';
  
  const defaultState = {
    token: window.localStorage.getItem('token')||null,
    viewChangeCounter: 0
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
      case LOGIN:
      case REGISTER:
        console.log("enadanadakudhu",action)
        return {
          ...state,
          redirectTo: action.error ? null : '/home',
          token: action.error ? null : action.payload.user.token,
          currentUser: action.error ? null : action.payload.user
        };
      
      
      default:
        return state;
    }
  };
  