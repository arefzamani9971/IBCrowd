import { Post, Get ,DownloadExcel, DownloadPdf} from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    getflatreceiveandpayment: "cashflowmaster/getflatreceiveandpayment",
    getPaymentAndReceivePdfReportApi:""
};


const GetPaymentAndReceiveServices = {
    getflatreceiveandpaymentMethod: function (command, then) {
        Post(url + api.getflatreceiveandpayment, command, then);
    },
    getExcelExport: function (command, then) {
        DownloadExcel(url + api.getPaymentAndReceivePdfReportApi, command, 'payment-and-receive-pdf', false, then);
    },
    getPdfExport: function (command, then) {
        DownloadPdf(url + api.getPaymentAndReceivePdfReportApi, command, 'payment-and-receive-excel', false, then);
    },
};
export default GetPaymentAndReceiveServices;