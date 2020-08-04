import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    saveDraftManualVoucherApi: "manualvoucher/savedraftmanualvoucher",
    saveManualVoucherApi: "ManualVoucher/SaveManualVoucher",
    getmanualvouchercategoriesApi: "vouchercategory/getmanualvouchercategories",
    savesubsidiaryledgerdetailledgerrelationApi: "subsidiaryledgerdetailledgerrelation/savesubsidiaryledgerdetailledgerrelation",
    updatedraftmanualvoucherApi: "manualvoucher/updatedraftmanualvoucher",
    deletedraftmanualvoucherApi: "manualvoucher/deletedraftmanualvoucher",
    getCurrentAccountSettingApi: "manualvoucher/getcurrentaccountsetting"
};

const AddVouchersService = {
    saveDraftManualVoucher: function (command, then) {
        Post(url + api.saveDraftManualVoucherApi, command, then);
    },
    updateDraftManualVoucher: function (command, then) {
        Post(url + api.updatedraftmanualvoucherApi, command, then);
    },
    deleteDraftManualVoucher: function (command, then) {
        Post(url + api.deletedraftmanualvoucherApi, command, then);
    },
    saveManualVoucher: function (command, then) {
        Post(url + api.saveManualVoucherApi, command, then);
    },
    getManualVoucherCategories: function (command, then) {
        Post(url + api.getmanualvouchercategoriesApi, command, then);
    },
    savesubsidiaryLedgerDetailLedgerRelation: function (command, then) {
        Post(url + api.savesubsidiaryledgerdetailledgerrelationApi, command, then);
    },
    getCurrentAccountSetting: function ( then) {
        Post(url + api.getCurrentAccountSettingApi, null, then);
    }
}

export default AddVouchersService;