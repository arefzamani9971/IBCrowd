import { Post, DownloadExcel, DownloadPdf } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getdetailcodesfordetailaccountbooksApi: "accountbook/getdetailcodesfordetailaccountbooks",
    getspecificdetailaccountbooksApi: "accountbook/getspecificdetailaccountbooks",
    getdetailcodesfordetailaccountbooksExcelApi: "accountbook/GetDetailCodesForDetailAccountBooksExcelReport",
    getDetailCodesForDetailAccountBooksPdfReportApi: "accountbook/GetDetailCodesForDetailAccountBooksPdfReport"

};

const GetDetailAccountBookService = {

    getDetailAccountBooks: function (command, then) {
        Post(url + api.getdetailcodesfordetailaccountbooksApi, command, then);
    },
    getSpecificDetailAccountBooks: function (command, then) {
        Post(url + api.getspecificdetailaccountbooksApi, command, then);
    },
    getExcelExport: function (command, then) {

        DownloadExcel(url + api.getdetailcodesfordetailaccountbooksExcelApi, command, 'detail-account-book-excel', then);
    },
    getPdfExport: function (command, then) {
        DownloadPdf(url + api.getDetailCodesForDetailAccountBooksPdfReportApi, command, 'detail-account-book-pdf', false, then);
    },
}


export default GetDetailAccountBookService;