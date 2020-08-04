import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    savecreditpartyservice: "partyservice/savecreditpartyservice",
};

const SaveCreditPartyService = {
    savepartyserviceMethod: function (command, then) {
        Post(url + api.savecreditpartyservice, command, then);
    },
};

export default SaveCreditPartyService;