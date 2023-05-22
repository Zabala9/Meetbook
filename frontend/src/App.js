import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import PostFormModal from "./components/posts/PostFormModal";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import PostShowModal from "./components/posts/PostShowModal";
import CommentFormModal from "./components/Comments/CommentFormModal";
import GamesForm from "./components/Games";
import NavBar from "./components/NavBar/NavBar";
import PostIndex from "./components/posts/PostIndex";

function App() {

  return (
    <>
      <NavBar />
      <Navigation />
      <Switch>
        <Route exact path="/" >
          <LoginFormPage />
        </Route>
        <Route exact path='/feed'>
          <PostIndex />
        </Route>
        <Route exact path='/profile' >
          <Profile />
        </Route>
        <Route exact path='/games'>
          <GamesForm />
        </Route>
        <Route exact path='/:postId/edit' >
          <PostFormModal />
        </Route>
        <Route exact path='/:postId'>
          <PostShowModal />
        </Route>
        <Route exact path='/:postId/comment/:commentId/edit'>
          <PostShowModal />
          <CommentFormModal />
        </Route>
      </Switch>
    </>
  );
}

export default App;
