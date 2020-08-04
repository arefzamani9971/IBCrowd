import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    getAllCustomersRoleByFilterAPI: 'partyroles/getflatpartyrolesbyfilter',
    getpartyrolebyid: 'partyroles/getpartyrolebyid',
    getallpersonalityroles: 'personalityrole/getallpersonalityroles',
    getsimplepersonalityroles: 'personalityrole/getsimplepersonalityroles',
    simplepartysearchexceptcustomersApi: 'partyroles/simplepartysearchexceptcustomers',

};

const GetPartyRoleService = {

    getAllPartyRoleService : function (command , then) {
        Post(url + api.getAllCustomersRoleByFilterAPI, command , then);
    },
    getPartyRoleByIdMethod : function (command , then) {
        Post(url + api.getpartyrolebyid, command , then);
    },

    getAllPersonalityRolesMethod:function(command,then){
        Post(url + api.getallpersonalityroles, command , then);
    },

    getSimplePersonalityRolesMethod:function(command,then){
        Post(url + api.getsimplepersonalityroles, command , then);
    },
    getAllPersonWithRoleForSearch: function(command,then){
        Post(url + api.simplepartysearchexceptcustomersApi, command , then);
    }

};
export default GetPartyRoleService;