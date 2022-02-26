import { ActionType } from '../action-types';

interface IOrdersDetails{
    id: number,
    pizzaName: string,
    pizzaSize: "Regular"|"Medium"|"Large",
    pizzaToppings: string[]
}

interface IOrders{
    [x: string]: any;
    [x:number]:IOrdersDetails,
}


export default function checkoutReducer(state:IOrders|null = null, action: any) {
    
    console.log("checkoutReducer", action.payload);
    
    switch (action.type) {
        
    case ActionType.ADD_TO_CART:
        return {
            ...state, ...action.payload
        };
    
    // case ActionType.DELETE_FROM_CART:
    //     return state.filter((val:IOrders) => {
    //         console.log("val:", val);
    //         return val.id === action.payload.id;
    //     });

        default:
            return state;
    }
}

export const getProducts = (state: any) => state.products;
export const getProductsPending = (state: any) => state.pending;
export const getProductsError = (state: any) => state.error;


