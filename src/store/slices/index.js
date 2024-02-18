import { combineReducers } from 'redux';
import repositoryReducer from './repositorySlice'

const rootReducer = combineReducers({
  repository: repositoryReducer,
});

export default rootReducer;
