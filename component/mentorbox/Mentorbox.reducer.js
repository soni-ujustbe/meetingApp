import {
  ADD_TO_MENTOR_BOX,
  CLOSE_MENTOR_BOX,
  MENTOR_BOX_GROUP_INVITEE_TYPE,
  MENTOR_BOX_MAKE_UNIQE_ID,
  MENTOR_BOX_SINGLE_INVITEE_TYPE,
  OPEN_MENTOR_BOX,
  REMOVED_MENTOR_BOX_MEETING_DATA,
  REMOVED_MENTOR_BOX__ALL_MEETING_DATA,
  REMOVE_ALL_MENTOR_BOX,
  REMOVE_FROM_MENTOR_BOX,
  SEND_MENTOR_BOX_MEETING_DATA,
  } from "./Mentorbox.types";

const mentorinitialState = {
  showbox: false,
  partner: [],
  uniqueId: "",
  groupinvitee: false,
  sendmeeting: [],
};

const mentorboxReducer = (state = mentorinitialState, action) => {
  switch (action.type) {
    case ADD_TO_MENTOR_BOX:
      return { ...state, partner: [...state.partner, action.payload] };
    case REMOVE_ALL_MENTOR_BOX:
      return { ...state, partner: "", showbox: false };
    case OPEN_MENTOR_BOX:
      return { ...state, showbox: true };
    case CLOSE_MENTOR_BOX:
      return { ...state, showbox: false };
    case MENTOR_BOX_GROUP_INVITEE_TYPE:
      return { ...state, groupinvitee: true };
    case MENTOR_BOX_SINGLE_INVITEE_TYPE:
      return { ...state, groupinvitee: false, partner: "" };
    case MENTOR_BOX_MAKE_UNIQE_ID:
      return { ...state, uniqueId: action.payload };
    case SEND_MENTOR_BOX_MEETING_DATA:
      return { ...state, sendmeeting: [...state.sendmeeting, action.payload] };
    case REMOVE_FROM_MENTOR_BOX: {
      const partner = state.partner.filter(
        (partners) => partners._id !== action.payload,
        console.log("reducers products", partner)
      );
      return { ...state, partner, uniqueId: "", showbox: false };
    }
    case REMOVED_MENTOR_BOX_MEETING_DATA: {
      const sendmeeting = state.sendmeeting.filter(
        (sends) => sends.userId !== action.payload,
        console.log("reducers products", sendmeeting)
      );
      return { ...state, sendmeeting };
    }

    case REMOVED_MENTOR_BOX__ALL_MEETING_DATA:
      return { ...state, sendmeeting: ""};

    default:
      return state;
  }
};

export default mentorboxReducer;