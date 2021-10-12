import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Search from "./Search";
import {
  fetchPrtner,
  buzData,
  selectPartners,
  unselectallPartner,
  unselectPartner,
  buzData2,
  currentCounts,
  searchtext,
  searchData,
} from "./Search.action";
// import {
//   addToInvitationBox,
//   groupinvitation,
//   makeid,
//   openBox,
//   removedMeetingData,
//   removePartner,
//   sendMeetingData,
//   singleinvitation,
// } from "../invitationbox/Invitationbox.action";
import {
  addtoSelectlp,
  removefromSelectlp,
  removeSelectlpAll,
} from "../selectinvite/Selectinvitee.action";
import { addToSearchBox, makesearchid, openSearchBox, removeConnectsearchBox, searchboxgroupinvitation, sendSearchMeetingData } from "../searchbox/Searchbox.action";

export class SearchController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPartner: "",
      currentParnerData: this.props.partnerdata,
    };
  }

  componentDidMount() {
    // if (this.props.partnerdata.currentcount === 20) {
    //   this.props.sendMsg(0);
    // }
    //this.props.sendMsg();
    //this.props.sendMsg2();
    console.log("component did mount",this.props.partnerdata.currentcount);
    //this.setState({ currentParnerData: this.props.partnerdata });
  }

  render() {
    console.log("listing props controll", this.props);
    return (
      <>
        <Search
          data={this.props.partnerdata}
          onaddToInvitationBox={this.props.onaddToInvitationBox}
          onGroupinvitation={this.props.onGroupinvitation}
          onSelectLP={this.props.onSelectLP}
          opengroupInvitation={this.props.onGroupInvitationBox}
          singleinvitation={this.props.singleinvitation}
          removeselectLp={this.props.removeselectLp}
          selectLP={this.props.selectLP}
          unselectLP={this.props.unselectLP}
          unselectLPall={this.props.unselectLPall}
          sendmeeting={this.props.sendmeeting}
          removemeeting={this.props.removemeeting}
          loadmore={this.props.sendMsg}
          currentcount={this.props.currentcount}
        />
        {/* <p>business Listing</p> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  partnerdata: state.searchResult,
  groupinvitaion: state.listing.groupinvitee,
});

const mapDispatchToProps = (dispatch) => ({
  sendMsg: () => {
    //dispatch(fetchPrtner());
    dispatch(searchData());
    // dispatch(buzData2());
  },
  // sendMsg2: () => {
  //   //dispatch(fetchPrtner());
  //   dispatch(loginUser());
  // },
  onaddToInvitationBox: (partner) => {
    dispatch(addToSearchBox(partner)),
      dispatch(openSearchBox()),
      dispatch(makesearchid());
    //dispatch(selectGroupInvitation());
  },
  onGroupinvitation: (data) => {
    dispatch(selectGroupInvitation(data));
  },
  singleinvitation: () => {
    dispatch(singleinvitation());
    //dispatch(removeSelectlpAll());
  },
  // singleinvitation: () => dispatch(singleinvitation()),
  onSelectLP: (partner) => {
    dispatch(addToSearchBox(partner));
    dispatch(addtoSelectlp(partner));
  },
  
  // removeSlectLP: (partner) => {
  //   dispatch(addToInvitationBox(partner));
  //   dispatch(addtoSelectlp(partner));
  // },
  currentcount:(counts)=> dispatch(currentCounts(counts)),
  searchtext:(searchtext)=> dispatch(searchtext(searchtext)),
  removeselectLp: (selectId) => dispatch(removefromSelectlp(selectId)),
  selectLP: (selectId) => dispatch(selectPartners(selectId)),
  sendmeeting: (selectId) => dispatch(sendSearchMeetingData(selectId)),
  removemeeting: (selectId) => dispatch(removedSearchMeetingData(selectId)),
  // unselectLP: (selectId) => dispatch(unselectPartner(selectId)),
  unselectLPall: () => dispatch(unselectallPartner()),
  onGroupInvitationBox: () => {
    dispatch(openSearchBox());
    dispatch(searchboxgroupinvitation());
    dispatch(makesearchid());
  },
  unselectLP: (selectId) => {
    dispatch(unselectPartner(selectId));
    dispatch(removeConnectsearchBox(selectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchController);