import { Post,DownloadExcel, DownloadPdf } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getcustomeraccountbookApi: "accountbook/getcustomeraccountbook",
    getCustomerAccountBookExcelReportApi:"accountbook/GetCustomerAccountBookExcelReport",
    getCustomerAccountBookPdfReportApi:"accountbook/GetCustomerAccountBookPdfReport",


};

const GetCustomerAccountBookService = {
   
    getCustomerAccountBook: function (command, then) {
        Post(url + api.getcustomeraccountbookApi, command, then);
    },
    getExcelExport: function (command, then) {
        DownloadExcel(url + api.getCustomerAccountBookExcelReportApi, command, 'customer-account-book-excel', then);
    },
    getPdfExport: function (command, then) {
        DownloadPdf(url + api.getCustomerAccountBookPdfReportApi, command, 'customer-account-book-pdf', false, then);
    },
  
  
};
export default GetCustomerAccountBookService;