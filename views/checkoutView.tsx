import React, { useEffect, useState} from 'react';
import {MediaCard} from './cardView';
import {Header} from './headerView';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Loader from './loader';
import {Routes, Route} from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

interface IOrdersDetails{
  id: number,
  pizzaName: string,
  pizzaSize: string,
  pizzaToppings: string[]
}

interface IOrders{
  [x: string]: any;
  [x:number]:IOrdersDetails,
}


export function Checkout() {
  const customerOrdered = useSelector( (state:any) => state?.checkout || [{}]);
  let keyCnt = 0;
  console.log("customerOrdered", customerOrdered);
  const arr= [];
  const stylesIn:React.CSSProperties = {
    width: "15rem",
    marginLeft: "2rem",
    marginBottom: "1rem",
    overflowY: "auto",
    overflowX: "auto",
    textAlign: 'left',
    padding: '0.5em',
    fontSize: '0.8rem',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
  // we never write CSS in react, its all javascript thats why dont sue margin-dash-left"

  function toppingsString(pizzaToppings:any){
  let toppings="";

  for(let item of pizzaToppings)
  {
    if(toppings !== "")
    toppings = `${toppings}, `;

    toppings = `${toppings}${item}`;
  }

  console.log("toppings concatenated returned ", toppings);
  return toppings;
}

  return (
    <div className="Checkout">
          <Header/>
         <Box>      
          <div> {customerOrdered.pizzaSize}</div>
          </Box>
         <Box>      
         <Card elevation={6} sx={{ width: "20rem", margin: "1rem"}} >
           <div style={{fontSize:'1rem', marginTop: '0.5rem', marginBottom: '1rem'}}><b> Your Orders:</b> </div>
            {Object.keys(customerOrdered).map((key:any,index:any)=>{
              console.log("key" + key);
              console.log( "customerOrdered[key]:",  customerOrdered[key]);
              
              return (
                <div key={index} style={stylesIn}>                  
                  <div>
                    <div style={{fontWeight: '500'}}>{customerOrdered[key].pizzaName} </div>
                    <div>{customerOrdered[key].pizzaSize} </div>
                    <div style={{lineHeight:"normal"}}>{toppingsString(customerOrdered[key].pizzaToppings)}</div>
                  </div>
                  <div style={{display: 'flex', flexGrow: '1', justifyContent: 'flex-end'}}> 
                    <DeleteIcon/> 
                  </div>
                  <hr/>
                </div>
                )
            })}
          </Card>
         </Box>
      </div>
  );
}
