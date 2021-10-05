export default function authHeader() {
    // const user = JSON.parse(localStorage.getItem('user'));
    const user = JSON.parse();
  
    if (user ) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }

  //Note: For Node.js Express back-end, please use x-access-token header like this:

    // export default function authHeader() {
    //   const user = JSON.parse(localStorage.getItem('user'));

    //   if (user && user.accessToken) {
    //     // for Node.js Express back-end
    //     return { 'x-access-token': user.accessToken };
    //   } else {
    //     return {};
    //   }
    // }