import {
    ADD_PRODUCT_ASYNC

} from '../actions/types';

const initialState = {
    products: [],
    isSuccess: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT_ASYNC:
            return {
                ...state,
                products: state.products.concat([action.payload]),
                isSuccess: true
            }
        default:
            return state
    }
}