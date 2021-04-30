import moment from 'moment';
import { EVENT_ADD, EVENT_ORDER, HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, SET_CURRENT_DATE } from '../constants/actionTypes';

function getColorCode() {
  var makeColorCode = '0123456789ABCDEF';
  var code = '#';
  for (var count = 0; count < 6; count++) {
     code =code+ makeColorCode[Math.floor(Math.random() * 16)];
  }
  return code;
}
const setColor = (events) =>
{
  return events.map(i=>{ i["color"] = getColorCode();  return i})
  
}
const setEventsOnDate = (events,currentDate) =>
{
 return events.filter( i => {

  // console.log("",i.title,new Date(i.startDate).getTime() < currentDate.getTime() &&currentDate.getTime()< new Date(i.endDate).getTime())
  return ((moment(currentDate).isSame(new Date(i.startDate),"day")&& moment(new Date(i.endDate)).isAfter(moment(),"minutes"))
  ||(new Date(i.startDate).getTime() < currentDate.getTime()&&currentDate.getTime()< new Date(i.endDate).getTime())
  )})
  

}

export default (state = {events:[],currentDate:new Date(),currentEvents:[]}, action) => {
  let eventsTemp;
  switch (action.type) {
  
    case HOME_PAGE_LOADED:
     eventsTemp = setColor(action.payload.events)
      return {
        ...state,
        events: eventsTemp,
        currentEvents:setEventsOnDate(eventsTemp,state.currentDate)
       
      };
    case EVENT_ADD:
      eventsTemp = setColor(action.payload.events)
      return{
        ...state,
        currentEvents:action.error?{...state.currentEvents}:setEventsOnDate(eventsTemp,state.currentDate),
        events:action.error?{...state.events}:eventsTemp
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
