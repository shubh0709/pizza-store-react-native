import React, { useState, useEffect, useReducer, useRef} from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {ActionType} from '../state';
import {TextField as MuiTextField} from '@mui/material';
import styled from 'styled-components';  
// you can use mui styled also, it provides the hover and focus functionality
// https://mui.com/guides/interoperability/
import { StyledEngineProvider } from '@mui/material/styles';

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

const StyledButton = styled(Button)`
    background-color: white;
    margin: 1rem;
    color: grey;
    font-weight: bold;
    &:hover{
        background-color: grey;
        color: white;
    };
    &:focus{
        background-color: grey;
        color: white;
    };`;

//#2c2a2a
export function Filter() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <StyledEngineProvider injectFirst>
                <StyledButton onClick={handleOpen}>Filter</StyledButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AutoComplete />
                    </Box>
                </Modal>
            </StyledEngineProvider>
        </div>
    );
}

function Reducer(state:any, action:any):any {
    switch (action.type) {
      case "set":
        return action.payload;
      case "unMount":
        console.log("Unmounting: ", state);
        return state; 
      default:
        throw new Error();
    }
  }
  
  
  function AutoComplete() {
    const dispatch = useDispatch();
    const { filtersApplied, arrangePizzas } = actionCreators;
    const initialValue = useSelector((state: any) => state?.filters);
    const fullData  = useSelector((state: any) => state?.pizzaInfo?.pizzas)?? [];
    console.log("filters initial value", initialValue);
    const [selectedFilter, setSelectedFilter] = useState(initialValue);
    const valueRef = useRef();

    useEffect(() => {
    valueRef.current = selectedFilter;
    }, [selectedFilter]);
    
    React.useEffect(() => {

        return function cleanUp() {
            console.log("on destroying filter component");
            console.log(valueRef.current);
            dispatch(filtersApplied(valueRef.current));
           // dispatch(arrangePizzas(valueRef.current, fullData));
        }
    }, []);
    
      const preferences = [
        { value: ActionType.ORDER_BY_VEG, label: 'veg' },
        { value: ActionType.ORDER_BY_NON_VEG, label: 'non-veg' },
        { value: ActionType.ORDER_BY_PRICE_ASCENDING, label: 'Price: low-high' },
        { value: ActionType.ORDER_BY_PRICE_DESCENDING, label: 'Price: high-low' },
    ];


    console.log("selectedFilter: ", selectedFilter);

    return (
        <Autocomplete
            multiple
            id="size-small-outlined-multi"
            size="small"
            options={preferences}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            value={selectedFilter}
            onChange={(event, val) => {
                setSelectedFilter([...val])
            }}
            renderInput={(params) => (
                <MuiTextField {...params} label="Filter" placeholder="Favorites" />
            )}

        />
    ) as any;
}
