import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Spotify from 'spotify-web-api-js'

let s = new Spotify();
s.setAccessToken(token); // setting access token for api calls, brought from server

// test to see if spotify api is working
s.search("frank ocean", ["track"], function(err,data) {
  if (err) {
    console.error(err);
  }
  else {
    // display search results of tracks on console
    console.log(data);
  }
})

class App extends Component {
  render() {
    return (
      <div>
        <div id="top">
          <h1>Explore Spotify</h1>
          <p>
            <a href="http://matthewtessler.com" target="_blank"> Matthew Tessler 2017</a>
          </p>
        </div>
      </div>
    )
  }
}

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)
