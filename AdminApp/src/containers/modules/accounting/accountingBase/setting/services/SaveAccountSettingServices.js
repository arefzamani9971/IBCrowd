import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = {
    basicUrl : urlSettings.BasicInfoUrl,
    accountingUrl : urlSettings.AccountingUrl
};
const api = {
    saveaccountsettingApi: "settings/saveaccountsetting",
    getCurrentAccountSettingApi: "manualvoucher/getcurrentaccountsetting"
};

const SaveAccountSettingServices ={
    SaveAccountSetting:function (command, then) {
        Post(url.basicUrl + api.saveaccountsettingApi, command, then, true);
    },
    getCurrentAccountSetting: function ( then) {
        Post(url.accountingUrl + api.getCurrentAccountSettingApi, null, then);
    }
};
export default SaveAccountSettingServices;