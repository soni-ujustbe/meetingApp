import React, { Component } from "react";
import { connect } from "react-redux";
import {
  groupinvitation,
  makeid,
  openBox,
  removedMeetingData,
  removePartner,
} from "../invitationbox/Invitationbox.action";
import { unselectPartner } from "../listing/Listing.action";
import Selectinvitee from "./Selectinvitee";
import { removefromSelectlp } from "./Selectinvitee.action";

export class Selectinviteecontroller extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      //console.log("selected LP", this.props),
      <Selectinvitee
        data={this.props.selectedata}
        removelp={this.props.removeselectLp}
        opengroupInvitation ={this.props.onGroupInvitationBox}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  selectedata: state.selectlp,
});

const mapDispatchToProps = (dispatch) => ({
  //removeselectLp: (selectId) => dispatch(removefromSelectlp(selectId)),
  onGroupInvitationBox: () => {
    dispatch(openBox());
    dispatch(groupinvitation());
    dispatch(makeid());
  },
  removeselectLp: (selectId) => {
    dispatch(removefromSelectlp(selectId));
    dispatch(unselectPartner(selectId));
    dispatch(removedMeetingData(selectId));
    //dispatch(makeid());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Selectinviteecontroller);