import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    savedetailledgers: "detailledger/savedetailledgers",
};

const SaveDetailLedgerService = {
    savedetailledgers: function (command, then) {
      
    },
};

export default SaveDetailLedgerService;