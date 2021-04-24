import '@mediapipe/control_utils/control_utils.css'
import React from 'react'
import Video from "./components/video/Video";
import {appendLine} from "./api/api";
import MlControls from "./components/MlControls";
import {predict} from "./ml/ml_v2";
import {prepareSingleEntry} from "./ml/process_v2";
import TestingPanel from "./components/testingPanel/TestingPanel";
import './App.scss';

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
    let lastGestureLabel = this.state.lastGestureLabel;
    if (this.state.model && results) {
      let testEntry = prepareSingleEntry(results[0].concat("lable_unknown"));
      const predictResult = await predict(this.state.model, testEntry.features);
      const labelsMapping = ["Palm ", "Fist ", "Undefined "];
      let bestMatch = predictResult.indexOf(Math.max(...predictResult));

      lastGestureLabel = predictResult[bestMatch] > 0.5 ? labelsMapping[bestMatch] + Math.round(predictResult[bestMatch] * 100) / 100 : "Undefined " + Math.round(predictResult[1] * 100) / 100;
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
      <div className="container">
        <div>
          <Video callback={this.handleDataResults}/>
          <div className={"data_panel"}>
            <span>lastGesture: {this.state.lastGestureLabel}</span>
            <div>
            </div>
            <TestingPanel points={this.state.data && this.state.data[0]}/>
          </div>
          <div className={"button-grp"}>
            <button id="saveBtn" onClick={this.handleSaveResults} disabled>Persist data</button>
          </div>

          <MlControls handleModelChange={this.handleModelChange} lastGesture={lastGesture}
                      model={this.state.model} handlePredict={this.handlePredict}/>
        </div>

      </div>
    );
  }
}

export default App;
