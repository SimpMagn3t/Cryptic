import React from 'react'
import {Line} from "react-chartjs-2"
import { Chart as chartjs,CategoryScale,LinearScale,PointElement,
LineElement,Title,Tooltip,Legend } from 'chart.js/auto'
chartjs.register(
    CategoryScale,LinearScale,PointElement,
    LineElement,Title,Tooltip,Legend
);

const ChartComponent = ({arr=[],days}) => {
    const prices=[];
    const date=[];
    // if(days=="24h") {

    //     for (let i = (arr.length-25); i <(arr.length-1) ; i++) {
            
    //         prices.push( arr[i][1]);
    //         date.push( new Date(arr[i][0]).toTimeString().split("G")[0]);
    //     }
    // }
    // else{
    //     for (let i = (arr.length-(days*24)); i <(arr.length-1) ; i++) {
            
    //         prices.push( arr[i][1]);
    //         date.push( new Date(arr[i][0]).toDateString());
    //     }
    // }
    for (let i = 0; i <(arr.length-1) ; i++) {
            if(days==1)
            date.push( new Date(arr[i][0]).toTimeString().split("G")[0]);
            else{
                date.push( new Date(arr[i][0]).toDateString().split("G")[0]);
            }
            prices.push( arr[i][1]);
        }
               
    const data={
        labels:date,
        datasets:[{
            label:`price in usd`,
            data:prices, 
            borderColor:"rgb(255,99,132)",
            backgroundColor:"rgb(255,99,132,0.5)",
        }]
       };
  return (
   <Line options={{responsive:true,}}
   data={data}
   />
  );
}

export default ChartComponent