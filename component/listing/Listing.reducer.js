import {
  BUSSINESS_DATA_FAILURE,
  BUSSINESS_DATA_REQUEST,
  BUSSINESS_DATA_SUCCESS,
  CURRENT_COUNT,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  SEARCH_TERMS,
  SELECTED_PARTNERS,
  SELECT_GROUP_INVITATION,
  TOTAL_COUNTS,
  UNSELECTED_ALL_PARTNERS,
  UNSELECTED_PARTNERS,
} from "./Listing.type";

const listingInitialState = {
  loading: false,
  partner: [],
  businesslist: [],
  error: "",
  groupinvitee: false,
  selectedpartner: [],
  totalcount:"",
  searchtext:"",
  currentcount:20
};

const listingReducer = (state = listingInitialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, partner: action.payload };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: true, error: action.error };
    case BUSSINESS_DATA_REQUEST:
      return { ...state, loading: true };
    case BUSSINESS_DATA_SUCCESS:
      // return { ...state, loading: false, businesslist:action.payload };
      return { ...state, loading: false, businesslist:[...state.businesslist, ...action.payload]};
    case BUSSINESS_DATA_FAILURE:
      return { ...state, loading: true, error: action.error };
    case SELECT_GROUP_INVITATION:
      return { ...state, groupinvitee: action.payload };
    case TOTAL_COUNTS:
      return { ...state, totalcount: action.payload };
    case CURRENT_COUNT:
      return { ...state, currentcount: action.payload };
    case SELECTED_PARTNERS:
      return {
        ...state,
        selectedpartner: [...state.selectedpartner, action.payload],
      };
    case UNSELECTED_PARTNERS: {
      const selectedpartner = state.selectedpartner.filter(
        (partners) => partners !== action.payload,
        console.log("reducers products", selectedpartner)
      );
      return { ...state, selectedpartner}; 
    };

    case UNSELECTED_ALL_PARTNERS:
      return { ...state, selectedpartner:[] };

    default:
      return state;
  }
};

export default listingReducer;