/* eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/site.css";

import "./images/favicon.ico";
import "./images/apple-touch-icon.png";
import "./images/favicon-16x16.png";
import "./images/favicon-32x32.png";
import "./images/mstile-150x150.png";
import "./images/safari-pinned-tab.svg";

import Application from "./components/application.jsx";
import BoardPage from "./components/board/boardPage.jsx";

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>

            <Route path="/" component={Application}>
                <IndexRoute component={BoardPage} />
                <Route path="board" component={BoardPage} />
            </Route>

        </Router>
    </Provider>,
    document.getElementById("application")
);
