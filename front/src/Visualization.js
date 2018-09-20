import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';

export default class Visualization extends Component {

  constructor(props){
    super(props);

    this.state = {
      vis: {}
    };
   
  }



  componentDidMount(){
    var spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
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

    vegaEmbed(this.divTarget, spec).then(function(result) {
      //this.setState({vis: result.view});
    });
    var hola = {hola: 'Hola'};

    this.setState({vis: hola});

  }

  //<div ref={(div) => this.div=div}>Soy un Div!</div>

  render() {

    var hola = this.state.vis;
    return(
      <div>

        <textarea 
          cols='40'
          rows='20'
          ref={(div) => this.divTarget=div}>
        </textarea>

        
        
        
        <button onClick={() => {

          var obj = {
            x: 'John',
            y: {field: 'Also John', 'type': 'quantitative'}
          };
          this.divTarget.value = JSON.stringify(obj, null, 2);
          this.divTarget.value = this.state.vis;
          
          console.log(hola);
        }}>
        Cambialo </button>


      </div>
    );
  }
}
