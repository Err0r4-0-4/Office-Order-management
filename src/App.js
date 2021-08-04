import React from "react";
import Auth from "./Container/Auth/Auth";
import { Route } from "react-router";

const App = () => {
  return (
    <div>
      <Route path="/">
        <Auth />
      </Route>
    </div>
  );
};

export default App;
