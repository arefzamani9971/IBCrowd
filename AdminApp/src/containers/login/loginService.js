import { Post } from '../../core/axiosHelper';
import urlSettings from '../../constants/urlSettings'

let url = urlSettings.loginUrl;

let urlApi = {
    loginApi: "authentication/login"
};

const AuthenticationService = {
    login: function (command, then) {
        Post(url + urlApi.loginApi, command, then, false);
    }
}
export default AuthenticationService;