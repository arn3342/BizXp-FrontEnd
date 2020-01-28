import { takeEvery, put, call } from 'redux-saga/effects';
import {
    VALIDATE_LOGIN, VALIDATE_LOGIN_ASYNC, VALIDATE_LOGIN_ASYNC_ERROR,
    FETCH_USER_BY_ID, FETCH_USER_BY_ID_ASYNC,
    ADD_PRODUCT, ADD_PRODUCT_ASYNC,

} from '../actions/types';
import { fetchUserById } from '../actions/loginActions';
import {addProduct} from '../actions/inventoryActions';

export default function* rootWatcher() {
    yield takeEvery(VALIDATE_LOGIN, validateLoginAsync);
    yield takeEvery(FETCH_USER_BY_ID, fetchUserByIdAsync);
    yield takeEvery(ADD_PRODUCT, addProductAsync);
    // yield takeEvery(EDIT_EMPLOYEE, editEmployeeAsync);
    // yield takeEvery(DELETE_EMPLOYEE, deleteEmployeeAsync);
}

function* validateUserAsync(action) {

}

function* fetchEmployeesAsync() {
    const data = yield fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((employees) => { return employees });
    if (data === "json failed") {
        yield put({ type: VALIDATE_LOGIN_ASYNC_ERROR, payload: data })
    }
    else {
        yield put({ type: VALIDATE_LOGIN_ASYNC, payload: data })
    }
}

function* validateLoginAsync(action) {
    const data = yield fetch("https:localhost:44304/api/user/ValidateLogin?email=" + action.payload.username + "&pass=" + action.payload.pass, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((employees) => { return employees });
    if (data === "json failed") {
        yield put({ type: VALIDATE_LOGIN_ASYNC_ERROR, payload: data })
    }
    else {
        yield put({ type: VALIDATE_LOGIN_ASYNC, payload: data })
    }
}

function* fetchUserByIdAsync(action) {
    const data = yield fetch('https://jsonplaceholder.typicode.com/todos/' + action.payload, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((user) => { return user });
    if (data === "json failed") {
        yield put({ type: VALIDATE_LOGIN_ASYNC_ERROR, payload: data })
    }
    else {
        yield put({ type: FETCH_USER_BY_ID_ASYNC, payload: data })
    }
}
function* addProductAsync(action) {
    console.log(action.payload);
    const apiResult = yield fetch('https://localhost:5001/api/ProductPurchase/CreateProductPurchase', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(action.payload),
    })
        .then(response => response.json())
        .then((product) => { return product })
    yield put({ type: ADD_PRODUCT_ASYNC, payload: apiResult });
}

// function* addProductAsync(action){    
//     console.log(action.payload);
//     const apiResult = yield fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//             'Accept': "application/json"
//         },
//         body: JSON.stringify({
//             title: 'cus',
//             body: 'bar',
//             userId: 1
//           }),     
//     })
//     .then(response => response.json())
//     .then((product) =>{return product})
//     yield put({type: ADD_PRODUCT_ASYNC, payload: apiResult});
// }
