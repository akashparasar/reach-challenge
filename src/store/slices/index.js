import { combineReducers } from 'redux';
import repositoryReducer from './repositorySlice'

const rootReducer = combineReducers({
  counter: repositoryReducer,
});

export default rootReducer;
