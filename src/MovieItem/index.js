import React from 'react';
import Paragraph from '../Paragraph'

const MovieItem = ({movie}) => {    
    return (
      movie.poster ? (
        <>
          <img src={movie.poster.small} alt={movie.title} />
          <Paragraph variant="m">{movie.title}</Paragraph>
          <Paragraph variant="s">{movie.releaseDate}</Paragraph>
        </> 
      ) : null
    );      
  };

export default MovieItem;
