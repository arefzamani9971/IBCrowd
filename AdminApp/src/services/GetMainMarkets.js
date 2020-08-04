

import urlSettings from 'constants/urlSettings';
import { Get } from '../core/axiosHelper';


const url = urlSettings.BasicInfoUrl

const api = {
    getmainmarketsApi: "mainmarket/getmainmarkets"
}
const GetMainMarket = function (then) {
    Get(url + api.getmainmarketsApi, null, then);
}
export default GetMainMarket;