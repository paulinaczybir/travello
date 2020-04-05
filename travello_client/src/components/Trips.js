import React, { Component } from 'react'

export default class Trips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: "",
      allTrips: [],
    }
  }

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
    }

  

  render() {
    return (
      <div>
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
              <span>
                {trip.destination}
              </span>
              <button onClick={() => this.deleteTrip(trip.id)}>
                Delete
              </button>
              <button onClick={() => this.props.editTrip(trip.id)}>
                Edit
              </button>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    )}
 }
