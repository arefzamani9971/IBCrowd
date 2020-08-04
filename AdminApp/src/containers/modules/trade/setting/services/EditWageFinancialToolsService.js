import { Post,Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';


const url = urlSettings;
const api = {
    getEditWageFinancialToolsListApi:"settings/getallsetting",
    getCurrentIFBBondFeeSettingApi:"settings/GetCurrentIFBBondFeeSetting",
    getCurrentIFBEquityFeeSettingApi:"settings/GetCurrentIFBEquityFeeSetting",
    getCurrentTseMixedIncomeETFFeeSettingApi:"settings/GetCurrentTseMixedIncomeETFFeeSetting",
    getCurrentTseBondFeeSettingApi:"settings/GetCurrentTseBondFeeSetting",
    getCurrentTseEquityFeeSettingApi:"settings/GetCurrentTseEquityFeeSetting",
    getCurrentIFBFixedIncomeETFFeeSettingApi:"settings/GetCurrentIFBFixedIncomeETFFeeSetting",
    getCurrentTseFixedIncomeETFFeeSettingApi:"settings/GetCurrentTseFixedIncomeETFFeeSetting",
    getCurrentIFBMixedIncomeETFFeeSettingApi:"settings/GetCurrentIFBMixedIncomeETFFeeSetting",
    getCurrentIFBEquityETFFeeSettingApi:"settings/GetCurrentIFBEquityETFFeeSetting",
    getCurrentTseEquityETFFeeSettingApi:"settings/GetCurrentTseEquityETFFeeSetting",
    getCurrentTseOptionSellFeeSettingApi:"settings/GetCurrentTseOptionSellFeeSetting",
    getCurrentTseForwardFeeSettingApi:"settings/GetCurrentTseForwardFeeSetting",
    getCurrentTseFuturesFeeSettingApi:"settings/GetCurrentTseFuturesFeeSetting",
    getCurrentIFBBondMBSFeeSettingApi:"settings/GetCurrentIFBBondMBSFeeSetting",
    getCurrentImeEquityFeeSettingApi:"settings/GetCurrentImeEquityFeeSetting",
    getCurrentImeBondFeeSettingApi:"settings/GetCurrentImeBondFeeSetting",
    getCurrentImeForwardFeeSettingApi:"settings/GetCurrentImeForwardFeeSetting",
    getCurrentImeFixedIncomeETFFeeSettingApi:"settings/GetCurrentImeFixedIncomeETFFeeSetting",
    getCurrentImeMixedIncomeETFFeeSettingApi:"settings/GetCurrentImeMixedIncomeETFFeeSetting",
    getCurrentImeEquityETFFeeSettingApi:"settings/GetCurrentImeEquityETFFeeSetting",
    getCurrentIrenexEquityFeeSettingApi:"settings/GetCurrentIrenexEquityFeeSetting",
    getCurrentIrenexBondFeeSettingApi:"settings/GetCurrentIrenexBondFeeSetting",
    getCurrentIrenexForwardFeeSettingApi:"settings/GetCurrentIrenexForwardFeeSetting",
    getCurrentImeGoldCoinFeeSettingApi:"settings/GetCurrentImeGoldCoinFeeSetting",
    getCurrentTseOptionBuyFeeSettingApi:"settings/GetCurrentTseOptionBuyFeeSetting",
    getCurrentImeGoldETFFeeSettingApi:"settings/GetCurrentImeGoldETFFeeSetting",
    getCurrentImeCertificateAgricultureProductFeeSettingApi:"settings/GetCurrentImeCertificateAgricultureProductFeeSetting",



    // save methods

    saveIFBBondFeeSettingApi:"settings/SaveIFBBondFeeSetting",
    saveIFBEquityFeeSettingApi:"settings/SaveIFBEquityFeeSetting",
    saveTseBondFeeSettingApi:"settings/SaveTseBondFeeSetting",
    saveTseEquityFeeSettingApi:"settings/SaveTseEquityFeeSetting",
    saveIFBFixedIncomeETFFeeSettingApi:"settings/SaveIFBFixedIncomeETFFeeSetting",
    saveTseFixedIncomeETFFeeSettingApi:"settings/SaveTseFixedIncomeETFFeeSetting",
    saveIFBMixedIncomeETFFeeSettingApi:"settings/SaveIFBMixedIncomeETFFeeSetting",
    saveIFBEquityETFFeeSettingApi:"settings/SaveIFBEquityETFFeeSetting",
    saveTseEquityETFFeeSettingApi:"settings/SaveTseEquityETFFeeSetting",
    saveTseOptionSellFeeSettingApi:"settings/SaveTseOptionSellFeeSetting",
    saveTseForwardFeeSettingApi:"settings/SaveTseForwardFeeSetting",
    saveTseFuturesFeeSettingApi:"settings/SaveTseFuturesFeeSetting",
    saveIFBBondMBSFeeSettingApi:"settings/SaveIFBBondMBSFeeSetting",
    saveImeEquityFeeSettingApi:"settings/SaveImeEquityFeeSetting",
    saveImeBondFeeSettingApi:"settings/SaveImeBondFeeSetting",
    saveImeForwardFeeSettingApi:"settings/SaveImeForwardFeeSetting",
    saveImeFixedIncomeETFFeeSettingApi:"settings/SaveImeFixedIncomeETFFeeSetting",
    saveImeMixedIncomeETFFeeSettingApi:"settings/SaveImeMixedIncomeETFFeeSetting",
    saveImeEquityETFFeeSettingApi:"settings/SaveImeEquityETFFeeSetting",
    saveIrenexEquityFeeSettingApi:"settings/SaveIrenexEquityFeeSetting",
    saveIrenexBondFeeSettingApi:"settings/SaveIrenexBondFeeSetting",
    saveIrenexForwardFeeSettingApi:"settings/SaveIrenexForwardFeeSetting",
    saveImeGoldCoinFeeSettingApi:"settings/SaveImeGoldCoinFeeSetting",
    saveTseOptionBuyFeeSettingApi:"settings/SaveTseOptionBuyFeeSetting",
    saveImeGoldETFFeeSettingApi:"settings/SaveImeGoldETFFeeSetting",
    saveImeCertificateAgricultureProductFeeSettingApi:"settings/SaveImeCertificateAgricultureProductFeeSetting",
    saveTseMixedIncomeETFFeeSettingApi:"settings/SaveTseMixedIncomeETFFeeSetting"






};

const EditWageFinancialToolsService = {
    getEditWageFinancialToolsList: function (command, then) {
        Post(url.BasicInfoUrl + api.getEditWageFinancialToolsListApi, command, then);
    },
    getCurrentIFBBondFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentIFBBondFeeSettingApi, command, then);
    },
    getCurrentTseBondFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentTseBondFeeSettingApi, command, then);
    },
    getCurrentTseEquityFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentTseEquityFeeSettingApi, command, then);
    },
    getCurrentIFBFixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentIFBFixedIncomeETFFeeSettingApi, command, then);
    },
    getCurrentTseFixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentTseFixedIncomeETFFeeSettingApi, command, then);
    },
    getCurrentIFBMixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentIFBMixedIncomeETFFeeSettingApi, command, then);
    },
    getCurrentIFBEquityETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentIFBEquityETFFeeSettingApi, command, then);
    },
    getCurrentTseEquityETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentTseEquityETFFeeSettingApi, command, then);
    },
    getCurrentTseOptionSellFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentTseOptionSellFeeSettingApi, command, then);
    },
    getCurrentTseForwardFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentTseForwardFeeSettingApi, command, then);
    },
    getCurrentTseFuturesFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentTseFuturesFeeSettingApi, command, then);
    },
    getCurrentIFBBondMBSFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentIFBBondMBSFeeSettingApi, command, then);
    },
    getCurrentImeEquityFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentImeEquityFeeSettingApi, command, then);
    },
    getCurrentImeBondFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentImeBondFeeSettingApi, command, then);
    },
    getCurrentImeForwardFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentImeForwardFeeSettingApi, command, then);
    },
    getCurrentImeFixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentImeFixedIncomeETFFeeSettingApi, command, then);
    },
    getCurrentImeMixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentImeMixedIncomeETFFeeSettingApi, command, then);
    },
    getCurrentImeEquityETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentImeEquityETFFeeSettingApi, command, then);
    },
    getCurrentIrenexEquityFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentIrenexEquityFeeSettingApi, command, then);
    },
    getCurrentIrenexBondFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentIrenexBondFeeSettingApi, command, then);
    },
    getCurrentIrenexForwardFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentIrenexForwardFeeSettingApi, command, then);
    },
    getCurrentImeGoldCoinFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentImeGoldCoinFeeSettingApi, command, then);
    },
    getCurrentTseOptionBuyFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentTseOptionBuyFeeSettingApi, command, then);
    },
    getCurrentImeGoldETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentImeGoldETFFeeSettingApi, command, then);
    },
    getCurrentImeCertificateAgricultureProductFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentImeCertificateAgricultureProductFeeSettingApi, command, then);
    },

    getCurrentIFBEquityFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentIFBEquityFeeSettingApi, command, then);
    },
    getCurrentTseMixedIncomeETFFeeSetting:function (command, then) {
        Post(url.BasicInfoUrl + api.getCurrentTseMixedIncomeETFFeeSettingApi, command, then);
    },


    //save methods

    saveIFBBondFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveIFBBondFeeSettingApi, command, then);
    },
    saveTseBondFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveTseBondFeeSettingApi, command, then);
    },
    saveTseEquityFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveTseEquityFeeSettingApi, command, then);
    },
    saveIFBFixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveIFBFixedIncomeETFFeeSettingApi, command, then);
    },
    saveTseFixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveTseFixedIncomeETFFeeSettingApi, command, then);
    },
    saveIFBMixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveIFBMixedIncomeETFFeeSettingApi, command, then);
    },
    saveIFBEquityETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveIFBEquityETFFeeSettingApi, command, then);
    },
    saveTseEquityETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveTseEquityETFFeeSettingApi, command, then);
    },
    saveTseOptionSellFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveTseOptionSellFeeSettingApi, command, then);
    },
    saveTseForwardFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveTseForwardFeeSettingApi, command, then);
    },
    saveTseFuturesFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveTseFuturesFeeSettingApi, command, then);
    },
    saveIFBBondMBSFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveIFBBondMBSFeeSettingApi, command, then);
    },
    saveImeEquityFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveImeEquityFeeSettingApi, command, then);
    },
    saveImeBondFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveImeBondFeeSettingApi, command, then);
    },
    saveImeForwardFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveImeForwardFeeSettingApi, command, then);
    },
    saveImeFixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveImeFixedIncomeETFFeeSettingApi, command, then);
    },
    saveImeMixedIncomeETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveImeMixedIncomeETFFeeSettingApi, command, then);
    },
    saveImeEquityETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveImeEquityETFFeeSettingApi, command, then);
    },
    saveIrenexEquityFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveIrenexEquityFeeSettingApi, command, then);
    },
    saveIrenexBondFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveIrenexBondFeeSettingApi, command, then);
    },
    saveIrenexForwardFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveIrenexForwardFeeSettingApi, command, then);
    },
    saveImeGoldCoinFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveImeGoldCoinFeeSettingApi, command, then);
    },
    saveTseOptionBuyFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveTseOptionBuyFeeSettingApi, command, then);
    },
    saveImeGoldETFFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveImeGoldETFFeeSettingApi, command, then);
    },
    saveImeCertificateAgricultureProductFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveImeCertificateAgricultureProductFeeSettingApi, command, then);
    },

    saveIFBEquityFeeSetting: function (command, then) {
        Post(url.BasicInfoUrl + api.saveIFBEquityFeeSettingApi, command, then);
    },
    saveTseMixedIncomeETFFeeSetting:function (command, then) {
        Post(url.BasicInfoUrl + api.saveTseMixedIncomeETFFeeSettingApi, command, then);
    },



    
    
    
    
    
    


};
export default EditWageFinancialToolsService;