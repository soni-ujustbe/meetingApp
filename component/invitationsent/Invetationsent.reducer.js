import {
  FETCH_INVITATIONSENT_FAILURE,
  FETCH_INVITATIONSENT_REQUEST,
  FETCH_INVITATIONSENT_SUCCESS,
} from "./Invetationsent.type";

const invitationInitialState = {
  loading: false,
  invitations: [],
};

const invitationsentReducer = (state = invitationInitialState, action) => {
  switch (action.type) {
    case FETCH_INVITATIONSENT_REQUEST:
      return { ...state, loading: true };
    case FETCH_INVITATIONSENT_SUCCESS:
      return { ...state, loading: false, invitations: action.payload };
    case FETCH_INVITATIONSENT_FAILURE:
      return { ...state, loading: true, error: action.error };

    default:
      return state;
  }
};

export default invitationsentReducer;