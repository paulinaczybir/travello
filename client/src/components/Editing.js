import React, { Component } from 'react'
import Flights from './Flights';

export default class Editing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDestination: "",
      editDepartureDate: "",
      editReturnDate: "",
      editNecessaryDocuments: "",
      editHotelName: "",
      editHotelLocation: ""
    }
  }

  componentDidMount() {
    this.getTripById(this.props.tripId);
  }

  getTripById = id => {
    fetch(`/trips/${this.props.tripId}`)
      .then(res => res.json())
      .then(response => {
        this.setState({
          editDestination: response.destination,
          editDepartureDate: response.departureDate,
          editReturnDate: response.returnDate,
          editNecessaryDocuments: response.necessaryDocuments,
          editHotelName: response.hotelName,
          editHotelLocation: response.hotelLocation
        });
      });
  };

  saveChanges = event => {
    event.preventDefault();
    fetch(`/trips/${this.props.tripId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: this.state.editDestination,
        departureDate: this.state.editDepartureDate,
        returnDate: this.state.editReturnDate,
        necessaryDocuments: this.state.editNecessaryDocuments,
        hotelName: this.state.editHotelName,
        hotelLocation: this.state.editHotelLocation
      }),
    })
    .then((response) => response.json())
    .then((data) => {this.setState({allTrips: data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    this.props.returnToMain();
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
      <div>
        <button id="link" className="btn btn-link btn-lg" onClick={this.props.returnToMain}>⟵ Back to your trips</button>
        <h4>Here you can edit your trip details.</h4>
        <div className="form-group">
        <form onSubmit={this.saveChanges}>
          <label>Destination:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="editDestination" name="editDestination" defaultValue={this.state.editDestination} /><br />
          <label>Departure Date:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="editDepartureDate" name="editDepartureDate" defaultValue={this.state.editDepartureDate} /><br />
          <label>Return Date:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="editReturnDate" name="editReturnDate" defaultValue={this.state.editReturnDate} /><br />
          <label>Necessary Documents:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="editNecessaryDocuments" name="editNecessaryDocuments" defaultValue={this.state.editNecessaryDocuments} /><br />
          <label>Hotel:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="editHotelName" name="editHotelName" defaultValue={this.state.editHotelName} /><br />
          <label>Hotel Location:</label><br />
          <input onChange={this.handleInputChange} className="form-control" type="text" id="editHotelLocation" name="editHotelLocation" defaultValue={this.state.editHotelLocation} /><br />
          <input className="btn btn-secondary btn-lg" type="submit" value="Save your changes" />
          <button className="btn btn-secondary btn-lg" onClick={this.props.returnToMain}>Cancel</button>
        </form>
        </div>
        <Flights tripId={this.props.tripId}/>
      </div>
    )
  }
}
