import React, { Component } from 'react';
import '../style/RateVis.css';

export default class RateVis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      rating: 1
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleRatingChange(event) {
    let valRating = parseInt(event.target.value);
    this.setState({rating: valRating});
  }

  handleSubmit(e){
    e.preventDefault();

    console.log('Holaaaaaaaa', this.state.rating);
    console.log('Chaooooooooo', this.props.avgRating);
    if(this.state.name.length === 0) {
      console.log('Please enter your name to leave a rating');
    } else{

      let callback = this.props.onRate;
      let nuevoNumRating = this.props.numRatings + 1;
      console.log('nuevo Num Rating  ', nuevoNumRating);
      let x = this.props.avgRating * this.props.numRatings;
      console.log('xxxxxxxxxxxxx   ', x);
      let nuevoAvgRating = (x + this.state.rating)/nuevoNumRating;
      console.log('nuevo Avg Rating   ', nuevoAvgRating);

      let params = {
        visTitle: this.props.visTitle,
        name: this.state.name,
        rating: this.state.rating,
        numRatings: nuevoNumRating,
        avgRating: nuevoAvgRating
      };

      

      let body = JSON.stringify(params);
      console.log(body);

      // fetch('/ratings', {
      //   method: 'POST',
      //   body: body,
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(response => {
      //   console.log(response);
      //   response.json().then(json => {
      //     console.log(json.message);
          
      //   });
      // }).catch(error => console.log(error));


      fetch('/visualizations', {
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response);
        response.json().then(json => {
          console.log(json.message);
          alert(json.message);
          callback(params.visTitle);
        });
      }).catch(error => console.log(error));
    }
  }


  render() {
    return (
      <div className="smallForm">
        <h3>Rate this visualization:</h3> <br/>
        <p>You can leave your rating for this visualization, just put your name and calification.</p>
        <form id="NewVisualization" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <p className="labelInput">Name:</p>
            <input type="text" className="form-control" id="inputNombre" placeholder="Name"
              onChange={this.handleNameChange}/>
          </div>
          <div className="form-group">
            <p className="labelInput">Rating:</p>
            <select className="selectBar" onChange={this.handleRatingChange}>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <button type="submit" id={'boton_agregar_productos'} className="btn btn-primary miBoton">
            Save
          </button>
          <button id={'boton_agregar_productos'} className="btn btn-danger miBoton" onClick={this.props.onClickCreate}>
            Cancel and keep creating!
          </button>
        </form>
      </div>
    );
  }
}
