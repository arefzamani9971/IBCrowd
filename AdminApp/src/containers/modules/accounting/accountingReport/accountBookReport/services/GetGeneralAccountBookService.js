import { Post, DownloadExcel, DownloadPdf } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;

const api = {
    getgeneralaccountbooksApi: "accountbook/getgeneralcodesforgeneralaccountbooks",
    getspecificgeneralaccountbooksApi: "accountbook/getspecificgeneralaccountbooks",
    getgeneralaccountbooksExcelApi: "accountbook/GetGeneralCodesForGeneralAccountBooksExcelReport",
    getGeneralCodesForGeneralAccountBooksPdfReportApi: "accountbook/GetGeneralCodesForGeneralAccountBooksPdfReport"

};


const GetGeneralAccountBookService = {

    getGeneralAccountBooks: function (command, then) {
        Post(url + api.getgeneralaccountbooksApi, command, then, true);
    },
    getspecificgeneralaccountbooks: function (command, then) {
        Post(url + api.getspecificgeneralaccountbooksApi, command, then);
    },
    getPdfExport: function (command, fileName, then) {
        DownloadPdf(url + api.getGeneralCodesForGeneralAccountBooksPdfReportApi, command, fileName, false, then);
    },
    getExcelExport: function (command, fileName, then) {
        DownloadExcel(url + api.getgeneralaccountbooksExcelApi, command, fileName, then);
    },
    
}


export default GetGeneralAccountBookService;