import React from 'react'
import {prepareData} from "../ml/process_v2";
import {trainModel} from "../ml/ml_v2";
import {loadData} from "../api/api";
import {asJSON} from "../ml/csv";

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
    let newEntry = [...row, label];
    console.log("New entry", newEntry);
    this.state.dynamicData.push(newEntry);
    console.log("dataset size is now: " + this.state.dynamicData.length);
    this.setState(Object.assign({}, this.state, {dynamicData: this.state.dynamicData}));
  }

  async handleTrain() {
    let allData = asJSON(this.state.baseData).concat(this.state.dynamicData);
    const preparedData = prepareData(allData);
    trainModel(preparedData)
      .then(model => {
        this.props.handleModelChange(model);
      });
  }

  render() {
    return (
      <div>
        <button id="trainBtn" onClick={this.handleTrain}>Train</button>
        <button id="addRowOk" onClick={() => this.addDataRow(this.props.lastGesture, "palm")}>Palm</button>
        <button id="addRowNone" onClick={() => this.addDataRow(this.props.lastGesture, "fist")}>Fist</button>
      </div>
    );
  }
}

export default MlControls;
