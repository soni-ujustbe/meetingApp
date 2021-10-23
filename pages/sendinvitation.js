import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import InvitationboxController from "../component/invitationbox/Invitationbox.controller";
import Header from "../component/layout/header/Header";
import ListingController from "../component/listing/Listing.controller";
import MentorController from "../component/mentor/Mentor.controller";
import Mentorboxcontroller  from "../component/mentorbox/Mentorbox.controller";
import Link from "next/link";

export default function partner() {
  const router = useRouter();
  const [partner, setpartner] = useState(true);
  const [mentor, setmentor] = useState(false);
  const [pageload, setpageload] = useState(false)
  //useEffect

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
  function partners() {
    setpartner(true);
    setmentor(false);
  }
  function mentors() {
    setpartner(false);
    setmentor(true);
  }
  return (
    <>
    {pageload?<>
      <section className="topNav">
        <ul>
          <li className="active">
            <Link href="/sendinvitation"><a>listed Partner</a></Link>
          </li>
          <li >
          <Link href="/connect"><a>My Connects</a></Link>
          </li>
        </ul>
      </section>
      {/* <ListingController /> */}
      <ListingController /> <InvitationboxController/>

      <Header />
    </>:null}
    </>
  );
}