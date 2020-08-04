import { Put } from '../../../../../core/axiosHelper';
import urlSettings from '../../../../../constants/urlSettings';

const url = urlSettings.adminOnlineUrl;
const api = {
    updateBrokerRuleApi: "broker-rules",
};

const EditRestrictionService = {
    updateBrokerRule: function (command, then) {
        Put(url + api.updateBrokerRuleApi, command, then);
    }
};
export default EditRestrictionService;