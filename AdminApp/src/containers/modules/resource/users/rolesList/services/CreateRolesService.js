
import { Post } from '../../../../../../core/axiosHelper';
import urlSetting from '../../../../../../constants/urlSettings';

const url = urlSetting.BasicInfoUrl;
const api = {
    savebankdepositApi: "bankdeposit/savebankdeposit",
   
};

const AddRolesService = {
   
 
    saveRole: function (command, then) {
        Post(url + api.savebankdepositApi, command, then);
    },
  
};
export default AddRolesService;