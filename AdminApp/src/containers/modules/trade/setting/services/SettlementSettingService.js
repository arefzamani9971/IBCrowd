import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings;
const api = {
    saveclearingandsettlementsettingApi: 'settings/saveclearingandsettlementsetting',
    getcurrentclearingandsettlementApi: 'settings/getcurrentclearingandsettlement',
    getflatsearchforaccountingcodeApi: 'accountingreport/getflatsearchforaccountingcode'
};

const SettlementSettingService = {
    saveClearingAndSettlementSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveclearingandsettlementsettingApi, command, then);
    },
    getCurrentClearingAndSettlement: function (command, then) {
        Post(url.BasicInfoUrl + api.getcurrentclearingandsettlementApi, command, then);
    },
    getFlatSearchForAccountingCode:function (command, then) {
        Post(url.AccountingUrl + api.getflatsearchforaccountingcodeApi, command, then);
    }
};
export default SettlementSettingService;