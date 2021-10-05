//import { ADD_TO_SELECTLP, REMOVED_FROM_SELECTLP, REMOVED_SELECTLP_ALL } from "./Selectinvitee.type";
import { ADD_TO_MENTOR_SELECTLP, REMOVED_FROM_MENTOR_SELECTLP, REMOVED_SELECTLP_MENTOR_ALL } from "./Selectmentorinvitee.type";

const selectedinitialState = {
  show: false,
  selectedLP: [],
};

const selctedmentorinviteeReducer = (state = selectedinitialState, action) => {
  switch (action.type) {
    case ADD_TO_MENTOR_SELECTLP:
      return { ...state, selectedLP: [...state.selectedLP, action.payload] };
    case REMOVED_SELECTLP_MENTOR_ALL:
      return { ...state, selectedLP:"" };

    case REMOVED_FROM_MENTOR_SELECTLP: {
      const selectedLP = state.selectedLP.filter(
        (partners) => partners._id !== action.payload,
        //console.log("reducers products", partner)
      );
      return { ...state, selectedLP, show:false};
    }

    default:
      return state;
  }
};

export default selctedmentorinviteeReducer
