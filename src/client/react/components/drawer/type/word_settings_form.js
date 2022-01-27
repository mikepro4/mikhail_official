import React, { Component } from "react";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";

import Input from "../../form/BladeInput";
import Textarea from "../../form/BladeTextarea";
import Slider from "../../form/Slider";
import TabGroup from "../../form/TabGroup";
import Checkbox from "../../form/Checkbox";
import ColorPicker from "../../form/ColorPicker";

import Block from "../../block"


class WordSettingsForm extends Component {

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

                {this.renderBlocks()}
               

                <Button
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.props.loading}
                    type="submit"
                    text="Update"
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
    user: state.app.user
});

export default connect(mapStateToProps, {
})(WordSettingsForm);

  