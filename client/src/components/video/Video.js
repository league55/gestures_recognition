import '@mediapipe/control_utils/control_utils.css'
import './Video.scss'
import React from 'react'
import {initCamera, initControlPanel, initHands} from "../../mediapipe/script";

class Video extends React.Component {

  constructor(props) {
    super(props);
    this.state = {counter: 0}
    this.input_video = React.createRef();
    this.output_canvas = React.createRef();
    this.control_panel = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  componentDidMount() {
    const callbackWrapped = (data) => {
      if (data.multiHandLandmarks && this.state.counter % 20 === 0) {
        this.setState({counter: 0});
        return this.props.callback(data.multiHandLandmarks);
      }
      this.setState({counter: this.state.counter + 1});
    }
    const hands = initHands(this.output_canvas.current, callbackWrapped);
    initCamera(this.input_video.current, hands);
    initControlPanel(this.control_panel.current, this.input_video.current, hands);
  }


  render() {
    return (
      <div className={"video-container"}>
        <video className={"input_video"} ref={this.input_video}/>
        <canvas className={"output_canvas"} ref={this.output_canvas} width="480px" height="360px"/>
        <div className="control-panel" ref={this.control_panel}/>
      </div>
    );
  }
}

export default Video;
