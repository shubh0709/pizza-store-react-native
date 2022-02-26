import { ActionType, Action, Pizza } from '../action-types';
import { Dispatch } from 'redux';

let apiData:any = {};

//synchronous action creator
export const fetchProductsBegin = () => {
    return {
            type: ActionType.FETCH_PRODUCTS_BEGIN
        };
};

//synchronous action creator
export const fetchProductsSuccess = (products: any) => {
    return {
            type: ActionType.FETCH_PRODUCTS_SUCCESS,
            payload: { products }
        };
};

//synchronous action creator
export const fetchProductsFailure = (error: any) => {
    return {
            type: ActionType.FETCH_PRODUCTS_FAILURE,
            payload: { error }
        };
    
};

export const initialiseStore = (data: any) => {
    
    return {
            type: ActionType.INIT_STORE,
            payload: data
        };
};


export const filtersApplied = (data: any) => {
    return { 
            type: ActionType.FILTERS,
            payload: data
        };
    
};

export const arrangePizzas = ((filterArray: any, products: any) => {
    
    console.log(" came here filterArray is: ", filterArray);
    console.log("products is: ", products);

    filterArray.forEach(function(obj:any){
        switch(obj?.value){

            case ActionType.ORDER_BY_PRICE_ASCENDING:
                console.log("entered ORDER_BY_PRICE_ASCENDING");
                products.sort((a:any,b:any) => {
                    const result = (a.price>=b.price)?1:-1;
                    console.log("a.price: " + a.price + " b.price: " + b.price + ", result: " + result);
                    return result;
                });
                console.log("products after sorting in ascending order ", products);
                break;
                
                case ActionType.ORDER_BY_PRICE_DESCENDING:
                    console.log("entered ORDER_BY_PRICE_DESCENDING");
                    products.sort((a:any,b:any) => (a.price<b.price)?1:-1);
                    console.log("descending products order ", products);
                    break;
                    
                    case ActionType.ORDER_BY_VEG:
                        products = products.filter((val: any) => {
                            return val.isVeg;
                });
                break;
        
            case ActionType.ORDER_BY_NON_VEG:
                console.log("entered ORDER_BY_NON_VEG");
                products = products.filter((val: any) => !val.isVeg);
                break;
             
            default:
                products = apiData;
        
            }
        });

        console.log("products after filter: ", products);

        return products;
    
   });
   
export const itemDisplayOrder = (data: any) => {
   return {
        type: ActionType.DISPLAY_ORDER,
        payload: data,
        };
 };

export const AddItemsToCart = (data:any) => {
    return {
        type: ActionType.ADD_TO_CART,
        payload: data,
    }
}

export const addToCart = (data:any) => {
    console.log("inside addToCart", data);
    return {
        type: ActionType.ADD_TO_CART,
        payload: data,
    }
}



/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchPizzas =  () => {
    return async (dispatch:Dispatch<any>) => {
        try {
            console.log("fetch started");
            dispatch(fetchProductsBegin());
            apiData = await fetch('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68');
            
            if (!apiData.ok) {
                const message = `An error has occured: ${apiData.status}`;
                throw new Error(message);
              }
            
            apiData = await apiData.json();
            dispatch(fetchProductsSuccess(apiData));
            dispatch(initialiseStore(apiData));
            console.log("apiData after fetch: ", apiData);
            
        }
        catch(err){
            fetchProductsFailure(err);
        }
    }
}
