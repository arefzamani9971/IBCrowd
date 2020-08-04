import urlSettings from 'constants/urlSettings';
import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';

// const url = urlSettings.StatementUrl;
const api = {
    analysisApi: '',

};

const AddFundamentalAnalysisService = {
    addAnalysis: function (command, then) {
        Post(api.analysisApi + '/', command, then);
    }
};

export default AddFundamentalAnalysisService;