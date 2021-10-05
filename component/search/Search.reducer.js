import {
  NO_RECORDS,
  SEARCH_CURRENT_COUNT,
  SEARCH_DATA_FAILURE,
  SEARCH_DATA_REQUEST,
  SEARCH_DATA_SUCCESS,
  SEARCH_TERMS,
  SEARCH_TOTAL_COUNTS,
  SELECT_GROUP_INVITATION,
  UNSELECTED_ALL_PARTNERS,
  UNSELECTED_PARTNERS,
} from "./Search.type";

const listingInitialState = {
  loading: false,
  businesslist: [],
  error: "",
  groupinvitee: false,
  selectedpartner: [],
  totalcount: "",
  searchtext: "",
  currentcount: 20,
  norecords: []
};

const searchReducer = (state = listingInitialState, action) => {
  switch (action.type) {
    case SEARCH_DATA_REQUEST:
      return { ...state, loading: true };
    case SEARCH_DATA_SUCCESS:
      return { ...state, loading: false, businesslist: action.payload };
    //return { ...state, loading: false, businesslist:[...state.businesslist, ...action.payload]};
    case SEARCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SELECT_GROUP_INVITATION:
      return { ...state, groupinvitee: action.payload };
    case SEARCH_TOTAL_COUNTS:
      return { ...state, totalcount: action.payload };
    case SEARCH_CURRENT_COUNT:
      return { ...state, currentcount: action.payload };
    case SEARCH_TERMS:
      return { ...state, searchtext: action.payload };

    case NO_RECORDS:
      return { ...state, loading: false, norecords: action.payload };

    case UNSELECTED_PARTNERS: {
      const selectedpartner = state.selectedpartner.filter(
        (partners) => partners !== action.payload,
        console.log("reducers products", selectedpartner)
      );
      return { ...state, selectedpartner };
    };

    case UNSELECTED_ALL_PARTNERS:
      return { ...state, selectedpartner: [] };

    default:
      return state;
  }
};

export default searchReducer;