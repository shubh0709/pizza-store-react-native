import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useState, useRef, useEffect} from 'react';
import Paper from '@mui/material/Paper';

interface PropsRecieved {
    pizzaSizeProp : any,
    selectedSize: any
}


export function PizzaSize(prop : PropsRecieved ){
    const [prevSelectedButtonId, updatePrevSelectedButtonId] = useState("Regular");
    let backgroundColor = "white";
    const myStateRef = useRef(prevSelectedButtonId);
    const setMyState = (data:string) => {
    myStateRef.current = data;
    updatePrevSelectedButtonId(data);
  };

  useEffect(() => {
      //setting default
      window.document.getElementById("Regular")!.style.backgroundColor = "lightblue";
  }, []);


    function getTitle(title:string):string{
        const arr = title.split(" ");

        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
         }

        const titleCapitalised = arr.join(" ");
        return titleCapitalised;
    }

    function setFocus(event:any){
        const ID:string= event.target.id;
        let prevID:string="";

        if(myStateRef.current !== ""){
            prevID = myStateRef.current;
            const prevButton = window.document.getElementById(prevID)!;
            prevButton.style.backgroundColor = "white";
        }

        const selectedButton = window.document.getElementById(ID)!;
        selectedButton.style.backgroundColor = "lightblue";
        setMyState(ID); 
    }
    
    console.log("pizzaSizeProp: ",prop.pizzaSizeProp);    
    let keyCnt=0;

    return (<Box mt={3}>
                <Typography variant="subtitle2" fontWeight={600} fontSize={25}> {getTitle(prop.pizzaSizeProp[0]?.title)} </Typography>
                <Box mt={1}>
                { 
                    prop.pizzaSizeProp[0]?.items.map((obj:any)=>{
                        keyCnt++;
                    return ( <Paper elevation={6} key={keyCnt} style={{display:'flex', justifyContent: 'space-between'}}>
                    <Typography 
                        variant="subtitle2" 
                        style ={{padding: '.5rem'}}> 
                            {obj?.size} 
                    </Typography>
                    <Button 
                        id = {obj?.size}
                        onFocus={setFocus} 
                        style={{backgroundColor: backgroundColor}} 
                        onClick={() => prop.selectedSize(obj?.size)}>
                            Add 
                    </Button>
                    </Paper>)
                    })
                }
                </Box>    
            </Box>);
}