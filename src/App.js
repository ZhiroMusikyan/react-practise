import React, { useEffect, useState } from "react";
import "./App.css";
import ToDoInput from "./components/ToDoInput";
import HomePage from "./components/HomePage";
import LogInForm from "./components/LogInForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import About from "./components/About";
import getUsers from "./components/getUsers";
import UserTable from "./components/UserTable";
import MyAppBar from "./components/MyAppBar";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const result = await getUsers();
    setUsers(result);
  });

  function handleLogOut() {
    localStorage.clear();
    window.location = "/login";
  }

  function handleLogIn() {
    window.location = "/home";
    localStorage.setItem("userLogIn", true);
  }

  const loggedIn = localStorage.getItem("userLogIn");
  return (
    <Router>
      {loggedIn ? (
        <MyAppBar onClick={handleLogOut} btnName={"Log Out"} loggedIn={loggedIn} />
      ) : (
        <MyAppBar onClick={handleLogIn} btnName={"Log In"} loggedIn={loggedIn} />
      )}

      {loggedIn ? (
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/todo">
            <ToDoInput />
          </Route>
          <Route path="/user">
            <UserTable users={users} />
          </Route>
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login">
            <LogInForm />
          </Route>
          <Redirect to="/" />
        </Switch>
      )}
    </Router>
  );
}
export default App;
