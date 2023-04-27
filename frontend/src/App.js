import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginFormPage from "./components/LoginFormPage";
import PostFormModal from "./components/posts/PostFormModal";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import PostShowModal from "./components/posts/PostShowModal";

function App() {
  const sessionUser = useSelector(state => state.session.user);

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
        <Route exact path='/:postId/edit' >
          <PostFormModal />
        </Route>
        <Route exact path='/:postId'>
          <PostShowModal />
        </Route>
        {/* <Route exact path='/:commentId/edit'>
          <h1>Working!</h1>
        </Route> */}
      </Switch>
    </>
  );
}

export default App;
