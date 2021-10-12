// import {
//   ADD_TO_SEARCH_BOX,
//   CLOSE_SEARCH_BOX,
//   SEARCH_BOX_GROUP_INVITEE_TYPE,
//   SEARCH_BOX_MAKE_UNIQE_ID,
//   SEARCH_BOX_SINGLE_INVITEE_TYPE,
//   OPEN_SEARCH_BOX,
//   REMOVED_SEARCH_BOX_MEETING_DATA,
//   REMOVED_SEARCH_BOX__ALL_MEETING_DATA,
//   REMOVE_ALL_SEARCH_BOX,
//   REMOVE_FROM_SEARCH_BOX,
//   SEND_SEARCH_BOX_MEETING_DATA,
//   } from "./Searchbox.types";

import { ADD_TO_SEARCH_BOX, CLOSE_SEARCH_BOX, OPEN_SEARCH_BOX, REMOVED_SEARCH_BOX_MEETING_DATA, REMOVED_SEARCH_BOX__ALL_MEETING_DATA, REMOVE_ALL_SEARCH_BOX, REMOVE_FROM_SEARCH_BOX, SEARCH_BOX_GROUP_INVITEE_TYPE, SEARCH_BOX_MAKE_UNIQE_ID, SEARCH_BOX_SINGLE_INVITEE_TYPE, SEND_SEARCH_BOX_MEETING_DATA } from "./Searchbox.types";

const searchinitialState = {
  showbox: false,
  partner: [],
  uniqueId: "",
  groupinvitee: false,
  sendmeeting: [],
};

const searchboxReducer = (state = searchinitialState, action) => {
  switch (action.type) {
    case ADD_TO_SEARCH_BOX:
      return { ...state, partner: [...state.partner, action.payload] };
    case REMOVE_ALL_SEARCH_BOX:
      return { ...state, partner: "", showbox: false };
    case OPEN_SEARCH_BOX:
      return { ...state, showbox: true };
    case CLOSE_SEARCH_BOX:
      return { ...state, showbox: false };
    case SEARCH_BOX_GROUP_INVITEE_TYPE:
      return { ...state, groupinvitee: false };
    case SEARCH_BOX_SINGLE_INVITEE_TYPE:
      return { ...state, groupinvitee: false, partner: "" };
    case SEARCH_BOX_MAKE_UNIQE_ID:
      return { ...state, uniqueId: action.payload };
    case SEND_SEARCH_BOX_MEETING_DATA:
      return { ...state, sendmeeting: [...state.sendmeeting, action.payload] };
    case REMOVE_FROM_SEARCH_BOX: {
      const partner = state.partner.filter(
        (partners) => partners._id !== action.payload,
        console.log("reducers products", partner)
      );
      return { ...state, partner, uniqueId: "", showbox: false };
    }
    case REMOVED_SEARCH_BOX_MEETING_DATA: {
      const sendmeeting = state.sendmeeting.filter(
        (sends) => sends.userId !== action.payload,
        console.log("reducers products", sendmeeting)
      );
      return { ...state, sendmeeting };
    }

    case REMOVED_SEARCH_BOX__ALL_MEETING_DATA:
      return { ...state, sendmeeting: ""};

    default:
      return state;
  }
};

export default searchboxReducer;