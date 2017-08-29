import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Spotify from 'spotify-web-api-js'

let s = new Spotify();
s.setAccessToken(token);

class App extends Component {
  render() {
    return (
      <div>
        <Top />
        <Key />
        <Results />
      </div>
    )
  }
}

class Top extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3">
            <div id="top">
              <h1>Explore Spotify</h1>
              <p>
                <a href="http://matthewtessler.com" target="_blank"> Matthew Tessler 2017</a>
              </p>
              <Query />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Key extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <p id="key"><span className='glyphicon glyphicon-stop' aria-hidden='true' id="danceability"></span> danceability <span className='glyphicon glyphicon-stop' aria-hidden='true' id="acousticness"></span> acousticness <span className='glyphicon glyphicon-stop' aria-hidden='true' id="energetic"></span> energetic <span className='glyphicon glyphicon-stop' aria-hidden='true' id="instrumental"></span> instrumental <span className='glyphicon glyphicon-stop' aria-hidden='true' id="liveness"></span> liveness <span className='glyphicon glyphicon-stop' aria-hidden='true' id="speechiness"></span> speechiness  </p>
            </div>
        </div>
      </div>
    )
  }
}

class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleClick = (e) => {
    s.search(this.state.value, ["track"], function(err,data) {
      if (err) {
        console.error(err);
      }
      else {
        const element = (
          <div className="container-fluid">
            {JSON.stringify(data)}
          </div>
        );
        ReactDOM.render(element, document.querySelector('#results'));
        alert("in development: showing raw data for now");
      }
    })
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleClick(e);
    }
  }

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" value={this.state.value} id="searchBar" onKeyUp={this.handleEnter} onChange={this.handleChange} placeholder="Find your favorite tracks..."/>
        <span className="input-group-btn">
          <a className="btn btn-default" type="button" href="https://github.com/matthewtessler/spotify-af-explorer" target="_blank">
            <i className="fa fa-github fa-lg" aria-hidden="true"></i>
          </a>
          <a className="btn btn-default" type="button" href="https://github.com/matthewtessler/spotify-af-explorer" target="_blank">
            <i className="glyphicon glyphicon-question-sign" aria-hidden="true"></i>
          </a>
          <button className="btn btn-default" type="button" id="goBtn" onClick={this.handleClick}>Go!</button>
        </span>
      </div>
    )
  }
}

class Results extends Component {
  render() {
    return (
      <div id="results"></div>
    )
  }
}

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)
