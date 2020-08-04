import { Post } from '../../../../../core/axiosHelper';
import urlSetting from '../../../../../constants/urlSettings';

const api = {
  getAllAccessedMenuApi: "resource/getallaccessedmenu",
};

const NestedListService = {
  getAllAccessedMenu: function (command, then) {
    Post(urlSetting.loginUrl + api.getAllAccessedMenuApi, command, then);
  },

};
export default NestedListService; 