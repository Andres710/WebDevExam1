import React, { Component } from 'react';
import '../style/SearchAuthor.css';

export default class SearchAuthor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorName: '',
      authorVis: [],
      buscado: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleNameChange(event) {
    this.setState({buscado: false});
    this.setState({authorName: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/visualizations/' + this.state.authorName, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    })
      .then((json) => {
        console.log(json);
        this.setState({authorVis: json});
        this.setState({buscado: true});
      })
      .catch(error => console.log(error));
  }

  renderVisList() {
    return this.state.authorVis.map((vis, i) =>
      <li key={'vis ' +i}>
        Title: {vis.visTitle} - Average Rating: {vis.avgRating} 
      </li>
      
    );
  }

  renderInformationAuthor() {
    let numVis = this.state.authorVis.length;
    let arreglo = this.state.authorVis;

    if(this.state.buscado){
      if(numVis === 0) {
        return (
          <h4>{this.state.authorName} does not have visualizations</h4>
        );
      } else {
        let total = 0;
        let totalRatings = 0;
        for(let i = 0; i < arreglo.length; i++) {
          total += arreglo[i].avgRating;
          totalRatings += arreglo[i].numRatings;
        }
        let avg = total/numVis;
        return (
          <div>
            <h4><span className="colorName">{this.state.authorName} </span>has {numVis} visualizations.</h4> <br/>
            <h4>Total ratings from all visualizations: {totalRatings}</h4> <br/>
            <h4>Average rating from all visualizations: {avg}</h4> <br/>
            <ul>
              {this.renderVisList()}
            </ul>

          </div>
        );
      }
    }
  }

  render() {
    return (
      <div>
        <div className="nav">
          <h3>Search a visualization author here:</h3>
          <div className="search-container">
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Search.." name="search" onChange={this.handleNameChange}/>
              <button type="submit"><i className="fa fa-search"></i></button>
            </form>
          </div>
        </div>
        <br/>
        <br/>
        <div>
          {this.renderInformationAuthor()}
        </div>
      </div>
    );
  }
}
