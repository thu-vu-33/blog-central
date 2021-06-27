import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Create from "./containers/Article/Create";
import NotFound from "./components/NotFound";
import Read from "./containers/Article/Read";
import getCurrentUser from "./utils/auth";
import configStore from "./store";

import Signin from "./containers/Signin";
import SignUp from "./containers/SignUp";
import SocialAuth from "./containers/Login";
import ForgotPasssword from "./containers/ForgotPassword";
import ResetPasssword from "./containers/ResetPassword";
import Home from "./containers/Home";
import ReadProfile from "./containers/Profile/Read";
import UpdateProfile from "./containers/Profile/Update";
import Articles from "./containers/Articles";
import Scroll from "./components/Scroll";
import UpdateArticle from "./containers/Article/UpdateArticle";
import ROUTES from "./utils/routes";

const store = configStore();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getCurrentUser() ? (
        <Component {...props} user={getCurrentUser()} />
      ) : (
        <Redirect
          to={{ pathname: ROUTES.signin, state: { from: props.location } }}
        />
      )
    }
  />
);

export default () => (
  <Provider store={store}>
    <Router>
      <Scroll>
        <Switch>
          <Route exact path={ROUTES.home} component={Home} />
          <Route exact path={ROUTES.getArticleUrl} component={Read} />
          <PrivateRoute
            exact
            path={ROUTES.createArticleUrl}
            component={Create}
          />
          <PrivateRoute
            exact
            path={ROUTES.editArticleUrl}
            component={UpdateArticle}
          />
          <Route exact path={ROUTES.signup} component={SignUp} />
          <Route exact path={ROUTES.signin} component={SocialAuth} />
          <Route exact path={ROUTES.signinWithEmail} component={Signin} />
          <Route
            exact
            path={ROUTES.resetPassword}
            component={ForgotPasssword}
          />
          <Route exact path={ROUTES.verify} component={ResetPasssword} />
          <PrivateRoute
            exact
            path={ROUTES.getProfile}
            component={ReadProfile}
          />
          <Route exact path={ROUTES.updateProfile} component={UpdateProfile} />
          <Route
            exact
            path={ROUTES.articles}
            component={(props) => <Articles {...props} key={Math.random()} />}
          />
          <Route
            exact
            path={ROUTES.magazines}
            component={(props) => (
              <Articles {...props} key={Math.random()} type="magazine" />
            )}
          />
          <Route
            exact
            path={ROUTES.books}
            component={(props) => (
              <Articles {...props} key={Math.random()} type="books" />
            )}
          />
          <Route
            exact
            path={ROUTES.videos}
            component={(props) => (
              <Articles {...props} key={Math.random()} type="videos" />
            )}
          />
          <Route
            exact
            path={ROUTES.blogs}
            component={(props) => (
              <Articles {...props} key={Math.random()} type="blogs" />
            )}
          />
          <Route
            exact
            path={ROUTES.guide}
            component={(props) => (
              <Articles {...props} key={Math.random()} type="guide" />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Scroll>
    </Router>
  </Provider>
);
