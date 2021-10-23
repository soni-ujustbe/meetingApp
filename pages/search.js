import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import Header from "../component/layout/header/Header";
import Link from "next/link";
import SearchController from "../component/search/Search.controller";
//import  Searchboxcontroller  from "../component/searchbox/Searchbox.controller";
import SearchboxController from "../component/searchbox/Searchbox.controller";

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
      <section className="topNav invitationsDetails">
        <ul>
        <li className="backbtn"><Link href={"/sendinvitation"}>
            <a><img src="images/back.png" /></a></Link></li>
          <li>
            <Link href="/partner"><a>Search Result</a></Link>
          </li>
        </ul>
      </section>
      {/* <ListingController /> */}
      <SearchController /> 
      <SearchboxController/>
      <Header />
    </>:null}
    </>
  );
}