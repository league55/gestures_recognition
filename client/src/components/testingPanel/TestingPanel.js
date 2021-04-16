import React from 'react'
import {draw} from "./drawing";
import {Row} from "react-bootstrap";
import {normalizeCoordinates} from "../../ml/geometry";

class TestingPanel extends React.Component {

  constructor(props) {
    super(props);
    this.canvas_original = React.createRef();
    this.canvas_left_bot = React.createRef();
    this.canvas_norm = React.createRef();
    this.handleTest = this.handleTest.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  async componentDidMount() {
  }

  async handleTest() {
    const points = this.props.points;
    if (points) {
      draw(this.canvas_original.current, points);
      const [botLeft, fixed] = normalizeCoordinates(points);
      debugger;
      draw(this.canvas_left_bot.current, botLeft);
      draw(this.canvas_norm.current, fixed);
    }
  }

  render() {
    return (
      <div>
        <button id="test" onClick={this.handleTest}>Test</button>
        <Row>
          <canvas ref={this.canvas_original} width="480px" height="360px"/>
        </Row>
        <Row>
          <canvas ref={this.canvas_left_bot} width="480px" height="360px"/>
        </Row>
        <Row>
          <canvas ref={this.canvas_norm} width="480px" height="360px"/>
        </Row>
      </div>
    );
  }
}

export default TestingPanel;
