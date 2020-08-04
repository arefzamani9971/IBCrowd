import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getAccountCodeRelation: "subsidiaryledgerdetailledgerrelation/getallsubsidiaryledgerdetailledgerrelation"

};

const GetManageAccountCodesRelationService = {
    getAccountCodes: function (command, then) {
        Post(url + api.getAccountCodeRelation, command, then);
    }
};

export default GetManageAccountCodesRelationService;