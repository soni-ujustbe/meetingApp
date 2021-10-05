import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useRouter } from "next/router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "./actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [erruser, setErruser] = useState(false);
  const [focususer, setFocususer] = useState(false);
  const [errpass, setErrpassword] = useState(false);
  const [focuspass, setFocuspass] = useState(false);
  

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    if (username.length < 1) {
      setErruser(true);
    } else {
      setErruser(false);
      //setFocususer(true);
    }
    setUsername(username);
  };
  const onFocususername = (e) => {
    const username = e.target.value;
    setFocususer(true);
  };
  const onBlurusername = (e) => {
    const username = e.target.value;
    if (username.length < 1) {
      setFocususer(false);
    } else {
      setFocususer(true);
    }
  };
  
  console.log("my msg", message);


  const onChangePassword = (e) => {
    const password = e.target.value;
    if (password.length < 1) {
      setErrpassword(true);
    } else {
      setErrpassword(false);
      //setFocususer(true);
    }
    setPassword(password);
  };

  const onFocuspass = (e) => {
    //const password = e.target.value;
    setFocuspass(true);
  };
  const onBlurpass = (e) => {
    const password = e.target.value;
    if (password.length < 1) {
      setFocuspass(false);
    } else {
      setFocuspass(true);
    }
  };


  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login({ username, password }))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  function redirecttopartner() {
    router.push("/dashboard");
  }

  if (isLoggedIn) {
    redirecttopartner();
  }

  return (
    <div className="login-wrapper">
      <div className="card card-container">
        <div className="logo">
          <img
            src="/images/logo.png"
            alt="profile-img"
            className="profile-img-card"
          />
        </div>

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group"></div>
          <ul>
            <li className="form-group">
              <input
                type="text"
                value={username}
                onChange={onChangeUsername}
                className="form-usename"
                name="username"
                onFocus={onFocususername}
                onBlur={onBlurusername}
                autocomplete="false"
              />
              {/* <Input
                type="text"
                className="form-usename"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              /> */}
              <label htmlFor="username" className={(focususer  ? 'show' : null )}>Username</label>
              {erruser ? <div className="errmsg">Enter Usename</div> : null}
            </li>
            <li className="form-group">
              {/* <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              /> */}
              <input
                type="password"
                className={"form-password"  +  (focuspass  ? ' error' : "" )}
                name="password"
                value={password}
                onChange={onChangePassword}
                onFocus={onFocuspass}
                onBlur={onBlurpass}
              />
              <label htmlFor="password" className={(focuspass  ? 'show' : null )}>Password</label>
              {errpass ? <div className="errmsg">Enter Password</div> : null}
            </li>
            <li className="form-group">
              <button disabled={loading}>
                {loading ? (
                  // <span className="spinner-border spinner-border-sm"></span>
                  <span>Loading</span>
                ) : (
                  <span>Explore</span>
                )}
              </button>
            </li>
          </ul>

          {/* <div className="form-group"></div>

          <div className="form-group"></div> */}

          {message &&  (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
               {message.map((msddata)=>
               <>
               {msddata.message}
               </>
               )}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;