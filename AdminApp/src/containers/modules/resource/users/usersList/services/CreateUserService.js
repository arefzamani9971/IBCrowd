import { Post } from '../../../../../../core/axiosHelper';
import urlSetting from '../../../../../../constants/urlSettings';

const url = urlSetting.loginUrl;
const api = {
    addNewUserApi: "usermanagement/addNewUser",
};

const AddUserService = {
    addNewUser: function (command, then) {
        Post(url + api.addNewUserApi, command, then);
    },
  
};
export default AddUserService;