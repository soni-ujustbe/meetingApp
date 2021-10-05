import React, { Component } from "react";
import { connect } from "react-redux";
import { unselectallConnect } from "../mentor/Mentor.action";
import { removementorSelectlpAll } from "../selectmentorinvite/Selectmentorinvitee.action";
import Mentorbox from "./Mentorbox";
import { makementorid, mentorboxgroupinvitation, mentorboxsingleinvitation, openMentorBox, removeAllmentorBox, removeConnectmentorBox, removedMentorAllMeetingData } from "./Mentorbox.action";
// import {
//   addToInvitationBox,
//   groupinvitation,
//   makeid,
//   openBox,
//   removeAll,
//   removePartner,
//   singleinvitation,
// } from "./Mentorbox.action";

export class Mentorboxcontroller extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("controller invitation", this.props);
    return (
      <Mentorbox
        data={this.props.data}
        openbox={this.props.openbox}
        uniqueId={this.props.uniqueId}
        removeFrompannel={this.props.removeFrompannel}
        groupinvitee={this.props.groupmeeting}
        opengroupInvitation={this.props.onGroupInvitationBox}
        removedall={this.props.removedall}
        singleinvitation={this.props.singleinvitation}
        sendmeeting={this.props.sendmeeting}
        removemeeting={this.props.removemeeting}
      />
      // <p>test mentor</p>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.mentorbox.partner,
  openbox: state.mentorbox.showbox,
  uniqueId: state.mentorbox.uniqueId,
  groupmeeting: state.mentorbox.groupinvitee,
  sendmeeting: state.mentorbox.sendmeeting,
  
});

// const mapDispatchToProps = {

// }

const mapDispatchToProps = (dispatch) => ({
  removeFrompannel: (partnerId) => dispatch(removeConnectmentorBox(partnerId)),
  singleinvitation: () => dispatch(mentorboxsingleinvitation()),
  //removedall: () => dispatch(removeAll()),
  onGroupInvitationBox: () => {
    dispatch(openMentorBox());
    dispatch(mentorboxgroupinvitation());
    dispatch(makementorid());
  },
  removedall: () => {
    dispatch(removeAllmentorBox());
    dispatch(removementorSelectlpAll())
    dispatch(removedMentorAllMeetingData());
    dispatch(unselectallConnect())
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mentorboxcontroller);