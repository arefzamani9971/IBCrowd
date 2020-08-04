import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

// const url = urlSettings.StatementUrl;
const url = urlSettings.CashFlowUrl;
const secondUrl = urlSettings.BasicInfoUrl;
const api = {
   bondApi:"Bond",
   bondDetailsByApi:"BondDetails"

};

const BondsListService = {
    getBondList: function (command, then) {
        Post(api.bondApi + '/list', command, then);
    },
    getBondDetailsById:function(command , then){
        
        Get(api.bondDetailsByApi+'/'+command,null , then)
    },
    saveBondDetails : function (command, then) {
        console.log("command : " , command);
        Post(api.bondDetailsByApi , command, then);
    }
};

export default BondsListService;