import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getmeetingId } from '../meetingdetails/Meetingdetails.action'
import Invetationreceive from './Invitationreceive'
import { fetchinvitationreceive } from './Invitationreceive.action'

export class Invetationsentcontroller extends Component {
    constructor(props){
        super(props)

    }
    componentDidMount() {
        this.props.fetchInvitee();
        //this.setState({ currentParnerData: this.props.partnerdata });
      }
    render() {
        console.log("props invitation receive controller", this.props);
        return (
            <Invetationreceive data={this.props.data} fetchinvite={this.props.fetchInvitee} meetingId={this.props.meetingId}/>
            //  <p>test</p>
        )
    }
}

const mapStateToProps = (state) => ({
    data:state.invitationreceive
})

const mapDispatchToProps = (dispatch) => ({
    fetchInvitee: () => {
      dispatch(fetchinvitationreceive());
    },
    meetingId: (meetingId) => dispatch(getmeetingId(meetingId))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Invetationsentcontroller)