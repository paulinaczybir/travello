import React from 'react';
import './App.css';
import { render } from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: "",
      allTrips: [],
      editing: false,
      editedInput: ""
    }
  };

  componentDidMount() {
    this.getTrips();
  }

  getTrips = () => {
    fetch("/users")
      .then(response => response.json())
      .then(response => {
        this.setState({ allTrips: response });
      });
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
    event.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({destination: this.state.destination}),
    })
    .then((response) => response.json())
    .then((data) => {this.setState({allTrips: data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  deleteTrip = i => {
    fetch(`/users/${i}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          allTrips: response
        });
      })
      .catch(error => {
        console.log(error);
      });
    };


    toggleEditing = () => {
      this.setState({
        editing: true
      })
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
        <div>
          <ul>
          {this.state.allTrips.map((trip, index) => {
            return (
              <li key={index}>
                <span onClick={this.toggleEditing}>
                  {this.state.editing ? <input onChange={this.handleInputChange} name="editedInput" value={this.state.editedInput}/>: trip.destination}
                </span>
                <button onClick={() => this.deleteTrip(trip.id)}>
                  Delete
                </button>
              </li>
            );
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
