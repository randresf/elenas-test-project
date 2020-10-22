import React from 'react';
import Login from './pages/Login';
import Users from './pages/Users';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import EditUser from './pages/EditUser';
import { isLoged } from './utils/isLoged';
import { Box } from '@chakra-ui/core';
import NewUser from './pages/NewUser';


function Routes() {
  return (
    <Box mx="auto" maxW="600px" mt={8} mb={8} w="100%">
      <BrowserRouter>
        {!isLoged() ? <Redirect to="/login" /> : null}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/edit/:id" component={EditUser} />
          <Route exact path="/new" component={NewUser} />
          <Route exact path="/" component={Users} />
        </Switch>
      </BrowserRouter>
    </Box>
  );
}

export default Routes;
