import React, { Component } from 'react'
import { connect } from 'react-redux'
import Meetingdetails from './Meetingdetails'
import { fetchinvitationdetails, getfetchinvitationdetails, getmeetingId } from './Meetingdetails.action';
import { withRouter } from "next/router"

export class Meetingdetailscontroller extends Component {
    constructor(props) {
        super(props);
      }
    
      componentDidMount() {
        //this.props.sendMsg();
        // const { query } = this.props.router;
        // console.log(query);
        //this.props.sendMsg2();
       // this.setState({ currentParnerData: this.props.partnerdata });
      }
    render() {
        console.log("meeting details props", this.props);
        return (
            <Meetingdetails data={this.props.meetingdetails} reloaddata={this.props.sendMsg} />
        )
    }
}

const mapStateToProps = (state) => ({
    meetingdetails:state.meetingdetail.meetingInfo
})

const mapDispatchToProps = (dispatch) => ({
    sendMsg: (meetingid) => {
      dispatch(getfetchinvitationdetails(meetingid));
    }
    
    
  });

export default connect(mapStateToProps, mapDispatchToProps)(Meetingdetailscontroller)