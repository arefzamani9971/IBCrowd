import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.TradeUrl;
const api = {
  getSettlementVoucherApi: "clearingandsettlement/getflatclearingandsettlement",
  DeleteSettlementRowByIdApi: "clearingandsettlement/deleteclearingandsettlement",
  saveSettlementRowByIdApi: "clearingandsettlement/saveclearingandsettlement",


}

const GetSettlementVoucherService = {
  getSettlementVoucherList: function (command, then) {
    Post(url + api.getSettlementVoucherApi, command, then);
  },
  deleteSettlementVoucher: function (command, then) {
    Post(url + api.DeleteSettlementRowByIdApi, command, then);
  },
  confirmSettlementVoucher: function (command, then) {
    Post(url + api.saveSettlementRowByIdApi, command, then);
  },
}


export default GetSettlementVoucherService;
