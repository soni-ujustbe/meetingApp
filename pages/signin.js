import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "../component/login/login";


function Signin() {
  return <Login />;
}

export default Signin;