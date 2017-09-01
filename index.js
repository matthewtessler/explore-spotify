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
        <div className = "container-fluid" id="results"></div>
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
        const results = data;
        let ids = [];
        results.tracks.items.forEach(function(ele) {
          ids.push(ele.id);
        });
        s.getAudioFeaturesForTracks(ids, function(err,data) {
          if (err) {
            console.error(err);
          }
          else {
            ReactDOM.render(<div></div>, document.querySelector('#results'));
            ReactDOM.render(<Results data={results} audio_features={data}/>, document.querySelector('#results'));
          }
        });
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
  constructor(props) {
    super(props);
    let af_stats = this.props.audio_features;
    let danceability = [];
    let acousticness = [];
    let energetic = [];
    let instrumental = [];
    let liveness = [];
    let speechiness = [];
    af_stats.audio_features.map((currentValue, index, array) => {
      danceability.push({
        width:(currentValue.danceability*100).toFixed(0) + "%",
        backgroundColor:"#65F35B"
      });
      acousticness.push({
        width:(currentValue.acousticness*100).toFixed(0) + "%",
        backgroundColor:"#4222F2"
      });
      energetic.push({
        width:(currentValue.energy*100).toFixed(0) + "%",
        backgroundColor:"#CEF36D"
      });
      instrumental.push({
        width:(currentValue.instrumentalness*100).toFixed(0) + "%",
        backgroundColor:"#FB483B"
      });
      liveness.push({
        width:(currentValue.liveness*100).toFixed(0) + "%",
        backgroundColor:"#AC2F95"
      });
      speechiness.push({
        width:(currentValue.speechiness*100).toFixed(0) + "%",
        backgroundColor:"#F39A35"
      });
    });
    this.state = {
      danceability: danceability,
      acousticness: acousticness,
      energetic: energetic,
      instrumental: instrumental,
      liveness: liveness,
      speechiness: speechiness
    };
  }

  render() {
    let tracksList = this.props.data.tracks.items;
    let panelList = tracksList.map((currentValue, index, array) => {
      return (
        <div className = "col-lg-3" key={currentValue.id}>
          <div className = "panel panel-default">
            <div className = "panel-heading" title={currentValue.name}>
              <div className = "row">
                <div className = "col-lg-9">
                  {currentValue.name.length > 20?currentValue.name.slice(0,17) + "... ":currentValue.name + " "}
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
              <div className="progress" title="&#x1F483">
                <div className='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style={this.state.danceability[index]}>
                  {this.state.danceability[index].width + " " + String.fromCodePoint(0x1F483) }
                </div>
              </div>
              <div className="progress" title="&#x1F399">
                <div className='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style={this.state.acousticness[index]}>
                  {this.state.acousticness[index].width + " " + String.fromCodePoint(0x1F399) }
                </div>
              </div>
              <div className="progress" title="&#x26A1">
                <div className='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style={this.state.energetic[index]}>
                  {this.state.energetic[index].width + " " + String.fromCodePoint(0x26A1) }
                </div>
              </div>
              <div className="progress" title="&#x1F3BA">
                <div className='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style={this.state.instrumental[index]}>
                  {this.state.instrumental[index].width + " " + String.fromCodePoint(0x1F3BA) }
                </div>
              </div>
              <div className="progress" title="&#x1F3A4">
                <div className='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style={this.state.liveness[index]}>
                  {this.state.liveness[index].width + " " + String.fromCodePoint(0x1F3A4) }
                </div>
              </div>
              <div className="progress" title="&#x1F4AC">
                <div className='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style={this.state.speechiness}>
                  {this.state.speechiness[index].width + " " + String.fromCodePoint(0x1F4AC) }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });

    return (
      <div className="row">
        {panelList}
      </div>
    )
  }
}

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)
