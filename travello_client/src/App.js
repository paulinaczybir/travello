import React from 'react';
import './App.css';
import { render } from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: ""
    }
  };

  handleInputChange = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    })
  }

  addNewTrip = (event) => {
    console.log("hello")
    event.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({destination: this.state.destination}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Travello</h1>
        </header>
        <form onSubmit={this.addNewTrip}>
          <label>Destination:</label><br />
          <input onChange={this.handleInputChange} type="text" id="destination" name="destination" value={this.state.destination} /><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
