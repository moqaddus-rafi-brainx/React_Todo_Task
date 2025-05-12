
import { emailRegex } from "../constants/regex";


const usernameReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE":
        return {
          value: action.value,
          error: action.value.trim() === "" ? "Username is required" : "",
        };
      default:
        return state;
    }
  };
  
  //Email reducer
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
  
  //Password reducer
  function passwordReducer(state,action){
    switch(action.type){
        case "CHANGE":
            let error="";
            if(action.value.trim()=="")
            {
                error="Password is required";
            }
            else if(action.value.trim().length<=6)
            {
                error="Password must have more than 6 letters";
            }
            return{ //return changed copy of state
                value:action.value.trim(),
                error:error,
            }
        default:
            return state;
    }
    

}

  export {passwordReducer,emailReducer,usernameReducer};
  

  
  
  