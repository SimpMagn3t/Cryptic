import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const Error = (message) => {
  return (
    <Alert status="error" position={"fixed"}
    w={"container.lg"} >
      <AlertIcon/>
      <div>Error while loading</div>
    </Alert>
  )
}

export default Error