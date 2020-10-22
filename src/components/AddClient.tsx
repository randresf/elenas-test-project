import { Box, Button } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const AddClient = () => {
  return <Box pb={2} ml="auto">
    <Link to="/new">
      <Button leftIcon="add" variant="outline">crear</Button>
    </Link>
  </Box>;
}


export default AddClient
