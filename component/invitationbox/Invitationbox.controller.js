import React, { Component } from "react";
import { connect } from "react-redux";
import { unselectallPartner } from "../listing/Listing.action";
import { removeSelectlpAll } from "../selectinvite/Selectinvitee.action";
import Invitationbox from "./Invitationbox";
import {
  addToInvitationBox,
  groupinvitation,
  makeid,
  openBox,
  removeAll,
  removedAllMeetingData,
  removedMeetingData,
  removePartner,
  singleinvitation,
} from "./Invitationbox.action";

export class Invitationboxcontroller extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("controller invitation", this.props);
    return (
      <Invitationbox
        data={this.props.data}
        openbox={this.props.openbox}
        uniqueId={this.props.uniqueId}
        removeFrompannel={this.props.removeFrompannel}
        groupinvitee={this.props.groupmeeting}
        opengroupInvitation={this.props.onGroupInvitationBox}
        removedall={this.props.removedall}
        singleinvitation={this.props.singleinvitation}
        sendmeeting={this.props.sendmeeting}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.invitationpanel.partner,
  openbox: state.invitationpanel.showbox,
  uniqueId: state.invitationpanel.uniqueId,
  groupmeeting: state.invitationpanel.groupinvitee,
  sendmeeting: state.invitationpanel.sendmeeting,
  
});

// const mapDispatchToProps = {

// }

const mapDispatchToProps = (dispatch) => ({
  removeFrompannel: (partnerId) => dispatch(removePartner(partnerId)),
  singleinvitation: () => dispatch(singleinvitation()),
  //removedall: () => dispatch(removeAll()),
  onGroupInvitationBox: () => {
    dispatch(openBox());
    dispatch(groupinvitation());
    dispatch(makeid());
  },
  removedall: () => {
    dispatch(removeAll());
    dispatch(removeSelectlpAll());
    dispatch(unselectallPartner());
    dispatch(removedAllMeetingData())
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invitationboxcontroller);