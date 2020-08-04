import urlSettings from 'constants/urlSettings';
import { Post, Get } from '../../../../../../core/axiosHelper';

const url = {
    party: urlSettings.PartyManagementUrl
};

const api = {
    getcustomerbyidApi :"party/getcustomerbyid",
    updatepartyApi: "party/updateparty",
    updatepartyuncompleteApi :"party/updatepartyuncompleted"
  
}
const EditRealCustomerService = {
    
    getCustomerById : function(command , then){
        Post(url.party + api.getcustomerbyidApi, command , then);
    },
    updateRealCustomer: function (command, then) {
        Post(url.party + api.updatepartyApi, command, then);
    },
    updatePartyUnComplete : function(command , then){
        Post(url.party + api.updatepartyuncompleteApi, command, then);
    }
}
export default EditRealCustomerService;