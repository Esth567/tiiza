import { combineReducers } from "redux";
import auth from './auth';
import messages from './messages';
import lostFound from "./lostFound";

export default combineReducers({
  auth,
  messages,
  lostFound,
});