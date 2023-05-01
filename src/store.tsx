import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers/auth';

const middleware = [thunk];
const store = createStore(auth, applyMiddleware(...middleware));
export default store;
