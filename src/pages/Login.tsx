import React, { useState } from "react";
import { Button, Input, FormControl, Flex } from "@chakra-ui/core";
import { useMutation } from "@apollo/client";
import { parseError } from "../utils/parseError";
import { RouteComponentProps } from "react-router-dom";
import MUT_LOGIN from "../graphql/mutation/login";
import Error from "../components/Error";

// RouteComponentProps get access to types for route props
const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useMutation(MUT_LOGIN);
  const [cellphone, setCellphone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  return (
    <>
      <Flex align="center" flexDir="column" alignContent="center">
        <form onSubmit={async (e) => {
          // avoid refresh
          e.preventDefault()
          const { data } = await login({ variables: { cellphone, password } })
          if (data.login.errors) {
            const err = parseError(data.login.errors)
            setError(err.message)
          } else {
            const { token } = data.login
            localStorage.setItem('token', token)
            history.push("/")
          }
        }}>
          <FormControl>
            <Input
              name="cellphone"
              placeholder="cellphone"
              value={cellphone}
              onChange={(e: any) => {
                setCellphone(e.target.value)
              }}
            />
          </FormControl>
          <FormControl marginTop={2}>
            <Input
              name="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value)
              }}
            /></FormControl>

          <Button
            type="submit"
            mt={4}
          >
            login
            </Button>
        </form>
      </Flex>
      {error && <Error msg={error} />}
    </>
  );
};

export default Login;
