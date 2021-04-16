import React from 'react'
import {getDistancesData, prepareData} from "../ml/process";
import {testModel, trainModel} from "../ml/ml";
import {loadData} from "../api/api";

class MlControls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {baseData: undefined, dynamicData: []};
    this.handleTrain = this.handleTrain.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !!(nextProps.lastGesture && nextProps.model);
  }

  async componentDidMount() {
    const baseData = await loadData();
    this.setState({baseData: baseData});
  }

  addDataRow(row, label) {
    this.state.dynamicData.push([getDistancesData(row), label]);
    console.log("dataset size is now: " + this.state.dynamicData.length);
    this.setState(Object.assign({}, this.state, {dynamicData: this.state.dynamicData}));
  }

  async handleTrain() {
    const preparedData = prepareData(this.state.baseData).concat(this.state.dynamicData);
    trainModel(preparedData)
      .then(testModel)
      .then(model => {
      this.props.handleModelChange(model);
    });
  }

  render() {
    return (
      <div>
        <button id="trainBtn" onClick={this.handleTrain}>Train</button>
        <button id="addRowOk" onClick={() => this.addDataRow(this.props.lastGesture, "ok")}>OK</button>
        <button id="addRowNone" onClick={() => this.addDataRow(this.props.lastGesture, "")}>None</button>
      </div>
    );
  }
}

export default MlControls;
