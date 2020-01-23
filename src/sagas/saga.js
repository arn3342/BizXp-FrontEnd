import { takeEvery, put, call } from 'redux-saga/effects';
import {
    FETCH_EMPLOYEES, FETCH_EMPLOYEES_ASYNC,
    ADD_EMPLOYEE, ADD_EMPLOYEE_ASYNC,
    EDIT_EMPLOYEE, EDIT_EMPLOYEE_ASYNC,
    DELETE_EMPLOYEE, DELETE_EMPLOYEE_ASYNC,
    FETCH_EMPLOYEES_ASYNC_ERROR
} from '../actions/types';

export default function* rootWatcher(){    
    yield takeEvery(FETCH_EMPLOYEES, fetchEmployeesAsync);
    // yield takeEvery(ADD_EMPLOYEE, addEmployeeAsync);
    // yield takeEvery(EDIT_EMPLOYEE, editEmployeeAsync);
    // yield takeEvery(DELETE_EMPLOYEE, deleteEmployeeAsync);
}

function* fetchEmployeesAsync(){
    const data = yield  fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((employees) => {return employees});  
    if(data === "json failed"){
        yield put({ type: FETCH_EMPLOYEES_ASYNC_ERROR, payload: data })
    }
    else{
        yield put({ type: FETCH_EMPLOYEES_ASYNC, payload: data })
    }    
}