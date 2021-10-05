import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import InvitationboxController from "../component/invitationbox/Invitationbox.controller";
import Header from "../component/layout/header/Header";
import ListingController from "../component/listing/Listing.controller";
import MentorController from "../component/mentor/Mentor.controller";
import Mentorboxcontroller from "../component/mentorbox/Mentorbox.controller";
import Link from "next/link";

export default function mentor() {
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
            {pageload ? <>
                <section className="topNav">
                    <ul>
                        <li>
                            <Link href="/partner"><a>listed Partner</a></Link>
                        </li>
                        <li className="active">
                            <Link href="/partner"><a>My Connects</a></Link>
                        </li>
                    </ul>
                </section>
                {/* <ListingController /> */}
                <MentorController /><Mentorboxcontroller />
                <Header />
            </> : null}
        </>
    );
}