import React, { Component } from 'react';
import kendo from '@progress/kendo-ui';
import Paper from '@material-ui/core/Paper';
import Header from 'shared/components/stateHeader/stateHeader';
import Columns from '../constant/EditWageFinancialToolsColumn';
import './EditWageFinancialToolsComponent.css';
import EditWageFinancialToolsService from '../services/EditWageFinancialToolsService';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import Grid from '@material-ui/core/Grid';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Modal from "@material-ui/core/Modal";
import toastr from 'toastr';
import Form from 'shared/components/form/form';
import Fieldset from 'shared/components/fieldset/fieldset';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import FaIcon from "shared/components/Icon/Icon";
import Button from "@material-ui/core/Button";


const serviceTypeName = {
    3: {
        get: "getCurrentIFBBondFeeSetting",
        save: "saveIFBBondFeeSetting"
    },
    4: {
        get: "getCurrentIFBEquityFeeSetting",
        save: "saveIFBEquityFeeSetting"
    },
    5: {
        get: "getCurrentTseBondFeeSetting",
        save: "saveTseBondFeeSetting"
    },
    6: {
        get: "getCurrentTseEquityFeeSetting",
        save: "saveTseEquityFeeSetting"
    },
    7: {
        get: "getCurrentIFBFixedIncomeETFFeeSetting",
        save: "saveIFBFixedIncomeETFFeeSetting"
    },
    8: {
        get: "getCurrentTseFixedIncomeETFFeeSetting",
        save: "saveTseFixedIncomeETFFeeSetting"
    },
    9: {
        get: "getCurrentIFBMixedIncomeETFFeeSetting",
        save: "saveIFBMixedIncomeETFFeeSetting"
    },
    10: {
        get: "getCurrentTseMixedIncomeETFFeeSetting",
        save: "saveTseMixedIncomeETFFeeSetting"
    },
    11: {
        get: "getCurrentIFBEquityETFFeeSetting",
        save: "saveIFBEquityETFFeeSetting"
    },
    12: {
        get: "getCurrentTseEquityETFFeeSetting",
        save: "saveTseEquityETFFeeSetting"
    },
    
    13: {
        get: "getCurrentTseOptionSellFeeSetting",
        save: "saveTseOptionSellFeeSetting"
    },
    14: {
        get: "getCurrentTseForwardFeeSetting",
        save: "saveTseForwardFeeSetting"
    },
    15: {
        get: "getCurrentTseFuturesFeeSetting",
        save: "saveTseFuturesFeeSetting"
    },
    16: {
        get: "getCurrentIFBBondMBSFeeSetting",
        save: "saveIFBBondMBSFeeSetting"
    },
    17: {
        get: "getCurrentImeEquityFeeSetting",
        save: "saveImeEquityFeeSetting"
    },
    18: {
        get: "getCurrentImeBondFeeSetting",
        save: "saveImeBondFeeSetting"
    },
    19: {
        get: "getCurrentImeForwardFeeSetting",
        save: "saveImeForwardFeeSetting"
    },
    20: {
        get: "getCurrentImeFixedIncomeETFFeeSetting",
        save: "saveImeFixedIncomeETFFeeSetting"
    },
    21: {
        get: "getCurrentImeMixedIncomeETFFeeSetting",
        save: "saveImeMixedIncomeETFFeeSetting"
    },
    22: {
        get: "getCurrentImeEquityETFFeeSetting",
        save: "saveImeEquityETFFeeSetting"
    },
    23: {
        get: "getCurrentIrenexEquityFeeSetting",
        save: "saveIrenexEquityFeeSetting"
    },
    24: {
        get: "getCurrentIrenexBondFeeSetting",
        save: "saveIrenexBondFeeSetting"
    },
    25: {
        get: "getCurrentIrenexForwardFeeSetting",
        save: "saveIrenexForwardFeeSetting"
    },
    26: {
        get: "getCurrentImeGoldCoinFeeSetting",
        save: "saveImeGoldCoinFeeSetting"
    },
    28: {
        get: "getCurrentTseOptionBuyFeeSetting",
        save: "saveTseOptionBuyFeeSetting"
    },
    34: {
        get: "getCurrentImeGoldETFFeeSetting",
        save: "saveImeGoldETFFeeSetting"
    },
    50: {
        get: "getCurrentImeCertificateAgricultureProductFeeSetting",
        save: "saveImeCertificateAgricultureProductFeeSetting"
    },

}





class EditWageFinancialTools extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            settingTypeForProductTypeList: {
                name: "settingTypeSelected",
                field: "title",
                label: "نوع تنظیمات",
                list: []
            },

            res: {},
           
            code: 0,  
        };
        this.handleChange = this.handleChange.bind(this);
        this.successGetFinancialWageByCode = this.successGetFinancialWageByCode.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.cancelSendingInfo = this.cancelSendingInfo.bind(this);
        this.thenGetEnum = this.thenGetEnum.bind(this);
        this.sendFinancialWage = this.sendFinancialWage.bind(this);
    }
    thenGetEnum(response) {
        this.setState({
            settingTypeSelected: response.result[0],
            settingTypeForProductTypeList: {
                name: "settingTypeSelected",
                field: "title",
                label: "نوع تنظیمات",
                list: response.result
            },

        }, this.changeDropdownItem(response.result[0]));

    }
    componentDidMount() {

        GetEnum("settingtypeforproducttype", (response) => DropDownListDataProvider(this, "settingTypeForProductTypeList", response, this.thenGetEnum(response)))
    };
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        });
    }

    handleChangeDropdown(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        }, this.changeDropdownItem(item));

    }

    changeDropdownItem = (item) => {
        this.setState({
            code: item.code,
        }, () => {
            EditWageFinancialToolsService[serviceTypeName[this.state.code].get]({}, this.successGetFinancialWageByCode);

        })
    }
    handleChangeDate(item, name) {
        this.setState({
            [name]: item
        })
    }
    successGetFinancialWageByCode(response) {
        if (response.success) {
           let res = response.result.result;
            this.setState({
                res : res,
                BrokerBuyFee: res.brokerBuyFee,
                MaxBrokerBuyFee: res.maxBrokerBuyFee,
                BrokerBuyFeeDiscount: res.brokerBuyFeeDiscount,
                BrokerSellFee: res.brokerSellFee,
                MaxBrokerSellFee: res.maxBrokerSellFee,
                BrokerSellFeeDiscount: res.brokerSellFeeDiscount,
                MinBrokerSellFee: res.minBrokerSellFee,
                MinBrokerBuyFee: res.minBrokerBuyFee,
                RayanBourseBuyFee: res.rayanBourseBuyFee,
                MaxRayanBourseBuyFee: res.maxRayanBourseBuyFee,
                RayanBourseBuyFeeDiscount: res.rayanBourseBuyFeeDiscount,
                RayanBourseSellFee: res.rayanBourseSellFee,
                MaxRayanBourseSellFee: res.maxRayanBourseSellFee,
                RayanBourseSellFeeDiscount: res.rayanBourseSellFeeDiscount,
                RightToAccessBuyFee: res.rightToAccessBuyFee,
                MaxRightToAccessBuyFee: res.maxRightToAccessBuyFee,
                RightToAccessBuyFeeDiscount: res.rightToAccessBuyFeeDiscount,
                RightToAccessSellFee: res.rightToAccessSellFee,
                MaxRightToAccessSellFee: res.maxRightToAccessSellFee,
                RightToAccessSellFeeDiscount: res.rightToAccessSellFeeDiscount,
                SeoBuyFee: res.seoBuyFee,
                MaxSeoBuyFee: res.maxSeoBuyFee,
                SeoBuyFeeDiscount: res.seoBuyFeeDiscount,
                SeoSellFee: res.seoSellFee,
                MaxSeoSellFee: res.seoSellFee,
                SeoSellFeeDiscount: res.seoSellFeeDiscount,
                CsdBuyFee: res.csdBuyFee,
                MaxCsdBuyFee: res.maxCsdBuyFee,
                CsdBuyFeeDiscount: res.csdBuyFeeDiscount,
                CsdSellFee: res.csdSellFee,
                MaxCsdSellFee: res.maxCsdSellFee,
                CsdSellFeeDiscount: res.csdSellFeeDiscount,
                TseTmcBuyFee: res.tseTmcBuyFee,
                MaxTseTmcBuyFee: res.maxTseTmcBuyFee,
                TseTmcBuyDiscount: res.tseTmcBuyDiscount,
                TseTmcSellFee: res.tseTmcSellFee,
                MaxTseTmcSellFee: res.maxTseTmcSellFee,
                TseTmcSellDiscount: res.tseTmcSellDiscount,
                TseBuyFee: res.tseBuyFee,
                MaxTseBuyFee: res.maxTseBuyFee,
                TseBuyFeeDiscount: res.tseBuyFeeDiscount,
                TseSellFee: res.tseSellFee,
                MaxTseSellFee: res.maxTseSellFee,
                TseSellFeeDiscount: res.tseSellFeeDiscount,
                SellTax: res.sellTax,
                TotalBuyFee: res.totalBuyFee,
                TotalSellFee: res.totalSellFee,
                // SumTotalBuyFee: res.sumTotalBuyFee,
                // SumTotalSellFee: res.sumTotalSellFee,
                validFrom: res.validFrom,
                toDate: response.result.toDateJalali === "" ? null : response.result.toDate

            },()=>{
                this.formDesign = this.createFormDesign();   
            })
            this.setState({
                reRender:true
            })
        }
    }
    cancelSendingInfo() {
        this.setState({
            BrokerBuyFee: this.state.res.brokerBuyFee,
            MaxBrokerBuyFee: this.state.res.maxBrokerBuyFee,
            BrokerBuyFeeDiscount: this.state.res.brokerBuyFeeDiscount,
            BrokerSellFee: this.state.res.brokerSellFee,
            MaxBrokerSellFee: this.state.res.maxBrokerSellFee,
            BrokerSellFeeDiscount: this.state.res.brokerSellFeeDiscount,
            MinBrokerSellFee: this.state.res.minBrokerSellFee,
            MinBrokerBuyFee: this.state.res.minBrokerBuyFee,
            RayanBourseBuyFee: this.state.res.rayanBourseBuyFee,
            MaxRayanBourseBuyFee: this.state.res.maxRayanBourseBuyFee,
            RayanBourseBuyFeeDiscount: this.state.res.rayanBourseBuyFeeDiscount,
            RayanBourseSellFee: this.state.res.rayanBourseSellFee,
            MaxRayanBourseSellFee: this.state.res.maxRayanBourseSellFee,
            RayanBourseSellFeeDiscount: this.state.res.rayanBourseSellFeeDiscount,
            RightToAccessBuyFee: this.state.res.rightToAccessBuyFee,
            MaxRightToAccessBuyFee: this.state.res.maxRightToAccessBuyFee,
            RightToAccessBuyFeeDiscount: this.state.res.rightToAccessBuyFeeDiscount,
            RightToAccessSellFee: this.state.res.rightToAccessSellFee,
            MaxRightToAccessSellFee: this.state.res.maxRightToAccessSellFee,
            RightToAccessSellFeeDiscount: this.state.res.rightToAccessSellFeeDiscount,
            SeoBuyFee: this.state.res.seoBuyFee,
            MaxSeoBuyFee: this.state.res.maxSeoBuyFee,
            SeoBuyFeeDiscount: this.state.res.seoBuyFeeDiscount,
            SeoSellFee: this.state.res.seoSellFee,
            MaxSeoSellFee: this.state.res.seoSellFee,
            SeoSellFeeDiscount: this.state.res.seoSellFeeDiscount,
            CsdBuyFee: this.state.res.csdBuyFee,
            MaxCsdBuyFee: this.state.res.maxCsdBuyFee,
            CsdBuyFeeDiscount: this.state.res.csdBuyFeeDiscount,
            CsdSellFee: this.state.res.csdSellFee,
            MaxCsdSellFee: this.state.res.maxCsdSellFee,
            CsdSellFeeDiscount: this.state.res.csdSellFeeDiscount,
            TseTmcBuyFee: this.state.res.tseTmcBuyFee,
            MaxTseTmcBuyFee: this.state.res.maxTseTmcBuyFee,
            TseTmcBuyDiscount: this.state.res.tseTmcBuyDiscount,
            TseTmcSellFee: this.state.res.tseTmcSellFee,
            MaxTseTmcSellFee: this.state.res.maxTseTmcSellFee,
            TseTmcSellDiscount: this.state.res.tseTmcSellDiscount,
            TseBuyFee: this.state.res.tseBuyFee,
            MaxTseBuyFee: this.state.res.maxTseBuyFee,
            TseBuyFeeDiscount: this.state.res.tseBuyFeeDiscount,
            TseSellFee: this.state.res.tseSellFee,
            MaxTseSellFee: this.state.res.maxTseSellFee,
            TseSellFeeDiscount: this.state.res.tseSellFeeDiscount,
            SellTax: this.state.res.sellTax,
            TotalBuyFee: this.state.res.totalBuyFee,
            TotalSellFee: this.state.res.totalSellFee,
            // SumTotalBuyFee: this.state.res.sumTotalBuyFee,
            // SumTotalSellFee: this.state.res.sumTotalSellFee,
            validFrom: this.state.res.validFrom,
        })
    }
    makeNumberFromString(value) {
        return parseFloat((value).toString().replace(/,/g, ''));
    }
    sendFinancialWage() {
        let command = {
            entity: {
                MinBrokerBuyFee: this.state.MinBrokerBuyFee === '' ? 0 : this.makeNumberFromString(this.state.MinBrokerBuyFee),
                MinBrokerSellFee: this.state.MinBrokerSellFee === '' ? 0 : this.makeNumberFromString(this.state.MinBrokerSellFee),
                BrokerBuyFee: this.state.BrokerBuyFee === '' ? 0 : this.makeNumberFromString(this.state.BrokerBuyFee),
                MaxBrokerBuyFee: this.state.MaxBrokerBuyFee === '' ? 0 : this.makeNumberFromString(this.state.MaxBrokerBuyFee),
                BrokerBuyFeeDiscount: this.state.BrokerBuyFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.BrokerBuyFeeDiscount),
                BrokerSellFee: this.state.BrokerSellFee === '' ? 0 : this.makeNumberFromString(this.state.BrokerSellFee),
                MaxBrokerSellFee: this.state.MaxBrokerSellFee === '' ? 0 : this.makeNumberFromString(this.state.MaxBrokerSellFee),
                BrokerSellFeeDiscount: this.state.BrokerSellFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.BrokerSellFeeDiscount),
                RayanBourseBuyFee: this.state.RayanBourseBuyFee === '' ? 0 : this.makeNumberFromString(this.state.RayanBourseBuyFee),
                MaxRayanBourseBuyFee: this.state.MaxRayanBourseBuyFee === '' ? 0 : this.makeNumberFromString(this.state.MaxRayanBourseBuyFee),
                RayanBourseBuyFeeDiscount: this.state.RayanBourseBuyFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.RayanBourseBuyFeeDiscount),
                RayanBourseSellFee: this.state.RayanBourseSellFee === '' ? 0 : this.makeNumberFromString(this.state.RayanBourseSellFee),
                MaxRayanBourseSellFee: this.state.MaxRayanBourseSellFee === '' ? 0 : this.makeNumberFromString(this.state.MaxRayanBourseSellFee),
                RayanBourseSellFeeDiscount: this.state.RayanBourseSellFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.RayanBourseSellFeeDiscount),
                RightToAccessBuyFee: this.state.RightToAccessBuyFee === '' ? 0 : this.makeNumberFromString(this.state.RightToAccessBuyFee),
                MaxRightToAccessBuyFee: this.state.MaxRightToAccessBuyFee === '' ? 0 : this.makeNumberFromString(this.state.MaxRightToAccessBuyFee),
                RightToAccessBuyFeeDiscount: this.state.RightToAccessBuyFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.RightToAccessBuyFeeDiscount),
                RightToAccessSellFee: this.state.RightToAccessSellFee === '' ? 0 : this.makeNumberFromString(this.state.RightToAccessSellFee),
                MaxRightToAccessSellFee: this.state.MaxRightToAccessSellFee === '' ? 0 : this.makeNumberFromString(this.state.MaxRightToAccessSellFee),
                RightToAccessSellFeeDiscount: this.state.RightToAccessSellFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.RightToAccessSellFeeDiscount),
                SeoBuyFee: this.state.SeoBuyFee === '' ? 0 : this.makeNumberFromString(this.state.SeoBuyFee),
                MaxSeoBuyFee: this.state.MaxSeoBuyFee === '' ? 0 : this.makeNumberFromString(this.state.MaxSeoBuyFee),
                SeoBuyFeeDiscount: this.state.SeoBuyFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.SeoBuyFeeDiscount),
                SeoSellFee: this.state.SeoSellFee === '' ? 0 : this.makeNumberFromString(this.state.SeoSellFee),
                MaxSeoSellFee: this.state.MaxSeoSellFee === '' ? 0 : this.makeNumberFromString(this.state.MaxSeoSellFee),
                SeoSellFeeDiscount: this.state.SeoSellFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.SeoSellFeeDiscount),
                CsdBuyFee: this.state.CsdBuyFee === '' ? 0 : this.makeNumberFromString(this.state.CsdBuyFee),
                MaxCsdBuyFee: this.state.MaxCsdBuyFee === '' ? 0 : this.makeNumberFromString(this.state.MaxCsdBuyFee),
                CsdBuyFeeDiscount: this.state.CsdBuyFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.CsdBuyFeeDiscount),
                CsdSellFee: this.state.CsdSellFee === '' ? 0 : this.makeNumberFromString(this.state.CsdSellFee),
                MaxCsdSellFee: this.state.MaxCsdSellFee === '' ? 0 : this.makeNumberFromString(this.state.MaxCsdSellFee),
                CsdSellFeeDiscount: this.state.CsdSellFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.CsdSellFeeDiscount),
                TseTmcBuyFee: this.state.TseTmcBuyFee === '' ? 0 : this.makeNumberFromString(this.state.TseTmcBuyFee),
                MaxTseTmcBuyFee: this.state.MaxTseTmcBuyFee === '' ? 0 : this.makeNumberFromString(this.state.MaxTseTmcBuyFee),
                TseTmcBuyDiscount: this.state.TseTmcBuyDiscount === '' ? 0 : this.makeNumberFromString(this.state.TseTmcBuyDiscount),
                TseTmcSellFee: this.state.TseTmcSellFee === '' ? 0 : this.makeNumberFromString(this.state.TseTmcSellFee),
                MaxTseTmcSellFee: this.state.MaxTseTmcSellFee === '' ? 0 : this.makeNumberFromString(this.state.MaxTseTmcSellFee),
                TseTmcSellDiscount: this.state.TseTmcSellDiscount === '' ? 0 : this.makeNumberFromString(this.state.TseTmcSellDiscount),
                TseBuyFee: this.state.TseBuyFee === '' ? 0 : this.makeNumberFromString(this.state.TseBuyFee),
                MaxTseBuyFee: this.state.MaxTseBuyFee === '' ? 0 : this.makeNumberFromString(this.state.MaxTseBuyFee),
                TseBuyFeeDiscount: this.state.TseBuyFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.TseBuyFeeDiscount),
                TseSellFee: this.state.TseSellFee === '' ? 0 : this.makeNumberFromString(this.state.TseSellFee),
                MaxTseSellFee: this.state.MaxTseSellFee === '' ? 0 : this.makeNumberFromString(this.state.MaxTseSellFee),
                TseSellFeeDiscount: this.state.TseSellFeeDiscount === '' ? 0 : this.makeNumberFromString(this.state.TseSellFeeDiscount),
                SellTax: this.state.SellTax === '' ? 0 : this.makeNumberFromString(this.state.SellTax),
                TotalBuyFee: this.state.TotalBuyFee === '' ? 0 : this.makeNumberFromString(this.state.TotalBuyFee),
                TotalSellFee: this.state.TotalSellFee === '' ? 0 : this.makeNumberFromString(this.state.TotalSellFee),
                // SumTotalBuyFee: this.state.SumTotalBuyFee === '' ? 0 : this.makeNumberFromString(this.state.SumTotalBuyFee),
                // SumTotalSellFee: this.state.SumTotalSellFee === '' ? 0 : this.makeNumberFromString(this.state.SumTotalSellFee),
                toDate: this.state.toDate

            }

        }
        EditWageFinancialToolsService[serviceTypeName[this.state.code].save](command, function (response) {

            if (response.success) {
                toastr.success(response.message)
            }
        })
    }

    createFormDesign(){
        return (
            <React.Fragment>
                <Form
                    {...this.props}
                    {...this.state}
                    hideCancel={true}
                    hideSubmit={true}
                    dontShowPrimaryButton={true}
                    SubmitTitle={'ذخیره '}
                    otherAction={[

                        {
                            color: "#2196f3",
                            fontColor: "white",
                            title: 'ذخیره',
                            action: {
                                isSubmit: false,
                                method: this.sendFinancialWage
                            }
                        },
                        {
                            color: "#e0e0e0",
                            fontColor: "black",
                            title: 'انصراف',
                            action: {
                                isSubmit: false,
                                method: this.cancelSendingInfo
                            }
                        }
                    ]

                    }
                    className="form-height">
                    <br></br>
                    <Fieldset legend={'کارمزد کارگزاری'} className="fieldsetBorder">
                        <Grid container spacing={16} className="px-2">

                            <Grid item md={2}>
                                <NumberFormatComponent id="BrokerBuyFee" label="درصد کارمزد خرید"
                                    value={this.state.BrokerBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'BrokerBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="BrokerSellFee" label="  درصد کارمزد فروش"
                                    value={this.state.BrokerSellFee}
                                    handleChange={(value) => this.handleChange(value, 'BrokerSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="MinBrokerBuyFee" label=" حداقل کارمزد خرید"
                                    value={this.state.MinBrokerBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'MinBrokerBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxBrokerBuyFee" label=" حداکثر کارمزد خرید"
                                    value={this.state.MaxBrokerBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxBrokerBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MinBrokerSellFee" label="حداقل کارمزد فروش"
                                    value={this.state.MinBrokerSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MinBrokerSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxBrokerSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxBrokerSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxBrokerSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="BrokerBuyFeeDiscount" label="درصد تخفیف کارمزد خرید"
                                    value={this.state.BrokerBuyFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'BrokerBuyFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="BrokerSellFeeDiscount" label="     درصد تخفیف کارمزد فروش"
                                    value={this.state.BrokerSellFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'BrokerSellFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br>
                    </br>
                    <Fieldset legend={'کارمزد رایان بورس'} className="fieldsetBorder">
                        <Grid container spacing={16} className="px-2">

                            <Grid item md={2}>
                                <NumberFormatComponent id="RayanBourseBuyFee" label="درصد کارمزد خرید"
                                    value={this.state.RayanBourseBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'RayanBourseBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="RayanBourseSellFee" label="  درصد کارمزد فروش"
                                    value={this.state.RayanBourseSellFee}
                                    handleChange={(value) => this.handleChange(value, 'RayanBourseSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>


                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxRayanBourseBuyFee" label=" حداکثر کارمزد خرید"
                                    value={this.state.MaxRayanBourseBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxRayanBourseBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxRayanBourseSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxRayanBourseSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxRayanBourseSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="RayanBourseBuyFeeDiscount" label="     درصد تخفیف کارمزد خرید"
                                    value={this.state.RayanBourseBuyFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'RayanBourseBuyFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="RayanBourseSellFeeDiscount" label="     درصد تخفیف کارمزد فروش"
                                    value={this.state.RayanBourseSellFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'RayanBourseSellFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>
                        </Grid>
                    </Fieldset>

                    <br>
                    </br>
                    <Fieldset legend={'کارمزد خدمات دسترسی  '} className="fieldsetBorder">
                        <Grid container spacing={16} className="px-2">

                            <Grid item md={2}>
                                <NumberFormatComponent id="RightToAccessBuyFee" label="درصد کارمزد خرید"
                                    value={this.state.RightToAccessBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'RightToAccessBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="RightToAccessSellFee" label="  درصد کارمزد فروش"
                                    value={this.state.RightToAccessSellFee}
                                    handleChange={(value) => this.handleChange(value, 'RightToAccessSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxRightToAccessBuyFee" label=" حداکثر کارمزد خرید"
                                    value={this.state.MaxRightToAccessBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxRightToAccessBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxRightToAccessSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxRightToAccessSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxRightToAccessSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="RightToAccessBuyFeeDiscount" label="     درصد تخفیف کارمزد خرید"
                                    value={this.state.RightToAccessBuyFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'RightToAccessBuyFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="RightToAccessSellFeeDiscount" label="     درصد تخفیف کارمزد فروش"
                                    value={this.state.RightToAccessSellFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'RightToAccessSellFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>
                        </Grid>
                    </Fieldset>



                    <br>
                    </br>
                    <Fieldset legend={'کارمزد  سازمان بورس  '} className="fieldsetBorder">
                        <Grid container spacing={16} className="px-2">

                            <Grid item md={2}>
                                <NumberFormatComponent id="SeoBuyFee" label="درصد کارمزد خرید"
                                    value={this.state.SeoBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'SeoBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="SeoSellFee" label="  درصد کارمزد فروش"
                                    value={this.state.SeoSellFee}
                                    handleChange={(value) => this.handleChange(value, 'SeoSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxSeoBuyFee" label=" حداکثر کارمزد خرید"
                                    value={this.state.MaxSeoBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxSeoBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxSeoSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxSeoSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxSeoSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="SeoBuyFeeDiscount" label="     درصد تخفیف کارمزد خرید"
                                    value={this.state.SeoBuyFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'SeoBuyFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="SeoSellFeeDiscount" label="     درصد تخفیف کارمزد فروش"
                                    value={this.state.SeoSellFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'SeoSellFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>
                        </Grid>
                    </Fieldset>

                    <br>
                    </br>
                    <Fieldset legend={'کارمزد  شرکت سپرده گذاری  '} className="fieldsetBorder">
                        <Grid container spacing={16} className="px-2">

                            <Grid item md={2}>
                                <NumberFormatComponent id="CsdBuyFee" label="درصد کارمزد خرید"
                                    value={this.state.CsdBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'CsdBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="CsdSellFee" label="  درصد کارمزد فروش"
                                    value={this.state.CsdSellFee}
                                    handleChange={(value) => this.handleChange(value, 'CsdSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxCsdBuyFee" label=" حداکثر کارمزد خرید"
                                    value={this.state.MaxCsdBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxCsdBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxCsdSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxCsdSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxCsdSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="CsdBuyFeeDiscount" label="     درصد تخفیف کارمزد خرید"
                                    value={this.state.CsdBuyFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'CsdBuyFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="CsdSellFeeDiscount" label=" درصد تخفیف کارمزد فروش"
                                    value={this.state.CsdSellFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'CsdSellFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br>
                    </br>
                    <Fieldset legend={'کارمزد  شرکت مدیریت فناوری  '} className="fieldsetBorder">
                        <Grid container spacing={16} className="px-2">

                            <Grid item md={2}>
                                <NumberFormatComponent id="TseTmcBuyFee" label="درصد کارمزد خرید"
                                    value={this.state.TseTmcBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'TseTmcBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="TseTmcSellFee" label="  درصد کارمزد فروش"
                                    value={this.state.TseTmcSellFee}
                                    handleChange={(value) => this.handleChange(value, 'TseTmcSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxTseTmcBuyFee" label=" حداکثر کارمزد خرید"
                                    value={this.state.MaxTseTmcBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxTseTmcBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxTseTmcSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxTseTmcSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxTseTmcSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="TseTmcBuyDiscount" label="     درصد تخفیف کارمزد خرید"
                                    value={this.state.TseTmcBuyDiscount}
                                    handleChange={(value) => this.handleChange(value, 'TseTmcBuyDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="TseTmcSellDiscount" label="     درصد تخفیف کارمزد فروش"
                                    value={this.state.TseTmcSellDiscount}
                                    handleChange={(value) => this.handleChange(value, 'TseTmcSellDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>
                        </Grid>
                    </Fieldset>


                    <br>
                    </br>
                    <Fieldset legend={'کارمزد  بورس  مربوطه  '} className="fieldsetBorder">
                        <Grid container spacing={16} className="px-2">

                            <Grid item md={2}>
                                <NumberFormatComponent id="TseBuyFee" label="درصد کارمزد خرید"
                                    value={this.state.TseBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'TseBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="TseSellFee" label="  درصد کارمزد فروش"
                                    value={this.state.TseSellFee}
                                    handleChange={(value) => this.handleChange(value, 'TseSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxTseBuyFee" label=" حداکثر کارمزد خرید"
                                    value={this.state.MaxTseBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxTseBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxTseSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxTseSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxTseSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                    isSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="TseBuyFeeDiscount" label="     درصد تخفیف کارمزد خرید"
                                    value={this.state.TseBuyFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'TseBuyFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="TseSellFeeDiscount" label="     درصد تخفیف کارمزد فروش"
                                    value={this.state.TseSellFeeDiscount}
                                    handleChange={(value) => this.handleChange(value, 'TseSellFeeDiscount')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>
                        </Grid>
                    </Fieldset>

                    <br>
                    </br>
                    <Grid container spacing={16} className="px-2">
                        <Grid item md={2}>
                            <NumberFormatComponent id="SellTax" label="     درصد  مالیات فروش"
                                value={this.state.SellTax}
                                handleChange={(value) => this.handleChange(value, 'SellTax')}
                                type="number"
                                isDecimalSeparator
                            />
                        </Grid>

                        <Grid item md={2}>
                            <NumberFormatComponent id="TotalBuyFee" label="        جمع کارمزد ارکان خرید"
                                value={this.state.TotalBuyFee}
                                disabled
                                handleChange={(value) => this.handleChange(value, 'TotalBuyFee')}
                                type="number"
                                isDecimalSeparator
                                isSeparator

                            />
                        </Grid>
                        <Grid item md={2}>
                            <NumberFormatComponent id="TotalSellFee" label="        جمع کارمزد ارکان فروش"
                                value={this.state.TotalSellFee}
                                disabled
                                handleChange={(value) => this.handleChange(value, 'TotalSellFee')}
                                type="number"
                                isDecimalSeparator
                                isSeparator

                            />
                        </Grid>
                        <Grid item md={2}>
                            <PersianDatePicker position='top' label=" تاریخ اعتبار از" selectedDate={this.state.validFrom} disabled />
                        </Grid>
                        <Grid item md={2}>
                            <PersianDatePicker position='top' label=" تاریخ اعتبار تا" handleOnChange={(e) => this.handleChangeDate(e, 'toDate')} selectedDate={this.state.toDate} />
                        </Grid>
                        {/* <Grid item md={3}>
                            <NumberFormatComponent id="SumTotalBuyFee" label="           جمع کارمزد ارکان و کارگزاری خرید"
                                value={this.state.SumTotalBuyFee}
                                handleChange={(value) => this.handleChange(value, 'SumTotalBuyFee')}
                                type="number"
                                isDecimalSeparator
                                isSeparator
                            />
                        </Grid>

                        <Grid item md={3}>
                            <NumberFormatComponent id="SumTotalSellFee" label="           جمع کارمزد ارکان و کارگزاری فروش"
                                value={this.state.SumTotalSellFee}
                                handleChange={(value) => this.handleChange(value, 'SumTotalSellFee')}
                                type="number"
                                isDecimalSeparator
                                isSeparator
                            />
                        </Grid> */}

                    </Grid>








                </Form>

            </React.Fragment >

        );
   
    }




    render() {
        return (
            <React.Fragment>
                <Paper className={"main-paper-container edit-wage-financial-tools"}>
                    <Grid item md={4} className="mr-4 mt-1">
                        <div className="k-rtl">
                            <DropDownComponent
                                isFilterable={true}
                                {...this.state.settingTypeForProductTypeList}
                                handleChange={(value, name) => this.handleChangeDropdown(value, name)}
                                value={this.state.settingTypeSelected}

                            />
                        </div>

                    </Grid>

                    <br></br>

                    {
                        this.formDesign
                    }


                </Paper>


            </React.Fragment>

        );
    }
}

export default EditWageFinancialTools;