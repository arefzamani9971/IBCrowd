import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';


const url = urlSettings.PartyManagementUrl;

const api = {
    updatepartyApi: "party/updateparty",
    updatepartyuncompleteApi :"party/updatepartyuncompleted"
}
const EditLegalCustomer = {

    updateLegalCustomer: function (command, then) {
        Post(url + api.updatepartyApi, command, then, true);
    },
    updatePartyUnComplete : function(command , then){
        Post(url + api.updatepartyuncompleteApi, command, then);
    }
}
export default EditLegalCustomer;