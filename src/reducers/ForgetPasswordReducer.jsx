import { emailRegex } from "../constants";

function emailReducer(state,action)
{
    switch(action.type){
        case "CHANGE":
            let error="";
            if(action.value.trim()=="")
            {
                error="Email cannot be empty";
            }
            else if(!emailRegex.test(action.value.trim()))
            {
                error="Invalid Email";
            }
            return{ //return changed copy of state
                value:action.value.trim(),
                error:error,
            }
        default:
            return state;

    }
}

export default emailReducer;