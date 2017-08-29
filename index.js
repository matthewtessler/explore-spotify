import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  render() {
    return (
      <div>
        Explore Spotify
      </div>
    )
  }
}

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)
