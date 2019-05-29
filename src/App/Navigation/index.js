import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';
import Button from '../../Button';
import Input from '../../Input';

import './style.css';

const Navigation = ({
  location: { pathname },
  movieName,
  onMovieSearch,
}) => (
  <header className="Navigation">    
    <div className="Navigation-link">
      <Link to={routes.Movies}>Movies</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.Search}>Search</Link>
    </div>
    {pathname === routes.Search && (
      <MovieSearch
        movieName={movieName}
        onMovieSearch={onMovieSearch}
      />
    )}    
  </header>
);

class MovieSearch extends React.Component {
  state = {
    value: this.props.movieName,
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    this.props.onMovieSearch(this.state.value);

    event.preventDefault();
  };

  render() {
    const { value } = this.state;

    return (
      <div className="Navigation-search">
        <form onSubmit={this.onSubmit}>
          <Input
            color={'white'}
            type="text"
            value={value}
            onChange={this.onChange}
          />{' '}
          <Button color={'white'} type="submit">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Navigation);
