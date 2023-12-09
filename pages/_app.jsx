import Header from "@/components/Layout/Header.jsx";
import Footer from "@/components/Layout/Footer.jsx";
import { Provider } from "react-redux";
import './globals.css'
import store from "@/components/store";
import FacebookMsg from "@/components/FacebookMsg/FacebookMsg";
import { useState, useEffect } from "react";

//tao app de render tat ca page
function MyApp({ Component, pageProps }) {

    //tao state showchild de xu ly loi neu type of window undefined
const [showChild, setShowChild] = useState(false);

  useEffect(() => {
      setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <Provider store={store}>
                <Header />
                <Component {...pageProps} />
                <FacebookMsg />
                <Footer />
            </Provider>
        )
    }
}

export default MyApp;