import React, { Component } from "react";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";
import { withRouter } from "react-router-dom";

import Input from "../../form/BladeInput";
import Textarea from "../../form/BladeTextarea";
import Slider from "../../form/Slider";
import TabGroup from "../../form/TabGroup";
import Checkbox from "../../form/Checkbox";
import ColorPicker from "../../form/ColorPicker";

import Block from "../../block"


import {
    hideDrawer,
} from "../../../../redux/actions/appActions"


import {
    deleteWord,
} from "../../../../redux/actions/wordsActions"

class WordSettingsForm extends Component {
    
    state = {
        loading: false
    }

    renderBlock(i) {
        return(
            <div key={i} className="single-block"><Block position={i}/></div>
        )
    }

    renderBlocks() {
        let blocksCount = 200

        let blocks = []

        for (var i = 0; i < blocksCount; i++) {
            blocks.push(this.renderBlock(i))
        } 

        return(<div className="blocks-container">
            {blocks}
        </div>)
    }

	render() {
        const { handleSubmit } = this.props;
        
        let mathTabOptions = [
			{
				value: "sin",
				name: "Sin"
			},
			{
				value: "cos",
				name: "Cos"
			},
			{
				value: "tan",
				name: "Tan"
			},
			{
				value: "atan",
				name: "Atan"
			},
			{
				value: "log",
				name: "Log"
			}
		]

		return (
            <Form onSubmit={handleSubmit} autoComplete="off">

                <Field
                    name="title"
                    component={Input}
                    title="Title" placeholder="Title"
                />

                <Field
                    name="shapeId"
                    component={Input}
                    title="Shape ID" placeholder="Shape ID"
                />

                <Field
                    name="audioUrl"
                    component={Input}
                    title="Audio URL" placeholder="Audio URL"
                />

                {this.renderBlocks()}
               

                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.props.loading}
                    type="submit"
                    text="Update"
                    large="true"
                />

                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.state.loading}
                    onClick={() => {
                        this.setState({
                            loading: true
                        })
                            this.props.deleteWord(this.props.word._id, () => {
                            this.props.hideDrawer()
                            this.setState({
                                loading: false
                            })

                            this.props.history.push("/");
                        })
                    }}
                        text="Delete"
                    large="true"
                />

               
            </Form>
		);
	}
}

const validate = values => {
    const errors = {}

    if (values.username) {

    }

    return errors
  }

WordSettingsForm = reduxForm({
    form: 'wordSettings',
    validate
})(WordSettingsForm);

const mapStateToProps = state => ({
    user: state.app.user,
    word: state.app.activeWord
});

export default connect(mapStateToProps, {
    deleteWord,
    hideDrawer
})(withRouter(WordSettingsForm));

  