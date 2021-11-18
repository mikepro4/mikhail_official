import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"

class Home extends Component {

    state = {
    }

    renderHead = () => (
		<Helmet>
			<title>Home</title>
		</Helmet>
    )


	render() {

		return (
     		<div className="page-container">
                 {this.renderHead()}
                Mikhail Official Updated
            </div>
				
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
	})(Home))
}