import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = {
    party : urlSettings.PartyManagementUrl,
    account : urlSettings.BasicInfoUrl
};
const api = {
    getflatpartyservice: "partyservice/getflatpartyservice",
    getallrepresentativeforautocomplete: "party/getallrepresentativeforsearch",
    getservices: 'services/getservices',
    getpartyservicesbyids : 'partyservice/getpartyservicesbyids'
};

const GetCustomersServicesSerivce = {
    getflatpartyserviceMethod: function (command, then) {
        Post(url.party + api.getflatpartyservice, command, then);
    },
    getallrepresentativeforautocompleteMethod: function(command, then){
        Post(url.party + api.getallrepresentativeforautocomplete, command, then);
    },
    getpartyservicesbyidsMethod: function(command, then){
        Post(url.party + api.getpartyservicesbyids, command, then);
    },
    getservicesMethod: function(command, then){
        Post(url.account + api.getservices, command, then);
    },
   

};
export default GetCustomersServicesSerivce;