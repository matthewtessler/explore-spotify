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
        <div id="results"></div>
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
        ReactDOM.render(<Results data={data}/>, document.querySelector('#results'));
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
          <a className="btn btn-default" type="button" href="https://github.com/matthewtessler/explore-spotify" target="_blank">
            <i className="fa fa-github fa-lg" aria-hidden="true"></i>
          </a>
          <a className="btn btn-default" type="button" href="https://developer.spotify.com/web-api/get-audio-features/" target="_blank">
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
    let tracksList = this.props.data.tracks.items;
    let ids = [];
    tracksList.forEach(function(ele) {
      ids.push(ele.id);
    });
    let panelList = tracksList.map((currentValue, index, array) => {
      return (
        <div className = "col-lg-3">
          <div className = "panel panel-default">
            <div className = "panel-heading">
              <div className = "row">
                <div className = "col-lg-9">
                  {currentValue.name + " "}
                  <a href={currentValue.external_urls.spotify} target="_blank">
                    <span className="glyphicon glyphicon-new-window" aria-hidden="true"></span>
                  </a>
                  <a href={currentValue.preview_url?currentValue.preview_url:""} target="_blank">
                    <span className="glyphicon glyphicon-music" aria-hidden="true"></span>
                  </a>
                  <br/>
                  {"Artist: " + currentValue.artists[0].name}
                </div>
                <div className = "col-lg-3">
                  <img src={currentValue.album.images[0].url?currentValue.album.images[0].url:"./img/no_artwork.png"}></img>
                </div>
              </div>
            </div>
            <div className = "panel-body">

            </div>
          </div>
        </div>
      )
    });

    return (
      <div className = "container-fluid">
        <div className="row">
          {panelList}
        </div>
      </div>
    )
  }
}

class Artwork extends Component {
  render() {
    return (
      <img src={this.props.url} />
    )
  }
}

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)
