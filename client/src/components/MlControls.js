import React from 'react'
import {prepareData} from "../ml/process_v2";
import {trainModel} from "../ml/ml_v2";
import {loadData} from "../api/api";
import {asJSON} from "../ml/csv";
import {static_data} from "../static_data.js"
import "./MLControls.scss"

class MlControls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {baseData: undefined, dynamicData: [], usePreloaded: true};
    this.handleTrain = this.handleTrain.bind(this);
    this.handlePreloadedChange = this.handlePreloadedChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !!(nextProps.lastGesture && nextProps.model) || this.state.usePreloaded !== nextState.usePreloaded;
  }

  async componentDidMount() {
    try {
      const baseData = await loadData(); // loaded from dev
      this.setState({baseData: baseData});
    } catch (e) {
      console.log("No server, using static data.");
      this.setState({baseData: static_data});
    }
  }

  addDataRow(row, label) {
    let newEntry = [...row, label];
    console.log("New entry", newEntry);
    this.state.dynamicData.push(newEntry);
    console.log("dataset size is now: " + this.state.dynamicData.length);
    this.setState(Object.assign({}, this.state, {dynamicData: this.state.dynamicData}));
  }

  async handleTrain() {
    const allData = this.state.usePreloaded ? asJSON(this.state.baseData).concat(this.state.dynamicData) : this.state.dynamicData;
    const preparedData = prepareData(allData);
    trainModel(preparedData)
      .then(model => {
        this.props.handleModelChange(model);
      });
  }

  handlePreloadedChange(e) {
    this.setState(Object.assign({}, this.state, {usePreloaded: !this.state.usePreloaded}));
  }

  render() {
    return (
      <div className={"button-grp"}>
        <button id="trainBtn" onClick={this.handleTrain}>Train</button>
        <div>
          <input type="checkbox" id="usePreloaded" checked={this.state.usePreloaded}
                 onChange={this.handlePreloadedChange}/>Use preloadedData
        </div>
        <div>
          <button id="addRowOk" onClick={() => this.addDataRow(this.props.lastGesture, "palm")}>Add Palm entry</button>
          <button id="addRowNone" onClick={() => this.addDataRow(this.props.lastGesture, "fist")}>Add Fist
            entry
          </button>
        </div>
      </div>
    );
  }
}

export default MlControls;
