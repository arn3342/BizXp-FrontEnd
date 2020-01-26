import {
    VALIDATE_LOGIN,
    FETCH_USER_BY_ID
  
} from './types';

export const fetchEmployees = (employees) => 
    ({
        type: VALIDATE_LOGIN,
        payload: employees
    });


export const validateLogin = (username, pass) =>({
    type: VALIDATE_LOGIN,
    payload: {username: username, pass: pass}
})

export const fetchUserById = id =>({
    type: FETCH_USER_BY_ID,
    payload: id,
})
// export const enableEditMode = () => ({
//     type: EDIT_MODE
// });

// export const FetchEmployeeById = id =>({
//     type: FETCH_EMPLOYEE_BY_ID,
//     payload: id
// })

// export const clearState = () =>({
//     type: CLEAR_STATE
// })

// export const addEmployee = (employee) => ({
//     type: ADD_EMPLOYEE,
//     payload: employee
// })

// export const editEmployee = employee =>({
//     type: EDIT_EMPLOYEE,
//     payload: employee
// })

// export const deleteEmployee = id =>({
//     type: DELETE_EMPLOYEE,
//     payload: id
// })