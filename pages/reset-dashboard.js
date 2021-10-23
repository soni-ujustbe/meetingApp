import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InvetationsentController from "../component/invitationsent/Invetationsent.controller";
import Header from "../component/layout/header/Header";
import styles from "../styles/Listing.module.scss";
import axios from "axios";
function dashboard() {
  const userdata = useSelector((state) => state.auth);
  const [state, setstate] = useState();
  function savedata() {
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data._id);
    setstate(MessageList.data._id);
    const article = {
      userId: MessageList.data._id,
      listedPartnerId: "",
      partnerId: "",
    };
    //console.log("this userId", article);
    const headers = {
      'Content-Type': 'application/json',
      'token': 'ky23eiqgw5'
    }
    axios
      .post("https://api.ujustbe.com/ValidateToken", article,{
        headers: headers,
      })
      .then((response) => console.log("User data rsponse",response));
  }

  useEffect(() => {
    savedata();
  }, []);

  function getUserData() {
    const article = {
      userId: state,
      listedPartnerId: "",
      partnerId: "",
    };
    console.log("this userId", article);
    const headers = {
      'Content-Type': 'application/json',
      'token': 'ky23eiqgw5'
    }
    axios
      .post("https://reqres.in/api/articles", article,{
        headers: headers,
      })
      //.then((response) => this.setState({ articleId: response.data.id }));
  }

  // const userinfo = window.localStorage.getItem("user");

  return (
    //console.log("login data", state),
    <>
      <div className="dashboarTop">
        <div className="left">
          <div className="profilePic">
            <img src="/images/lp-logo.png" />
          </div>
          {state && (
            <p>
              {/* {state.map((info) => (
                <h1>{info.data.mobile_number}</h1>
              ))} */}
            </p>
          )}
        </div>
        <div className="right">
          <img src="/images/notification.png" />
        </div>
      </div>

      <div className={styles.CardWrapper}>
        <ul>
          <li className={`${styles.listingCard} ${styles.columnflex}`}>
            <h2>From : Suraj Sawant</h2>
            <h6>https://www.ujustbe.com/iaq-azxc-fug</h6>
            <h4>10/04/2021 | 10:30 AM</h4>
            <div className={styles.statusBox}>
              <div className={styles.statusRow}>
                <h6>Status : </h6> <h4>10/04/2021 | 10:30 AM</h4>
              </div>
              <h2>Reject</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className={styles.actionRow}>
              <button className={styles.donebtn}>Accept</button>
              <button className={styles.canclebtn}>Reject</button>
            </div>
          </li>
        </ul>
      </div>
      <InvetationsentController />
      <Header />
    </>
  );
}

export default dashboard;