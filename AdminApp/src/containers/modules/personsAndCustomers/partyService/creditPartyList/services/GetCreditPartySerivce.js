import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    getflatcreditpartyservice: "partyservice/getflatcreditpartyservice",
    getallrepresentativeforautocomplete: "party/getallrepresentativeforsearch"
};

const GetCreditPartySerivce = {
    getflatpartyserviceMethod: function (command, then) {
        Post(url + api.getflatcreditpartyservice, command, then);
    },
    getallrepresentativeforautocompleteMethod: function (command, then) {
        Post(url + api.getallrepresentativeforautocomplete, command, then);
    },
    getCreditParty: function (command, then) {
        Post(url + api.getallrepresentativeforautocomplete, command, then);
    }
};

export default GetCreditPartySerivce;