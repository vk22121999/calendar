import { EVENT_ADD,UPDATE_EVENT_FIELD } from '../constants/actionTypes';
const defaultState = { title:"",description:"",startDate:"",endDate:"" }
export default (state =defaultState , action) => {
  switch (action.type) {
    case UPDATE_EVENT_FIELD:
   
      return {
        ...state,
        [action.payload.key]: action.payload.value,
       
      };
     
      
    
   case EVENT_ADD:
       if(action.error)
       {
          return {...state}
       }
       else
          return defaultState
    
    

    default:
      return state;
  }
};
