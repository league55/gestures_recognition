import '@mediapipe/control_utils/control_utils.css'
import React from 'react'
import Video from "./components/video/Video";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {label: "", data: []};
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleDataResults = this.handleDataResults.bind(this);
    this.handleDbgResults = this.handleDbgResults.bind(this);
    this.handleSaveResults = this.handleSaveResults.bind(this);
  }


  handleLabelChange(e) {
    this.setState(Object.assign({}, this.state, {label: e.target.value}));
  }

  handleDataResults(results) {
    // console.log(results);
    this.setState(Object.assign({}, this.state, {data: results}));
  }

  handleDbgResults() {
    console.log(this.state.data);
  }

  handleSaveResults() {
    console.log(this.state.data);
  }

  render() {
    return (
      <div className={"container"}>
        <Video callback={this.handleDataResults}/>
        <div className={"data_panel"}>
          <div>
            <button id="debugBtn" onClick={this.handleDbgResults}>Debug</button>
            <button id="saveBtn" onClick={this.handleSaveResults}>Save</button>
            <button id="cleanBtn">Clean</button>
            <label htmlFor="name">Label</label><input id="label" onChange={this.handleLabelChange}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
