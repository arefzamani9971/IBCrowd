import urlSettings from 'constants/urlSettings';
import { Post} from '../../../../../../core/axiosHelper';

const url = {
    party: urlSettings.PartyManagementUrl
};

const api = {
    updatepartyuncompletedApi :"party/updatepartyuncompleted",
  
  
}
const UpdateUncompletedPartyService = {
    
    updatepartyforuncompletedpartyMethod : function(command , then){
        Post(url.party + api.updatepartyuncompletedApi, command , then);
    }
    
}
export default UpdateUncompletedPartyService;