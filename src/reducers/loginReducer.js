import {
    VALIDATE_LOGIN_ASYNC,
    FETCH_USER_BY_ID_ASYNC
 
} from '../actions/types';

const initialState = {
    employees: [],
    user:{},
    isSuccess: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VALIDATE_LOGIN_ASYNC:
            return {
                ...state,
                employees: action.payload,
                isSuccess: true                
            } 

        case FETCH_USER_BY_ID_ASYNC:
            {
                return {
                    ...state,
                    user: action.payload
                }
            }

        // case VALIDATE_LOGIN_ASYNC:
        //     return {
        //         ...state,
        //         employees: state.employees.concat([action.payload]),
        //         isSuccess: true                
        //     }            
        // case EDIT_MODE:
        //     return{
        //         ...state,
        //         editMode: true
        //     }
        // case FETCH_EMPLOYEE_BY_ID:
        //     return{
        //         ...state,
        //         employee: state.employees.find(emp => emp.id === action.payload)
        //     }      
        // case CLEAR_STATE:
        //     return{
        //         ...state,
        //         editMode: false
        //     }    
        // case ADD_EMPLOYEE_ASYNC:
        //     return{
        //         ...state,
        //         employees: state.employees.concat([action.payload])
        //     }
        // case EDIT_EMPLOYEE_ASYNC:
        //     return{
        //         ...state,
        //         editMode: false,
        //         employee: action.payload
        //     }
        // case DELETE_EMPLOYEE_ASYNC:
        //     return{
        //         ...state,
        //         employees: state.employees.filter((employee)=>employee.id !==action.payload)
        //     }
        //  case VALIDATE_LOGIN_ASYNC_ERROR:
        //     return{
        //         ...state,
        //         error: true
        //     }
        default:
            return state
    }    
}