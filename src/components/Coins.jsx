import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { server } from '../index';
import { Container, HStack, Stat, StatArrow, VStack, StatNumber } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error'
import { Link } from 'react-router-dom';
const Coins = () => {
  const [Coins, setCoins]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const[page,setPage]=useState(1);
  // const[currency,setCurrency]=useState('usd');
  const pageUp=()=>{
    setPage(page+1);
    setLoading(true)
  }
  const pageDown=()=>{
    setPage(page-1);
    setLoading(true)
  }
  useEffect(()=>{
    const fetchCoins=async()=>{
    try {
        const{data}=await axios.get(`${server}/coins/markets?vs_currency=usd&per_page=100&page=${page}`)
        setCoins(data);
        setLoading(false);
    }   catch (error) {
      setError(true);
      setLoading(false);
    }
  };
    fetchCoins();
  },[page])
  if (error) {
     return <Error/>
  }
  return (
    <Container maxWidth={"container.xl"}>
      {loading?<Loader />:<>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"} >
          {Coins.map((i)=>{
      return  <CoinCard name={i.name} 
      img={i.image} id={i.id}
      PriceChange={i.price_change_24h } 
      price={i.current_price}
      />
      })}
        </HStack>
      </>}
      <button onClick={pageDown}>last page</button>
      <button onClick={pageUp}> next page</button>
    </Container>
  );
};
const CoinCard = ({ name, img, PriceChange,price,id}) => (
  <Link to={`/coins/${id}`}>
  <VStack w={"50"} shadow={"lg"} p={"8"}
  borderRadius={"lg"}
  transition={"all 0.3s"}
  m={"4"}
  css={{"&:hover":
  {
    transform:"scale(1.1)"
  }
}}
>
      <img
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
        />
      <div >{name}</div>
      <Stat>
      <StatNumber>{price}$</StatNumber>
      <div >{PriceChange}%
      {PriceChange<0?<StatArrow type='decrease' />:<StatArrow type='increase' />}</div>
      </Stat>
    </VStack>
    </Link>
);
export default Coins