import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings;

const api = {
    saveEditManagementSymbolTradeApi: '',
    getAllSymbolBySearchApi:'product/searchfilterproducts'

};
const EditManagementSymbolTradeService = {

    getAllSymbolBySearch: function (command, then) {
        Post(url.BasicInfoUrl + api.getAllSymbolBySearchApi, command, then);
    },

    // getSymbolTradeManagement: function (then) {
    //     console.log(url);
    //     Get(url, null, then, false);
    // },
    // saveEditsymbolTradeManagement:function (command, then) {
    //     Post(url.trade + api.saveEditManagementSymbolTradeApi, command, then);
    // }
    

};


export default EditManagementSymbolTradeService;