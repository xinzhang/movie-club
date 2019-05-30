import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from '../Loading';
import ErrorMessage from '../Error';
import MovieList from '../MovieList';
import Paragraph from '../Paragraph';

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

      if (searchMovies.length === 0) {
        return <Paragraph>Can not find any movies.</Paragraph>
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
