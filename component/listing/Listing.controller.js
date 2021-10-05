import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Listing from "./Listing";
import {
  fetchPrtner,
  buzData,
  selectGroupInvitation,
  selectPartners,
  unselectallPartner,
  unselectPartner,
  buzData2,
  currentCounts,
} from "./Listing.action";
import {
  addToInvitationBox,
  groupinvitation,
  makeid,
  openBox,
  removedMeetingData,
  removePartner,
  sendMeetingData,
  singleinvitation,
} from "../invitationbox/Invitationbox.action";
import {
  addtoSelectlp,
  removefromSelectlp,
  removeSelectlpAll,
} from "../selectinvite/Selectinvitee.action";
import { searchData } from "../search/Search.action";

export class ListingController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPartner: "",
      currentParnerData: this.props.partnerdata,
    };
  }

  componentDidMount() {
    if (this.props.partnerdata.currentcount === 20) {
      this.props.sendMsg(0);
    }
    
    //this.props.sendMsg2();
    console.log("component did mount",this.props.partnerdata.currentcount);
    //this.setState({ currentParnerData: this.props.partnerdata });
  }

  render() {
    console.log("listing props controll", this.props);
    return (
      <>
        <Listing
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
          searchresult={this.props.sendMsg2}
          currentcount={this.props.currentcount}
        />
        {/* <p>business Listing</p> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  partnerdata: state.listing,
  groupinvitaion: state.listing.groupinvitee,
});

const mapDispatchToProps = (dispatch) => ({
  sendMsg: (count, ccount, seachtext) => {
    //dispatch(fetchPrtner());
    dispatch(buzData(count, ccount, seachtext));
    // dispatch(buzData2());
  },
  sendMsg2: (seachtext) => {
    //dispatch(fetchPrtner());
    dispatch(searchData(seachtext));
    // dispatch(buzData2());
  },
  onaddToInvitationBox: (partner) => {
    dispatch(addToInvitationBox(partner)),
      dispatch(openBox()),
      dispatch(makeid());
    //dispatch(selectGroupInvitation());
  },
  onGroupinvitation: (data) => {
    dispatch(selectGroupInvitation(data));
  },
  singleinvitation: () => {
    dispatch(singleinvitation());
    dispatch(removeSelectlpAll());
  },
  // singleinvitation: () => dispatch(singleinvitation()),
  onSelectLP: (partner) => {
    dispatch(addToInvitationBox(partner));
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
  sendmeeting: (selectId) => dispatch(sendMeetingData(selectId)),
  removemeeting: (selectId) => dispatch(removedMeetingData(selectId)),
  // unselectLP: (selectId) => dispatch(unselectPartner(selectId)),
  unselectLPall: () => dispatch(unselectallPartner()),
  onGroupInvitationBox: () => {
    dispatch(openBox());
    dispatch(groupinvitation());
    dispatch(makeid());
  },
  unselectLP: (selectId) => {
    dispatch(unselectPartner(selectId));
    dispatch(removePartner(selectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingController);