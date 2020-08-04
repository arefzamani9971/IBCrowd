const stateInfo = (state = {}, action) => {
    switch(action.type){
        case 'SET_STATE_INFO':
            return action.data;
        default :
            return state;
    }
};
export default stateInfo;