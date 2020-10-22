import { Box, FormLabel } from '@chakra-ui/core';
import React from 'react';

const User = (data: Record<string, string>) => {
  return <Box>
    <FormLabel>Name: {data.firstName} {data.lastName}</FormLabel>
    <FormLabel>Direccion: {data.address}</FormLabel>
    <FormLabel>Ciudad: {data.city}</FormLabel>
  </Box>
}
export default User