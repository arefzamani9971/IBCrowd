import urlSettings from 'constants/urlSettings';
import { Get } from 'core/axiosHelper';


const url = {
    sharedData: urlSettings.BasicInfoUrl,

};

const api = {
  
    getallregionsApi: "region/getallregions",
   

}
const GetAllRegion =  function (params,then) {
    Get(url.sharedData + api.getallregionsApi, params, then);
    
 
}
export default GetAllRegion;