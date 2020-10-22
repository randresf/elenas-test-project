import { useMutation } from '@apollo/client';
import { Flex, FormControl, Input, Button } from '@chakra-ui/core';
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { parseError } from '../utils/parseError';
import Error from '../components/Error';
import M_CREATE_CLIENT from '../graphql/mutation/createClient';
import { createInputForClient } from '../utils/createInputForClient';

// type created base on the 
// http://staging.athenea.elenas.la/gql/ schema for type Client
export interface Client {
  firstName: string
  lastName: string
  cedula: string
  cellphone: string
  address: string
  city: string
}

const defaultData = {
  firstName: '',
  lastName: '',
  cedula: '',
  cellphone: '',
  address: '',
  city: ''
}

const NewClient: React.FC<RouteComponentProps> = ({ history }) => {
  const [addClient] = useMutation(M_CREATE_CLIENT)
  const [error, setError] = useState('')
  const [newData, setData] = useState<Client>(defaultData)

  const fieldHandler = (ev: any) => {
    const { name, value } = ev.target
    setData({ ...newData, [name]: value })
  }

  // assuming we know the fields in the schema
  return (
    <Flex align="center" flexDir="column" alignContent="center">
      {error && <Error msg={error} />}
      <form onSubmit={async (e) => {
        // avoid refresh
        e.preventDefault()
        const input = createInputForClient(newData)
        const { data } = await addClient({ variables: { input } })
        if (data.createClient.errors) {
          const err = parseError(data.createClient.errors)
          setError(err.message)
        } else {
          history.push("/")
        }
      }}>
        <FormControl mb={2}>
          <Input
            name="firstName"
            placeholder="nombre"
            value={newData?.firstName || ''}
            onChange={fieldHandler}
          />
        </FormControl>
        <FormControl mb={2}>
          <Input
            name="lastName"
            placeholder="apellido"
            value={newData?.lastName || ''}
            onChange={fieldHandler}
          />
        </FormControl>
        <FormControl mb={2}>
          <Input
            name="cedula"
            placeholder="cedula"
            value={newData?.cedula || ''}
            onChange={fieldHandler}
          />
        </FormControl>
        <FormControl mb={2}>
          <Input
            name="cellphone"
            placeholder="celular"
            value={newData?.cellphone || ''}
            onChange={fieldHandler}
          />
        </FormControl>
        <FormControl mb={2}>
          <Input
            name="address"
            placeholder="direccion"
            value={newData?.address || ''}
            onChange={fieldHandler}
          />
        </FormControl>
        <FormControl mb={2}>
          <Input
            name="city"
            placeholder="ciudad"
            value={newData?.city || ''}
            onChange={fieldHandler}
          />
        </FormControl>
        <Button
          type="submit"
          mt={4}
        >
          save
            </Button>
      </form>
    </Flex>
  );
}

export default NewClient