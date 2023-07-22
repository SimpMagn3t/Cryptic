import { Box, Img } from '@chakra-ui/react'
import React from 'react'
import btc from './btc.jpg'
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <Img w={"full"} objectFit={"cover"} 
      src={"https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=802&q=80"}
      h={'100vh'}/>
      
    </Box>
  )
}

export default Home