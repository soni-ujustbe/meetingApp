import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useDispatch } from "react-redux";
//import * as CryptoJS from "crypto-js";
import axios from "axios";
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { logout } from "../../login/actions/auth";
//import { LOGOUT } from "../../login/actions/type";


const cfg = {
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
};

function Header(props) {
  const router = useRouter();
  //const params = useParams();
  const [menuopen, setstate] = useState(false);
  const [metingopen, setmetingopen] = useState(false);
  const [dashboadropen, setdashboadropen] = useState(false);
  const [queries, setQuery] = useState("");

  const query = router.query.data;

  //const getURL = window.location.search
  //logo

  //const dispatch = useDispatch();

  console.log("params", props.router.query.data);
  

  function URLquery() {
    //setQuery(querys);
    //console.log("header queries", querys);
    var params = props.router.query.data
    var bytes = CryptoJS.AES.decrypt(params, "5f96c6793d3a650f");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log("header decripted", decryptedData);
  }

  // useEffect(() => {
  //   URLquery()
  // }, [])


  // ///console.log(queries);
  // var data = "DifQtt5XVOQzYzWMaHLSA8cqWkJAZMuxa/AUsuvY40nXRVf9XVPAa7eQc9h3jBv9lqqUUUXVIrroiyt/uX5/3UfdSD0C+GKy3OxatjmRLFBdU8k489uhFu1Fwyq/atCTx7jcJEYt168pXhDl9oOFXxyzenG3WGjOtlHBKzEM5HRnxJibxvUb5uFzjzglYF1P";
  // //const data = router.query.data
  // //var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
  // var bytes = CryptoJS.AES.decrypt(data,"5f96c6793d3a650f");
  // var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));



  //setQuery(originalText)
  //console.log("og",originalText); // 'my message'

  // original string
  //{"userId":"5e8f2bb12b7f1a1cc87cfb47","listedPartnerId":"5f184c42af8f5c13b4548aac","businessId":"5f73415b4edcc90a2092e486"}


  // encrypted string
  //DifQtt5XVOQzYzWMaHLSA8cqWkJAZMuxa/AUsuvY40nXRVf9XVPAa7eQc9h3jBv9lqqUUUXVIrroiyt/uX5/3UfdSD0C+GKy3OxatjmRLFBdU8k489uhFu1Fwyq/atCTx7jcJEYt168pXhDl9oOFXxyzenG3WGjOtlHBKzEM5HRnxJibxvUb5uFzjzglYF1P


  // encryption code
  // encryptString(origString: string) {
  //     console.log("origString", origString)
  //     return Observable.create((observer: Observer<any>) => {
  //       console.log("encryptString observer")
  //       let  key = CryptoJS.enc.Utf8.parse('5f96c6793d3a650f');
  //       let  iv = CryptoJS.enc.Utf8.parse('5f96c6793d3a650f');
  //       var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(origString)), key, {
  //         keySize: 128 / 8,
  //         iv: iv,
  //         mode: CryptoJS.mode.CBC,
  //         padding: CryptoJS.pad.Pkcs7
  //     });
  //     console.log('Encrypted : ' + encrypted);
  //     var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
  //       keySize: 128 / 8,
  //       iv: iv,
  //       mode: CryptoJS.mode.CBC,
  //       padding: CryptoJS.pad.Pkcs7
  //   });
  //   console.log('Decrypted : ' + decrypted.toString(CryptoJS.enc.Utf8));
  //     observer.next(encrypted);
  //     //this.decryptString(encrypted)
  //     })
  //   }


  // useEffect(() => {
  //  // const querys = "router.query.data";
  //   console.log("header test", originalText);
  //   //const article = { title: 'React POST Request Example' };
  //   const headers = {
  //     "Content-Type": "application/json",
  //     token: "ky23eiqgw5",
  //   };
  //   axios.post('https://api.ujustbe.com/ValidateToken', originalText,{
  //     headers: headers,
  //   })
  //       .then(response => console.log(response));
  //       //.then(response => this.setState({ articleId: response.data.id }));
  // }, []);

  // var data = {
  //   userId: "5e8f2bb12b7f1a1cc87cfb47",
  //   listedPartnerId: "5f5769ee919be21010ab7256",
  //   businessId: "5f5772c957173d1ac899b6d8",
  // };
  //var data = "U2FsdGVkX1932NCzAPJuRZGCWguA4vKSp1sn5CIhv2AnT/27XyGH+sNvD6P97kFiiARAVa4rZ3o1NL62E+QlWhK7W89eze6iFSbkirRtq50kojB/9jBs0yjg2wtbpW1RbiaSN4UKvF0CP8MyFc9sfhgCKvJeNFoSPlQtIgIygs/WEXw+Zew+YOLu9PkIoTRf";

  // // Encrypt
  // var ciphertext = CryptoJS.AES.encrypt(
  //   JSON.stringify(data),
  //   "5f96c6793d3a650f"
  // ).toString();

  // Decrypt

  //console.log(ciphertext); // [{id: 1}, {id: 2}]

  const dispatch = useDispatch();

  function menu() {
    setstate(!menuopen);
    setmetingopen(false);
    setdashboadropen(false);
  }
  function meeting() {
    setstate(false);
    setmetingopen(true);
    setdashboadropen(false);
  }
  function dashboard() {
    setstate(false);
    setmetingopen(false);
    setdashboadropen(true);
  }

  // function redirecttopartner() {
  //   router.push("/");
  // }

  function logout2() {
   // localStorage.removeItem("user");
   dispatch(logout())
    router.push("/");
    
  }


  return (
    <>
    
      {menuopen ? (
        <div
          onClick={() => menu()}
          className={menuopen ? "bg-overlay active" : "bg-overlay"}
        ></div>
      ) : null}
      <header className="c-Header">
        <ul>
          <li
            onClick={() => dashboard()}
            className={
              router.pathname == "/dashboard" || dashboadropen ? "active" : null
            }
          >
            <Link href="/dashboard">
              <a>
                {router.pathname == "/dashboard" || dashboadropen ? (
                  <img src="/images/home-icon-active.svg" />
                ) : (
                  <img src="/images/home-icon.svg" />
                )}
              </a>
            </Link>
          </li>
          <li
            onClick={() => meeting()}
            className={
              router.pathname == "/sendinvitation" || metingopen ? "active" : null
            }
          >
            {/* <Link href="/partner?data=U2FsdGVkX1932NCzAPJuRZGCWguA4vKSp1sn5CIhv2AnT/27XyGH+sNvD6P97kFiiARAVa4rZ3o1NL62E+QlWhK7W89eze6iFSbkirRtq50kojB/9jBs0yjg2wtbpW1RbiaSN4UKvF0CP8MyFc9sfhgCKvJeNFoSPlQtIgIygs/WEXw+Zew+YOLu9PkIoTRf"> */}
            <Link href="/sendinvitation">
              <a>
                {router.pathname == "/sendinvitation" || metingopen ? (
                  <img src="/images/calendar-active.svg" />
                ) : (
                  <img src="/images/calendar.svg" />
                )}
              </a>
            </Link>
          </li>
          <li onClick={() => menu()} className={menuopen ? "active" : null}>
            {menuopen ? (
              <img src="/images/menu-active.svg" />
            ) : (
              <img src="/images/menu.svg" />
            )}
          </li>
        </ul>
      </header>
      <section className={menuopen ? "sidemenu active" : "sidemenu"}>
        <ul>
        <li>
            <Link href="/dashboard">
              <a className={router.pathname == "/dashboard" ? "active" : null}>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/sendinvitation">
              <a className={router.pathname == "/sendinvitation" ? "active" : null} >Send Invitation</a>
            </Link>
          </li>
          
          <li>
            <Link href="/invitations">
              <a className={router.pathname == "/invitations" ? "active" : null}>Invitation History</a>
            </Link>
          </li>
          <li onClick={() => logout2()}>
            <span>Log Out</span>
          </li>
        </ul>
      </section>
    </>
  );
}

export default withRouter(Header);