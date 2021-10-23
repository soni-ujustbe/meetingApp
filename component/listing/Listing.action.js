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
import axios from "axios";
import { useSelector } from "react-redux";



// export const fetchPrtner = () => {
//   return async function (dispatch) {
//     dispatch(fetdataRequest());
//     // return fetch("https://jsonplaceholder.typicode.com/users")
//     return (
//       fetch("https://api.ujustbe.com/get-partners/0/0")
//         //.then(handleErrors)
//         .then(
//           (res) => res.json()
//           //console.log("partnerdata", res)
//         )

//         .then((json) => {
//           dispatch(fetdataSuccess(json.data.partnersList));
//           return json;
//         })
//         .catch((error) => dispatch(fetdataFailure(error)))
//     );
//   };
// };



export const buzData = (count, ccount ) => {
  //const curentcount = useSelector(state => state.listing.currentcount);
  console.log("current counts" + count, "cccount"+ccount);
  return async function (dispatch) {
    dispatch(buzdataRequest());
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    const params = {
      categoryIds: "",
      searchTerm: "", 
      sortValue: 0,
      SearchType:2,
      latitude: 0,
      longitude: 0,
      userId: MessageList.data._id,
      skipTotal: count,
    };
    console.log("sending data",params);
    var headers = {
      "Content-Type": "application/json",
    };
    axios
      //.post("https://api.ujustbe.com/search-dashboard/business", params, {
      .post("https://api.ujustbe.com/search-dashboard/business", params, {
        headers: headers,
      })
      .then((response) => {
        console.log("apicount", response.data.data.listCount, "api count", count, "api current", ccount,);
        if (response.data.message[0].type === "SUCCESS") {
          console.log("success", ccount);
          // Login the user using dispatch
          //dispatch(loggedInUser(response['user']));
          dispatch(buzdataSuccess(response.data.data.businessList));
            dispatch(totalCounts(response.data.data.listCount));
          // if (response.data.data.listCount > count < ccount ) {
          //   dispatch(buzdataSuccess(response.data.data.businessList));
          //   dispatch(totalCounts(response.data.data.listCount));
          // }
        } else {
          // Send the error from API back
          dispatch(error(response.data.message));
        }
      });
  };
};


export const fetchPrtner = () => {
  return async function (dispatch) {
    dispatch(fetdataRequest());
    // return fetch("https://jsonplaceholder.typicode.com/users")
    return (
      fetch("https://api.ujustbe.com/get-partners/0/0")
        //.then(handleErrors)
        .then(
          (res) => res.json()
          //console.log("partnerdata", res)
        )

        .then((json) => {
          dispatch(fetdataSuccess(json.data.partnersList));
          return json;
        })
        .catch((error) => dispatch(fetdataFailure(error)))
    );
  };
};

export const fetdataRequest = (payload) => ({
  type: FETCH_DATA_REQUEST,
  payload,
});
export const fetdataSuccess = (partner) => ({
  type: FETCH_DATA_SUCCESS,
  payload: partner,
});
export const fetdataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});
export const buzdataRequest = (payload) => ({
  type: BUSSINESS_DATA_REQUEST,
  payload,
});
export const buzdataSuccess = (businesslist) => ({
  type: BUSSINESS_DATA_SUCCESS,
  payload: businesslist,
});
export const buzdataFailure = (error) => ({
  type: BUSSINESS_DATA_FAILURE,
  payload: error,
});

export const selectGroupInvitation = (data) => ({
  type: SELECT_GROUP_INVITATION,
  payload: data,
});
export const selectPartners = (data) => ({
  type: SELECTED_PARTNERS,
  payload: data,
});
export const unselectPartner = (partnerId) => ({
  type: UNSELECTED_PARTNERS,
  payload: partnerId,
});
export const unselectallPartner = () => ({
  type: UNSELECTED_ALL_PARTNERS,
});
export const totalCounts = (counts) => ({
  type: TOTAL_COUNTS,
  payload: counts,
});
export const currentCounts = (counts) => ({
  type: CURRENT_COUNT,
  payload: counts,
});