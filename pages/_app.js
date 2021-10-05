import '../styles/globals.css'
import '../styles/global.scss'
import { Provider } from "react-redux";
import store from "../store";
import { createWrapper } from "next-redux-wrapper";

import { pwaTrackingListeners } from "../scripts/pwaEventlisteners";

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  pwaTrackingListeners();
}



function MyApp({ Component, pageProps, apollo }) {
  return (
    <Provider store={store}>
          <Component {...pageProps} />
          {/* <button onClick={()=>pwaTrackingListeners("test")}>test</button> */}
    </Provider>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore)
export default wrapper.withRedux(MyApp);

if (isBrowser && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("Service worker registered");
      })
      .catch((err) => {
        console.log("Service worker registration failed", err);
      });
  });
}