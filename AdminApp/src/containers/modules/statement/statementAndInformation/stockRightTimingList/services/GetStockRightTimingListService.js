import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';


const url = urlSettings.CashFlowUrl;

const secondUrl = urlSettings.BasicInfoUrl;
const api = {
    getallcashflowchequemasterbyfilter: "cashflowchequemaster/getallcashflowchequemasterbyfilter",
    searchbankdeposit: "bankdeposit/searchbankdeposit",
    getcashflowchequemasterbyid: "cashflowchequemaster/getcashflowchequemasterbyid",
    searchcashflowchequemaster: "cashflowchequemaster/searchcashflowchequemaster",
    CashFlowChequeMasterPdfReport: "cashflowchequemaster/CashFlowChequeMasterPdf",
    CashFlowChequeMasterExcelReport: "cashflowchequemaster/CashFlowChequeMasterExcelReport",
    symbolApi: 'Symbols',
    stockRightTimingApi: 'StockRightTiming'
};

const GetStockRightTimingListService = {
    getStockRightTimingList: function (command, then) {
        Post(api.stockRightTimingApi + '/list', command, then);
    },
    getStockRightTiming: function (tracingNo, then) {
        Get(api.stockRightTimingApi + '/' + tracingNo, null, then);
    },
    editStockRightTiming: function (command, then) {
        Post(api.stockRightTimingApi + '/update', command, then);
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
    },


    searchSymbol: function (command, then) {
        Post(api.symbolApi + '/SearchSymbols', command, then);
    }
};

export default GetStockRightTimingListService;