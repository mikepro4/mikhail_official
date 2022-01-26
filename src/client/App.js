import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import keydown from "react-keydown";
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import Header from "./react/components/header"
import Scroll from "./react/components/scroll"

import qs from "qs";
import * as _ from "lodash"

import { loadWord } from "../client/redux/actions/wordsActions"
import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"

class App extends Component {
    state = {
        appVisible: false
    }

    componentDidMount() {
        this.auth()
        this.loadWord()
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

    componentDidUpdate(prevprops) {
        if(!_.isEqual(prevprops.location.search, this.props.location.search)) {
            this.loadWord()
        }
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };
    
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

    loadWord() {
        // console.log(this.getQueryParams())
        this.props.loadWord(this.getQueryParams().word, (data) => {
            console.log(data)
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

                {/* <Scroll/> */}
                
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
        clearCurrentUser,
        loadWord
    })(App))
};