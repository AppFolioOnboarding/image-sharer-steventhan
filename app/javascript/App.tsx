import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ImageLinkForm from "./components/ImageLinkForm";
import ImageView from "./components/ImageView";
import NotFound from "./components/NotFound";

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
          <ImageLinkForm />
        </Route>
        <Route path="/view/:imgId">
          <ImageView />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
