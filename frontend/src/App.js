import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <Switch>
      <Route path="/login" >
        <LoginFormPage />
      </Route>
      <Route path="/" >
        <h1>You are Login!</h1>
      </Route>
    </Switch>
  );
}

export default App;
