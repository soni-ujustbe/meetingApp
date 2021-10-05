import React, { useState } from "react";
import Link from 'next/link'
import styles from "../../styles/Listing.module.scss";

function Invetationsent(props) {
  const [value, setValue] = useState("");
  console.log("send metting send", props);

  function formatDate(string) {
    var options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <>
      

      <>
              {
                props.data.loading===false?<div className={styles.searchBox}>
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
              </div>:null
              }
            </>
      <div className={styles.CardWrapper}>
        <ul>
          {props.data.invitations.length > 0 ? (
            props.data.invitations
              .filter((item) => {
                if (!value) return true;
                if (
                  //item.toUsersList.toUserName.toLowerCase().includes(value) ||
                  item.agenda.toLowerCase().includes(value)
                ) {
                  return true;
                }
              })
              .map((item, i) => (
                //console.log(item),
                <li className={`${styles.listingCard} ${styles.columnflex}`}>
                  <h3>Agenda : {item.agenda}</h3>
                  <h6  >Meeting Code : {item.meetingCode}</h6>
                  <h4>{item.created.created_On.split(/[T,.]/, 2).map((time)=><span>{time}</span>)}</h4>
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
                  <Link  href= {"/invitationdetails?name="+item.meetingId}>
                    {/* <a className={styles.Cardlink} onClick={()=>props.meetingId(item.meetingId)} >link</a> */}
                    <a className={styles.Cardlink} onClick={() => {
                                  props.meetingId(item.meetingId);
                                  props.meetingdetails(item.meetingId);
                                }} >link</a>
                  </Link>
                </li>
              ))
          ) : (
            <>
              {
                props.data.loading?<p>Loading...</p>:<p>No meeting yet sent</p>
              }
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Invetationsent;