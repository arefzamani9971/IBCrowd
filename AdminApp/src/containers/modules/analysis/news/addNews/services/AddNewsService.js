import urlSettings from 'constants/urlSettings';
import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';

// const url = urlSettings.StatementUrl;
const api = {
    symbolApi: 'Symbols',

};

const AddNewsService = {
    searchSymbol: function (command, then) {
        Post(api.symbolApi + '/SearchSymbols', command, then);
    }
};

export default AddNewsService;