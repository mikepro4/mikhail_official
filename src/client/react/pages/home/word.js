import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { motion } from "framer-motion"
import keydown from "react-keydown";

import QuickPinchZoom, { make3dTransformValue, make2dTransformValue } from "react-quick-pinch-zoom";


class Word extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }

        this.innerRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                visible: true,
            })
        }, 500)

    }

    onUpdate = ({ x, y, scale }) => {
        const { current: div } = this.innerRef;

        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        const use3DTransform = !isSafari;

        const makeTransformValue = use3DTransform
        ? make3dTransformValue
        : make2dTransformValue;
    
        if (div) {
          const value = make3dTransformValue({ x, y, scale });
    
          div.style.setProperty("transform", value);
        }
      };

    render() {

        if(this.state.visible) {
            return (
                <div
                    className={classNames({
                        "word": true,
                        "visible": this.state.visible
                    })}
                >
                    <QuickPinchZoom   
                        ref={this.quickPinchZoomRef} 
                        onUpdate={this.onUpdate} 
                        horizontalPadding={2000}
                        maxZoom={5}
                    >
                        <div className="inner-container" ref={this.innerRef}>

                            <div className="word-container"  >
                        <svg  width="644" height="219" viewBox="0 0 644 219" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* <rect x="3" y="31" width="15" height="15" fill="white"/> */}
                            <foreignObject x="3" y="31" width="15" height="15">
                                <div style={{border: "1px solid red", width: "15px", height: "15px"}} onClick={() => alert("lol")}></div>
                            </foreignObject>
                            <rect x="15" y="29" width="15" height="15" fill="white"/>
                            <rect x="27" y="27" width="15" height="15" fill="white"/>
                            <rect x="39" y="25" width="15" height="15" fill="white"/>
                            <rect x="51" y="23" width="15" height="15" fill="white"/>
                            <rect x="63" y="20" width="15" height="15" fill="white"/>
                            <rect x="75" y="16" width="15" height="15" fill="white"/>
                            <rect x="87" y="12" width="15" height="15" fill="white"/>
                            <rect x="51" y="38" width="15" height="15" fill="white"/>
                            <rect x="51" y="53" width="15" height="15" fill="white"/>
                            <rect x="51" y="68" width="15" height="15" fill="white"/>
                            <rect x="51" y="98" width="15" height="15" fill="white"/>
                            <rect x="51" y="113" width="15" height="15" fill="white"/>
                            <rect x="51" y="128" width="15" height="15" fill="white"/>
                            <rect x="51" y="143" width="15" height="15" fill="white"/>
                            <rect x="51" y="158" width="15" height="15" fill="white"/>
                            <rect x="51" y="173" width="15" height="15" fill="white"/>
                            <rect x="51" y="188" width="15" height="15" fill="white"/>
                            <rect x="47" y="198" width="15" height="15" fill="white"/>
                            <rect x="33" y="201" width="15" height="15" fill="white"/>
                            <rect x="19" y="204" width="15" height="15" fill="white"/>
                            <rect y="83" width="15" height="15" fill="white"/>
                            <rect x="15" y="83" width="15" height="15" fill="white"/>
                            <rect x="30" y="83" width="15" height="15" fill="white"/>
                            <rect x="45" y="83" width="15" height="15" fill="white"/>
                            <rect x="51" y="83" width="15" height="15" fill="white"/>
                            <rect x="60" y="83" width="15" height="15" fill="white"/>
                            <rect x="75" y="83" width="15" height="15" fill="white"/>
                            <rect x="90" y="83" width="15" height="15" fill="white"/>
                            <rect x="105" y="83" width="15" height="15" fill="white"/>
                            <rect x="120" y="83" width="15" height="15" fill="white"/>
                            <rect x="135" y="83" width="15" height="15" fill="white"/>
                            <rect x="150" y="83" width="15" height="15" fill="white"/>
                            <rect x="165" y="83" width="15" height="15" fill="white"/>
                            <rect x="180" y="83" width="15" height="15" fill="white"/>
                            <rect x="3" y="141" width="15" height="15" fill="white"/>
                            <rect x="15" y="139" width="15" height="15" fill="white"/>
                            <rect x="27" y="137" width="15" height="15" fill="white"/>
                            <rect x="39" y="134" width="15" height="15" fill="white"/>
                            <rect x="66" y="128" width="15" height="15" fill="white"/>
                            <rect x="75" y="124" width="15" height="15" fill="white"/>
                            <rect x="87" y="120" width="15" height="15" fill="white"/>
                            <rect x="115" y="13" width="15" height="15" fill="white"/>
                            <rect x="116" y="28" width="15" height="15" fill="white"/>
                            <rect x="117" y="43" width="15" height="15" fill="white"/>
                            <rect x="118" y="58" width="15" height="15" fill="white"/>
                            <rect x="119" y="73" width="15" height="15" fill="white"/>
                            <rect x="120" y="88" width="15" height="15" fill="white"/>
                            <rect x="122" y="103" width="15" height="15" fill="white"/>
                            <rect x="125" y="118" width="15" height="15" fill="white"/>
                            <rect x="128" y="133" width="15" height="15" fill="white"/>
                            <rect x="132" y="148" width="15" height="15" fill="white"/>
                            <rect x="136" y="163" width="15" height="15" fill="white"/>
                            <rect x="142" y="178" width="15" height="15" fill="white"/>
                            <rect x="151" y="193" width="15" height="15" fill="white"/>
                            <rect x="166" y="201" width="15" height="15" fill="white"/>
                            <rect x="181" y="198" width="15" height="15" fill="white"/>
                            <rect x="187" y="183" width="15" height="15" fill="white"/>
                            <rect x="189" y="168" width="15" height="15" fill="white"/>
                            <rect x="93" y="188" width="15" height="15" fill="white"/>
                            <rect x="108" y="178" width="15" height="15" fill="white"/>
                            <rect x="121" y="170" width="15" height="15" fill="white"/>
                            <rect x="141" y="155" width="15" height="15" fill="white"/>
                            <rect x="151" y="140" width="15" height="15" fill="white"/>
                            <rect x="161" y="125" width="15" height="15" fill="white"/>
                            <rect x="171" y="110" width="15" height="15" fill="white"/>
                            <rect x="233" y="25" width="15" height="15" fill="white"/>
                            <rect x="248" y="24" width="15" height="15" fill="white"/>
                            <rect x="263" y="22" width="15" height="15" fill="white"/>
                            <rect x="278" y="20" width="15" height="15" fill="white"/>
                            <rect x="293" y="19" width="15" height="15" fill="white"/>
                            <rect x="308" y="17" width="15" height="15" fill="white"/>
                            <rect x="323" y="15" width="15" height="15" fill="white"/>
                            <rect x="338" y="13" width="15" height="15" fill="white"/>
                            <rect x="353" y="10" width="15" height="15" fill="white"/>
                            <rect x="368" y="7" width="15" height="15" fill="white"/>
                            <rect x="383" y="4" width="15" height="15" fill="white"/>
                            <rect x="398" width="15" height="15" fill="white"/>
                            <rect x="230" y="82" width="15" height="15" fill="white"/>
                            <rect x="230" y="67" width="15" height="15" fill="white"/>
                            <rect x="245" y="67" width="15" height="15" fill="white"/>
                            <rect x="260" y="67" width="15" height="15" fill="white"/>
                            <rect x="275" y="67" width="15" height="15" fill="white"/>
                            <rect x="290" y="67" width="15" height="15" fill="white"/>
                            <rect x="305" y="67" width="15" height="15" fill="white"/>
                            <rect x="320" y="67" width="15" height="15" fill="white"/>
                            <rect x="335" y="67" width="15" height="15" fill="white"/>
                            <rect x="350" y="67" width="15" height="15" fill="white"/>
                            <rect x="365" y="67" width="15" height="15" fill="white"/>
                            <rect x="380" y="67" width="15" height="15" fill="white"/>
                            <rect x="395" y="67" width="15" height="15" fill="white"/>
                            <rect x="395" y="82" width="15" height="15" fill="white"/>
                            <rect x="259" y="37" width="15" height="15" fill="white"/>
                            <rect x="267" y="52" width="15" height="15" fill="white"/>
                            <rect x="313" y="37" width="15" height="15" fill="white"/>
                            <rect x="320" y="52" width="15" height="15" fill="white"/>
                            <rect x="359" y="52" width="15" height="15" fill="white"/>
                            <rect x="367" y="37" width="15" height="15" fill="white"/>
                            <rect x="238" y="192" width="15" height="15" fill="white"/>
                            <rect x="254" y="177" width="15" height="15" fill="white"/>
                            <rect x="265" y="162" width="15" height="15" fill="white"/>
                            <rect x="274" y="147" width="15" height="15" fill="white"/>
                            <rect x="281" y="132" width="15" height="15" fill="white"/>
                            <rect x="286" y="117" width="15" height="15" fill="white"/>
                            <rect x="289" y="102" width="15" height="15" fill="white"/>
                            <rect x="292" y="87" width="15" height="15" fill="white"/>
                            <rect x="247" y="106" width="15" height="15" fill="white"/>
                            <rect x="262" y="106" width="15" height="15" fill="white"/>
                            <rect x="277" y="106" width="15" height="15" fill="white"/>
                            <rect x="292" y="106" width="15" height="15" fill="white"/>
                            <rect x="307" y="106" width="15" height="15" fill="white"/>
                            <rect x="322" y="106" width="15" height="15" fill="white"/>
                            <rect x="337" y="106" width="15" height="15" fill="white"/>
                            <rect x="352" y="106" width="15" height="15" fill="white"/>
                            <rect x="367" y="106" width="15" height="15" fill="white"/>
                            <rect x="382" y="106" width="15" height="15" fill="white"/>
                            <rect x="286" y="138" width="15" height="15" fill="white"/>
                            <rect x="301" y="138" width="15" height="15" fill="white"/>
                            <rect x="316" y="138" width="15" height="15" fill="white"/>
                            <rect x="331" y="138" width="15" height="15" fill="white"/>
                            <rect x="346" y="138" width="15" height="15" fill="white"/>
                            <rect x="361" y="138" width="15" height="15" fill="white"/>
                            <rect x="376" y="138" width="15" height="15" fill="white"/>
                            <rect x="368" y="153" width="15" height="15" fill="white"/>
                            <rect x="358" y="164" width="15" height="15" fill="white"/>
                            <rect x="346" y="173" width="15" height="15" fill="white"/>
                            <rect x="332" y="180" width="15" height="15" fill="white"/>
                            <rect x="317" y="188" width="15" height="15" fill="white"/>
                            <rect x="302" y="192" width="15" height="15" fill="white"/>
                            <rect x="287" y="196" width="15" height="15" fill="white"/>
                            <rect x="272" y="200" width="15" height="15" fill="white"/>
                            <rect x="288" y="153" width="15" height="15" fill="white"/>
                            <rect x="298" y="164" width="15" height="15" fill="white"/>
                            <rect x="311" y="172" width="15" height="15" fill="white"/>
                            <rect x="323" y="178" width="15" height="15" fill="white"/>
                            <rect x="344" y="188" width="15" height="15" fill="white"/>
                            <rect x="359" y="191" width="15" height="15" fill="white"/>
                            <rect x="374" y="195" width="15" height="15" fill="white"/>
                            <rect x="389" y="198" width="15" height="15" fill="white"/>
                            <rect x="433" y="99" width="15" height="15" fill="white"/>
                            <rect x="446" y="84" width="15" height="15" fill="white"/>
                            <rect x="455" y="69" width="15" height="15" fill="white"/>
                            <rect x="468" y="54" width="15" height="15" fill="white"/>
                            <rect x="475" y="39" width="15" height="15" fill="white"/>
                            <rect x="482" y="24" width="15" height="15" fill="white"/>
                            <rect x="489" y="9" width="15" height="15" fill="white"/>
                            <rect x="468" y="69" width="15" height="15" fill="white"/>
                            <rect x="468" y="84" width="15" height="15" fill="white"/>
                            <rect x="468" y="99" width="15" height="15" fill="white"/>
                            <rect x="468" y="114" width="15" height="15" fill="white"/>
                            <rect x="468" y="129" width="15" height="15" fill="white"/>
                            <rect x="468" y="144" width="15" height="15" fill="white"/>
                            <rect x="468" y="159" width="15" height="15" fill="white"/>
                            <rect x="468" y="174" width="15" height="15" fill="white"/>
                            <rect x="468" y="189" width="15" height="15" fill="white"/>
                            <rect x="468" y="204" width="15" height="15" fill="white"/>
                            <rect x="500" y="102" width="15" height="15" fill="white"/>
                            <rect x="509" y="87" width="15" height="15" fill="white"/>
                            <rect x="518" y="72" width="15" height="15" fill="white"/>
                            <rect x="524" y="57" width="15" height="15" fill="white"/>
                            <rect x="529" y="42" width="15" height="15" fill="white"/>
                            <rect x="533" y="27" width="15" height="15" fill="white"/>
                            <rect x="536" y="12" width="15" height="15" fill="white"/>
                            <rect x="539" y="57" width="15" height="15" fill="white"/>
                            <rect x="554" y="57" width="15" height="15" fill="white"/>
                            <rect x="569" y="57" width="15" height="15" fill="white"/>
                            <rect x="584" y="57" width="15" height="15" fill="white"/>
                            <rect x="599" y="57" width="15" height="15" fill="white"/>
                            <rect x="614" y="57" width="15" height="15" fill="white"/>
                            <rect x="629" y="57" width="15" height="15" fill="white"/>
                            <rect x="628" y="72" width="15" height="15" fill="white"/>
                            <rect x="626" y="87" width="15" height="15" fill="white"/>
                            <rect x="570" y="72" width="15" height="15" fill="white"/>
                            <rect x="570" y="87" width="15" height="15" fill="white"/>
                            <rect x="570" y="102" width="15" height="15" fill="white"/>
                            <rect x="570" y="117" width="15" height="15" fill="white"/>
                            <rect x="570" y="132" width="15" height="15" fill="white"/>
                            <rect x="570" y="147" width="15" height="15" fill="white"/>
                            <rect x="570" y="162" width="15" height="15" fill="white"/>
                            <rect x="570" y="177" width="15" height="15" fill="white"/>
                            <rect x="570" y="192" width="15" height="15" fill="white"/>
                            <rect x="561" y="200" width="15" height="15" fill="white"/>
                            <rect x="546" y="203" width="15" height="15" fill="white"/>
                            <rect x="532" y="110" width="15" height="15" fill="white"/>
                            <rect x="529" y="125" width="15" height="15" fill="white"/>
                            <rect x="524" y="140" width="15" height="15" fill="white"/>
                            <rect x="517" y="155" width="15" height="15" fill="white"/>
                            <rect x="509" y="170" width="15" height="15" fill="white"/>
                            <rect x="605" y="110" width="15" height="15" fill="white"/>
                            <rect x="612" y="125" width="15" height="15" fill="white"/>
                            <rect x="618" y="140" width="15" height="15" fill="white"/>
                            <rect x="623" y="155" width="15" height="15" fill="white"/>
                            <rect x="626" y="170" width="15" height="15" fill="white"/>
                            <rect x="150" y="24" width="15" height="15" fill="white"/>
                            <rect x="165" y="35" width="15" height="15" fill="white"/>
                            <rect x="175" y="50" width="15" height="15" fill="white"/>
                        </svg>
                        </div>

                        </div>
    
                        </QuickPinchZoom>
    
                </div>
            );
        } else {
            return (<div></div>)
        }
        
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        user: state.app.user
    };
}

export default connect(mapStateToProps, {
})(withRouter(Word));
