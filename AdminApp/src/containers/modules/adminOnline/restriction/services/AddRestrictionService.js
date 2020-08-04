import { Post } from '../../../../../core/axiosHelper';
import urlSettings from '../../../../../constants/urlSettings';

const url = urlSettings.adminOnlineUrl;
const api = {
    addBrokerRuleApi: "broker-rules",
};

const AddRestrictionService = {
    addBrokerRule: function (command, then) {
        Post(url + api.addBrokerRuleApi, command, then);
    }
};
export default AddRestrictionService;