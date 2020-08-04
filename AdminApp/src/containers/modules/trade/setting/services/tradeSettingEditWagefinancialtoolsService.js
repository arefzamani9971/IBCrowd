import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';



const url = urlSettings;
const api = {
    saveEditWageFinancialToolsApi:"",
    getEditWageFinancialToolsApi:""
};

const TradeSettingEditWageFinancialtoolsService = {


    saveEditWageFinancialTools: function (command, then) {
        Post(url.BasicInfoUrl + api.saveEditWageFinancialToolsApi, command, then);
    },
    getEditWageFinancialToolsById : function(command , then){
        Post(url.party + api.getEditWageFinancialToolsApi, command , then);
    },


  
};
export default TradeSettingEditWageFinancialtoolsService;