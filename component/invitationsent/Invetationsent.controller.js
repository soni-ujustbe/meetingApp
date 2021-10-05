import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getfetchinvitationdetails, getmeetingId } from '../meetingdetails/Meetingdetails.action'
import Invetationsent from './Invetationsent'
import { fetchinvitationsent } from './Invetationsent.action'

export class Invetationsentcontroller extends Component {
    constructor(props){
        super()

    }
    componentDidMount() {
        this.props.fetchInvitee();
        //this.setState({ currentParnerData: this.props.partnerdata });
      }
    render() {
        console.log("props invitee controller", this.props);
        return (
            <Invetationsent data={this.props.data} meetingId={this.props.meetingId} meetingdetails={this.props.meetingdetails}/>
        )
    }
}

const mapStateToProps = (state) => ({
    data:state.invitationsent
})

const mapDispatchToProps = (dispatch) => ({
    fetchInvitee: () => {
      dispatch(fetchinvitationsent());
    },
    meetingdetails: (meetingid) => {
      dispatch(getfetchinvitationdetails(meetingid));
    },
    meetingId: (meetingId) => dispatch(getmeetingId(meetingId))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Invetationsentcontroller)