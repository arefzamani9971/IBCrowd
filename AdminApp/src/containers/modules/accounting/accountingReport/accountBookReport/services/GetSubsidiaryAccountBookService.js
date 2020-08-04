import { Post, DownloadExcel, DownloadPdf } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getsubsidiaryaccountbooksApi: "accountbook/getsubsidiarycodesforsubsidiaryaccountbooks",
    getspecificsubsidiaryaccountbooksApi: "accountbook/getspecificsubsidiaryaccountbooks",
    getSubsidiaryCodesForSubsidiaryAccountBooksExcelReportApi: "accountbook/GetSubsidiaryCodesForSubsidiaryAccountBooksExcelReport",
    getSubsidiaryCodesForSubsidiaryAccountBooksPdfReportApi: "accountbook/GetSubsidiaryCodesForSubsidiaryAccountBooksPdfReport"
};

const GetSubsidairyAccountBookService = {

    getSubsidiaryAccountBooks: function (command, then) {
        Post(url + api.getsubsidiaryaccountbooksApi, command, then);
    },
    getSpecificSubsidiaryAccountBooks: function (command, then) {
        Post(url + api.getspecificsubsidiaryaccountbooksApi, command, then);
    },
    getPdfExport: function (command, fileName, then) {
        DownloadPdf(url + api.getSubsidiaryCodesForSubsidiaryAccountBooksPdfReportApi, command, fileName, false, then);
    },
    getExcelExport: function (command, fileName, then) {
        DownloadExcel(url + api.getSubsidiaryCodesForSubsidiaryAccountBooksExcelReportApi, command, fileName, then);
    },
}


export default GetSubsidairyAccountBookService;