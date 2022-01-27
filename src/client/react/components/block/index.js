import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";


// import { 
//     updateCover,
//     updateCoverGradient,
//     updateProfile
// } from "../../../../redux/actions/profileActions"

import {
    loadWord,
    updateBlocks
} from "../../../redux/actions/wordsActions"

import ImageUploader from "../image_uploader"

import qs from "qs";
import * as _ from "lodash"



class Block extends Component {

    state = {
        loading: false
    }

    componentDidMount = () => {
        // let image = _.filter(this.props.word.blocks, (block) => {
        //     return block.position = this.props.position.toString()
        // })

        let image = _.filter(this.props.word.blocks, {position: this.props.position});
        // console.log(image)
        if(image.length > 0) {
            this.setState({
                value: image[0].url
            })
        }

    }

    componentDidUpdate = (prevprops) => {
        if(!_.isEqual(prevprops.word.blocks, this.props.word.blocks)) {

            let image = _.filter(this.props.word.blocks, {position: this.props.position});
            // console.log(image)
            if(image.length > 0) {
                this.setState({
                    value: image[0].url
                })
            } else {
                this.setState({
                    value: ""
                })
            }
        }

        // console.log(this.getQueryParams().word,  this.props.word._id)

        // if(this.getQueryParams().word !== this.props.word._id) {

        //     let image = _.filter(this.props.word.blocks, {position: this.props.position});
        //     // console.log(image)
        //     if(image.length > 0) {
        //         this.setState({
        //             value: image[0].url
        //         })
        //     }
        // }
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

    handleInputChange = (value) => {
        this.setState({
            value: value
        })

        this.props.updateBlocks(
            this.props.word,
            {
                position: this.props.position,
                url: value
            }, () => {

                this.props.loadWord(this.getQueryParams().word, (data) => {
                })
            })
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };



	render() {
        return (
            <div className="block-container">
               {/* <div className="block-position">{this.props.position}</div> */}

               <ImageUploader
                    canUpload={true}
                    onSuccess={(value) => this.handleInputChange(value)}
                    imageUrl={this.state.value}
                />
            </div>

        )
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        word: state.app.activeWord,
	};
}

export default withRouter(connect(mapStateToProps, {
    updateBlocks,
    loadWord
})(Block));
