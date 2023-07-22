import { Badge, Box, Button, Container, HStack, Progress, Stat, StatArrow, StatLabel, StatNumber, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Error from "./Error";
import Loader from "./Loader"
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import { server } from '../index';
import ChartComponent from './ChartComponent';
  const CoinDetails = () => {
  const [Coin, setCoin]=useState({});
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const[days,setDays]=useState(1);
  const[chartArray,setchartArray]=useState([])
  const params=useParams();
  const btns=["24h","7d","14d","30d","6M","1Y","max"];
  const SwitchStats=(key)=>{
    switch (key) {
      case "24h":
        setDays(1);
        setLoading(true);
        break;
        case "7d":
        setDays(7);
        setLoading(true);
        break;
        case "14d":
        setDays(14);
        setLoading(true);
        break;
        case "30d":
        setDays(30);
        setLoading(true);
        break;
        case "6M":
        setDays(180);
        setLoading(true);
        break;
        case "1Y":
        setDays(365);
        setLoading(true);
        break;
        case "max":
        setDays("max");
        setLoading(true);
        break;
    
      default:
        setDays(1);
        setLoading(true);
        break;
    }
  }

  useEffect(()=>{
    const fetchCoin=async()=>{
    try {
        const{data}= await axios.get(`${server}/coins/${params.id}`);
        console.log(data);
        const {data:chartData}=await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=${days}`);
        setchartArray(chartData.prices);
        setCoin(data);
        setLoading(false);
        console.log(chartData);
        // console.log(Coin);
    }   catch (error) {
      setError(true);
      setLoading(false);
    }
  };
    fetchCoin();
  },[params.id,days])
  if (error) {
    return <Error/>
 }
  return (
    <>
    <Container maxW={"container.xl"}>
      {loading? <Loader/>:(
        <>
        <Box width={"full"} borderWidth={1}>
          <ChartComponent arr={chartArray} days={days}/>
       </Box>
        <HStack p={"4"} wrap={"wrap"}>{

          btns.map((i)=>(
              <Button key={i} onClick={()=>SwitchStats(i)}>{i}</Button>
            ))
          }
        </HStack>
        </>
      )}
      <VStack alignItems={"flex-start"}>
      <text opacity={"0.5"}>Last updated on{Date(Coin?.market_data?.last_updated).split("G")[0]}</text> 
      <img src={Coin?.image?.large} width={"120"} height={"100"}  alt='coin.name'></img>
      <Stat>
        <StatLabel>{Coin.name}</StatLabel>
        <StatNumber>${Coin?.market_data?.current_price?.usd}</StatNumber>
        
        <div >{Coin?.market_data?.price_change_percentage_24h_in_currency?.usd}%
      {Coin?.market_data?.price_change_percentage_24h_in_currency?.usd<0?<StatArrow type='decrease' />:
      <StatArrow type='increase' />}</div>
      </Stat>
      <Badge
      fontSize={"2xl"}
      bgColor={"blackAlpha.700"}
      color={"white"}
      >
        {`#${Coin.market_cap_rank}`}
      </Badge>
      <CustomBar high={Coin?.market_data?.high_24h?.usd}
       low={Coin?.market_data?.low_24h?.usd} width={"150"}/>
      <Box>
        <Item title={"Max supply"} value={Coin?.market_data?.total_supply}/>
      </Box>
      </VStack>
    </Container>
      </>
  )
}
const Item=({title,value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <text fontFamily='Bebas Neue'>{title}</text>
    <text>{value}</text>
  </HStack>
)
const CustomBar =({high,low})=>(
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"cyan"}
    w={"full"}/>
    <HStack justifyContent={"space-between"} w={"full"}>
 <Badge children={low} colorScheme='red'/>
 <text>24H</text>
 <Badge children={high} colorScheme='green'/>
    </HStack>
  </VStack>
)
export default CoinDetails