import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader';
import Grid from '@material-ui/core/Grid';
import Form from 'shared/components/form/form';
import Fieldset from 'shared/components/fieldset/fieldset';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import './tradeSettingEditWagefinancialtoolsComponent.css';
import TradeSettingEditWageFinancialtoolsService from './../services/tradeSettingEditWagefinancialtoolsService';

class TradeSettingEditWagefinancialtoolsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleValidDate = this.handleValidDate.bind(this);
        this.successGetEditWageById=this.successGetEditWageById.bind(this);
        this.preSubmit = this.preSubmit.bind(this);
    }


    componentDidMount() {
        this.getWageFinancialToolsById()

    }

    getWageFinancialToolsById(){

        if(this.props.location.state && this.props.location.state.id){
            var command = {
                entity: this.props.location.state.id
            }
            TradeSettingEditWageFinancialtoolsService.getEditWageFinancialToolsById(command,this.successGetEditWageById) 
        }
    }

    successGetEditWageById(response){
        if(response.success){
            var res = response.value;
            this.setState({
                MinBrokerBuyFee: res.MinBrokerBuyFee,
                MinBrokerSellFee: res.MinBrokerSellFee,
                BrokerBuyFee: res.BrokerBuyFee,
                MaxBrokerBuyFee: res.MaxBrokerBuyFee,
                BrokerBuyFeeDiscount: res.BrokerBuyFeeDiscount,
                BrokerSellFee: res.BrokerSellFee,
                MaxBrokerSellFee: res.MaxBrokerSellFee,
                BrokerSellFeeDiscount: res.BrokerSellFeeDiscount,
                RayanBourseBuyFee: res.RayanBourseBuyFee,
                MaxRayanBourseBuyFee: res.MaxRayanBourseBuyFee,
                RayanBourseBuyFeeDiscount: res.RayanBourseBuyFeeDiscount,
                RayanBourseSellFee: res.RayanBourseSellFee,
                MaxRayanBourseSellFee: res.MaxRayanBourseSellFee,
                RayanBourseSellFeeDiscount: res.RayanBourseSellFeeDiscount,
                RightToAccessBuyFee: res.RightToAccessBuyFee,
                MaxRightToAccessBuyFee: res.MaxRightToAccessBuyFee,
                RightToAccessBuyFeeDiscount: res.RightToAccessBuyFeeDiscount,
                RightToAccessSellFee: res.RightToAccessSellFee,
                MaxRightToAccessSellFee: res.MaxRightToAccessSellFee,
                RightToAccessSellFeeDiscount: res.RightToAccessSellFeeDiscount,
                SeoBuyFee: res.SeoBuyFee,
                MaxSeoBuyFee: res.MaxSeoBuyFee,
                SeoBuyFeeDiscount: res.SeoBuyFeeDiscount,
                SeoSellFee: res.SeoSellFee,
                MaxSeoSellFee: res.MaxSeoSellFee,
                SeoSellFeeDiscount: res.SeoSellFeeDiscount,
                CsdBuyFee: res.CsdBuyFee,
                MaxCsdBuyFee: res.MaxCsdBuyFee,
                CsdBuyFeeDiscount: res.CsdBuyFeeDiscount,
                CsdSellFee: res.CsdSellFee,
                MaxCsdSellFee: res.MaxCsdSellFee,
                CsdSellFeeDiscount: res.CsdSellFeeDiscount,
                TseTmcBuyFee: res.TseTmcBuyFee,
                MaxTseTmcBuyFee: res.MaxTseTmcBuyFee,
                TseTmcBuyDiscount: res.TseTmcBuyDiscount,
                TseTmcSellFee: res.TseTmcSellFee,
                MaxTseTmcSellFee: res.MaxTseTmcSellFee,
                TseTmcSellDiscount: res.TseTmcSellDiscount,
                TseBuyFee: res.TseBuyFee,
                MaxTseBuyFee: res.MaxTseBuyFee,
                TseBuyFeeDiscount: res.TseBuyFeeDiscount,
                TseSellFee: res.TseSellFee,
                MaxTseSellFee: res.MaxTseSellFee,
                TseSellFeeDiscount: res.TseSellFeeDiscount,
                SellTax: res.SellTax,
                TotalBuyFee: res.TotalBuyFee,
                TotalSellFee: res.TotalSellFee,
                SumTotalBuyFee: res.SumTotalBuyFee,
                SumTotalSellFee: res.SumTotalSellFee,
                //TODO ASK
                Guid: "d2a5c55f-20f9-402e-8932-0cf8f474ccc1",

                ValidFrom: res.ValidFrom,
                ValidFromJalali: res.ValidFromJalali
            });
        }
    }


    preSubmit() {
        return {
            entity: {
                MinBrokerBuyFee: this.state.MinBrokerBuyFee,
                MinBrokerSellFee: this.state.MinBrokerSellFee,
                BrokerBuyFee: this.state.BrokerBuyFee,
                MaxBrokerBuyFee: this.state.MaxBrokerBuyFee,
                BrokerBuyFeeDiscount: this.state.BrokerBuyFeeDiscount,
                BrokerSellFee: this.state.BrokerSellFee,
                MaxBrokerSellFee: this.state.MaxBrokerSellFee,
                BrokerSellFeeDiscount: this.state.BrokerSellFeeDiscount,
                RayanBourseBuyFee: this.state.RayanBourseBuyFee,
                MaxRayanBourseBuyFee: this.state.MaxRayanBourseBuyFee,
                RayanBourseBuyFeeDiscount: this.state.RayanBourseBuyFeeDiscount,
                RayanBourseSellFee: this.state.RayanBourseSellFee,
                MaxRayanBourseSellFee: this.state.MaxRayanBourseSellFee,
                RayanBourseSellFeeDiscount: this.state.RayanBourseSellFeeDiscount,
                RightToAccessBuyFee: this.state.RightToAccessBuyFee,
                MaxRightToAccessBuyFee: this.state.MaxRightToAccessBuyFee,
                RightToAccessBuyFeeDiscount: this.state.RightToAccessBuyFeeDiscount,
                RightToAccessSellFee: this.state.RightToAccessSellFee,
                MaxRightToAccessSellFee: this.state.MaxRightToAccessSellFee,
                RightToAccessSellFeeDiscount: this.state.RightToAccessSellFeeDiscount,
                SeoBuyFee: this.state.SeoBuyFee,
                MaxSeoBuyFee: this.state.MaxSeoBuyFee,
                SeoBuyFeeDiscount: this.state.SeoBuyFeeDiscount,
                SeoSellFee: this.state.SeoSellFee,
                MaxSeoSellFee: this.state.MaxSeoSellFee,
                SeoSellFeeDiscount: this.state.SeoSellFeeDiscount,
                CsdBuyFee: this.state.CsdBuyFee,
                MaxCsdBuyFee: this.state.MaxCsdBuyFee,
                CsdBuyFeeDiscount: this.state.CsdBuyFeeDiscount,
                CsdSellFee: this.state.CsdSellFee,
                MaxCsdSellFee: this.state.MaxCsdSellFee,
                CsdSellFeeDiscount: this.state.CsdSellFeeDiscount,
                TseTmcBuyFee: this.state.TseTmcBuyFee,
                MaxTseTmcBuyFee: this.state.MaxTseTmcBuyFee,
                TseTmcBuyDiscount: this.state.TseTmcBuyDiscount,
                TseTmcSellFee: this.state.TseTmcSellFee,
                MaxTseTmcSellFee: this.state.MaxTseTmcSellFee,
                TseTmcSellDiscount: this.state.TseTmcSellDiscount,
                TseBuyFee: this.state.TseBuyFee,
                MaxTseBuyFee: this.state.MaxTseBuyFee,
                TseBuyFeeDiscount: this.state.TseBuyFeeDiscount,
                TseSellFee: this.state.TseSellFee,
                MaxTseSellFee: this.state.MaxTseSellFee,
                TseSellFeeDiscount: this.state.TseSellFeeDiscount,
                SellTax: this.state.SellTax,
                TotalBuyFee: this.state.TotalBuyFee,
                TotalSellFee: this.state.TotalSellFee,
                SumTotalBuyFee: this.state.SumTotalBuyFee,
                SumTotalSellFee: this.state.SumTotalSellFee,
                ValidFrom: this.state.ValidFrom,
                ValidFromJalali: this.state.ValidFromJalali
            }
        }
    }


    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    handleValidDate(value) {
        this.setState({
            ValidFromDate: value
        })
    }



    render() {
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                
                <Form
                    {...this.props}
                    {...this.state}
                    service={TradeSettingEditWageFinancialtoolsService.saveEditWageFinancialTools}
                    SubmitTitle={'ذخیره '}
                    preSubmit={this.preSubmit}
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
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxBrokerBuyFee" label=" حداکثر کارمزد خرید"
                                    value={this.state.MaxBrokerBuyFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxBrokerBuyFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MinBrokerSellFee" label="   حداقل کارمزد فروش"
                                    value={this.state.MinBrokerSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MinBrokerSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxBrokerSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxBrokerSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxBrokerSellFee')}
                                    type="number"
                                    isDecimalSeparator
                                />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="BrokerBuyFeeDiscount" label="     درصد تخفیف کارمزد خرید"
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
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxRayanBourseSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxRayanBourseSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxRayanBourseSellFee')}
                                    type="number"
                                    isDecimalSeparator
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
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxRightToAccessSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxRightToAccessSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxRightToAccessSellFee')}
                                    type="number"
                                    isDecimalSeparator
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
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxSeoSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxSeoSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxSeoSellFee')}
                                    type="number"
                                    isDecimalSeparator
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
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxCsdSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxCsdSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxCsdSellFee')}
                                    type="number"
                                    isDecimalSeparator
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
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxTseTmcSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxTseTmcSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxTseTmcSellFee')}
                                    type="number"
                                    isDecimalSeparator
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
                                />
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="MaxTseSellFee" label="   حداکثر کارمزد فروش"
                                    value={this.state.MaxTseSellFee}
                                    handleChange={(value) => this.handleChange(value, 'MaxTseSellFee')}
                                    type="number"
                                    isDecimalSeparator
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
                                handleChange={(value) => this.handleChange(value, 'TotalBuyFee')}
                                type="number"
                                isDecimalSeparator
                            />
                        </Grid>
                        <Grid item md={2}>
                            <NumberFormatComponent id="TotalSellFee" label="        جمع کارمزد ارکان فروش"
                                value={this.state.TotalSellFee}
                                handleChange={(value) => this.handleChange(value, 'TotalSellFee')}
                                type="number"
                                isDecimalSeparator
                            />
                        </Grid>
                        <Grid item md={2}>
                            <NumberFormatComponent id="SumTotalBuyFee" label="           جمع کارمزد ارکان و کارگزاری خرید"
                                value={this.state.SumTotalBuyFee}
                                handleChange={(value) => this.handleChange(value, 'SumTotalBuyFee')}
                                type="number"
                                isDecimalSeparator
                            />
                        </Grid>

                        <Grid item md={2}>
                            <NumberFormatComponent id="SumTotalSellFee" label="           جمع کارمزد ارکان و کارگزاری فروش"
                                value={this.state.SumTotalSellFee}
                                handleChange={(value) => this.handleChange(value, 'SumTotalSellFee')}
                                type="number"
                                isDecimalSeparator
                            />
                        </Grid>


                        <Grid item md={2}>
                            <PersianDatePicker position='top'  label=" تاریخ اعتبار از" handleOnChange={this.handleValidDate} selectedDate={this.state.ValidFromJalali} required />
                        </Grid>
                        <Grid item md={2}>
                            <PersianDatePicker position='top' label=" تاریخ اعتبار تا" handleOnChange={this.handleValidDate} selectedDate={this.state.ValidToJalali} required />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        );
    }
}

export default TradeSettingEditWagefinancialtoolsComponent;