import React from 'react';

const MovieList = ({
  movies,
  loading,  
}) => (
  <>    
    {movies.map((item) => (
      <div key={item.id} className="RepositoryItem">
        {item.title}        
      </div>
    ))}    
  </>
);

export default MovieList;
