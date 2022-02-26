import { ActionType } from '../action-types';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function productReducer(state = initialState, action: any) {
    switch (action.type) {
        case ActionType.FETCH_PRODUCTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ActionType.DISPLAY_ORDER:
        case ActionType.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products
            };

        case ActionType.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        default:
            return state;
    }
}

export const getProducts = (state: any) => state.products;
export const getProductsPending = (state: any) => state.pending;
export const getProductsError = (state: any) => state.error;
