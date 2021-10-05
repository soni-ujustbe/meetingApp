// import { ADD_TO_SELECTLP, REMOVED_FROM_SELECTLP, REMOVED_SELECTLP_ALL } from "./Selectinvitee.type";

import { ADD_TO_MENTOR_SELECTLP, REMOVED_FROM_MENTOR_SELECTLP, REMOVED_SELECTLP_MENTOR_ALL } from "./Selectmentorinvitee.type"

export const addtomentorSelectlp = (selectlp) => ({
    type: ADD_TO_MENTOR_SELECTLP,
    payload:selectlp
})

export const removementorfromSelectlp = (selectId) => ({
    type: REMOVED_FROM_MENTOR_SELECTLP,
    payload:selectId
})
export const removementorSelectlpAll = () => ({
    type: REMOVED_SELECTLP_MENTOR_ALL,
    //payload:selectId
})
