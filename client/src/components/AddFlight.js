import React, { Component } from "react";

class AddFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightNumber: "",
      departureAirport: "",
      arrivalAirport: "",
      departureTime: null,
      arrivalTime: null,
      airline: "",
      reservationId: ""
    }
  }

  handleInputChange = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    })
  }


  addFlight = event => {
    event.preventDefault();
    fetch(`trips/${this.props.tripId}/flights`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state), 
    })
    .then(res => res.json())
    .then(this.props.updateFlights) 
  }

  render() {
    return (
    <div>
      <form onSubmit={this.addFlight}>
          <label>Airline:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="airline" name="airline" defaultValue={this.state.airline} /><br />
          <label>Departure Airport:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="departureAirport" name="departureAirport" defaultValue={this.state.departureAirport} /><br />
          <label>Departure Time:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="departureTime" name="departureTime" defaultValue={this.state.departureTime} /><br />
          <label>Arrival Airport:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="arrivalAirport" name="arrivalAirport" defaultValue={this.state.arrivalAirport} /><br />
          <label>Arrival Time:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="arrivalTime" name="arrivalTime" defaultValue={this.state.arrivalTime} /><br />
          <label>Flight Number:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="flightNumber" name="flightNumber" defaultValue={this.state.flightNumber} /><br />
          <label>Reservation Id:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="reservationId" name="reservationId" defaultValue={this.state.reservationId} /><br />
          <input className="btn btn-secondary btn-lg" type="submit" value="Add flight" />
        </form>
    </div>
    )
  }
}

export default AddFlight;
