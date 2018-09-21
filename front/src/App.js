import React, { Component } from 'react';
import './style/App.css';
import Visualization from './components/Visualization';
import SaveVis from './components/NewVis';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      jsonFinal: {},
      dataArrayActual: []
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
          <Visualization onJsonChange={this.getJsonFinal} onDataChange={this.getDataArrayActual}/>
        </div>
        <div className="container saveVis">
          <SaveVis/>
        </div>
      </div>
    );
  }
}

export default App;
