import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import keydown from "react-keydown";
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import Header from "./react/components/header"
import Drawer from "./react/components/drawer"
import Scroll from "./react/components/scroll"
import Viz from "./react/components/viz"
import SettingsIcon from "./react/components/icons/settings"

import qs from "qs";
import * as _ from "lodash"


import { showDrawer } from "../client/redux/actions/appActions"
import { loadWord, updateBlocks } from "../client/redux/actions/wordsActions"
import { loadShape } from "../client/redux/actions/shapesActions"
import { initSave } from "../client/redux/actions/blocksActions"
import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"

import Player from "./react/components/player"
import AudioPlayer from "./react/components/audioplayer"

// if(prevprops.blocks.uploadDone !== this.props.blocks.uploadDone && this.props.blocks.uploadDone == true) {
//             this.props.initSave()

class App extends Component {
    state = {
        appVisible: false,
        savingBlocks: false
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
        if(this.props.word && this.props.word.metadata) {
            if(!_.isEqual(prevprops.word, this.props.word)) {
                this.props.loadShape(this.props.word.metadata.shapeId)
            }
        }

        if(prevprops.blocks.uploadDone !== this.props.blocks.uploadDone && this.props.blocks.uploadDone == true) {
            if(this.props.blocks.status !== "saving") {
                this.props.updateBlocks(
                    this.props.word,
                    this.props.blocks.updatedBlocks, 
                    () => {
                        
                        this.props.loadWord(this.getQueryParams().word, (data) => {
                    })
                })
            }
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
                {this.props.drawerOpen && <Drawer type={this.props.drawerType} />}
                <Header/>

                <div className="main-section">
                    <div className="app-route-container">
                        {renderRoutes(this.props.route.routes)}
                    </div>
                </div>

                <div className="main-settings" onClick={() =>  this.props.showDrawer("word-settings")}>
                    <SettingsIcon />
                </div>

                <div 
                    className="viz-wrapper"
                    className={classNames({
                        "viz-wrapper": true,
                        "active": this.props.word && this.props.word.metadata && this.props.word.metadata.shapeId
                    })}
                >
                    <Viz/>
                </div>

                <div className="new-player">
                    {!this.props.demoMode &&<Player/> }
                    <AudioPlayer/>
                    
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
        drawerType: state.app.drawerType,
        drawerOpen: state.app.drawerOpen,
        word: state.app.activeWord,
        blocks: state.blocks
    };
}

export default {
    component: withRouter(connect(mapStateToProps, {
        authUser, 
        fetchCurrentUser, 
        clearCurrentUser,
        loadWord,
        showDrawer,
        loadShape,
        initSave,
        updateBlocks
    })(App))
};