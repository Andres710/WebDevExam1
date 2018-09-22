import React, { Component } from 'react';
import './style/App.css';
import Visualization from './components/Visualization';
import SaveVis from './components/SaveVis';
import VisList from './components/VisList';
import RateVis from './components/RateVis';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      jsonFinal: {},
      dataArrayActual: [],
      ultimasVisualizaciones: [],
      selected: false,
      authorVisSelected: '',
      titleVisSelected: '',
      numRatingsVisSelected: 0,
      avgRatingVisSelected: 0
    };

    this.getJsonFinal = this.getJsonFinal.bind(this);
    this.getDataArrayActual = this.getDataArrayActual.bind(this);
    this.handleNewVis = this.handleNewVis.bind(this);
    this.handleVisSelection = this.handleVisSelection.bind(this);
    this.handleVisRating = this.handleVisRating.bind(this);
    this.handleClickCreate = this.handleClickCreate.bind(this);
  }

  getJsonFinal(json) {
    this.setState({jsonFinal: json});
  }

  getDataArrayActual(dataArray) {
    this.setState({dataArrayActual: dataArray});
  }

  handleNewVis() {
    fetch('/visualizations', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    })
      .then((json) => {
        console.log(json);
        this.setState({ultimasVisualizaciones: json});
      })
      .catch(error => console.log(error));
  }

  handleVisSelection(author, title, numRatings, avgRating) {
    this.setState({selected: true});
    this.setState({authorVisSelected: author});
    this.setState({titleVisSelected: title});
    this.setState({numRatingsVisSelected: numRatings});
    this.setState({avgRatingVisSelected: avgRating});
  }

  handleVisRating(visTitle) {
    fetch('/visualizations', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    })
      .then((json) => {
        console.log(json);
        this.setState({ultimasVisualizaciones: json});
        let arreglo = this.state.ultimasVisualizaciones;
        for(let i = 0; i < arreglo.length; i++) {
          console.log('Reina del flow ', visTitle);
          console.log('Charly flow ', arreglo[i].visTitle);
          if(arreglo[i].visTitle === visTitle) {
            // console.log(arreglo[i].numRatings);
            // console.log(arreglo[i].avgRating);
            this.handleVisSelection(arreglo[i].nameAuthor, arreglo[i].visTitle, arreglo[i].numRatings, arreglo[i].avgRating);
            break;
          }
        }

      })
      .catch(error => console.log(error));

  }

  handleClickCreate() {
    this.setState({selected: false});
  }

  componentDidMount() {
    fetch('/visualizations', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    })
      .then((json) => {
        console.log(json);
        this.setState({ultimasVisualizaciones: json});
      })
      .catch(error => console.log(error));
  }


  render() {
    
    let titulo = <h4>Create your own visualizations</h4>;
    let ratings = <h4></h4>;
    let rateOrCreate = <SaveVis jsonVega={this.state.jsonFinal} data={this.state.dataArrayActual} onNewVis={this.handleNewVis}/>;
    if(this.state.selected){
      titulo = <h4>{this.state.titleVisSelected} by: {this.state.authorVisSelected}</h4>;
      ratings = <h4>Number of ratings: {this.state.numRatingsVisSelected} - Average Rating: {this.state.avgRatingVisSelected}</h4>;
      rateOrCreate = <RateVis numRatings={this.state.numRatingsVisSelected} avgRating={this.state.avgRatingVisSelected}
        visTitle={this.state.titleVisSelected} onRate={this.handleVisRating} onClickCreate={this.handleClickCreate}
      />;
    }

    return (
      <div className="App">
        <div className="jumbotron">
          <h1>Vega-Lite Editor!</h1>
        </div>
        <div className="container visEdit">
          {titulo}
          <Visualization onJsonChange={this.getJsonFinal} onDataChange={this.getDataArrayActual} 
            jsonActual={this.state.jsonFinal} dataArrayActual={this.state.dataArrayActual}/>
          {ratings}
        </div>
        <div className="row">
          <div className="col saveVis">
            <div className="container">
              {rateOrCreate}
            </div>
          </div>
          <div className="col visList">
            <div className="container">
              <VisList onJsonChange={this.getJsonFinal} onDataChange={this.getDataArrayActual} 
                ultimasVisualizaciones={this.state.ultimasVisualizaciones} onSelection={this.handleVisSelection}/>
            </div>
          </div>
        </div>
        <div className="row">
        </div>
      </div>
    );
  }
}

export default App;
