import {
  FETCH_INVITATIONSENT_FAILURE,
  FETCH_INVITATIONSENT_REQUEST,
  FETCH_INVITATIONSENT_SUCCESS,
} from "./Invetationsent.type";

export const fetchinvitationsent = () => {
  return async function (dispatch) {
    dispatch(fetchinvitationsentRequest());
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    // return fetch("https://jsonplaceholder.typicode.com/users")
    return (
      fetch("https://api.ujustbe.com/meeting/details-by-userid?userid="+ MessageList.data._id)
        //.then(handleErrors)
        .then(
          (res) => res.json()
          //console.log("partnerdata", res)
        )

        .then((json) => {
          dispatch(fetchinvitationsentSuccess(json.data.scheduledByList));
          return json;
        })
        .catch((error) => dispatch(fetchinvitationsentFailure(error)))
    );
  };
};

export const fetchinvitationsentRequest = (payload) => ({
  type: FETCH_INVITATIONSENT_REQUEST,
  payload,
});
export const fetchinvitationsentSuccess = (invitations) => ({
  type: FETCH_INVITATIONSENT_SUCCESS,
  payload: invitations,
});
export const fetchinvitationsentFailure = (error) => ({
  type: FETCH_INVITATIONSENT_FAILURE,
  payload: error,
});