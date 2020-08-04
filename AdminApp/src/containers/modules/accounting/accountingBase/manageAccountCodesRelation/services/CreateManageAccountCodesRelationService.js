import { Post } from '../../../../../../core/axiosHelper';
import urlSetting from '../../../../../../constants/urlSettings';

const url = urlSetting.AccountingUrl;
const api = {
    savesubsidiaryledgerdetailledgerrelation: "subsidiaryledgerdetailledgerrelation/savesubsidiaryledgerdetailledgerrelation",
};

const AddManageAccountCodesRelationService = {
    saveAccountCodes: function (command, then) {
        Post(url + api.savesubsidiaryledgerdetailledgerrelation, command, then);
    }
};

export default AddManageAccountCodesRelationService;