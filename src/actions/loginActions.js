import {
    FETCH_EMPLOYEES,
    EDIT_MODE,
    FETCH_EMPLOYEE_BY_ID,
    CLEAR_STATE,
    ADD_EMPLOYEE,
    EDIT_EMPLOYEE,
    DELETE_EMPLOYEE
} from './types';

export const fetchEmoloyees = (employees) => 
    ({
        type: FETCH_EMPLOYEES,
        payload: employees
    });

export const enableEditMode = () => ({
    type: EDIT_MODE
});

export const FetchEmployeeById = id =>({
    type: FETCH_EMPLOYEE_BY_ID,
    payload: id
})

export const clearState = () =>({
    type: CLEAR_STATE
})

export const addEmployee = (employee) => ({
    type: ADD_EMPLOYEE,
    payload: employee
})

export const editEmployee = employee =>({
    type: EDIT_EMPLOYEE,
    payload: employee
})

export const deleteEmployee = id =>({
    type: DELETE_EMPLOYEE,
    payload: id
})