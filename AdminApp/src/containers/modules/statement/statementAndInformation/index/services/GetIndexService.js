import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

// const url = urlSettings.StatementUrl;
const url = urlSettings.CashFlowUrl;
const secondUrl = urlSettings.BasicInfoUrl;
const api = {
    getallcashflowchequemasterbyfilter: "cashflowchequemaster/getallcashflowchequemasterbyfilter",
    searchbankdeposit: "bankdeposit/searchbankdeposit",
    getcashflowchequemasterbyid: "cashflowchequemaster/getcashflowchequemasterbyid",
    searchcashflowchequemaster: "cashflowchequemaster/searchcashflowchequemaster",
    CashFlowChequeMasterPdfReport: "cashflowchequemaster/CashFlowChequeMasterPdf",
    CashFlowChequeMasterExcelReport: "cashflowchequemaster/CashFlowChequeMasterExcelReport",
    statementApi: 'Statement',
    updatecashflowchequemaster: "cashflowchequemaster/updatecashflowchequemaster",
};

const GetIndexService = {
    getStatementList: function (command, then) {
        Post(api.statementApi + '/list', command, then);
    },
    getStatement: function (command, then) {
        Get(api.statementApi + '/GetGeneralAssembly?traceNo=' + command, null, then);
    },
    updateStatement: function (command, then) {
        Post(api.statementApi + '/UpdateGeneralAssembly', command, then);
    },

    searchBankDepositMethod: function (command, then) {
        Post(secondUrl + api.searchbankdeposit, command, then);
    },


    getcashflowchequemasterByidMethod: function (command, then) {
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
    updatecashflowchequemasterMethod: function (command, then) {
        Post(url + api.updatecashflowchequemaster, command, then);
    },
};

export default GetIndexService;