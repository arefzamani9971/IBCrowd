import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    deletedetailledgers: "detailledger/deletedetailledgers",
};

const DeleteDetailLedgerService = {
    deletedetailledgers: function (command, then) {
    },
};

export default DeleteDetailLedgerService;