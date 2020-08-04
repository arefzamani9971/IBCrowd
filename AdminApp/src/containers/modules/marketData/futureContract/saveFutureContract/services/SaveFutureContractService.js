import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';


// const url = urlSettings.StatementUrl;
const api = {
    futureContractsApi: "FutureContracts",
   
};

const SaveFutureContractService = {
    saveFutureContracts: function (command, then) {
        Post(api.futureContractsApi,command,then);
    }
};

export default SaveFutureContractService;