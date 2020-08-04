import { Post, DownloadExcel,DownloadPdf } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;

const api = {
    getflatvouchermastersApi: "vouchermaster/getflatvouchermasters",
    GetFlatVoucherMastersExelApi: "vouchermaster/GetFlatVoucherMastersExcelReport",
    getflatvouchermastersByIdApi: "vouchermaster/getvouchermasterbyid",
    deleteflatvouchermastersByIdApi: "manualvoucher/deletevoucher",
    lockflatvouchermastersByIdApi: "vouchermaster/lockvouchers",
    unlockflatvouchermastersByIdApi: "vouchermaster/unlockvouchers",
    finalizevouchersbyidApi: "vouchermaster/finalizevouchers",
    confirmvouchersByIdApi:"vouchermaster/confirmvouchers",
    getVerticalAccountingVoucherPdfReportApi: "accountingreport/GetVerticalAccountingVoucherPdfReport",
    getDetailedAccountingVoucherPdfReportApi:"accountingreport/GetDetailedAccountingVoucherPdfReport",
    getGeneralGroupedAccountingVoucherPdfReportApi:"accountingreport/GetGeneralGroupedAccountingVoucherPdfReport",
    getFullGroupedAccountingVoucherPdfReportApi:"accountingreport/GetFullGroupedAccountingVoucherPdfReport"

};

const GetVouchersMasterService = {
    getFlatVoucherMasters: function (command, then) {
        Post(url + api.getflatvouchermastersApi, command, then);
    },
    getVoucherMasterById: function (command, then) {
        Post(url + api.getflatvouchermastersByIdApi, command, then);
    },
    deleteVoucherMaster: function (command, then) {
        Post(url + api.deleteflatvouchermastersByIdApi, command, then);
    },
    lockVoucherMaster: function (command, then) {
        Post(url + api.lockflatvouchermastersByIdApi, command, then);
    },
    unlockVoucherMaster: function (command, then) {
        Post(url + api.unlockflatvouchermastersByIdApi, command, then);
    },
    getExcelExport: function (command, fileName, then) {
        DownloadExcel(url + api.GetFlatVoucherMastersExelApi, command, fileName,then);
    },
    finalizeVouchersById: function (command, then) {
        Post(url + api.finalizevouchersbyidApi, command, then);
    },
    confirmVouchers:function (command, then) {
        Post(url + api.confirmvouchersByIdApi, command, then);
    },
    getDetailedAccountingVoucherPdfReport:function (command, then) {
        DownloadPdf(url + api.getDetailedAccountingVoucherPdfReportApi, command, 'Detailed-Accounting-Voucher-Pdf', false, then);
    },
    getGeneralGroupedAccountingVoucherPdfReport:function (command, then) {
        DownloadPdf(url + api.getGeneralGroupedAccountingVoucherPdfReportApi, command, 'General-Grouped-Accounting-Voucher-Pdf', false, then);
    },
    GetFullGroupedAccountingVoucherPdfReport:function (command, then) {
        DownloadPdf(url + api.getFullGroupedAccountingVoucherPdfReportApi, command, 'FullGrouped-Accounting-Voucher-Pdf', false, then);
    },
    GetVerticalAccountingVoucherPdfReport:function (command, then) {
        DownloadPdf(url + api.getVerticalAccountingVoucherPdfReportApi, command, 'Vertical-Accounting-Voucher-Pdf', false, then);
    },














};
export default GetVouchersMasterService;