
export enum ActionType {
    INIT_STORE = "INIT_STORE",
    FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN',
    FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
    FILTERS = "FILTERS",
    ORDER_BY_PRICE_ASCENDING = "ORDER_BY_PRICE_ASCENDING",
    ORDER_BY_PRICE_DESCENDING = "ORDER_BY_PRICE_DESCENDING",
    ORDER_BY_VEG = "ORDER_BY_VEG",
    ORDER_BY_NON_VEG = "ORDER_BY_NON_VEG",
    DISPLAY_ORDER= "DISPLAY_ORDER",
    ADD_TO_CART= "ADD_TO_CART",
    DELETE_FROM_CART = "DELETE_FROM_CART",
}

interface PizzaSize {
    isRadio: boolean,
    title: string,
    items: Array<{ size: string }>
}

interface PizzaToppings {
    isRadio: boolean,
    title: string,
    items: Array<{ name: string }>
}

export interface Pizza {
    id: number,
    name: string,
    description: string,
    isVeg: boolean,
    rating: number,
    price: number,
    img_url: string,
    size: Array<PizzaSize>,
    toppings: Array<PizzaToppings>
}

export interface Action {
    type: string;
    payload: Array<Pizza>;
}
