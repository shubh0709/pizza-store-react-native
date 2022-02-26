import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import React, {useState, useRef, useEffect} from 'react';

interface PropsRecieved {
    pizzaToppingsProp : any, 
    AddThisTopping:any
}

export function Toppings(prop: PropsRecieved){
    const myRefs = useRef([]);
    myRefs.current = prop?.pizzaToppingsProp[0]?.items.map((element:any, i:number) => myRefs.current[i] ?? React.createRef());
    console.log("pizzaToppingsProp: ",prop.pizzaToppingsProp);    
    let keyCnt =0;
    const storeIDs = useRef(new Set<string>());

    
    function getTitle(title:string):string{
        const arr = title.split(" ");

        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }

        const titleCapitalised = arr.join(" ");
        return titleCapitalised;
    }


    function colorThisTopping(ref:any){
        if(storeIDs.current.has(ref.current.id))
        { 
            console.log("clicked again:", ref.current.id);
            ref.current.style.backgroundColor = "white"; 
            storeIDs.current.delete(ref.current.id);       
        }
        else{
            console.log("give me: ", ref.current.id);
            ref.current.style.backgroundColor = "blue";
            storeIDs.current.add(ref.current.id);
         }
         prop.AddThisTopping(storeIDs.current);
   }

    return (<Box mt={3}> 
        
        <Typography variant="subtitle2" fontWeight={600} fontSize={25}> {getTitle(prop.pizzaToppingsProp[0]?.title)} </Typography>
         <Box mt={1}>
             { 
           prop.pizzaToppingsProp[0]?.items.map((obj:any, i:number)=>{
            keyCnt++;
            return ( <Paper elevation={6} key={keyCnt} style={{display:'flex', justifyContent: 'space-between'}}>
                <Typography variant="subtitle2" style ={{padding: '.5rem'}}> {obj?.name} </Typography>
                <Button 
                    id = {obj?.name}
                    onClick={() => {colorThisTopping(myRefs.current[i]);}}
                    ref = {myRefs.current[i]}
                >   Add
                </Button>
                </Paper>)
            })
        } 
        </Box>
         </Box>);
}