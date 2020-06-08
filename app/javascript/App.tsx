import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ImageView from "./components/ImageView";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import TagView from "./components/TagView";
import FeedbackForm from "./components/FeedbackForm";

/**
 * The main React App element, mainly used for routing
 *
 * @export
 * @returns {JSX.Element}
 */
export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/feedback">
          <FeedbackForm />
        </Route>
        <Route path="/view/:imgId">
          <ImageView />
        </Route>
        <Route path="/view">
          <TagView />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
