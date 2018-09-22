import React, { Component } from 'react';

export default class VisList extends Component {
  constructor(props){
    super(props);


    this.handleClick = this.handleClick.bind(this);

  }

  // componentDidMount() {
  //   fetch('/visualizations', {
  //     method: 'GET'
  //   }).then((response) => {
  //     return response.json();
  //   })
  //     .then((json) => {
  //       console.log(json);
  //       this.setState({ultimasVisualizaciones: json});
  //     })
  //     .catch(error => console.log(error));
  // }



  handleClick(nameAuthor, visTitle) {

    console.log(nameAuthor);
    console.log(visTitle);
    //let visArray = this.state.ultimasVisualizaciones;
    let visArray = this.props.ultimasVisualizaciones;

    for(let i = 0; i < visArray.length; i++) {
      if(visArray[i].nameAuthor === nameAuthor && visArray[i].visTitle === visTitle) {
        let jsonFinal = JSON.parse(visArray[i].jsonVega);
        this.props.onJsonChange(jsonFinal);
        this.props.onDataChange(visArray[i].data);
        this.props.onSelection(nameAuthor, visTitle, visArray[i].numRatings, visArray[i].avgRating);
        break;

      }
    }
  }

  renderVisListProps() {
    return this.props.ultimasVisualizaciones.map((vis, i) =>
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
          {this.renderVisListProps()}
        </ul>
      </div>
    );
  }
}
