import { combineReducers } from "redux";
import dashboardReducer from "./component/dashboard/Dashboard.reducer";
import invitationboxReducer from "./component/invitationbox/Invitationbox.reducer";
import invitationreceiveReducer from "./component/invitationreceive/Invitationreceive.reducer";
import invitationsentReducer from "./component/invitationsent/Invetationsent.reducer";
import listingReducer from "./component/listing/Listing.reducer";
import auth from "./component/login/reducers/auth";
import message from "./component/login/reducers/message";
import meetingdetailsReducer from "./component/meetingdetails/Meetingdetails.reducer";
import mentorReducer from "./component/mentor/Mentor.reducer";
import mentorboxReducer from "./component/mentorbox/Mentorbox.reducer";
import searchReducer from "./component/search/Search.reducer";
import searchboxReducer from "./component/searchbox/Searchbox.reducer";
import selctedinviteeReducer from "./component/selectinvite/Selectinvitee.reducer";
import selctedmentorinviteeReducer from "./component/selectmentorinvite/Selectmentorinvitee.reducer";

const rootReducer = combineReducers({
  listing: listingReducer,
  invitationpanel: invitationboxReducer,
  auth: auth,
  message: message,
  selectlp:selctedinviteeReducer,
  selectmentor:selctedmentorinviteeReducer,
  mentor:mentorReducer,
  mentorbox:mentorboxReducer,
  invitationsent:invitationsentReducer,
  invitationreceive:invitationreceiveReducer,
  userdata:dashboardReducer,
  meetingdetail:meetingdetailsReducer,
  searchResult:searchReducer,
  searchbox:searchboxReducer
});

export default rootReducer;