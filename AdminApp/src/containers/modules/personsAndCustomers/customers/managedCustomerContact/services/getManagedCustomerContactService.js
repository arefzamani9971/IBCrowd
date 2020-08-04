import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;

const api = {
    getallcontactbyfilterApi: 'contact/getallcontactbyfilter',
    getcontactbyidApi: 'contact/getcontactbyid',
};
const GetManagedCustomerContactServices = {
    
    getAllContactByFilterMethod: function (command, then) {
        Post(url + api.getallcontactbyfilterApi, command, then);
    },
    getContactById: function (command, then) {
        Post(url + api.getcontactbyidApi, command, then);
    }
};
export default GetManagedCustomerContactServices;