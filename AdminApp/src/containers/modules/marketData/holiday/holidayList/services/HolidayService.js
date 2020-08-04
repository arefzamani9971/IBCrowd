import { Post, Get, Delete, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

// const url = urlSettings.StatementUrl;
const url = urlSettings.CashFlowUrl;
const secondUrl = urlSettings.BasicInfoUrl;
const api = {
    holidayApi: 'Holiday',
    getallcashflowchequemasterbyfilter: "cashflowchequemaster/getallcashflowchequemasterbyfilter",
    searchbankdeposit: "bankdeposit/searchbankdeposit",
    getcashflowchequemasterbyid: "cashflowchequemaster/getcashflowchequemasterbyid",
    searchcashflowchequemaster: "cashflowchequemaster/searchcashflowchequemaster",
    CashFlowChequeMasterPdfReport: "cashflowchequemaster/CashFlowChequeMasterPdf",
    CashFlowChequeMasterExcelReport: "cashflowchequemaster/CashFlowChequeMasterExcelReport"
};

const HolidayService = {

    getHolidayList: function (command, then) {
        Post(api.holidayApi + '/list', command, then);
    },
    deleteHoliday: function (command, then) {
        Delete(api.holidayApi + '/remove', command, then);
    },
    addHoliday: function (command, then) {
        Post(api.holidayApi + '/save', command, then);
    },
    getAllCashFlowChequeMasterByFilterMethod: function (command, then) {
        Post(url + api.getallcashflowchequemasterbyfilter, command, then);
    },
    searchBankDepositMethod: function (command, then) {
        Post(secondUrl + api.searchbankdeposit, command, then);
    },
    getcashflowchequemasterbyidMethod: function (command, then) {
        Post(url + api.getcashflowchequemasterbyid, command, then);
    },
    searchcashflowchequemasterMethod: function (command, then) {
        Post(url + api.searchcashflowchequemaster, command, then);
    },
    getPdfExport: function (command, then) {
        DownloadPdf(url + api.CashFlowChequeMasterPdfReport, command, then)
    },
    getExcelExport: function (command, then) {
        DownloadExcel(url + api.CashFlowChequeMasterExcelReport, command, then)
    }
};

export default HolidayService;