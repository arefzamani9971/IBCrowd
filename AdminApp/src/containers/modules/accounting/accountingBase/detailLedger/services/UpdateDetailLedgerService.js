import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    updatedetailledgers: "detailledger/updatedetailledgers",
    getdetailledgersbyid: "detailledger/getdetailledgersbyid"
};

const UpdateDetailLedgerService = {
    updatedetailledgers: function (command, then) {
       
    },
    getdetailledgersbyid: function (command, then) {
      
    },
};

export default UpdateDetailLedgerService;