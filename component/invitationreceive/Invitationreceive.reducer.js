import {
  FETCH_INVITATIONRECEIVE_FAILURE,
  FETCH_INVITATIONRECEIVE_REQUEST,
  FETCH_INVITATIONRECEIVE_SUCCESS,
  FETCH_USERID,
} from "./Invitationreceive.type";

const invitationInitialState = {
  loading: false,
  invitations: [],
  userid:""
};

const invitationreceiveReducer = (state = invitationInitialState, action) => {
  switch (action.type) {
    case FETCH_INVITATIONRECEIVE_REQUEST:
      return { ...state, loading: true };
    case FETCH_INVITATIONRECEIVE_SUCCESS:
      return { ...state, loading: false, invitations: action.payload };
    case FETCH_INVITATIONRECEIVE_FAILURE:
      return { ...state, loading: true, error: action.error };
    case FETCH_USERID:
      return { ...state, userid:action.payload  };

    default:
      return state;
  }
};

export default invitationreceiveReducer;