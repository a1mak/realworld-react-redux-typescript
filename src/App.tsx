import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./features/NavBar/NavBar";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

function App() {
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
    </Router>
  );
}

export default App;
