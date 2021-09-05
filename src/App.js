import React from "react";
import Auth from "./Container/Auth/Auth";
import { Route } from "react-router";

const App = () => {
  return (
    <div className="App">
      <Route path="/">
        <Auth />
      </Route>
    </div>
  );
};

export default App;
