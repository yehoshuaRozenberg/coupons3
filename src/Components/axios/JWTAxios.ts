import { error404Action } from './../redux/ErrorState';
import { logoutUser, updateToken } from './../redux/authState';
import axios from "axios";
import store from "../redux/store";
import notify from '../utils/Notify';



const jwtAxios = axios.create();

jwtAxios.interceptors.request.use(request => {
  request.headers = {
    "Authorization": store.getState().authState.userDetails.token,
    'Content-Type': 'application/json',
  }
  return request;
});

jwtAxios.interceptors.response.use(
  response => {
    switch (response.status) {
      case 200:
        console.log("ok")
        break;
      case 202:
        console.log("accepted")
        notify.success(response.data)
        break;
      default:
        console.log(response.status);
        break;
    }
    store.dispatch(updateToken(response.headers.authorization))
    return response;
  },
  error => {
    console.log("in erorr interceptor");
    if (error.response.status === 401) {
      console.log("token time expired")
      notify.error("connection time expired, log in again to continue")
      store.dispatch(logoutUser());
      throw error;
    } else {
      switch (error.response.status) {
        case 400:
          notify.error(error.response.data.description)
          throw error
        case 405:
          notify.error("error in send")
          throw error;
        case 404:
          store.dispatch(error404Action(true))
          throw error;
        case 500:
          notify.error(error.response.data.description)
          throw error;
        default:
          throw error;
      }

    }
  }
);
export default jwtAxios;

