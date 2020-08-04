import { Post,Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const api = {
    symbolApi: 'Symbols'
};

const symbolAutoCompleteService = {
    searchSymbol: function (command, then) {
        Post(api.symbolApi + '/SearchSymbols', command, then);
    },
    getSymbolNameByIsin: function (command, then) {
        Get(api.symbolApi + '/GetSymbolByIsin/' + command, null, then);
    }
};
export default symbolAutoCompleteService;