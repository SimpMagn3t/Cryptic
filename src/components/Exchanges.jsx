import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { server } from '../index';
import { Container, HStack, Heading, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error'
const Exchanges = () => {
  const [exchanges, setExchanges]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  useEffect(()=>{
    const fetchExchanges=async()=>{
    try {
        const{data}=await axios.get(`${server}/exchanges?per_page=100`)
        setExchanges(data);
        setLoading(false);
    }   catch (error) {
      setError(true);
      setLoading(false);
    }
  };
    fetchExchanges();
  },[])
  if (error) {
     return <Error/>
  }
  return (
    <Container maxWidth={"container.xl"}>
      {loading?<Loader />:<>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {exchanges.map((i)=>{
      return  <ExchangeCard name={i.name} 
      img={i.image} key={i.id}
      rank={i.trust_score_rank} 
      url={i.url} />
      })}
        </HStack>
      </>}
      
    </Container>
  );
};
const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack w={"200px"} shadow={"lg"} p={"8"}
     borderRadius={"lg"}
     transition={"all 0.3s"}
     m={"4"}
     css={{"&:hover":
    {
      transform:"scale(1.1)"
    }
    }}
      className='card'>
      <img
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <div noOfLines={1} >{name}</div>
    </VStack>
  </a>
);

export default Exchanges;