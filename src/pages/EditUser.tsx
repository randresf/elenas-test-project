import { useMutation, useQuery } from '@apollo/client';
import { Flex, FormControl, Input, Button, Box } from '@chakra-ui/core';
import React, { useState, useEffect } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom';
import { parseError } from '../utils/parseError';
import M_EDIT_CLIENT from '../graphql/mutation/editClient';
import Q_CLIENT from '../graphql/query/client';
import Error from '../components/Error';
import { Client } from './NewUser';
import { createInputForClient } from '../utils/createInputForClient';

const defaultData = {
  firstName: '',
  lastName: '',
  cedula: '',
  city: '',
  cellphone: '',
  address: ''
}

const EditUser: React.FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams()
  const { data, loading } = useQuery(Q_CLIENT, { variables: { ids: [parseInt(id)] } })
  const [editUser] = useMutation(M_EDIT_CLIENT)
  const [error, setError] = useState('')
  const [newData, setData] = useState<Client>(defaultData)
  useEffect(() => {
    const resData = data?.clientsSearch?.results[0]
    if (!resData) return
    const { firstName = '',
      lastName = '',
      cedula = '',
      city = '',
      cellphone = '',
      address = '' } = resData

    setData({
      firstName,
      lastName,
      cedula,
      cellphone,
      address,
      city
    })
    return () => {
      setData(defaultData)
    }
  }, [loading, data])


  const fieldHandler = (ev: any) => {
    const { name, value } = ev.target
    setData({ ...newData, [name]: value })
  }

  if (loading) {
    return <div>...loading</div>
  }

  // assuming we know the fields in the schema
  return (
    <Flex align="center" flexDir="column" alignContent="center">
      {error && <Box m={2}><Error msg={error} /></Box>}
      <form onSubmit={async (e) => {
        // avoid refresh
        e.preventDefault()
        setError('')
        const input = createInputForClient(newData)
        const { data } = await editUser({ variables: { id: parseInt(id), input } })
        if (data.updateClient.errors) {
          const err = parseError(data.updateClient.errors)
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
            placeholder="city"
            value={newData?.city || ''}
            onChange={fieldHandler}
          />
        </FormControl>
        <Button
          type="submit"
          mt={4}
          isLoading={!!loading}
        >
          save
            </Button>
      </form>
    </Flex>
  );
}

export default EditUser