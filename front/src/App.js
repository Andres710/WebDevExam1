import React, { Component } from 'react';
import './style/App.css';
import Visualization from './components/Visualization';
import SaveVis from './components/SaveVis';
import VisList from './components/VisList';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      jsonFinal: {},
      dataArrayActual: [],
      ultimasVisualizaciones: []
    };

    this.getJsonFinal = this.getJsonFinal.bind(this);
    this.getDataArrayActual = this.getDataArrayActual.bind(this);
  }

  getJsonFinal(json) {
    this.setState({jsonFinal: json});
  }

  getDataArrayActual(dataArray) {
    this.setState({dataArrayActual: dataArray});
  }


  render() {

    return (
      <div className="App">
        <div className="jumbotron">
          <h1>Vega-Lite Editor!</h1>
        </div>
        <div className="container visEdit">
          <Visualization onJsonChange={this.getJsonFinal} onDataChange={this.getDataArrayActual} 
            jsonActual={this.state.jsonFinal} dataArrayActual={this.state.dataArrayActual}/>
        </div>
        <div className="row">
          <div className="col saveVis">
            <div className="container">
              <SaveVis jsonVega={this.state.jsonFinal} data={this.state.dataArrayActual}/>
            </div>
          </div>
          <div className="col visList">
            <div className="container">
              <VisList onJsonChange={this.getJsonFinal} onDataChange={this.getDataArrayActual}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
