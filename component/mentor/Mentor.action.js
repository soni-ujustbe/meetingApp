import axios from "axios";
import { CURRENT_COUNT_CONNECT, MENTOR_DATA_FAILURE, MENTOR_DATA_REQUEST, MENTOR_DATA_SUCCESS, MENTOR_GROUP_INVITATION, SELECTED_CONNECT, TOTAL_COUNTS_CONNECT, UNSELECTED_ALL_CONNECT, UNSELECTED_CONNECT } from "./Mentor.type";

export const fetchMentor = () => {
  return async function (dispatch) {
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    dispatch(mentordataRequest());
    // return fetch("https://jsonplaceholder.typicode.com/users")

    return (
      fetch("https://api.ujustbe.com/GetConnectors?UserId=" + MessageList.data._id)
        //.then(handleErrors)
        .then(
          (res) => res.json(),
          //console.log("mentordata", res)
        )

        .then((json) => {
          //console.log("mentor data", json);
          dispatch(mentordataSuccess(json.data.connectorUserInfo));
          return json;
        })
        .catch((error) => dispatch(mentordataFailure(error)))
    );
  };
};

export const mentordataRequest = (payload) => ({
  type: MENTOR_DATA_REQUEST,
  payload,
});
export const mentordataSuccess = (connect) => ({
  type: MENTOR_DATA_SUCCESS,
  payload: connect,
});
export const mentordataFailure = (error) => ({
  type: MENTOR_DATA_FAILURE,
  payload: error,
});

export const mentorGroupInvitation = (data) => ({
  type: MENTOR_GROUP_INVITATION,
  payload: data,
});
export const selectConnect = (data) => ({
  type: SELECTED_CONNECT,
  payload: data,
});
export const unselectConnect = (partnerId) => ({
  type: UNSELECTED_CONNECT,
  payload: partnerId,
});
export const unselectallConnect = () => ({
  type: UNSELECTED_ALL_CONNECT,
});
export const totalCountsConnect = (counts) => ({
  type: TOTAL_COUNTS_CONNECT,
  payload: counts,
});
export const currentCountsConnect = (counts) => ({
  type: CURRENT_COUNT_CONNECT,
  payload: counts,
});