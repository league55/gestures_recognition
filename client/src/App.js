import '@mediapipe/control_utils/control_utils.css'
import React from 'react'
import Video from "./components/video/Video";
import {appendLine} from "./api/api";
import MlControls from "./components/MlControls";
import {predict} from "./ml/ml";
import {getDistancesData} from "./ml/process";
import {Col, Container, Row} from "react-bootstrap";
import TestingPanel from "./components/testingPanel/TestingPanel";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {label: "", data: [], model: undefined, lastGestureLabel: undefined};
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleDataResults = this.handleDataResults.bind(this);
    this.handleSaveResults = this.handleSaveResults.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
  }


  handleLabelChange(e) {
    this.setState(Object.assign({}, this.state, {label: e.target.value}));
  }

  handleModelChange(model) {
    this.setState(Object.assign({}, this.state, {model}));
  }

  async handleDataResults(results) {
    let lastGestureLabel = this.state.lastGestureLabel;lastGesture
    if (this.state.model && results) {
      const predictResult = await predict(this.state.model, getDistancesData(results[0]));
      const labelsMapping = ["none ", "OK "];
      lastGestureLabel = predictResult[0] > predictResult[1] ? labelsMapping[0] + predictResult[0] : labelsMapping[1] + predictResult[1];
    }
    this.setState(Object.assign({}, this.state, {data: results, lastGestureLabel: lastGestureLabel}));
  }

  handleSaveResults() {
    console.log(this.state.data);
    appendLine({data: this.state.data[0], label: this.state.label});
  }

  render() {
    const lastGesture = this.state.data ? this.state.data[0] : "";
    return (
      <Container>
        <Row>
          <Col md={5}>
            <Video callback={this.handleDataResults}/>
          </Col>
          <Col md={5}>
            <div className={"data_panel"}>
              <span>lastGesture: {this.state.lastGestureLabel}</span>
              <div>
                <button id="saveBtn" onClick={this.handleSaveResults}>Save</button>
                <button id="cleanBtn">Clean</button>
                <MlControls handleModelChange={this.handleModelChange} lastGesture={lastGesture}
                            model={this.state.model} handlePredict={this.handlePredict}/>
              </div>
              <TestingPanel points={this.state.data && this.state.data[0]}/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
