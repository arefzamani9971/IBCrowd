import urlSettings from 'constants/urlSettings';
import { Post } from 'core/axiosHelper';

const url = urlSettings.loginUrl;

const api = {
    getuserinformationApi: "usermanagement/getuserinformation",
};
const GetUserInformationService = {

    getUserInformation: function (command, then) {
        Post(url + api.getuserinformationApi, command, then);
    }
};
export default GetUserInformationService;