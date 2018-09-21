import React, { Component } from 'react';

export default class SaveVis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameAuthor: '',
      visTitle: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({nameAuthor: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({visTitle: event.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.nameAuthor.length === 0 || this.state.visTitle.length === 0) {
      console.log('Please enter the author and the visualization title to save it');
    } else{
      let time = new Date().getTime();
      console.log(this.state.nameAuthor);
      console.log(this.state.visTitle);
      console.log(time);
    }
  }



  render() {
    return (
      <div className="createForm">
        <h3>Save this visualization:</h3>
        <form id="NewVisualization" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <p className="labelInput">Name of the author:</p>
            <input type="text" className="form-control" id="inputNombre" placeholder="Name"
              onChange={this.handleNameChange}/>
          </div>
          <div className="form-group">
            <p className="labelInput">Visualization title:</p>
            <input type="text" className="form-control" id="inputNombre" placeholder="Title"
              onChange={this.handleTitleChange}/>
          </div>
          <button type="submit" id={'boton_agregar_productos'} className="btn btn-primary btn-lg btn-block">
            Save
          </button>
        </form>
      </div>
    );
  }
}
