import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    simpleSearchCustomersApi: "party/simplesearchcustomers",
    getallpartybyfilterApi: 'party/getflatcustomers',
    getpartybyidApi: 'party/getpartybyid',
    searchmarketerApi :"party/searchmarketer",
    getallrepresentativeforsearchApi :"party/getallrepresentativeforsearch",
};


const GetPartiesService = {
    simpleSearchCustomers: function (command, then) {
        Post(url + api.simpleSearchCustomersApi, command, then);
    },
    getAllPartyByFilter : function (command , then) {
        Post(url + api.getallpartybyfilterApi, command , then);
    },
    getpartybyid: function (command , then) {
        Post(url + api.getpartybyidApi, command , then);
    },
    searchMarketer : function(command , then){
        Post(url + api.searchmarketerApi , command , then);
    },
    getAllRepresentativeForSearch : function(command , then){
        Post(url + api.getallrepresentativeforsearchApi, command , then);
    },
};
export default GetPartiesService;