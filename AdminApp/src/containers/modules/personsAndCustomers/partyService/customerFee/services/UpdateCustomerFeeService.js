import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.PartyManagementUrl;

const api = {
    updatepartytradediscountsApi: "partytradediscount/updatepartytradediscounts"
};

const UpdateCustomersFeeService = {

    updatePartyTradeDiscounts: function (command, then) {
        Post(url + api.updatepartytradediscountsApi, command, then);
    }
};

export default UpdateCustomersFeeService;