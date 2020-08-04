import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
    getAllUsersApi: "usermanagement/getallusers",
    getallroleApi: "usermanagement/getallrole"
};


const GetUsersService = {
 
    getAllUsers : function (command , then) {
        Post(url + api.getAllUsersApi, command , then);
    },
    getAllRole : function(command , then){
        Post(url + api.getallroleApi ,command , then);
    }
};
export default GetUsersService;