import React from 'react'
import Header from "../component/layout/header/Header";
import MeetingdetailsController from '../component/meetingdetails/Meetingdetails.controller';

function invitationdetails() {
    return (
        <>
            <MeetingdetailsController/>
            <Header />
        </>
    )
}

export default invitationdetails