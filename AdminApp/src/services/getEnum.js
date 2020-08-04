import urlSettings from 'constants/urlSettings';
import { Get } from 'core/axiosHelper';

const url = {
    sharedData: urlSettings.BasicInfoUrl,
    baseUrl: urlSettings.baseUrl
};
const api = {
    getallenumtypeApi: "common/enum/",
}
const GetEnum =  function (enumName, then) {
        Get(api.getallenumtypeApi+enumName, null, then);
}

export default GetEnum;