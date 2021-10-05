import React, { useState } from "react";
import Header from '../layout/header/Header';
import styles from "../../styles/Listing.module.scss";
import Link from 'next/link'
import axios from "axios";
function Dashboard(props) {
  const [value, setValue] = useState("");
  const [metId, setMetid] = useState("");
  const [openpop, setopenpop] = useState(false)
  const [meetinguser, setmeetinguser] = useState("")
  const [acceptmeeting, setaccept] = useState(false)
  const [rejectmeeting, setreject] = useState(false)
  const [Reason, setReason] = useState(null);
  console.log("receive meeting invitation", props);

  function openPopup(fromuser) {
    setopenpop(true)
    setmeetinguser(fromuser)
  }
  function rejectmeetings(meetId, fromuser) {
    setopenpop(true)
    setmeetinguser(fromuser)
    setreject(true)
    setMetid(meetId)
  }

  function closePopup(fromuser) {
    setopenpop(false)
    setmeetinguser("")
  }

  function handlemeeting(meetId) {
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    console.log("meetid", meetId);
    const meetingdata = {
      meetingId: meetId,
      userId: MessageList.data._id,
      status: "Accept",
      updatedBy: MessageList.data._id,
    };
    console.log("meeting data", meetingdata);
    //console.log("this userId", article);
    const headers = {
      "Content-Type": "application/json",
      token: "ky23eiqgw5",
    };
    axios
      .put("https://api-test.ujustbe.com/UpdateStatus", meetingdata, {
        headers: headers,
      })
      .then((response) => console.log(response));
    //.then(response => setArticleId(response.data.id));
  }

  function rejectmeetingapi() {
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    console.log("meetid", metId);
    const meetingdata = {
      meetingId: metId,
      userId: MessageList.data._id,
      status: "Rejected",
      updatedBy: MessageList.data._id,
      rejectReason: Reason
    };
    console.log("meeting data", meetingdata);
    //console.log("this userId", article);
    const headers = {
      "Content-Type": "application/json",
      token: "ky23eiqgw5",
    };
    axios
      .put("https://api-test.ujustbe.com/UpdateStatus", meetingdata)
      .then(
        (res) => {
          console.log(res.data.message[0].type)
          if (res.data.message[0].type === "SUCCESS") {
            console.log("true");
            setrejectdone(true)
            //setmeetinguser(fromuser)
            props.fetchinvite();
          }
        }
      )
  }
  return (
    console.log("dashboard data", props.data),

    <>
      <div className="dashboarTop">
        <div className="left">
          <div className="profilePic">
            <img src={"https://api-test.ujustbe.com/" + props.data.userdata.imgUrl} />
          </div>
          <h1>{props.data.userdata.firstName} {props.data.userdata.lastName}</h1>
        </div>
        <div className="right">
          <img src="/images/notification.png" />
        </div>
      </div>

      <>

        <div className={styles.CardWrapper}>
          <h2>Invitation Sent</h2>
          <ul>
            {props.data.sentdata.length > 0 ? (
              props.data.sentdata.slice(0, 2).map((item, i) => (
                //console.log(item),
                <li className={`${styles.listingCard} ${styles.columnflex}`}>
                  <h3>Agenda : {item.agenda}</h3>
                  <h6  >Meeting Code : {item.meetingCode}</h6>
                  <h4>{item.created.created_On.split(/[T,.]/, 2).map((time) => <span>{time}</span>)}</h4>
                  {item.toUsersList.map((frmlist) => (
                    <div className={frmlist.status === "Accept" ? `${styles.statusBox} ${styles.accept}` : `${styles.statusBox}` && frmlist.status === "Rejected" ? `${styles.statusBox} ${styles.reject}` : `${styles.statusBox}` }>
                    <h5>{frmlist.toUserName}  </h5>
                    <div className={styles.statusRow}>
                      <h6>Status : </h6> <h4>{frmlist.updatedOn ? frmlist.updatedOn.split(/[T,.]/, 2).map((time) => <span>{time}</span>) : null}</h4>
                    </div>
                    {frmlist.status == "null" || frmlist.status == null ? <h2>Awaiting</h2> : <h2>{frmlist.status}</h2>}
                    {frmlist.status == "Rejected" ? <p>
                    {frmlist.rejectReason}
                    </p> : null}

                  </div>
                  ))}

                  {/* <div className={styles.actionRow}>
                    <button className={styles.donebtn}>Accept</button>
                    <button className={styles.canclebtn}>Reject</button>
                  </div> */}
                  <Link href={"/invitationdetails?name=" + item.meetingId}>
                    <a className={styles.Cardlink} onClick={() => props.meetingId(item.meetingId)} >link</a>
                  </Link>
                </li>
              ))
            ) : (
              <>
                {
                  props.data.loading ? <p>Loading...</p> : <p>No meeting yet sent</p>
                }
              </>
            )}
          </ul>
          {props.data.sentdata.length > 0 ?
            <Link href="#">
              <a className="donebtn dashboardbtn">See More</a>
            </Link> : null}
        </div>

      </>

      <>

        <div className={styles.CardWrapper}>
          <h2>Invitation Receive</h2>
          <ul>
            {props.data.receivedata.length > 0 && props.data.receivedata ? (
              props.data.receivedata.slice(0, 2).map((item, i) => (
                //console.log(item),
                <li className={`${styles.listingCard} ${styles.columnflex}`}>
                  <h2>From : {item.fromUserName}</h2>
                  <h6>Meeting Code : {item.meetingCode}</h6>
                  {/* <h4>{item.created.created_On}</h4> */}
                  <h4>{item.created.created_On.split(/[T,.]/, 2).map((time) => <span>{time}</span>)}</h4>
                  {
                    item.toUsersList.length > 1 ? <h5>Group Meeting({item.toUsersList.length - 1})</h5> : <h5>Indvidual Meeting</h5>
                  }

                  {item.toUsersList.map((frmlist) => (
                    <>
                      {props.data.userdata.userId.indexOf(frmlist.userId) !== -1 && frmlist.status !== "null" ?
                        // <div className={styles.statusBox}>
                        <div className={frmlist.status === "Accept" ? `${styles.statusBox} ${styles.accept}` : `${styles.statusBox}` && frmlist.status === "Rejected" ? `${styles.statusBox} ${styles.reject}` : `${styles.statusBox}`}>
                          <h5>You have  </h5>
                          <div className={styles.statusRow}>
                            <h6>Status : </h6> <h4>{frmlist.updatedOn ? frmlist.updatedOn.split(/[T,.]/, 2).map((time) => <span>{time}</span>) : null}</h4>
                          </div>
                          {frmlist.status == "null" || frmlist.status == null ? <h2>Awaiting</h2> : <h2>{frmlist.status}</h2>}
                          {frmlist.status == "Rejected" ? <p>
                            {frmlist.rejectReason}
                          </p> : null}

                        </div> : null
                      }
                    </>

                  ))
                  }

                  {item.toUsersList.map((frmlist) => (
                    <>
                      {
                        // <div className={styles.statusBox}>
                        <div className={
                          props.data.userdata.userId.indexOf(frmlist.userId) !== -1
                            ? `${styles.statusBox} ${styles.selected}`
                            : styles.statusBox && frmlist.status !== "null" ? `${styles.statusBox} ${styles.hidecard}` : styles.statusBox
                        }>
                          <h5>{frmlist.toUserName}</h5>
                          <div className={styles.statusRow}>
                            <h6>Status : </h6> <h4>{frmlist.updatedOn ? frmlist.updatedOn.split(/[T,.]/, 2).map((time) => <span>{time}</span>) : null}</h4>
                          </div>
                          {frmlist.status == "null" || frmlist.status == null ? <h2>Awaiting</h2> : <h2>{frmlist.status}</h2>}
                          {frmlist.status === "Rejected" ? <p>
                            {frmlist.rejectReason}
                          </p> : null}
                        </div>
                      }
                    </>

                  ))
                  }

                  {item.toUsersList.map((frmlist) => (

                    <>
                      {props.data.userdata.userId.indexOf(frmlist.userId) !==
                        -1 && frmlist.status === "null" ?
                        <div className={styles.actionRow}>
                          <button className={styles.donebtn} onClick={() => handlemeeting(item.meetingId, item.fromUserName)}>Accept</button>
                          {/* <button className={styles.donebtn} onClick={() => openPopup(item.fromUserName)}>Accept</button> */}
                          <button className={styles.canclebtn} onClick={() => rejectmeetings(item.meetingId, item.fromUserName)}>Reject</button>
                        </div> : null
                      }
                    </>
                  )

                  )

                  }
                  {/* <Link  href= {"/invitationdetails?name="+item.meetingId}>
                    <a className={styles.Cardlink} onClick={()=>props.meetingId(item.meetingId)} >link</a>
                  </Link> */}
                </li>
              ))
            ) : (
              <>
                {
                  props.data.loading ? <p>Loading...</p> : <>
                    <p>No meeting yet received</p>
                    <Link href="/partner"><a className="donebtn dashboardotherbtn">Send Meeting Invitation</a></Link>

                  </>
                }
              </>
            )}
          </ul>
          {props.data.receivedata.length > 0 ?
            <Link href="#">
              <a className="donebtn dashboardbtn">See More</a>
            </Link> : null}

        </div>

        {
          openpop ? <div className="popupMain">
            <div className="bg" onClick={() => closePopup()}></div>

            {
              acceptmeeting ? <div className="popupBox">
                <div className="success-icon">
                  <img src="/images/done.png" />
                </div>
                <h2>Thank You Accepted</h2>
                {
                  <p>Invitation from {meetinguser}</p>
                }
              </div> : null
            }

            {
              rejectmeeting ? <div className="popupBox">
                <div className="reject-icon">
                  <img src="/images/close.png" />
                </div>
                {
                  rejectdone ? <h2>You have rejected the meeting </h2> : <h2>Resons for rejection </h2>
                }



                {
                  rejectdone ? null : <>
                    <textarea value={Reason}
                      onChange={onChangeReason}
                      name="Reason"
                      autocomplete="false" placeholder="Enter reson">
                    </textarea>
                    <abbr>{charcount} Characters</abbr>
                  </>
                }
                {
                  rejectdone ? <p>You have reject the meeting invitation from {meetinguser}</p> : null
                }
                {
                  rejectdone ? null : <button className="donebtn" disabled={!disablebtn} onClick={() => rejectmeetingapi()}>Submit</button>
                }

              </div> : null
            }
          </div> : null
        }
      </>
      {/* <InvetationsentController /> */}
      <Header />
    </>
  );
}

export default Dashboard