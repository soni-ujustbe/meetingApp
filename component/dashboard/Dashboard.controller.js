import React, { Component } from "react";
import { connect } from "react-redux";
import { getmeetingId } from "../meetingdetails/Meetingdetails.action";
import Dashboard from "./Dashboard";
import { getUserData, receiveinvitation, sentinvitation } from "./Dashboard.action";

export class Dashboardcontroller extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.sendMsg();
  }

  render() {
    //console.log("dashboard props", this.props);
    return <Dashboard data={this.props.data} fetchinvite={this.props.sendMsg} meetingId={this.props.meetingId}/>;
  }
}

const mapStateToProps = (state) => ({
    data:state.userdata
});

const mapDispatchToProps = (dispatch) => ({
    sendMsg: () => {
      dispatch(getUserData());
      dispatch(sentinvitation());
      dispatch(receiveinvitation());
    },
    meetingId: (meetingId) => dispatch(getmeetingId(meetingId))
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboardcontroller);