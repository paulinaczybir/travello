import React, { Component } from 'react'

export default class Editing extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (
      <div>
      Editing mode
        <button onClick={this.props.returnToMain}>Cancel</button>
      </div>
    )
  }
}
