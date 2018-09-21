import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';
import '../style/Visualization.css';
import Papa from 'papaparse';

export default class Visualization extends Component {

  constructor(props){
    super(props);

    this.state = {
      jsonMostrado: '',
      jsonFinal: {},
      dataFile: {},
      dataArray: []
    };

    this.handlePaint = this.handlePaint.bind(this);
    this.handleJsonChange = this.handleJsonChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.parseJsonString = this.parseJsonString.bind(this);
    this.drawVisualization = this.drawVisualization.bind(this);
    this.getDataFromCSV = this.getDataFromCSV.bind(this);
    
  }

  //Para ingreso del JSON
  handleJsonChange(event){
    this.setState({jsonMostrado: event.target.value});
    setTimeout(this.parseJsonString, 200);

  }

  handleFileChange(event){
    console.log(event.target.value);
    this.setState({dataFile: event.target.files[0]});
    setTimeout(this.getDataFromCSV, 200);
  }

  parseJsonString() {
    console.log(this.state.jsonMostrado);
    var prueba = this.state.jsonMostrado;
    //var spec = JSON.parse(this.state.jsonMostrado);
    //console.log(spec);

    try{
      var pruebaParse = JSON.parse(prueba);
      this.setState({jsonFinal: pruebaParse});
      this.drawVisualization();
      this.props.onJsonChange(pruebaParse);
    } catch(error) {
      //console.log(error);
      console.log('JSON is incomplete or it has a mistake!');
    }
  }

  getDataFromCSV() {
    let self = this;

    Papa.parse(this.state.dataFile, {
      header: true,
      complete: function(results) {
        console.log(results);
        //pruebaThis(results.data);
        self.setState({dataArray: results.data});
        self.props.onDataChange(results.data);
        self.drawVisualization();
      }
    });
  }

  

  drawVisualization() {
    console.log(this.state.jsonFinal);


    // var myData = [
    //   {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
    //   {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
    //   {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    // ];

    if(this.state.dataArray.length > 0) {

      try {
        let dataName = this.state.jsonFinal.data.name;
        let myData = this.state.dataArray;

        vegaEmbed(this.div, this.state.jsonFinal)
          .catch(error => console.log(error))
          .then((res) =>  {
            const prueba = res.view.insert(dataName, myData).run();
            this.setState({vis: prueba});
          });
      } catch(error) {
        console.log('Please enter a valid JSON for Vega-Lite');
      }

    } else {
      try {
        this.getDataFromCSV();
      } catch(error){
        console.log('Please enter a valid CSV for the given JSON');
      }
      
      
    }
  }
  
  //Para pintar la visualización
  handlePaint() {

    var spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
      "description": "A simple bar chart with embedded data.",
      "data": {
        "name": "myData" 
      },
      "mark": "bar",
      "encoding": {
        "y": {"field": "a", "type": "ordinal"},
        "x": {"field": "b", "type": "quantitative"}
      }
    };
    
    var myData = [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ];

    vegaEmbed(this.div, spec)
      .catch(error => console.log(error))
      .then((res) =>  {
        const prueba = res.view.insert("myData", myData).run();
        this.setState({vis: prueba});
      });

  }

  render() {
    return(
      <div className="container">

        <div className="row">
          <textarea className="textEditor" cols="40" rows="20" onChange={this.handleJsonChange}></textarea>
          <div className="grafica" ref={(div) => this.div=div}>Soy un Div</div>

        </div>

        <div className="row">
          <p>Choose a .csv file to import your data</p> 
        </div>
        <div className="row">
          <input type="file" name="Data" onChange={this.handleFileChange}/>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>

      </div>
    );
    
  }
}

