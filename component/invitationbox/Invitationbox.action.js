import {
  ADD_TO_INVITATION_BOX,
  CLOSE_INVITATION_BOX,
  GROUP_INVITEE_TYPE,
  MAKE_UNIQE_ID,
  OPEN_INVITATION_BOX,
  REMOVED_ALL_MEETING_DATA,
  REMOVED_MEETING_DATA,
  REMOVE_ALL,
  REMOVE_FROM_INVITATION_BOX,
  SEND_MEETING_DATA,
  SINGLE_INVITEE_TYPE,
} from "./Invitationbox.types";

export const makeid = () => {
  return async function (dispatch) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return   dispatch(makeUniqueid(text));
  };
};

export const addToInvitationBox = (partner) => ({
  type: ADD_TO_INVITATION_BOX,
  payload: partner,
});

export const openBox = () => ({
  type: OPEN_INVITATION_BOX,
  //payload
});

export const closeBox = () => ({
  type: CLOSE_INVITATION_BOX,
  // payload
});
export const groupinvitation = () => ({
  type: GROUP_INVITEE_TYPE,
  // payload
});
export const singleinvitation = () => ({
  type: SINGLE_INVITEE_TYPE,
  // payload
});

export const removePartner = (partnerId) => ({
  type: REMOVE_FROM_INVITATION_BOX,
  payload: partnerId,
});

export const removeAll = () => ({
  type: REMOVE_ALL,
  //payload: partnerId,
});

export const makeUniqueid = (text) => ({
  type: MAKE_UNIQE_ID,
  payload: text,
});
export const sendMeetingData = (data) => ({
  type: SEND_MEETING_DATA,
  payload: data,
});
export const removedMeetingData = (dataId) => ({
  type: REMOVED_MEETING_DATA,
  payload: dataId,
});
export const removedAllMeetingData = () => ({
  type: REMOVED_ALL_MEETING_DATA,
});