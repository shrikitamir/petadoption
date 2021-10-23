import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute, AdminRoute } from "./lib/PrivateRoute";
import { UserProvider } from "./Context/UserContext";
import { AppProvider } from "./Context/AppContext";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import MyPets from "./components/MyPets/MyPets";
import Pet from "./components/Pet/Pet";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import NotFound from "./components/NotFound/NotFound";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

const App = () => {
  return (
    <UserProvider>
      <AppProvider>
        <Router>
          <Nav />
          <Switch>
            <AdminRoute path="/admin" component={Admin} />
            <AdminRoute path="/user/:id" component={User} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/mypets" component={MyPets} />
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/pet/:id" component={Pet} />
            <Route path="" component={NotFound} />
          </Switch>
        </Router>
      </AppProvider>
    </UserProvider>
  );
};

export default App;
