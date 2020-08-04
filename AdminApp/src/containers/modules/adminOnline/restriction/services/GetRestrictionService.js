import { Post, Delete } from '../../../../../core/axiosHelper';
import urlSettings from '../../../../../constants/urlSettings';

const url = urlSettings.adminOnlineUrl;
const api = {
    getBrokerRulesApi: "broker-rules/list",
    deleteBrokerRule: "broker-rules"
};

const GetRestrictionService = {
    getBrokerRules: function (command, then) {
        Post(url + api.getBrokerRulesApi, command, then);
    },
    deleteBrokerRule: function (params, then) {
        Delete(url + api.deleteBrokerRule, params, then);
    }
};
export default GetRestrictionService;