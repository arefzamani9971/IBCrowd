import { Post, DownloadExcel } from '../../../../../../core/axiosHelper';

const api = {
    adjustedPriceApi: 'AdjustedPrice',
    getAdjustPriceListExcelApi: ''
};

const AdjustedPriceListService = {
    getAdjustedPriceList: function (command, then) {
        Post(api.adjustedPriceApi + '/list', command, then);
    },
    calculateAdjustedPrice: function (tracingNo, then) {
        Post(api.adjustedPriceApi + '/calculate?tracingNo=' + tracingNo, null, then);
    },
    addCalculatedAdjustedPrice: function (command, then) {
        Post(api.adjustedPriceApi + '/Save', command, then);
    },
    getExcelExport: function (command, fileName) {
        DownloadExcel(api.getAdjustPriceListExcelApi, command, fileName);
    }
};

export default AdjustedPriceListService;