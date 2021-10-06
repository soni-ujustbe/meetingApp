import {
  FETCH_USERID,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  RECEIVE_INVITATION_DATA_FAILURE,
  RECEIVE_INVITATION_DATA_REQUEST,
  RECEIVE_INVITATION_DATA_SUCCESS,
  SENT_INVITATION_DATA_FAILURE,
  SENT_INVITATION_DATA_REQUEST,
  SENT_INVITATION_DATA_SUCCESS,
} from "./Dashboard.types";

const usedataInitial = {
  loading: false,
  userdata: [],
  receivedata: [],
  sentdata: [],
  userid: ""
};

const dashboardReducer = (state = usedataInitial, action) => {
  switch (action.type) {
    case GET_USER_DATA_REQUEST:
      return { ...state, loading: true };
    case GET_USER_DATA_SUCCESS:
      return { ...state, loading: false, userdata: action.payload };
    case GET_USER_DATA_FAILURE:
      return { ...state, loading: true, error: action.error };
    case SENT_INVITATION_DATA_REQUEST:
      return { ...state, loading: true };
    case SENT_INVITATION_DATA_SUCCESS:
      return { ...state, loading: false, sentdata: action.payload };
    case SENT_INVITATION_DATA_FAILURE:
      return { ...state, loading: true, error: action.error };
    case RECEIVE_INVITATION_DATA_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_INVITATION_DATA_SUCCESS:
      return { ...state, loading: false, receivedata: action.payload };
    case RECEIVE_INVITATION_DATA_FAILURE:
      return { ...state, loading: true, error: action.error };
    case FETCH_USERID:
      return { ...state, userid: action.payload };
    default:
      return state;
  }
};

export default dashboardReducer;