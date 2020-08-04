import { Post, DownloadExcel, DownloadPdf } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
// const url2 = urlSettings.pdfDonwload;
const api = {
    getnormalgeneralledgerbalancesheetApi: "generalledger/getnormalgeneralledgerbalancesheet",
    getPdfExport: "generalledger/getnormalgeneralledgerbalancesheetpdf",
    getExcelExport: "generalledger/getnormalgeneralledgerbalancesheetexcel",
};

const GetGeneralLedgerBalanceService = {

    getNormalGeneralLedgerBalanceSheet: function (command, then) {
        Post(url + api.getnormalgeneralledgerbalancesheetApi, command, then);
    },
    getPdfExport: function (command, fileName, then) {
        DownloadPdf(url + api.getPdfExport, command, fileName, false, then);
    },
    getExcelExport: function (command, fileName, then) {
        DownloadExcel(url + api.getExcelExport, command, fileName, then);
    },


};
export default GetGeneralLedgerBalanceService;