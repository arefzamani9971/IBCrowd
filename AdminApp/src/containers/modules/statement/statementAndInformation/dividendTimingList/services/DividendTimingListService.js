
import { Post, DownloadExcel } from '../../../../../../core/axiosHelper';

const api = {
    
    getAllDividendTimingListApi:'StockDividendTiming',
    symbolApi: 'Symbols'

};

const DividendTimingListService = {
    getAllDividendTimingList: function (command, then) {
        Post(api.getAllDividendTimingListApi+'/list', command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(api.getDividendTimingListExcelApi, command,fileName);
    },
    searchSymbol: function (command, then) {
        Post(api.symbolApi + '/SearchSymbols', command, then);
    }
};

export default DividendTimingListService;