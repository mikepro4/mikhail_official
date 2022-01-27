import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash";
import update from "immutability-helper";

class Viz extends Component {
	

    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            radius: 0,
            rotate: 0,
            rotate_speed: 0,
            friction: 0,
            speed: 0,
            step: 0,
            freq: 0,
            bold_rate: 0,
            math: "sin",
            pointSize: 0,
            pointOpacity: 0,
            x: 0,
            y: 0,
            paused: false,
            visible: false,
            timeInterval: null,
            totalPointCount: 1024,
            points: []
        };

    }

	componentDidMount = () => {
        if(this.props.shape) {
            if(this.props.shape.defaultViz || this.props.defaultViz) {
                if( this.props.defaultViz &&  this.props.defaultViz.point &&  this.props.defaultViz.point.pointCount) {
                    this.startViz() 
                    this.setState({
                        pointCount: this.props.defaultViz.point.pointCount
                    })
                    this.updateColors()
                }
            }
            window.addEventListener("resize", this.handleResize);
    
            if(this.props.defaultViz) {
                this.setState({
                    paused: true,
                })
            }
    
            // if(this.props.defaultViz) {
            //     setTimeout(() => {
            //         this.setState({
            //             paused: true
            //         });
            //     },10000)
            // }
           
    
            // if(this.props.defaultViz) {
            //     console.log("here")
            // }
    
            if(this.props.location.pathname == "/") {
    
                const timeInterval = setInterval(() => {
                    window.dispatchEvent(new Event('resize'));
                     
                }, 1000);
        
                this.setState({ timeInterval });
            }
    
        }
       
        
    }

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.handleResize);
        window.cancelAnimationFrame(this.state.requestAnimationFrame);
        clearInterval(this.state.timeInterval);
    }
    
    handleResize = () => {
		    this.updateDimensions()
    }

    componentDidUpdate = (prevprops, prevState) => {
        if(this.props.shape ) {
            if(prevprops.shape._id !== this.props.shape._id) {
                this.startViz() 
                this.setState({
                    pointCount: this.props.shape.defaultViz.point.pointCount
                })
                this.updateColors()
            }
        }


        if(prevState.pointCount !== this.state.pointCount) {
            this.generatePoints()
            setTimeout(() => {
                this.updateColors()
            }, 1)
        }
    }

    updateColors = () => {
        console.log("update colors")
        let colors = this.getViz().colors
        let pointCount =  this.state.pointCount
        let ranges = []

        if(colors.length > 0) {
            let newRanges = _.map(colors, (point, i) => {
                return({
                    count: point.amount * pointCount / 100
                })
            })
    
            let points = []
    
            _.map(newRanges, (range, colorCount) => {
                let filteredPoints = _.filter(this.state.points, (point, i) => {
                    if(i < range.count) {
                        return true 
                    } 
                })
                let coloredPoints = _.map(filteredPoints, (point, i) => {
                    if(i < range.count) {
                        return ({
                            ...point,
                            color: colors[colorCount].hex,
                            opacity: colors[colorCount].opacity
                        })
                    }
                })
                points = _.concat(points, coloredPoints)
                return
            })
    
            let difference = this.state.pointCount - points.length
    
            let filteredDifference = _.filter(this.state.points, (point, i) => {
                if(i >= (this.state.pointCount - difference)) {
                    return true 
                } 
            })
    
            let remainingPoints = _.map(filteredDifference, (point, i) => {
                return ({
                    ...point,
                    hidden: true
                })
            })
            points = _.concat(points, remainingPoints)
    
            this.setState({
                points: points
            })
    
            if(points.length == this.state.totalPointCount) {
                this.setState({
                    points: points
                })
            } else {
    
            }
        } else {
            let allWhitePoints = _.map(this.state.points, (point, i) => {
                return ({
                    ...point,
                    color: "#ffffff",
                    opacity: 100
                })
            })

            this.setState({
                points: allWhitePoints
            })
        }

        
    }


	startViz = () => {
        if(this.props.shape && this.props.word && this.props.word.metadata && this.props.word.metadata.shapeId) {
            this.generatePoints()
            this.updateDimensions(this.updateViz)
        }
        
    }

    
    updateDimensions = (callback) => {
        if(this.props.shape && this.props.word && this.props.word.metadata && this.props.word.metadata.shapeId) {
            let rect = this.refs.viz_container.getBoundingClientRect();

            if(rect) {
                let scale = 1

                if(this.props.defaultViz) {
                    scale = 0.6
                }
                if(this.props.app.clientWidth > 1000) {
                    this.setState({
                        width: rect.width * 2,
                        height: rect.height * 2,
                        radius: (rect.width * 2) / 7 * scale,
                        x: (rect.width * 2) / 2,
                        y: (rect.height * 2) / 2
                    }, () => {
                        if(callback) {
                            callback()
                        }
                    })
                } else {
        
                        this.setState({
                        width: rect.width * 2,
                        height: rect.height * 2,
                        radius: (rect.width * 2) / 4 * scale,
                        x: (rect.width * 2) / 2,
                        y: (rect.height * 2) / 2
                    }, () => {
                        if(callback) {
                            callback()
                        }
                    })
                }
            }
        }
    
        
		
    }

    updateViz = (callback) => {

        let rect = this.refs.viz_container.getBoundingClientRect();

        let finalViz = {}

        // if(this.props.defaultViz) {
        //     finalViz = this.props.defaultViz
        // } else {
        //      if (this.props.shape.newShape.defaultViz) {
        //         vizSource = 'newShape'
        //     } else {
        //         vizSource = 'currentShape'
        //     }
        // }

        if(this.props.defaultViz) {
            finalViz = this.props.defaultViz

            const {
                rotateSpeed,
                friction,
                rotatePointSpeed,
                step,
                frequency,
                boldRate,
                math
            } = finalViz.shape
            
            const {
                pointSize,
                pointOpacity,
                pointCount,
                pointColor
            } = finalViz.point

            this.setState({
                rotate_speed: rotateSpeed * 0.1 + 0.001,
                friction: friction * 0.8 + 0.1,
                rotate_point_speed: rotatePointSpeed * 0.2 + 0.03,
                step: step * 0.5 + 0.0001,
                freq: frequency * 0.09 + 0.01,
                bold_rate: boldRate * 0.3 + 0.1,
                math: math,
                pointSize: pointSize,
                pointOpacity: pointOpacity,
                pointColor: "#ffffff",
                backgroundColor: "",
                backgroundEnabled: false,
                backgroundOpacity: 1
            }, () => {
                    if(!this.state.requestAnimationFrame) {
                        this.paint()
                        console.log("Initial state: ", this.state)
                    }
            })
        } else {

            const {
                rotateSpeed,
                friction,
                rotatePointSpeed,
                step,
                frequency,
                boldRate,
                math
            } = this.props.shape.defaultViz.shape
            
            const {
                pointSize,
                pointOpacity,
                pointCount,
                pointColor
            } = this.props.shape.defaultViz.point

            // let finalPointSize

            // if(this.props.app.clientWidth < 500) {
            //     finalPointSize = 1.3
            // } else {
            //     finalPointSize = pointSize
            // }
            
            this.setState({
                rotate_speed: rotateSpeed * 0.1 + 0.001,
                friction: friction * 0.8 + 0.1,
                rotate_point_speed: rotatePointSpeed * 0.2 + 0.03,
                step: step * 0.5 + 0.0001,
                freq: frequency * 0.09 + 0.01,
                bold_rate: boldRate * 0.3 + 0.1,
                math: math,
                pointSize: pointSize,
                pointOpacity: pointOpacity,
                pointColor: "#ffffff",
                backgroundColor: "",
                backgroundEnabled: false,
                backgroundOpacity: 1
            }, () => {
                    if(!this.state.requestAnimationFrame) {
                        this.paint()
                        console.log("Initial state: ", this.state)
                    }
            })
        }

    }

    paint = () => {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d')
        ctx.width = this.state.width;
        ctx.height = this.state.height;
        this.update();
    }

    generatePoints = () => {
        let vizSource

        let points = []
        for (var i = 0; i < this.state.totalPointCount; i++) {
          var pt = this.createPoint(
            Math.random(1) * this.state.width,
            Math.random(1) * this.state.height,
            i
          );
          points.push(pt)
        }

        this.setState({
            points: points
        })
    
        return points
    }

    createPoint(x, y, i) {

        let finalHidden = false

        if(i < Math.floor(this.state.pointCount)) {
            finalHidden = false
        } else {
            finalHidden = true
        }

        let vizSource
        let finalViz

        let point = {
          x: x,
          y: y,
          vx: 0,
          vy: 0,
          hidden: finalHidden,
          color:"#000000"
        }
        return point
    }

    update = () => {
		let points = this.generatePoints()
        this.renderFrame(this.refs.canvas.getContext('2d'), points)
        // setInterval(() => {
        //     this.setupSVGCanvas(points)
        // }, 1000)
    }

    renderOnce = (ctx) => {

        let points = this.state.points
        if(points.length > 0)  {
            ctx.clearRect(0, 0, this.state.width, this.state.height);

            this.setState({
              rotate: this.state.rotate + this.state.rotate_speed
            })
    
            let freqData = []
            let soundModifier = 1
    
            if(this.props.player.analyser) {
                freqData = new Uint8Array(this.props.player.analyser.frequencyBinCount)
                this.props.player.analyser.getByteFrequencyData(freqData)
            }
    
            
    
            for (let i = 0; i < points.length; i++) {
    
                if(this.props.player.analyser && soundModifier) {
                    soundModifier = freqData[this.getPointIterator(i)]/1000
            
                    if(soundModifier == 0) {
                      soundModifier = 1
                    }
                }
    
                let point = points[i];

                if(point) {
                    let t_radius = this.calculateRadius(soundModifier, i)
    
                    let tx = this.state.x + Math.cos(this.state.rotate + this.state.step * i  + soundModifier) * t_radius;
                    let ty = this.state.y + Math.sin(this.state.rotate + this.state.step * i  + soundModifier) * t_radius;
        
                    point.vx += (tx - point.x) * this.state.rotate_point_speed  ;
                    point.vy += (ty - point.y) * this.state.rotate_point_speed ;
        
                    point.x += point.vx;
                    point.y += point.vy;
        
                    point.vx *= this.state.friction;
                    point.vy *= this.state.friction;
        
                    if (point.x >= 0 && point.x <= this.state.width && point.y >= 0 && point.y <= this.state.height) {
        
                        if(point.hidden) {
                            ctx.beginPath();
                            ctx.arc(point.x,point.y,0,0,2*Math.PI);
                            ctx.fillStyle = `rgba(
                                ${this.hexToRgb(this.state.pointColor).r},
                                ${this.hexToRgb(this.state.pointColor).g},
                                ${this.hexToRgb(this.state.pointColor).b},
                                0}
                            )`;
                            ctx.fill(); 
                        } else {
                            ctx.beginPath();
                            ctx.arc(point.x,point.y,this.state.pointSize,0,2*Math.PI);
                            ctx.fillStyle = `rgba(
                                ${this.hexToRgb(point.color).r},
                                ${this.hexToRgb(point.color).g},
                                ${this.hexToRgb(point.color).b},
                                ${this.getPointOpacity(freqData[this.getPointIterator(i)], point)}
                            )`;
                            ctx.fill();
                        }
        
                    }
                }
    
                
            }
        }

    }

    hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    calculateRadius = (soundModifier, i) => {
        let radius = Math[this.state.math](this.state.rotate + this.state.freq * i ) * this.state.radius * this.state.bold_rate  +
                this.state.radius;

        return radius
    }

    getPointIterator = (i) => {
        if (i <= this.state.totalPointCount) {
            return i
        } else {
            return i-this.state.totalPointCount
        }
    }

    getPointOpacity = (value, point) => {
        if(value > 0) {
            return value/256*100
        } else {
            return point.opacity / 50
        }
    }

    renderFrame = (ctx, points) => {
        if(!this.state.paused ) {
            this.renderOnce(ctx, points);
            this.setState({
                requestAnimationFrame: requestAnimationFrame(() => this.renderFrame(ctx, points))
            });
        } else {
            this.setState({
                requestAnimationFrame: null
            });
        }
    }

    setupSVGCanvas = (points) => {
        var container = document.querySelector("#centered");
        var svgkitContext = new SVGCanvas(this.state.width,this.state.height);

        let element = document.getElementById("svgcanvas");
        if(element) {
            element.parentNode.removeChild(element);
        }
        svgkitContext.svg.svgElement.setAttribute("class", "example"); // just for styling
        svgkitContext.svg.svgElement.setAttribute("id", "svgcanvas");
        container.appendChild(svgkitContext.svg.svgElement);
        this.renderOnce(svgkitContext, points)
    }

    renderOverlay = () => {
        let vizSource
        let finalViz
        let finalColor
        let finalOpacity
        let finalBlur

       
        finalViz = this.props.shape.defaultViz

        if(finalViz && finalViz.overlay) {
            const {
                visible,
                blur,
                color,
                colorOpacity,
            } = finalViz.overlay
            if(visible) {
                finalBlur = blur
                finalColor = color
                finalOpacity =colorOpacity
            } else {
                finalBlur = 0
                finalColor = "#000000"
                finalOpacity = 0
            }

        } else {
            finalBlur = 0,
            finalColor = "#000000"
            finalOpacity = 0
        }

        // console.log(`rgba(${this.hexToRgb(finalColor).r}, ${this.hexToRgb(finalColor).g}, ${this.hexToRgb(finalColor).b}, 0.6)`)
        return(
            <div>

                <div className="goo"></div>
                <div 
                    className="glass"
                    style={{
                        background: `rgba(${this.hexToRgb(finalColor).r}, ${this.hexToRgb(finalColor).g}, ${this.hexToRgb(finalColor).b}, ${finalOpacity})`,
                        backdropFilter: "blur(" + finalBlur + "px)",
                        WebkitBackdropFilter: "blur(" + finalBlur + "px)",
                    }}
                >

                </div>
            </div>
        )
        
    }

    getViz = () => {
        let finalViz = this.props.shape.defaultViz
        
        return finalViz
    }

        
	render() {
        if(this.props.shape && this.props.shape.defaultViz) {
            let finalViz = this.props.shape.defaultViz
        

            return (
                <div 
                    className={classNames({"full": this.props.app.fullScreen}, "viz-container")}
                    ref="viz_container" 
                    style={{
                        backgroundColor: finalViz && finalViz.shape && finalViz.shape.backgroundColor
                    }}
                >
                    <canvas
                        ref="canvas"
                        className="viz"
                        id="viz"
                        width={this.state.width}
                        height={this.state.height}
                    />
                    <div id="centered" style={{display: "none"}}></div>
                    {/* {this.state.visible ? <div>visible</div> : <div>hidden</div>} */}
                    {this.renderOverlay()}
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
        app: state.app,
        shape: state.app.activeShape,
        player: state.player,
        word: state.app.activeWord
	};
}

export default connect(mapStateToProps, {

 })(Viz);
