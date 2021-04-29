import { EVENT_ADD, HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
  
      return {
        ...state,
        events: action.payload.events,
       
      };
    case EVENT_ADD:
      return{
        ...state,
        events:action.error?{...state.events}:action.payload.events,
        
      }
    case HOME_PAGE_UNLOADED:
      return {};
   
    default:
      return state;
  }
};
