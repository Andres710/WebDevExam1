import React, { Component } from 'react';

export default class VisList extends Component {
  constructor(props){
    super(props);

    this.state = {
      ultimasVisualizaciones: []
    };

    this.handleClick = this.handleClick.bind(this);

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

  handleClick(nameAuthor, visTitle) {

    console.log(nameAuthor);
    console.log(visTitle);
    let visArray = this.state.ultimasVisualizaciones;

    for(let i = 0; i < visArray.length; i++) {
      if(visArray[i].nameAuthor === nameAuthor && visArray[i].visTitle === visTitle) {
        let jsonFinal = JSON.parse(visArray[i].jsonVega);
        this.props.onJsonChange(jsonFinal);
        this.props.onDataChange(visArray[i].data);
      }
    }
  }

  renderVisList() {

    return this.state.ultimasVisualizaciones.map((vis, i) =>
      <li key={'vis ' +i} onClick={() => this.handleClick(vis.nameAuthor, vis.visTitle)}>
        <a href="#">Title: {vis.visTitle} - Author: {vis.nameAuthor} </a>
      </li>
      
    );
  }

  render() {
    return (
      <div>
        <h3>Last 20 visualizations</h3>
        
        <ul>
          {this.renderVisList()}
        </ul>
      </div>
    );
  }
}
