import { ActionType } from '../action-types';

interface Filter {
    value: string,
    label: string
}

interface ActionFilter {
    type: string,
    payload: Filter[]
}

const initialState:any = [];

const filterReducer = (state: any = initialState, action: ActionFilter) => {


    switch (action.type) {
        case ActionType.FILTERS:
            return [ ...action?.payload ];

        default:
            return state;
    }
}

export default filterReducer;