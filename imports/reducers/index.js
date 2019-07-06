import {combineReducers} from 'redux';
import data from './data';

const currentPageNumber = (pageNum = 1, action) => {
  if (action.type === 'NEW_PAGE') {
    return pageNum = action.payload;
  }
  return pageNum;
}

const loading = (loading = false, action) => {
  if (action.type.indexOf('STARTED') != -1) {
    loading = true
  }
  else {
    loading = false
  }
  return loading
}

const userState = (userState={isLoggedIn: false, loginAttempted: 0, userData: {}, jwt: "", errorMessage: null}, action) => {
  if (action.type === 'LOG_IN_SUCCESS' || action.type === 'REGISTER_SUCCESS') {
    localStorage.setItem("CachedJWT", action.payloadJWT)
    return { ...userState, 
      isLoggedIn: true,
      loginAttempted: 0,
      userData: action.payload,
      jwt: action.payloadJWT,
      errorMessage: null};
  }
  if (action.type === 'FACEBOOK_LOGIN_SUCCESS') {
    return { ...userState, 
      isLoggedIn: true,
      loginAttempted: 0,
      userData: action.payload,
      jwt: "",
      errorMessage: null};
  }
  if (action.type === 'LOG_IN_FAILURE') {
    localStorage.removeItem("CachedJWT")
    return { ...userState, 
      isLoggedIn: false,
      loginAttempted: userState.loginAttempted + 1,
      userData: null,
      jwt: "",
      errorMessage: action.payload + " (at " + new Date().toUTCString() + " UTC)"};
  }
  if (action.type === 'REGISTER_FAILURE' || action.type === 'RESET_FAILURE' || action.type === 'RESET_SUCCESS') {
    return { ...userState, 
      isLoggedIn: false,
      loginAttempted: 0,
      userData: null,
      jwt: "",
      errorMessage: action.payload + " (at " + new Date().toUTCString() + " UTC)"};
  }
  if (action.type === 'LOG_OUT') {
    localStorage.removeItem("CachedJWT")
    userState.isLoggedIn = false;
    userState.loginAttempted = 0;
    return { ...userState, 
      isLoggedIn: false,
      loginAttempted: 0,
      userData: null,
      jwt: ""};
  }
  return userState;
}

const newsStore = (news = [], action) => {
  if(action.type === "LOAD_NEWS") {
    console.log("from the reducer: ")
    console.log(news);
    return action.payload;
    //return action.payload;
  }
  return news;
}

export default combineReducers ({
  pageNum: currentPageNumber,
  data,
  news: newsStore,
  userState: userState,
  loading: loading
  //anotherKey: anotherReducer (all your reducers should be combined)
});
