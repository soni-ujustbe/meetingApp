import { CURRENT_COUNT_CONNECT, MENTOR_DATA_FAILURE, MENTOR_DATA_REQUEST, MENTOR_DATA_SUCCESS, MENTOR_GROUP_INVITATION, SELECTED_CONNECT, TOTAL_COUNTS_CONNECT, UNSELECTED_ALL_CONNECT, UNSELECTED_CONNECT } from "./Mentor.type";

const mentorInitialState = {
  loading: false,
  partner: [],
  error: "",
  groupinvitee: false,
  selectedpartner: [],
  totalcount:"",
  currentcount:20
};

const mentorReducer = (state = mentorInitialState, action) => {
  switch (action.type) {
    case MENTOR_DATA_REQUEST:
      return { ...state, loading: true };
    case MENTOR_DATA_SUCCESS:
      return { ...state, loading: false, partner: action.payload };
     // return { ...state, loading: false, partner:[...state.partner, ...action.payload]};
    case MENTOR_DATA_FAILURE:
      return { ...state, loading: true, error: action.error };
    case MENTOR_GROUP_INVITATION:
      return { ...state, groupinvitee: action.payload };
      case TOTAL_COUNTS_CONNECT:
        return { ...state, totalcount: action.payload };
      case CURRENT_COUNT_CONNECT:
        return { ...state, currentcount: action.payload };
    case SELECTED_CONNECT:
      return {
        ...state,
        selectedpartner: [...state.selectedpartner, action.payload],
      };
    case UNSELECTED_CONNECT: {
      const selectedpartner = state.selectedpartner.filter(
        (partners) => partners !== action.payload,
        console.log("reducers products", selectedpartner)
      );
      return { ...state, selectedpartner}; 
    };

    case UNSELECTED_ALL_CONNECT:
      return { ...state, selectedpartner:[] };

    default:
      return state;
  }
};

export default mentorReducer;