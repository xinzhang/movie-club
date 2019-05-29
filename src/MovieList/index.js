import React from 'react';
import {Flex, Box} from '@rebass/grid';
import MovieItem from '../MovieItem';

const MovieList = ({
  movies,
  loading,  
}) => (
  <>    
  <Flex flexWrap="wrap" mb="12">
    {movies.map((item) => (     
      
        <Box width={[1 / 2, 1 / 3, 1 / 5]} key={item.id}>
          <MovieItem movie={item} />            
        </Box>  
     
    ))}  
   </Flex>  
  </>
);

export default MovieList;
