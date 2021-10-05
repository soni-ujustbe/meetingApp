import { ADD_TO_MENTOR_BOX, MENTOR_BOX_GROUP_INVITEE_TYPE, MENTOR_BOX_MAKE_UNIQE_ID, MENTOR_BOX_SINGLE_INVITEE_TYPE, OPEN_MENTOR_BOX, REMOVED_MENTOR_BOX_MEETING_DATA, REMOVED_MENTOR_BOX__ALL_MEETING_DATA, REMOVE_ALL_MENTOR_BOX, REMOVE_FROM_MENTOR_BOX, SEND_MENTOR_BOX_MEETING_DATA } from "./Mentorbox.types";

export const makementorid = () => {
  return async function (dispatch) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return dispatch(makeMentorUniqueid(text));
  };
};

export const addToMentorBox = (partner) => ({
  type: ADD_TO_MENTOR_BOX,
  payload: partner,
});

export const openMentorBox = () => ({
  type: OPEN_MENTOR_BOX,
  //payload
});

export const closeMentorBox = () => ({
  type: CLOSE_MENTOR_BOX,
  // payload
});
export const mentorboxgroupinvitation = () => ({
  type: MENTOR_BOX_GROUP_INVITEE_TYPE,
  // payload
});
export const mentorboxsingleinvitation = () => ({
  type: MENTOR_BOX_SINGLE_INVITEE_TYPE,
  // payload
});

export const removeConnectmentorBox = (partnerId) => ({
  type: REMOVE_FROM_MENTOR_BOX,
  payload: partnerId,
});

export const removeAllmentorBox = () => ({
  type: REMOVE_ALL_MENTOR_BOX,
  //payload: partnerId,
});

export const makeMentorUniqueid = (text) => ({
  type: MENTOR_BOX_MAKE_UNIQE_ID,
  payload: text,
});
export const sendMentorMeetingData = (data) => ({
  type: SEND_MENTOR_BOX_MEETING_DATA,
  payload: data,
});
export const removedMentorMeetingData = (dataId) => ({
  type: REMOVED_MENTOR_BOX_MEETING_DATA,
  payload: dataId,
});
export const removedMentorAllMeetingData = (dataId) => ({
  type: REMOVED_MENTOR_BOX__ALL_MEETING_DATA,
  payload: dataId,
});