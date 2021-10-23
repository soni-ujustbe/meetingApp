import axios from "axios";

const API_URL = " https://api.ujustbe.com/";
import { useRouter } from "next/router";


export const saveState = (user) => {
  try {
    const serializedState = JSON.stringify(user.data);
    localStorage.setItem('user', serializedState);
  } catch {
    // ignore write errors
  }
};



const login = (username, password) => {
  console.log(username)
  return axios
    .post(API_URL + "login", 
      username,
      password,
    )
    .then((response) => {
      console.log("API response",response);
      if (response.data) {
        //localStorage.setItem("user", JSON.stringify(response.data));
        console.log("response true", response.data );
        saveState(response)
        

      }

      return response.data;
    });
};

const logout = () => {
  //const router = useRouter();
  localStorage.removeItem("user");
  //router.push("/");

};

export default {
  login,
  logout,
};