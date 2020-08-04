import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    getAllParty: 'partycode/getallpartycodebyfilter',
    deleteParty: 'partycode/deletepartycodebyid',
    getpartycodebypartyidApi : "partycode/getpartycodebypartyid"
    
};
const CustomerTradingCodesService = {
    getAllPartyMethod: function (command, then) {
        Post(url + api.getAllParty, command, then);
    },
    deletePartyMethod : function (command , then) {
        Post(url + api.deleteParty, command , then);
    },
    getPartyCodeByPartyId : function(command , then){
        Post(url + api.getpartycodebypartyidApi,command , then);
    }
};
export default CustomerTradingCodesService;