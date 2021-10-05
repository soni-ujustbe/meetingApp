import { ADD_TO_SELECTLP, REMOVED_FROM_SELECTLP, REMOVED_SELECTLP_ALL } from "./Selectinvitee.type";

export const addtoSelectlp = (selectlp) => ({
    type: ADD_TO_SELECTLP,
    payload:selectlp
})

export const removefromSelectlp = (selectId) => ({
    type: REMOVED_FROM_SELECTLP,
    payload:selectId
})
export const removeSelectlpAll = () => ({
    type: REMOVED_SELECTLP_ALL,
    //payload:selectId
})
