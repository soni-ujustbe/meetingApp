import React, { useState } from "react";
import styles from "../../styles/Listing.module.scss";
import axios from "axios";
import Link from 'next/link'

function Invetationreceive2(props) {
  console.log("receive data", props);
  const [value, setValue] = useState("");
  const [metId, setMetid] = useState("");
  const [openpop, setopenpop] = useState(false)
  const [meetinguser, setmeetinguser] = useState("")
  const [acceptmeeting, setaccept] = useState(false)
  const [rejectmeeting, setreject] = useState(false)
  const [rejectdone, setrejectdone] = useState(false)
  const [disablebtn, setDisablebtn] = useState(false);
  const [Reason, setReason] = useState(null);
  const [charcount, setcharcount] = useState("150")
  console.log("receive meeting invitation", props);

  function openPopup(fromuser) {
    setopenpop(true)
    setmeetinguser(fromuser)
    setaccept(true)
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
    setreject(false)
    setreject(false)
    setReason(null)
    setrejectdone(false)
  }

  function handlemeeting(meetId, fromuser) {
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
      .put("https://api.ujustbe.com/UpdateStatus", meetingdata)
      .then(
        (res) => {
          console.log(res.data.message[0].type)
          if (res.data.message[0].type === "SUCCESS") {
            console.log("true");
            setopenpop(true)
            setmeetinguser(fromuser)
          }
        }
      )
    //.then((json) => console.log(json))
    // .then((response) => {if (response.statusText==="OK") {
    //   console.log("true update");
    // }})
    //.then(response => setArticleId(response.data.id));
  }


  const onChangeReason = (e) => {
    const Reason = e.target.value;
    setcharcount(150 - Reason.length)
    if (Reason.length < 1) {
      //setErruser(true);
      setDisablebtn(false);
    } else {
      //setErruser(false);
      //setFocususer(true);
      setDisablebtn(true);
    }
    setReason(Reason);
  };
  function rejectmeetingapi() {
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    console.log("meetid", metId);
    const meetingdata = {
      meetingId: metId,
      userId: MessageList.data._id,
      status: "Rejected",
      updatedBy: MessageList.data._id,
    };
    console.log("meeting data", meetingdata);
    //console.log("this userId", article);
    const headers = {
      "Content-Type": "application/json",
      token: "ky23eiqgw5",
    };
    axios
      .put("https://api.ujustbe.com/UpdateStatus", meetingdata)
      .then(
        (res) => {
          console.log(res.data.message[0].type)
          if (res.data.message[0].type === "SUCCESS") {
            console.log("true");
            setrejectdone(true)
            //setmeetinguser(fromuser)
          }
        }
      )
  }

  return (
    <>
      {
        props.data.invitations.length > 0 ? <div className={styles.searchBox}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {/* auto complete */}
          {/* <div className={styles.autocompleteBox}>
                  <ul>
                    {props.data.partner.length > 0 ? (
                      props.data.partner
                        .filter((item) => {
                          if (!value) return true;
                          if (
                            item.firstName.includes(value) ||
                            item.lastName.includes(value) ||
                            item.role.includes(value)
                          ) {
                            return true;
                          }
                        })
                        .map((item, i) => (
                          //console.log(item),
                          <li key={i}>
                            {item.firstName} {item.lastName}
                          </li>
                        ))
                    ) : (
                      <p>Test</p>
                    )}
                  </ul>
                </div> */}
        </div> : null
      }

      <div className={styles.CardWrapper}>
        <ul>
          {props.data.invitations.length > 0 && props.data.invitations ? (
            props.data.invitations
              .filter((item) => {
                if (!value) return true;
                if (
                  item.firstName.toLowerCase().includes(value) ||
                  item.lastName.toLowerCase().includes(value) ||
                  item.role.includes(value)
                ) {
                  return true;
                }
              })
              .map((item, i) => (
                //console.log(item),
                <li className={`${styles.listingCard} ${styles.columnflex}`}>
                  <h2>From : {item.fromUserName}</h2>
                  <h6>Meeting Code : {item.meetingCode}</h6>
                  {/* <h4>{item.created.created_On}</h4> */}
                  <h4>{item.created.created_On.split(/[T,.]/, 2).map((time) => <span>{time}</span>)}</h4>
                  {
                    item.toUsersList.length > 1 ? <h5>Group Meeting({item.toUsersList.length - 1})</h5> : <h5>Indvidual Meeting</h5>
                  }

                  {item.created.created_By === item.updated.updated_By ?

                    item.toUsersList.map((frmlist) => (
                      <div className={styles.statusBox}>
                        <h5>{frmlist.toUserName}</h5>
                        <div className={styles.statusRow}>
                          <h6>Status : </h6> <h4>{frmlist.updatedOn ? frmlist.updatedOn.split(/[T,.]/, 2).map((time) => <span>{time}</span>) : null}</h4>
                        </div>
                        {frmlist.status == "null" || frmlist.status == null ? <h2>Awaiting</h2> : <h2>{frmlist.status}</h2>}
                        {frmlist.status == "reject" ? <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p> : null}

                      </div>
                    )) : null
                  }

                  {
                    item.created.created_By === item.updated.updated_By ? null :
                      <div className={styles.actionRow}>
                        <button className={styles.donebtn} onClick={() => handlemeeting(item.meetingId, item.fromUserName)}>Accept</button>
                        <button className={styles.donebtn} onClick={() => openPopup(item.fromUserName)}>Accept</button>
                        <button className={styles.canclebtn} onClick={() => rejectmeetings(item.meetingId, item.fromUserName)}>Reject</button>
                      </div>
                  }
                  {/* <Link  href= {"/invitationdetails?name="+item.meetingId}>
                    <a className={styles.Cardlink} onClick={()=>props.meetingId(item.meetingId)} >link</a>
                  </Link> */}
                </li>
              ))
          ) : (
            <>
              {
                props.data.loading ? <p>Loading...</p> : <p>No meeting yet received</p>
              }
            </>
          )}
        </ul>
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
                rejectdone?<p>You have reject the meeting invitation from {meetinguser}</p>:null
              }
              {
                rejectdone? null :<button className="donebtn" disabled={!disablebtn} onClick={() => rejectmeetingapi()}>Submit</button>
              }

            </div> : null
          }
        </div> : null
      }
    </>
  );
}

export default Invetationreceive2;