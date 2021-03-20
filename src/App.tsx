import { setToken } from "api";
import { AppDispatch } from "app/store";
import { current } from "features/Authentication/authSlice";
import Footer from "features/Footer/views/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./features/NavBar/views/NavBar";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      dispatch(current());
    }
  }, []);
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/settings" component={Settings} />
        <Route
          exact
          path={["/editor", "/editor/:articleSlug"]}
          component={Settings}
        />
        <Route exact path="/article/:articleSlug" component={Article} />
        <Route exact path="/profile/:username" component={Profile} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
