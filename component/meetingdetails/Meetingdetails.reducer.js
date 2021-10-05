import { FETCH_INVITATION_DETAILS_DATA_FAILURE, FETCH_INVITATION_DETAILS_DATA_REQUEST, FETCH_INVITATION_DETAILS_DATA_SUCCESS, GET_MEETING_ID } from "./Meetingdetails.types";

const meetingDetailsInitialState = {
  loading: false,
  meetingInfo: [],
  error: "",
  meetingid:""
};

const meetingdetailsReducer = (state = meetingDetailsInitialState, action) => {
  switch (action.type) {
    case FETCH_INVITATION_DETAILS_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_INVITATION_DETAILS_DATA_SUCCESS:
      return { ...state, loading: false, meetingInfo: action.payload };
    case FETCH_INVITATION_DETAILS_DATA_FAILURE:
      return { ...state, loading: true, error: action.error };
      case GET_MEETING_ID:
      return { ...state, meetingid: action.payload };
    default:
      return state;
  }
};

export default meetingdetailsReducer;