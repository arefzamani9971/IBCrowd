import urlSettings from 'constants/urlSettings';
import { Post } from '../../../../../../core/axiosHelper';

const url = {
    party: urlSettings.PartyManagementUrl
};
const api = {
    getpartybyidApi :"party/getpartybyid",

}
const GetPartyByIdService = {
    
    getPartyById : function(command , then){
        Post(url.party + api.getpartybyidApi, command , then);
    }
   
}
export default GetPartyByIdService;