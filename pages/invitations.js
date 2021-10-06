import React, { useState } from "react";
import { useEffect} from "react";
import { useRouter, withRouter } from "next/router";
import InvitationreceiveController from "../component/invitationreceive/Invitationreceive.controller";
import InvetationsentController from "../component/invitationsent/Invetationsent.controller";
import Header from "../component/layout/header/Header";

function invitations() {
  const [sent, setsent] = useState(true);
  const [receive, setreceive] = useState(false);
  const router = useRouter();
  const [pageload, setpageload] = useState(false)
  function sents() {
    setsent(true)
    setreceive(false)
  }
  function recives() {
    setsent(false)
    setreceive(true)
  }

  useEffect(() => {
    const name = localStorage.getItem('user');
    if (name) {
      console.log('Name exists');
      setpageload(true)
    } else {
      console.log('Name is not found');
      router.push("/");
    }

  }, [])

  return (
    <>
      {pageload?<>
      <section className="topNav invitationsBox">
        <ul>
          <li className={sent ? "active" : null} onClick={()=> sents()}>Sent</li>
          <li className={receive ? "active" : null} onClick={()=> recives()}>Received</li>
        </ul>
      </section>
      {sent?<InvetationsentController/>:<InvitationreceiveController/>}
      
      <Header />
    </>:null}
    </>
  );
}

export default invitations;