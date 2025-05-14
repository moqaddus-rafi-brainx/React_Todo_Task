

function confirmPassReducer(state,action){

    switch(action.type){
        case "CHANGE":
        let error=""
        if(action.value.trim()=="")
        {
            error="Confirm password is required";
        }
        if(action.matchWith.trim()!=action.value.trim())
        {
            error="Confirm password doesnt match";
        }
        return{
            value:action.value.trim(),
            error:error
        }
        default:
            return state;
    }

}

export default confirmPassReducer;