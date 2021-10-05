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

const invitationinitialState = {
  showbox: false,
  partner: [],
  uniqueId: "",
  groupinvitee: false,
  sendmeeting:[]
};

const invitationboxReducer = (state = invitationinitialState, action) => {
  switch (action.type) {
    case ADD_TO_INVITATION_BOX:
      return { ...state, partner: [...state.partner, action.payload] };
    case REMOVE_ALL:
      return { ...state, partner: "", showbox: false };
    case OPEN_INVITATION_BOX:
      return { ...state, showbox: true };
    case CLOSE_INVITATION_BOX:
      return { ...state, showbox: false };
    case GROUP_INVITEE_TYPE:
      return { ...state, groupinvitee: true };
    case SINGLE_INVITEE_TYPE:
      return { ...state, groupinvitee: false, partner: "" };
    case MAKE_UNIQE_ID:
      return { ...state, uniqueId: action.payload };
    case SEND_MEETING_DATA:
      return { ...state, sendmeeting: [...state.sendmeeting, action.payload] };
    case REMOVE_FROM_INVITATION_BOX: {
      const partner = state.partner.filter(
        (partners) => partners.userId !== action.payload,
        console.log("reducers products", partner)
      );
      return { ...state, partner, uniqueId: "", showbox: false };
    }
    case REMOVED_MEETING_DATA: {
      const sendmeeting = state.sendmeeting.filter(
        (sends) => sends.userId !== action.payload,
        console.log("reducers products", sendmeeting)
      );
      return { ...state, sendmeeting};
    }
    case REMOVED_ALL_MEETING_DATA:
      return { ...state, sendmeeting: "" };

    default:
      return state;
  }
};

export default invitationboxReducer;