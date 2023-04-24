import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" >
          <LoginFormPage />
        </Route>
        <Route exact path="/profile" >
          <Profile />
        </Route>
      </Switch>
    </>
  );
}

export default App;
