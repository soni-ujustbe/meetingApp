import { ADD_TO_SELECTLP, REMOVED_FROM_SELECTLP, REMOVED_SELECTLP_ALL } from "./Selectinvitee.type";

const selectedinitialState = {
  show: false,
  selectedLP: [],
};

const selctedinviteeReducer = (state = selectedinitialState, action) => {
  switch (action.type) {
    case ADD_TO_SELECTLP:
      return { ...state, selectedLP: [...state.selectedLP, action.payload] };
    case REMOVED_SELECTLP_ALL:
      return { ...state, selectedLP:"" };

    case REMOVED_FROM_SELECTLP: {
      const selectedLP = state.selectedLP.filter(
        (partners) => partners.userId !== action.payload,
        //console.log("reducers products", partner)
      );
      return { ...state, selectedLP, show:false};
    }

    default:
      return state;
  }
};

export default selctedinviteeReducer
