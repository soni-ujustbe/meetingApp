import {
  FETCH_INVITATIONRECEIVE_FAILURE,
  FETCH_INVITATIONRECEIVE_REQUEST,
  FETCH_INVITATIONRECEIVE_SUCCESS,
  FETCH_USERID,
} from "./Invitationreceive.type";

export const fetchinvitationreceive = () => {
  return async function (dispatch) {
    dispatch(fetchinvitationreceiveRequest());
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
          console.log("meeting", json);
          dispatch(fetchinvitationreceiveSuccess(json.data.invitedToList));
          return json;
        })
        .catch((error) => dispatch(fetchinvitationreceiveFailure(error)))
    );
  };
};

export const fetchinvitationreceiveRequest = (payload) => ({
  type: FETCH_INVITATIONRECEIVE_REQUEST,
  payload,
});
export const fetchinvitationreceiveSuccess = (invitations) => ({
  type: FETCH_INVITATIONRECEIVE_SUCCESS,
  payload: invitations,
});
export const fetchinvitationreceiveFailure = (error) => ({
  type: FETCH_INVITATIONRECEIVE_FAILURE,
  payload: error,
});
export const fetchuserid = (userid) => ({
  type: FETCH_USERID,
  payload: userid,
});