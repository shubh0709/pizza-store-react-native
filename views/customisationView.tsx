import React, {useEffect, useReducer, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button  from '@mui/material/Button';
import {Toppings} from './toppingsView';
import {PizzaSize} from './pizzaSizeView';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators} from '../state';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface PropsRecieved {
    selectedPizza : any, 
    updateCustomisation:any
}



export function Customisation(props: PropsRecieved){
        const [open, setOpen] = React.useState(true);
        const customerOrderedTillNow = useSelector( (state:any) => state?.checkout || []);
        const dispatch = useDispatch();
        const {addToCart} = actionCreators;
        const currentQuantity = Object.keys(customerOrderedTillNow).length + 1;
        console.log("customerOrderedTillNow ", customerOrderedTillNow);
        const handleOpen = () => { 
            return setOpen(true)
        };
        const handleClose = () => {
            console.log("handle close");
            console.log("currentQuantity ", currentQuantity);
            dispatch(addToCart(
            {
                [currentQuantity] : {
                    id: currentQuantity,
                    pizzaName: props.selectedPizza?.name,
                    pizzaSize: pizzaSizeRequested,
                    pizzaToppings: toppingsRequested
                }
            }));
            
            props.updateCustomisation(false);
            setOpen(false);
        }
       // console.log("props.selectedPizza: ",props.selectedPizza);    

       // setting default value
       let pizzaSizeRequested:string = "Regular";
       let toppingsRequested:string[] = [];
    
       function AddThisTopping(storeIDs: Set<string>):any{
        toppingsRequested = Array.from(storeIDs);
        console.log("selected toppings are: ",toppingsRequested);
       }

       function selectedSize(value:string):any{
        console.log("selecetedSize Name: ", value);
        pizzaSizeRequested = value;
       }

       // mistake found -- inside useEffect "return" hooks dont
       // work/update properly, instead use useReducer
      
      /* useEffect(()=>{
           return () => {
            if(quantity>0){
                console.log("came when quanity greater than 0");
                setQuantity((quantity:number) => 0);
                
           };
        }
       });
       */

        return (
            <div>
                <Modal
                    
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box>
                        <Button style = {{border: '1px solid blue', padding: '5px'}}> + </Button>
                        <span style = {{border: '1px solid blue', padding: '5px'}}>Quantity </span>
                        <Button style = {{border: '1px solid blue'}}> - </Button>
                        <Toppings pizzaToppingsProp = {props.selectedPizza?.toppings}  AddThisTopping = {(val:any) => AddThisTopping(val)} />
                        <PizzaSize pizzaSizeProp = {props.selectedPizza?.size}  selectedSize = {(val:any) => selectedSize(val)} />
                    </Box>
                </Modal>
            </div>
        );
}
    