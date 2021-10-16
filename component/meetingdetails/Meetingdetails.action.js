import axios from "axios";
import { FETCH_INVITATION_DETAILS_DATA_FAILURE, FETCH_INVITATION_DETAILS_DATA_REQUEST, FETCH_INVITATION_DETAILS_DATA_SUCCESS, GET_MEETING_ID } from "./Meetingdetails.types";


export const getfetchinvitationdetails = (meetingid) => {
  return async function (dispatch) {
    console.log("redux metting id" + meetingid);
    dispatch(getinvitationdataRequest());
    // var MessageList = JSON.parse(localStorage.getItem("user"));
    // console.log("local storage", MessageList.data._id);
    // return fetch("https://jsonplaceholder.typicode.com/users")
    return (
      fetch(`https://api.ujustbe.com/Meeting/details?meetingId=${meetingid}`)
      //fetch("https://api.ujustbe.com/Meeting/details")
        //.then(handleErrors)
        .then(
          (res) => res.json(),
          
        ).then((json) => {
          console.log("redux meeting", json.data.meetingList[0]);
          dispatch(getinvitationdataSuccess(json.data.meetingList[0]));
          return json;
        })
        .catch((error) => dispatch(getinvitationdataFailure(error)))
    );
  };
};

export const getinvitationdataRequest = (payload) => ({
  type: FETCH_INVITATION_DETAILS_DATA_REQUEST,
  payload,
});

export const getmeetingId = (meetingid) => ({
  type: GET_MEETING_ID,
  payload: meetingid,
});

export const getinvitationdataSuccess = (usedata) => ({
  type: FETCH_INVITATION_DETAILS_DATA_SUCCESS,
  payload: usedata,
});
export const getinvitationdataFailure = (error) => ({
  type: FETCH_INVITATION_DETAILS_DATA_FAILURE,
  payload: error,
});