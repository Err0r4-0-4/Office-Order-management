import React, { useEffect } from "react";
import Auth from "./Container/Auth/Auth";
import { Route } from "react-router";
import firebase from "./util/firebase";
const messaging = firebase.messaging();

const App = () => {
  useEffect(() => {
    async function token() {
      const token = await messaging.getToken({
        vapidKey:
          "AAAAFY4rJzI:APA91bFiVDKHYe5thhMXja5E34AIW_cE4IyzfLu6Co6HG94U3_DBc_v4iIMGVhJUnL20_wVI7Wf4bk-40KmFRfuglWvSPyYUSp7hcTqqWyk9ZVAroAzFOw1D6LB8ZSCpW7hXkxAr0p_g",
      });
      console.log("token", token);
    }
    token();
  }, []);
  return (
    <div className="App">
      <Route path="/">
        <Auth />
      </Route>
    </div>
  );
};

export default App;
