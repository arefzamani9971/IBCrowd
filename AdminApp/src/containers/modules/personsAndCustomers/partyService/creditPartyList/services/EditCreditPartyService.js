import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    updatevaliduntilpartyservicesMethod: "partyservice/updatepartyservices",
    updatecreditpartyservices: "partyservice/updatecreditpartyservices",
    GetCreditPartyServiceById: "partyservice/GetCreditPartyServiceById"
};

const EditCreditPartyService = {
    updatevaliduntilpartyservicesMethod: function (command, then) {
        Post(url + api.updatevaliduntilpartyservicesMethod, command, then);
    },
    updateCreditPartyMethod: function (command, then) {
        Post(url + api.updatecreditpartyservices, command, then);
    },
    getCreditPartyById: function (command, then) {
        
        Post(url + api.GetCreditPartyServiceById, command, then);
    }
};

export default EditCreditPartyService;