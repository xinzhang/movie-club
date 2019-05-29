import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from '../Loading';
import ErrorMessage from '../Error';
import MovieList from '../MovieList';

const GET_MOVIE = gql`
  query($movieName: String!) {
    searchMovies(query: $movieName, page: 1) {
      id
      title
      releaseDate
      poster {
        small
      }
    }
  }
`;

const Search = ({ movieName }) => (
  <Query
    query={GET_MOVIE}
    variables={{
      movieName,
    }}
    skip={movieName === ''}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { searchMovies } = data;

      if (loading && !searchMovies) {
        return <Loading isCenter={true} />;
      }

      return (
        <MovieList
          loading={loading}
          movies={searchMovies}
          fetchMore={fetchMore}          
        />
      );
    }}
  </Query>
);

export default Search;
