import { useQuery } from '@apollo/client';
import { Box, Flex, Heading, IconButton, Stack } from '@chakra-ui/core';
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import User from '../components/User';
import Q_CLIENT from '../graphql/query/client';
import AddClient from '../components/AddClient';

const Users: React.FC<RouteComponentProps> = () => {
  const { data, loading } = useQuery(Q_CLIENT, { variables: { perPage: 100 } })

  if (loading || !data) return <div>...loading</div>

  return (
    <Flex flexDir="column">
      <Heading>Clientes</Heading>
      <AddClient />
      <Stack>
        {data.clientsSearch.results?.map((c: Record<string, string>) => (
          <Flex key={c.id} p={5} shadow="md" borderWidth="1px" justifyItems="center" align="center">
            <User {...c} />
            <Box ml="auto">
              <Link to={`/edit/${data.id}`}>
                <IconButton mr={4}
                  icon='edit'
                  aria-label="edit" />
              </Link>
            </Box>
          </Flex>
        ))}
      </Stack>
    </Flex>

  );
}

export default Users


