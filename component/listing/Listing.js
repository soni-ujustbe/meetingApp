import React, { useEffect, useRef, useState } from "react";
import Selectinviteecontroller from "../selectinvite/Selectinvitee.controller";
import styles from "../../styles/Listing.module.scss";
import { useRouter } from 'next/router'

function Listing(props) {
  //const propsdata = props.data.partner
  const [value, setValue] = useState("");
  const [noitem, setnoitem] = useState([]);
  const [fromUserId, setfromUserId] = useState(null);
  const divRef = useRef(null);
  const [nodata, setNodata] = useState(20);
  const [message, setMessage] = useState("not at bottom");
  const [height, setheight] = useState(window.innerHeight);
  const [gender, setGender] = useState("false");
  const router = useRouter()

  // function emptystate() {
  //   setnoitem([]);
  // }

  function savedata() {
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data);
    setfromUserId(MessageList.data._id);
    setMessage("test");
    ///props.loadmore(0);
    props.currentcount(props.data.currentcount + 1)
  }
  console.log("inner listing data", props.data.currentcount, "total count", props.data.totalcount);

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

  // function currentloaded() {
  //   setCounter(counter + 20);
  //   console.log(counter);
  // }

  useEffect(() => {
    savedata();
  }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  // }, [height]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    console.log("inner data", props.data),
    (
      //console.log(noitem),
      <>
        <ul className={styles.invitationType}>
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
        </ul>

        {props.data.groupinvitee === "true" ? (
          <div className="groupSelection">
            <Selectinviteecontroller />
          </div>
        ) : null}

        <div className={styles.searchBox}>
          
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Name / Location / Category / Keywords"
          />
          <button
            onClick={() => {
              //removedClass(item._id);
              props.searchresult(value);
              router.push('/search?search='+value)
            }}
          >
            Search
          </button>
          {/* auto complete */}
          <div className={styles.autocompleteBox}>
            <ul>
              {props.data.businesslist.length > 0 ? (
                props.data.businesslist
                  .filter((item) => {
                    if (!value) return true;
                    if (
                      item.businessName.includes(value) ||
                      item.businessName.includes(value)
                      //item.address.location.includes(value)
                    ) {
                      return true;
                    }
                  })
                  .map((item, i) => (
                    //console.log(item),
                    <li key={i}>
                      {item.businessName}
                    </li>
                  ))
              ) : (
                <p>Test</p>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.CardWrapper}>
          <ul>
            {props.data.businesslist.length > 0 ? (
              props.data.businesslist
                // .filter((item) => {
                //   if (!value) return true;
                //   if (
                //     //item.firstName.toLowerCase().includes(value) ||
                //     item.businessName.toLowerCase().includes(value) ||
                //     item.businessName.toUpperCase().includes(value)
                //     //item.categories.map().toUpperCase().includes(value)
                //   ) {
                //     return true;
                //   }
                // })
                .map((item, i) => (
                  //console.log(item),
                  <li
                    className={
                      props.data.selectedpartner.indexOf(item.userId) !== -1
                        ? `${styles.listingCard} ${styles.selected}`
                        : styles.listingCard && fromUserId === item.userId ? `${styles.listingCard} ${styles.hidecard}` : styles.listingCard
                    }
                    key={i}
                  >
                    <div className={styles.profileimage}>
                      {item.logo.logoImageURL ?
                        <img
                          src={
                            "https://api.ujustbe.com/" +
                            item.logo.logoImageURL
                          }
                        /> : <p>NO img</p>
                      }
                    </div>

                    <div className={styles.description}>
                      <div className={styles.buzcategory}>
                        {item.categories.map((cats) => <span>{cats}</span>)}
                      </div>
                      <h2>{item.businessName}</h2>
                      <h4>{item.role}</h4>
                      <h6>
                        {/* <img src="/images/add-icon.png" /> */}
                        {/* {item.address.flat_Wing} {item.address.locality}{" "} */}
                        {item.address.location}
                      </h6>
                      
                      <div className={styles.actionbtn}>
                        {props.data.groupinvitee == "true" ? (
                          <>
                            {props.data.selectedpartner.indexOf(item.userId) !==
                              -1 ? (
                              <button
                                onClick={() => {
                                  //removedClass(item._id);
                                  props.removeselectLp(item.userId);
                                  props.unselectLP(item.userId);
                                  props.removemeeting(item.userId);
                                }}
                              >
                                remove Partner
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  props.onSelectLP(item);
                                  props.selectLP(item.userId);
                                  props.sendmeeting({
                                    userId: item.userId,
                                    status: "null",
                                  });
                                }}
                              >
                                Select Partner
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            //onClick={() => props.onaddToInvitationBox(item)}
                            onClick={() => {
                              props.onaddToInvitationBox(item);
                              props.sendmeeting({
                                userId: item.userId,
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
        </div>

      </>
    )
  );
}

export default Listing;