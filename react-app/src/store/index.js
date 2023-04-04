import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import serviceReducer from './service';
import bookingReducer from './booking'
import tutorReducer from './tutor';
import otherUsersReducer from './user';
import messageReducer from './messages';
import reviewReducer from './review';

const rootReducer = combineReducers({
  session,
  service:serviceReducer,
  booking:bookingReducer,
  tutors: tutorReducer,
  otherUsers: otherUsersReducer,
  messages: messageReducer,
  reviews:reviewReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
