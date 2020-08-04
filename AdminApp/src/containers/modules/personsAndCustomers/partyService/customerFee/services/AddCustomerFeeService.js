import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.PartyManagementUrl;

const api = {
    savepartytradediscountApi: "partytradediscount/savepartytradediscount"
};

const AddCustomersFeeService = {

    savePartyTradeDiscount: function (command, then) {
        Post(url + api.savepartytradediscountApi, command, then);
    }

};

export default AddCustomersFeeService;