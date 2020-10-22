import { Alert, AlertIcon, AlertDescription, CloseButton } from '@chakra-ui/core';
import React, { useState } from 'react'

interface ErrorProps {
  msg: string
}

const Error: React.FC<ErrorProps> = ({ msg }) => {
  const [open, setOpen] = useState(true)
  return (!open ? null :
    <Alert status="error">
      <AlertIcon />
      <AlertDescription>{msg}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" onClick={() => {
        return setOpen(false)
      }
      } />
    </Alert>
  );
}

export default Error