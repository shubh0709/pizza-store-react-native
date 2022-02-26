import { Action, ActionType } from '../action-types';

const initialState: any = {
    pizzas:{}
};

const pizzaInfoReducer = (state: any = initialState, action: Action) => {
    console.log("triggereing pizzaInfo with ", action.payload);

    switch (action.type) {
        case ActionType.INIT_STORE:
            return { ...state, pizzas: action.payload };

        default:
            return state;
    }
}

export default pizzaInfoReducer;