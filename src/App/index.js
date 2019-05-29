import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';

import Search from '../Search';
import Movies from '../Movies';

import * as routes from '../constants/routes';

import './style.css';

class App extends Component {
  state = {
    movieName: 'top gun',
  };

  onMovieSearch = value => {
    this.setState({ movieName: value });
  };

  render() {
    const { movieName } = this.state;
    return (
      <Router>
        <div className="App">
        <Navigation
            movieName={movieName}
            onMovieSearch={this.onMovieSearch}
          />

          <div className="App-main">
            <Route
              exact
              path={routes.Search}
              component={() => (
                <div className="App-content_large-header">
                  <Search movieName={movieName} />
                </div>
              )}
            />
            <Route
              exact
              path={routes.Movies}
              component={() => (
                <div className="App-content_small-header">
                  <Movies actor="tom cruise" />
                </div>
              )}
            />
          </div>
          
        </div>
      </Router>
    );
  }
}

export default App;
