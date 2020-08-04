import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const secondUrl = urlSettings.BasicInfoUrl;

// const url = urlSettings.StatementUrl;
const api = {
    searchbankdeposit: "bankdeposit/searchbankdeposit",
    updatecashflowchequemaster: "cashflowchequemaster/updatecashflowchequemaster",
};

const AddBankService = {
    searchBankDepositMethod: function (command, then) {
        Post(secondUrl + api.searchbankdeposit, command, then);
    },
    updatecashflowchequemasterMethod: function (command, then) {
        Post(url + api.updatecashflowchequemaster, command, then);
    },
};

export default AddBankService;