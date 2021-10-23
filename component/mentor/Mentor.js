import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Listing.module.scss";
import Selectmentorinviteecontroller from "../selectmentorinvite/Selectmentorinvitee.controller";

function Mentor(props) {
  //const propsdata = props.data.partner
  const [value, setValue] = useState("");
  const [noitem, setnoitem] = useState([]);
  const divRef = useRef(null);
  // const divRef = useRef(null);
  const [nodata, setNodata] = useState(20);
  const [message, setMessage] = useState("not at bottom");
  const [height, setheight] = useState(window.innerHeight);
  const [gender, setGender] = useState("false");
  const router = useRouter()

  function emptystate() {
    setnoitem([]);
  }

  const handleChange = e => {
    const target = e.target;
    if (target.checked) {
      setGender(target.value);
    }
  };

  function handleScroll() {
    //setMessage('bottom reached')
    //console.log("scroll");

    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      setMessage('bottom reached')

      // this.setState({
      //     message: 'bottom reached'
      // });

      console.log(props.data.totalcount);
      if (props.data.currentcount < props.data.totalcount) {

        props.loadmore(nodata);

        console.log("true");
        console.log(nodata);
        setNodata(nodata + 20)
        props.currentcount(nodata + 20);
      }
      else {
        console.log("false");
        console.log(nodata);
      }


    } else {
      setMessage('not at bottom')
      // this.setState({
      //     message: 'not at bottom'
      // });
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    console.log("mentor data", props.data),
    //console.log(noitem),
    (
      <>
        {
          props.data.partner === null || props.data.partner === "" ? null : <>
            {
              props.data.partner.length > 1 ? <ul className={styles.invitationType}>
                <li>
                  <input
                    type="radio"
                    id="1"
                    value="false"
                    name="invite"
                    checked={gender == 'false'}
                    onChange={handleChange}
                    onClick={(e) => {
                      props.onGroupinvitation(e.target.value);
                      props.singleinvitation();
                      props.unselectLPall();
                    }}
                  />
                  <label for="1">Indvidual</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="2"
                    value="true"
                    name="invite"
                    checked={gender == 'true'}
                    onChange={handleChange}
                    onClick={(e) => props.onGroupinvitation(e.target.value)}
                  />
                  <label for="2">Group Invitaion</label>
                </li>
              </ul> : null
            }
          </>
        }

        {props.data.groupinvitee === "true" ? (
          <div className="groupSelection">
            <Selectmentorinviteecontroller />
          </div>
        ) : null}

        {
          props.data.partner === null || props.data.partner === "" ? null : <div className={styles.searchBox}>
            {
              props.data.partner.length > 1 ? <>
                <input
                  type="text"
                  value={value}
                  placeholder="Name / Location / Category / Keywords"
                  onChange={(e) => setValue(e.target.value)}
                />
                <button
                  onClick={() => {
                    //removedClass(item._id);
                    props.searchresult(value);
                    router.push('/search?search=' + value)
                  }}
                >
                  Search
                </button>
              </>
                : null
            }
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
          </div>
        }

        <div className={styles.CardWrapper}>
          {props.data.partner === null ? <p>You dont have any connects</p> :
            <ul>
              {props.data.partner.length > 0 ? (
                props.data.partner
                  .filter((item) => {
                    if (!value) return true;
                    if (
                      item.firstName.toLowerCase().includes(value) ||
                      item.lastName.toUpperCase().includes(value) ||
                      item.firstName.toUpperCase().includes(value) ||
                      item.lastName.toLowerCase().includes(value) ||
                      item.role.includes(value)
                    ) {
                      return true;
                    }
                  })
                  .map((item, i) => (
                    //console.log(item),
                    <li
                      className={
                        props.data.selectedpartner.indexOf(item._id) !== -1
                          ? `${styles.listingCard} ${styles.selected}`
                          : styles.listingCard
                      }
                      key={i}
                    >
                      <div className={styles.profileimage}>
                        {item.imageURL ?
                          <img
                            src={
                              "https://api.ujustbe.com/" +
                              item.imageURL
                            }
                          /> : <p>NO img</p>
                        }
                      </div>

                      <div className={styles.description}>
                        {/* <div className={styles.buzcategory}>
                        <span>Software</span>
                        <span>Software</span>
                      </div> */}
                        <h2>
                          {item.firstName} {item.lastName}
                        </h2>
                        <h4>{item.role}</h4>
                        <h6>
                          <img src="/images/add-icon.png" />
                          {item.address.flat_Wing} {item.address.locality}{" "}
                          {item.address.location}
                        </h6>

                        <div className={styles.actionbtn}>
                          {props.data.groupinvitee == "true" ? (
                            <>
                              {props.data.selectedpartner.indexOf(item._id) !== -1 ? (
                                <button
                                  onClick={() => {
                                    //removedClass(item._id);
                                    props.removeselectLp(item._id)
                                    props.unselectLP(item._id)
                                    props.removemeeting(item._id);
                                  }}
                                >
                                  remove Partner
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    props.onSelectLP(item);
                                    props.selectLP(item._id)
                                    props.sendmeeting({
                                      userId: item._id,
                                      status: "null",
                                    });
                                  }}
                                >
                                  Select Partner
                                </button>
                              )}
                            </>
                          ) : (
                            // <button
                            //   onClick={() => props.onaddToInvitationBox(item)}
                            // >
                            //   Send Invitation
                            // </button>
                            <button
                              //onClick={() => props.onaddToInvitationBox(item)}
                              onClick={() => {
                                props.onaddToInvitationBox(item);
                                props.sendmeeting({
                                  userId: item._id,
                                  status: "null",
                                });
                              }}
                            >
                              Send Invitation
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  ))
              ) : (
                <p>Loading...</p>
              )}
            </ul>
          }
        </div>
      </>
    )
  );
}

export default Mentor;