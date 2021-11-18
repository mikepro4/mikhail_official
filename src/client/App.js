import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import keydown from "react-keydown";
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import Header from "./react/components/header"

class App extends Component {
    state = {
    }

    render() {
        return (
            <div className="app">

                <Header/>

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