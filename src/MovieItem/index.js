import React from 'react';

const MovieItem = ({movie}) => {    
    return (
      movie.poster ? (
        <>
          <img src={movie.poster.small} alt={movie.title} />
          <p>{movie.title}</p>
          <p>{movie.releaseDate}</p>
        </> 
      ) : null
    );      
  };

export default MovieItem;
