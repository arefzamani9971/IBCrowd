import { Post } from '../../../../../../core/axiosHelper';
import urlSetting from '../../../../../../constants/urlSettings';

const url = urlSetting.AccountingUrl;
const api = {
    deletesubsidiaryledgerdetailledgerrelationbyid: "subsidiaryledgerdetailledgerrelation/deletesubsidiaryledgerdetailledgerrelationbyid",
    deleteselectedsubsidiaryledgerdetailledgerrelationbyid: "subsidiaryledgerdetailledgerrelation/deleteselectedsubsidiaryledgerdetailledgerrelationbyid"
};

const DeleteManageAccountCodesRelationService = {
    deleteRelation: function (command, then) {
        Post(url + api.deletesubsidiaryledgerdetailledgerrelationbyid, command, then);
    },
    deleteRelations: function (command, then) {
        Post(url + api.deleteselectedsubsidiaryledgerdetailledgerrelationbyid, command, then);
    }
};

export default DeleteManageAccountCodesRelationService;