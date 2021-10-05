import React, { Component } from "react";
import { connect } from "react-redux";
import { unselectConnect } from "../mentor/Mentor.action";
import { makementorid, mentorboxgroupinvitation, openMentorBox, removedMentorMeetingData } from "../mentorbox/Mentorbox.action";
import { removementorfromSelectlp } from "./Selectmentorinvitee.action";
import SelectMentorinvitee from "./Selectmentorinvitee"; 

export class Selectmentorinviteecontroller extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      console.log("selected mentor", this.props),
      <SelectMentorinvitee
        data={this.props.selectedata}
        removelp={this.props.removeselectLp}
        opengroupInvitation ={this.props.onGroupInvitationBox}
      />
      // <SelectMentorinvitee/>
      // <p>test invitee</p>
      
    );
  }
}

const mapStateToProps = (state) => ({
  selectedata: state.selectmentor,
});

const mapDispatchToProps = (dispatch) => ({
  //removeselectLp: (selectId) => dispatch(removefromSelectlp(selectId)),
  onGroupInvitationBox: () => {
    dispatch(openMentorBox());
    dispatch(mentorboxgroupinvitation());
    dispatch(makementorid());
  },
  removeselectLp: (selectId) => {
    dispatch(removementorfromSelectlp(selectId));
    dispatch(unselectConnect(selectId));
    dispatch(removedMentorMeetingData(selectId));
    //dispatch(makeid());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Selectmentorinviteecontroller);