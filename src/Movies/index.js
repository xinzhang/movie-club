import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import MovieList from '../MovieList';
import Loading from '../Loading';
import ErrorMessage from '../Error';

const MOVIE_FRAGMENT = gql`
  fragment movie on Movie {
    id
    title
    releaseDate
    poster {
      small
    }
  }
`;

const GET_PEOPLE_MOVIES = gql`
  query($people: String!) {
    searchPeople (query: $people, page : 1) {
      id
      name
      photo {
        small
      }
      workedOn {
        ...movie 
      }      
    }
  }
  ${MOVIE_FRAGMENT}
`;

const Movies = ({ actor }) => (
  <Query
    query={GET_PEOPLE_MOVIES}
    variables={{ people: actor}}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { searchPeople } = data;

      if (loading && (!searchPeople || searchPeople.length === 0) ) {
        return <Loading isCenter={true} />;
      }

      console.log(data);

      return (
        <MovieList
          loading={loading}
          movies={searchPeople[0].workedOn}
        />
      );
    }}
  </Query>
);

export default Movies;
