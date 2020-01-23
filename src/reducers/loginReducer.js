import {
    FETCH_EMPLOYEES_ASYNC,
    EDIT_MODE,
    FETCH_EMPLOYEE_BY_ID,
    CLEAR_STATE,
    ADD_EMPLOYEE_ASYNC,
    EDIT_EMPLOYEE_ASYNC,
    DELETE_EMPLOYEE_ASYNC,FETCH_EMPLOYEES_ASYNC_ERROR
} from '../actions/types';

const initialState = {
    employees: [],
    isSuccess: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_EMPLOYEES_ASYNC:
            return {
                ...state,
                employees: state.employees.concat([action.payload]),
                isSuccess: true                
            }            
        case EDIT_MODE:
            return{
                ...state,
                editMode: true
            }
        case FETCH_EMPLOYEE_BY_ID:
            return{
                ...state,
                employee: state.employees.find(emp => emp.id === action.payload)
            }      
        case CLEAR_STATE:
            return{
                ...state,
                editMode: false
            }    
        case ADD_EMPLOYEE_ASYNC:
            return{
                ...state,
                employees: state.employees.concat([action.payload])
            }
        case EDIT_EMPLOYEE_ASYNC:
            return{
                ...state,
                editMode: false,
                employee: action.payload
            }
        case DELETE_EMPLOYEE_ASYNC:
            return{
                ...state,
                employees: state.employees.filter((employee)=>employee.id !==action.payload)
            }
         case FETCH_EMPLOYEES_ASYNC_ERROR:
            return{
                ...state,
                error: true
            }
        default:
            return state
    }    
}