import {
    LOGIN,
    REGISTER,
    MAIN_PAGE_UNLOADED,
    ASYNC_START,
    UPDATE_FIELD_AUTH,
    MAIN_PAGE_TOGGLE
  } from '../constants/actionTypes';
  
  export default (state = {username:"",email:"",password:""}, action) => {
    switch (action.type) {
      case LOGIN:
      case REGISTER:
       
        return {
          ...state,
          inProgress: false,
          errors: action.error ? action.payload.message : null
        };
      case MAIN_PAGE_UNLOADED:
        return {};
      case ASYNC_START:
        if (action.subtype === LOGIN || action.subtype === REGISTER) {
          return { ...state, inProgress: true };
        }
        break;
      case MAIN_PAGE_TOGGLE:
        return {...state,password:"",email:"",username:""};    
      case UPDATE_FIELD_AUTH:
        return { ...state, [action.key]: action.value };
      default:
        return state;
    }
  
    return state;
  };
  