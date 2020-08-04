import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';

const api = {

    optionDetailApi: 'OptionDetail',

};

const OptionDetailListService = {
  
    getOptionDetailList: function (command, then) {
        Post(api.optionDetailApi + '/list', command, then);
    } ,
    saveOptionDetailList: function (command, then) {
        
        Post(api.optionDetailApi + '/save', command, then);
        
    }




};

export default OptionDetailListService;