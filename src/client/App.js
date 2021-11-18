import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import keydown from "react-keydown";
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import Header from "./react/components/header"

import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"

class App extends Component {
    state = {
        appVisible: false
    }

    componentDidMount() {
        this.auth()
    }

    auth() {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.authUser()
			this.loadUser()
		} else {
			this.showApp()
		}
    }
    
    loadUser() {
		this.props.fetchCurrentUser(() => {
			this.showApp()
		})
    }
    
    showApp() {
        this.setState({
            appVisible: true
        })
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
        appReducer: state.appReducer,
        user: state.app.user,
    };
}

export default {
    component: withRouter(connect(mapStateToProps, {
        authUser, 
        fetchCurrentUser, 
        clearCurrentUser 
    })(App))
};