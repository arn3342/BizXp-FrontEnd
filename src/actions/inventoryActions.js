import {
    ADD_PRODUCT
} from './types';

export const addProduct = productName =>({
    type : ADD_PRODUCT,
    payload: productName,
})