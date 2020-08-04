import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    importExcel: "manualvoucher/importexcel",
    getLastImportExcelErrors: "manualvoucher/getlastimportexcelerrors"
};

const UploadExcelVoucherService = {
    importExcel: function (command, then) {
        Post(url + api.importexcel, command, then);
    },
    getLastImportExcelErrors: function (command, then) {
        Post(url + api.getLastImportExcelErrors, command, then);
    }
};

export default UploadExcelVoucherService;