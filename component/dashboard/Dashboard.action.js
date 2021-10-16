import {
  FETCH_USERID,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  RECEIVE_INVITATION_DATA_FAILURE,
  RECEIVE_INVITATION_DATA_REQUEST,
  RECEIVE_INVITATION_DATA_SUCCESS,
  SENT_INVITATION_DATA_FAILURE,
  SENT_INVITATION_DATA_REQUEST,
  SENT_INVITATION_DATA_SUCCESS,
} from "./Dashboard.types";
import axios from "axios";
export const getUserData = () => {
  return async function (dispatch) {
    dispatch(getuserdataRequest());
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    //setstate(MessageList.data._id);
    const article = {
      userId: MessageList.data._id,
      listedPartnerId: "",
      partnerId: "",
    };
    //console.log("this userId", article);
    const headers = {
      "Content-Type": "application/json",
      //token: "ky23eiqgw5",
      token: "gxvy5ig98w",
    };
    axios
      .post("https://api.ujustbe.com/ValidateToken", article, {
        headers: headers,
      })
      .then((response) => {
        console.log("test", response);
        if (response.statusText == "OK") {
          // Login the user using dispatch
          dispatch(getuserdataSuccess(response.data.userData));
        } else {
          // Send the error from API back
          dispatch(getuserdataFailure(response.data.message));
        }
      });
  };
};

export const receiveinvitation = () => {
  return async function (dispatch) {
    dispatch(receivedataRequest());
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    dispatch(fetchuserid(MessageList.data._id));
    // return fetch("https://jsonplaceholder.typicode.com/users")
    return (
      fetch("https://api.ujustbe.com/meeting/details-by-userid?userid="+ MessageList.data._id)
      //fetch("https://api.ujustbe.com/Meeting/details")
        //.then(handleErrors)
        .then(
          (res) => res.json(),
          
        )

        .then((json) => {
          console.log("meeting received", json);
          dispatch(receivedataSuccess(json.data.invitedToList));
          return json;
        })
        .catch((error) => dispatch(receivedataFailure(error)))
    );
  };
};

export const sentinvitation = () => {
  return async function (dispatch) {
    dispatch(sentdataRequest());
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    dispatch(fetchuserid(MessageList.data._id));
    // return fetch("https://jsonplaceholder.typicode.com/users")
    return (
      fetch("https://api.ujustbe.com/meeting/details-by-userid?userid="+ MessageList.data._id)
        //.then(handleErrors)
        .then(
          (res) => res.json()
          //console.log("partnerdata", res)
        )

        .then((json) => {
          dispatch(sentdataSuccess(json.data.scheduledByList));
          return json;
        })
        .catch((error) => dispatch(sentdataFailure(error)))
    );
  };
};

export const getuserdataRequest = (payload) => ({
  type: GET_USER_DATA_REQUEST,
  payload,
});
export const getuserdataSuccess = (usedata) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: usedata,
});
export const getuserdataFailure = (error) => ({
  type: GET_USER_DATA_FAILURE,
  payload: error,
});


export const receivedataRequest = (payload) => ({
  type: RECEIVE_INVITATION_DATA_REQUEST,
  payload,
});
export const receivedataSuccess = (usedata) => ({
  type: RECEIVE_INVITATION_DATA_SUCCESS,
  payload: usedata,
});
export const receivedataFailure = (error) => ({
  type: RECEIVE_INVITATION_DATA_FAILURE,
  payload: error,
});
export const sentdataRequest = (payload) => ({
  type: SENT_INVITATION_DATA_REQUEST,
  payload,
});
export const sentdataSuccess = (usedata) => ({
  type: SENT_INVITATION_DATA_SUCCESS,
  payload: usedata,
});
export const sentdataFailure = (error) => ({
  type: SENT_INVITATION_DATA_FAILURE,
  payload: error,
});
export const fetchuserid = (userid) => ({
  type: FETCH_USERID,
  payload: userid,
});