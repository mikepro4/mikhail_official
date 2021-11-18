import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import socketIOClient from "socket.io-client";
import keydown from "react-keydown";
import { FocusStyleManager } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {
    state = {
    }

    render() {
        return (
            <div className="app">
                <div className="main-section">
                    <div className="app-route-container">
                        {renderRoutes(this.props.route.routes)}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    };
}

export default {
    component: withRouter(connect(mapStateToProps, {
    })(App))
};