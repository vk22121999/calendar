import moment from 'moment';
import { EVENT_ADD, EVENT_DELETE, EVENT_ORDER, EVENT_UPDATE, HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, SET_CURRENT_DATE } from '../constants/actionTypes';
import getColorCode from "../utils/RandomColorGenerator"


const setColor = (events) =>
{
    let currentDate = new Date()

    return events.filter(i=>{ 
      i["color"] = getColorCode();  
    
    if((moment(i.startDate).isAfter(moment(),"minutes"))
    ||(new Date(i.startDate).getTime() < currentDate.getTime()&&currentDate.getTime()< new Date(i.endDate).getTime())
    ||(moment(currentDate).isSame(new Date(i.startDate),"day")&& moment(new Date(i.endDate)).isAfter(moment(),"minutes"))
    )

    {
      
      return i
    }
        
    })

}
const setEventsOnDate = (events,currentDate) =>
{
 return events.filter( i => {


  return ((moment(currentDate).isSame(new Date(i.startDate),"day")&& moment(new Date(i.endDate)).isAfter(moment(),"minutes"))
  ||(new Date(i.startDate).getTime() < new Date(currentDate).getTime()&&new Date(currentDate).getTime()< new Date(i.endDate).getTime())
  )})
  

}


const defaultState ={events:[],homeLoaded:false,currentDate:new Date(),currentEvents:[]}
export default (state =defaultState, action) => {
  let eventsTemp;
  switch (action.type) {
  
    case HOME_PAGE_LOADED:
      
     eventsTemp = (action.error!==undefined&&action.error)?[]:setColor(action.payload.events)
      return {
        ...state,
        events:eventsTemp,
        homeLoaded:true,
        currentEvents:setEventsOnDate(eventsTemp,state.currentDate)
       
      };
    case EVENT_ADD:
    case EVENT_UPDATE:
    case EVENT_DELETE:
     if(action.error!==undefined&&action.error)
     {
        return state
     }
     else
     {
       eventsTemp =setColor(action.payload.events)
        return{
          ...state,
          currentEvents:setEventsOnDate(eventsTemp,state.currentDate),
          events:eventsTemp
        }
     }
        
    case SET_CURRENT_DATE:
      return{
        ...state,
        currentEvents:setEventsOnDate(state.events,action.payload.val),
        currentDate:action.payload.val
      }
    case HOME_PAGE_UNLOADED:
      return {};
   
    default:
      return state;
  }
};
