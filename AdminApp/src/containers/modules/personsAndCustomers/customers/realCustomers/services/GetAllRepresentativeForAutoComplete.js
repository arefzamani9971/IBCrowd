import urlSettings from 'constants/urlSettings';
import { Post } from '../../../../../../core/axiosHelper';

const url = {
    party: urlSettings.PartyManagementUrl
};
const api = {
    

}
const GetAllRepresentativeForAutoComplete = {
    
    GetAllRepresentativeForAutoCompleteMethod : function(command , then){
        Post(url.party + api.getallrepresentativeforautocompleteApi, command , then);
    },
   
}
export default GetAllRepresentativeForAutoComplete;