import { combineReducers } from 'redux';
import user from './user';
import accessToken from './accessToken';
import userInfo from './userInfo';
import setDelete from './setDelete'
import setUpdateRow from './setUpdateRow';
import stateInfo from './stateInfo';

export default combineReducers({
    user,
    accessToken,
    userInfo,
    setDelete,
    setUpdateRow,
    stateInfo
});
