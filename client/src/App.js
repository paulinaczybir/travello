import React from 'react';
import './App.css';
import { render } from 'react-dom';
import Editing from './components/Editing';
import Trips from './components/Trips';
import NewTripForm from './components/NewTripForm';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Nav from './components/Nav';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEdit: false,
      newTripFormView: false,
      tripId: []
    }
  };

  editTrip = (tripId) => {
    this.setState({
      currentEdit: true,
      newTripFormView: false,
      tripId: tripId
    })
  }

  // returnToMain = () => {
  //   this.setState({
  //     currentEdit: false,
  //     newTripFormView: false
  //   })
  // }

  // addTripView = () => {
  //   this.setState({
  //     currentEdit: false,
  //     newTripFormView: true
  //   })
  // }

  // toggleView = () => {
  //   if (this.state.currentEdit && !this.state.newTripFormView) {
  //     return <Editing returnToMain={this.returnToMain} tripId={this.state.tripId} />;
  //   } else if (!this.state.currentEdit && !this.state.newTripFormView) {
  //     return <Trips editTrip={this.editTrip} addTripView={this.addTripView} />;
  //   } else if (!this.state.currentEdit && this.state.newTripFormView) {
  //     return <NewTripForm returnToMain={this.returnToMain} />; 
  //   }
  // }


  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <header>
            <h1>Travello</h1>
          </header>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/trips" />)}/>
            <Route exact path="/trips">
              <Trips editTrip={this.editTrip}/>
            </Route>
            <Route path="/trips/edit">
              <Editing tripId={this.state.tripId}/>
            </Route>
            <Route path="/trips/new">
              <NewTripForm />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
