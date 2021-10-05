import { ADD_TO_SEARCH_BOX, SEARCH_BOX_GROUP_INVITEE_TYPE, SEARCH_BOX_MAKE_UNIQE_ID, SEARCH_BOX_SINGLE_INVITEE_TYPE, OPEN_SEARCH_BOX, REMOVED_SEARCH_BOX_MEETING_DATA, REMOVED_SEARCH_BOX__ALL_MEETING_DATA, REMOVE_ALL_SEARCH_BOX, REMOVE_FROM_SEARCH_BOX, SEND_SEARCH_BOX_MEETING_DATA } from "./Searchbox.types";

export const makesearchid = () => {
  return async function (dispatch) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return dispatch(makeSearchUniqueid(text));
  };
};

export const addToSearchBox = (partner) => ({
  type: ADD_TO_SEARCH_BOX,
  payload: partner,
});

export const openSearchBox = () => ({
  type: OPEN_SEARCH_BOX,
  //payload
});

export const closeSearchBox = () => ({
  type: CLOSE_SEARCH_BOX,
  // payload
});
export const searchboxgroupinvitation = () => ({
  type: SEARCH_BOX_GROUP_INVITEE_TYPE,
  // payload
});
export const searchboxsingleinvitation = () => ({
  type: SEARCH_BOX_SINGLE_INVITEE_TYPE,
  // payload
});

export const removeConnectsearchBox = (partnerId) => ({
  type: REMOVE_FROM_SEARCH_BOX,
  payload: partnerId,
});

export const removeAllsearchBox = () => ({
  type: REMOVE_ALL_SEARCH_BOX,
  //payload: partnerId,
});

export const makeSearchUniqueid = (text) => ({
  type: SEARCH_BOX_MAKE_UNIQE_ID,
  payload: text,
});
export const sendSearchMeetingData = (data) => ({
  type: SEND_SEARCH_BOX_MEETING_DATA,
  payload: data,
});
export const removedSearchMeetingData = (dataId) => ({
  type: REMOVED_SEARCH_BOX_MEETING_DATA,
  payload: dataId,
});
export const removedSearchAllMeetingData = (dataId) => ({
  type: REMOVED_SEARCH_BOX__ALL_MEETING_DATA,
  payload: dataId,
});