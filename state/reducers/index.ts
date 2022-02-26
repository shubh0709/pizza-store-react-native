import { combineReducers } from "redux";
import pizzaInfoReducer from "./pizzaInfoReducer";
import fetchReducer from "./fetchReducer";
import filterReducer from "./filterReducer";
import checkoutReducer from "./checkoutReducer";

const reducers = combineReducers({
    pizzaInfo: pizzaInfoReducer,
    processFetch: fetchReducer,
    filters: filterReducer,
    checkout: checkoutReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;