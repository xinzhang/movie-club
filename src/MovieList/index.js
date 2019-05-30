import React from 'react';
import {Flex, Box} from '@rebass/grid';
import MovieItem from '../MovieItem';

const MovieList = ({
  movies,
  loading,  
}) => (  
  <Flex flexWrap="wrap" m="2" p="2">
    {movies.filter(item => item.poster).map((item) => (           
        <Box width={[1 / 2, 1 / 3, 1 / 5]} key={`${item.id}_${item.title}`}>
          <MovieItem movie={item} />
        </Box>       
    ))}  
  </Flex>
)

export default MovieList;
