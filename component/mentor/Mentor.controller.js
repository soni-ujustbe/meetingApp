import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchMentor,
  mentorGroupInvitation,
  selectConnect,
  unselectallConnect,
  unselectConnect,
} from "./Mentor.action";
import {
  addToInvitationBox,
  groupinvitation,
  makeid,
  openBox,
  singleinvitation,
} from "../invitationbox/Invitationbox.action";
import {
  addtoSelectlp,
  removefromSelectlp,
  removeSelectlpAll,
} from "../selectinvite/Selectinvitee.action";
import Mentor from "./Mentor";
import { addToMentorBox, makementorid, mentorboxgroupinvitation, mentorboxsingleinvitation, openMentorBox, removeConnectmentorBox, removedMentorMeetingData, sendMentorMeetingData } from "../mentorbox/Mentorbox.action";
import { addtomentorSelectlp, removementorfromSelectlp, removementorSelectlpAll } from "../selectmentorinvite/Selectmentorinvitee.action";

export class MentorController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPartner: "",
      currentParnerData: this.props.partnerdata,
    };
  }

  componentDidMount() {
    this.props.sendMsg();
    this.setState({ currentParnerData: this.props.partnerdata });
  }

  render() {
    //console.log("mentor controller props", this.props);
    return (
      <>
        <Mentor
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
        />
        {/* <p>test</p> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  partnerdata: state.mentor,
  groupinvitaion: state.mentor.groupinvitee,
});

const mapDispatchToProps = (dispatch) => ({
  sendMsg: () => {
    dispatch(fetchMentor());
  },
  onaddToInvitationBox: (partner) => {
    dispatch(addToMentorBox(partner)),
      dispatch(openMentorBox()),
      dispatch(makementorid());
  },
  onGroupinvitation: (data) => {
    dispatch(mentorGroupInvitation(data));
  },
  singleinvitation: () => {
    dispatch(mentorboxsingleinvitation());
    dispatch(removementorSelectlpAll());
  },
  onSelectLP: (partner) => {
    dispatch(addToMentorBox(partner));
    dispatch(addtomentorSelectlp(partner));
  },
  // onSelectLP: (partner) => {
  //   dispatch(addToMentorBox(partner));
  //   dispatch(addtoSelectlp(partner));
  // },
  removeselectLp: (selectId) => dispatch(removementorfromSelectlp(selectId)),
  selectLP: (selectId) => dispatch(selectConnect(selectId)),
  sendmeeting: (selectId) => dispatch(sendMentorMeetingData(selectId)),
  removemeeting: (selectId) => dispatch(removedMentorMeetingData(selectId)),
  //unselectLP: (selectId) => dispatch(unselectConnect(selectId)),
  unselectLPall: () => dispatch(unselectallConnect()),
  onGroupInvitationBox: () => {
    dispatch(openMentorBox());
    dispatch(mentorboxgroupinvitation());
    dispatch(makementorid());
  },
  unselectLP: (selectId) => {
    dispatch(unselectConnect(selectId));
    dispatch(removeConnectmentorBox(selectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MentorController);