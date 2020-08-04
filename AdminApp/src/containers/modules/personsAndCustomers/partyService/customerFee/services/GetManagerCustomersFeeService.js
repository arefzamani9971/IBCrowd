import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.PartyManagementUrl;

const api = {
    getflatpartytradediscountApi :"partytradediscount/getflatpartytradediscount",
    deletepartytradediscountApi :"partytradediscount/deletepartytradediscount"
};

const GetManagerCustomersFeeService = {

    getFlatPartyTradeDiscount : function(command , then){
        Post(url + api.getflatpartytradediscountApi,command,then);
    },
    deletePartyTradeDiscount : function(command , then){
        Post(url + api.deletepartytradediscountApi,command,then);
    }

};

export default GetManagerCustomersFeeService;