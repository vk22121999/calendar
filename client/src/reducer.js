import { combineReducers } from 'redux';
import common from './reducers/common';
import home from './reducers/home';
import auth from './reducers/auth';
import event from './reducers/event';
import { connectRouter } from 'connected-react-router';


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  home,
  auth,
  common,
  event
})
export default createRootReducer