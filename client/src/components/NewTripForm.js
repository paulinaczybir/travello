import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NewTripForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: "",
      departureDate: "",
      returnDate: "",
      necessaryDocuments: "",
      hotelName: "",
      hotelLocation: ""
    }
  }

  addNewTrip = (event) => {
    event.preventDefault();
    fetch("/trips", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: this.state.destination,
        departureDate: this.state.departureDate,
        returnDate: this.state.returnDate,
        necessaryDocuments: this.state.necessaryDocuments,
        hotelName: this.state.hotelName,
        hotelLocation: this.state.hotelLocation
      }),
    })
    .then((response) => response.json())
    .then((data) => {this.setState({allTrips: data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  handleInputChange = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="container">
        <Link to="/trips">
          <button id="link" className="btn btn-link btn-lg">⟵ See all trips</button>
        </Link>
        <div className="form-group">
          <form onSubmit={this.addNewTrip}>
            <label>Destination:</label><br />
            <input onChange={this.handleInputChange} className="form-control" type="text" id="destination" name="destination" value={this.state.destination} /><br />
            <label>Departure Date:</label><br />
            <input onChange={this.handleInputChange} className="form-control" type="text" id="departureDate" name="departureDate" value={this.state.departureDate} /><br />
            <label>Return Date:</label><br />
            <input onChange={this.handleInputChange} className="form-control" type="text" id="returnDate" name="returnDate" value={this.state.returnDate} /><br />
            <label>Necessary Documents:</label><br />
            <input onChange={this.handleInputChange} className="form-control" type="text" id="necessaryDocuments" name="necessaryDocuments" value={this.state.necessaryDocuments} /><br />
            <label>Hotel:</label><br />
            <input onChange={this.handleInputChange} className="form-control" type="text" id="hotelName" name="hotelName" value={this.state.hotelName} /><br />
            <label>Hotel Location:</label><br />
            <input onChange={this.handleInputChange} className="form-control" type="text" id="hotelLocation" name="hotelLocation" value={this.state.hotelLocation} /><br />
            <input className="btn btn-secondary" type="submit" value="Add your trip" />
          </form>
        </div>
      </div>
    )
  }
}
