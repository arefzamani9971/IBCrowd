import urlSettings from 'constants/urlSettings';
import { Post, Get } from '../../../../../../core/axiosHelper';


const url = {

    party: urlSettings.PartyManagementUrl
};

const api = {
    savepartyApi: "party/saveparty",
    deletepartyuploadeddocumentApi :"attachment/deletepartyuploadeddocument"
}


export const uploadFile = function (command, then) {
    Post(url.party + api.savepartyApi, command, then);
}

export const deletePartyUploadedDocument = function (command, then) {
    Post(url.party + api.deletepartyuploadeddocumentApi, command, then);
}



