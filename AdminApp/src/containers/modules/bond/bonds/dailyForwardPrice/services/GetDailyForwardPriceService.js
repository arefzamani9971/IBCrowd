import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.TradeUrl;
const api = {
    getlastsettlementuploadedexcel: "settlementcommoditytransaction/getlastsettlementuploadedexcel",
};

const GetDailyForwardPriceService = {
    getlastsettlementuploadedexcelMethod: function (command, then) {
        Post(url + api.getlastsettlementuploadedexcel, command, then);
    },
};
export default GetDailyForwardPriceService;