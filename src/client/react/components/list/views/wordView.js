import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"
import {updateLocale } from "moment"

import { 
    updateCollection
} from "../../../../redux/actions/appActions"

import { 
    deleteWord
} from "../../../../redux/actions/wordsActions"

class wordView extends Component {

    render() {
        return(
            <div className="word-view" >
               <div className="word-title">
                   
               </div>
               <Link 
                to={"/?word=" + this.props.item._id}
                onClick={() =>this.props.handleClick()}
                >
                   {this.props.item.metadata.title}

                   
               </Link>
               <div onClick={() => this.props.deleteWord(this.props.item._id, this.props.item, () => {
                        this.props.updateCollection(true)
                   })}>Delete</div>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        clientWidth: state.app.clientWidth,
    };
}

export default withRouter(connect(mapStateToProps, {
    deleteWord,
    updateCollection
})(wordView));
