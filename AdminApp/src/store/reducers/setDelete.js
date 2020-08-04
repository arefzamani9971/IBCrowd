const setDelete = (state = {} , action) =>{
    switch(action.type){
        case  'SET_DELETE':
            return action.data;
            
        default :
            return state;
    }
}

export default setDelete;