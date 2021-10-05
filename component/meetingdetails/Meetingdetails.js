import React from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from "react";
import axios from "axios";


function Meetingdetails(props) {
  const [page, setPage] = useState("");
  const [commitHistory, setCommitHistory] = useState([]);
  const [mom, setMom] = useState(null);
  const [meeting, setmeeting] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [createdBy, setcreatedBy] = useState(null);
  const [fromUserId, setfromUserId] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [disablebtn, setDisablebtn] = useState(false);
  const router = useRouter()
  console.log("my meeting id details" + props.data);

  const onChangeMom = (e) => {
    const Agenda = e.target.value;
    if (Agenda.length < 1) {
      //setErruser(true);
      setDisablebtn(false);
    } else {
      //setErruser(false);
      //setFocususer(true);
      setDisablebtn(true);
    }
    setMom(Agenda);
    console.log(Agenda);
  };

  function savedata() {
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data);
    setcreatedBy(MessageList.data._id);
    setfromUserId(MessageList.data._id);
    setmeeting(router.query.name)
  }

  useEffect(() => {
    savedata();
  }, []);

  function handlemeeting() {
    const meetingdata = {
      "meetingId": meeting,
      "meetingDate": dateTime,
      "MOM": mom,
      "updatedBy": createdBy
    }
    console.log("mom details data", meetingdata);
    axios
      .put("https://api-test.ujustbe.com/UpdateMeeting", meetingdata)
      .then((response) => {
        console.log(response);
        if (response.data.message[0].type === "SUCCESS") {
          //setStatustype(false);
          fetch(`https://api-test.ujustbe.com/Meeting/details?meetingId=${router.query.name}`)
            .then(
              (res) => res.json(),
            )
            .then((json) => {
              console.log("meeting Details", json.data.meetingList[0]);
              setCommitHistory(json.data.meetingList)
              setMom("")
              return json;
            })

            props.reloaddata(meeting)

        }
      });
    //.then(response => setArticleId(response.data.id));
  }

  useEffect(() => {
    fetch(`https://api-test.ujustbe.com/Meeting/details?meetingId=${router.query.name}`)
      //fetch("https://api-test.ujustbe.com/Meeting/details")
      //.then(handleErrors)
      .then(
        (res) => res.json(),

      )

      .then((json) => {
        console.log("meeting Details", json.data.meetingList[0]);
        //dispatch(getinvitationdataSuccess(json.data.meetingList));
        setCommitHistory(json.data.meetingList)
        return json;
      })
    //.catch((error) => dispatch(getinvitationdataFailure(error)))
  }, [page]);
  return (
    console.log(commitHistory),
    <>
      <section className="topNav invitationsDetails">
        <ul>
          <li className="backbtn"><Link href={"/invitations"}>
            <a><img src="images/back.png" /></a></Link></li>
          <li>Meting detail : {commitHistory.map((test) => <span>{test.meetingCode}</span>)}</li>
        </ul>
      </section>
      <section className="meetingDetails">
        {commitHistory.map((test) =>
          <div className="container">

            <div className="rows">
              <h5>Selected Partner</h5>


              <ul>{test.toUsersList.map((rest) => <li className={
                  rest.status==="null" ? "inactive" : null}>{rest.toUserName}</li>)}</ul>

              {/* <ul>
              <li>Karuyaki Solutions Pvt. Ltd</li>
              <li>Karuyaki Solutions Pvt. Ltd</li>
              <li>Karuyaki Solutions Pvt. Ltd</li>
            </ul> */}
            </div>
            <div className="rows">
              <h5>Agenda of Meeting</h5>
              <p>
                {test.agenda}
              </p>
            </div>
            <div className="rows">
              <h5><strong>Meeting Code</strong>: {test.meetingCode}</h5>
              <h5><strong>Date and Time</strong>:<span>{test.created.created_On.split(/[T,.]/, 2).map((time) => <span>{time}</span>)}</span></h5>
              {/* <h5><strong>Meeting Code</strong></h5> */}
            </div>
            <div className="rows momlist">
              <h5>Minutes Of meeting</h5>
              {test.mom.length > 0 || test.mom===null ?
                <ul>{test.mom.map((rest) => <li className={
                  createdBy  === test.created.created_By ? "active" : null
                }>{rest.mom}  <abbr>{rest.created.fullName} {rest.created.created_On.split(/[T,.]/, 2).map((time) => <span>{time}</span>)}</abbr></li>)}</ul> : null}
              <textarea
                value={mom}
                onChange={onChangeMom}
                name="Mom"
                autocomplete="false"
                placeholder="Enter Minutes of meeting"
              ></textarea>
              <div className="actionrow">
                <button
                  onClick={() => handlemeeting()}
                  disabled={!disablebtn}
                  className="donebtn"
                >
                  {
                    test.mom.length > 0 || test.mom === null? "Reply" : "Enter"
                  }
                </button>
              </div>
            </div>

          </div>
        )}
      </section>
    </>
  );
}

export default Meetingdetails;