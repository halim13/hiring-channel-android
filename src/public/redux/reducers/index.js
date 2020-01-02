import {combineReducers} from 'redux';

// import all reducer
import login from './auth/login';
import register from './auth/register';
import companies from './companies';
import engineers from './engineers';
import singleCompany from './singleCompany';
import singleEngineer from './singleEngineer';

const rootReducer = combineReducers({
  login,
  register,
  companies,
  engineers,
  singleCompany,
  singleEngineer,
});

export default rootReducer;
