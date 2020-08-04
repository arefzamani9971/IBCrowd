


import React, { Component } from 'react';
import Header from 'shared/components/stateHeader/stateHeader';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fieldset from 'shared/components/fieldset/fieldset';
import './tradeSettingObserveWagefinancialtoolsComponent.css'
import TradeSettingEditWageFinancialtoolsService from './../services/tradeSettingEditWagefinancialtoolsService';

class TradeSettingObserveWagefinancialtoolsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }


    componentDidMount() {
        this.getWageFinancialToolsById();
    }

    //TO API IS NOT DEFINED

    getWageFinancialToolsById() {
        let command = {
            entity: this.props.location.state.id
        }
        TradeSettingEditWageFinancialtoolsService.getEditWageFinancialToolsById(command,this.successGetObserveWageById); 
    }

    successGetObserveWageById(response){
        console.log("response : " , response);
        
        if(response.result){
            this.setState({

            });
        }
    }






    render() {
   
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Paper className={"main-paper-container observe-wage-financial-tools"}>
                    <div id="detail" classPage={"height-detail"}>
                        <br></br>

                        <Fieldset legend={'کارمزد کارگزاری'} className="fieldsetBorder">
                            <Grid container spacing={16} className="px-3 py-1">
                                <Grid item md={1}>
                                    <h6>درصد کارمزد خرید</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.BrokerBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>درصد کارمزد فروش  </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.BrokerSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>حداقل کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MinBrokerBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>حداکثر کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxBrokerBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6> حداقل کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MinBrokerSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>  حداکثر کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxBrokerSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>   درصد تخفیف کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.BrokerBuyFeeDiscount}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    درصد تخفیف کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.BrokerSellFeeDiscount}
                                    </div>
                                </Grid>
                            </Grid>
                        </Fieldset>

                        <br></br>
                        <Fieldset legend={'کارمزد رایان بورس '} className="fieldsetBorder">
                            <Grid container spacing={16} className="px-3 py-1">
                                <Grid item md={1}>
                                    <h6>درصد کارمزد خرید</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.RayanBourseBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>درصد کارمزد فروش  </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.RayanBourseSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>حداکثر کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxRayanBourseBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>  حداکثر کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxRayanBourseSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>   درصد تخفیف کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.RayanBourseBuyFeeDiscount}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    درصد تخفیف کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.RayanBourseSellFeeDiscount}
                                    </div>
                                </Grid>
                            </Grid>
                        </Fieldset>

                        <br></br>
                        <Fieldset legend={'  کارمزد خدمات دسترسی  '} className="fieldsetBorder">
                            <Grid container spacing={16} className="px-3 py-1">
                                <Grid item md={1}>
                                    <h6>درصد کارمزد خرید</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.RightToAccessBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>درصد کارمزد فروش  </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.RightToAccessSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>حداکثر کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxRightToAccessBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>  حداکثر کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxRightToAccessSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>   درصد تخفیف کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.RightToAccessBuyFeeDiscount}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    درصد تخفیف کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.RayanBourseSellFeeDiscount}
                                    </div>
                                </Grid>
                            </Grid>
                        </Fieldset>
                        <br></br>
                        <Fieldset legend={'  کارمزد  سازمان بورس   '} className="fieldsetBorder">
                            <Grid container spacing={16} className="px-3 py-1">
                                <Grid item md={1}>
                                    <h6>درصد کارمزد خرید</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.SeoBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>درصد کارمزد فروش  </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.SeoSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>حداکثر کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxSeoBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>  حداکثر کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxSeoSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>   درصد تخفیف کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.SeoBuyFeeDiscount}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    درصد تخفیف کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.SeoSellFeeDiscount}
                                    </div>
                                </Grid>
                            </Grid>
                        </Fieldset>

                        <br></br>
                        <Fieldset legend={' کارمزد  شرکت سپرده گذاری    '} className="fieldsetBorder">
                            <Grid container spacing={16} className="px-3 py-1">
                                <Grid item md={1}>
                                    <h6>درصد کارمزد خرید</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.CsdBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>درصد کارمزد فروش  </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.CsdSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>حداکثر کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxCsdSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>  حداکثر کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxCsdSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>   درصد تخفیف کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.CsdBuyFeeDiscount}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    درصد تخفیف کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.CsdSellFeeDiscount}
                                    </div>
                                </Grid>
                            </Grid>
                        </Fieldset>

                        <br></br>
                        <Fieldset legend={'     کارمزد  شرکت مدیریت فناوری    '} className="fieldsetBorder">
                            <Grid container spacing={16} className="px-3 py-1">
                                <Grid item md={1}>
                                    <h6>درصد کارمزد خرید</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.TseTmcBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>درصد کارمزد فروش  </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.TseTmcSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>حداکثر کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxTseTmcBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>  حداکثر کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxTseTmcSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>   درصد تخفیف کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.TseTmcBuyDiscount}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    درصد تخفیف کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.TseTmcSellDiscount}
                                    </div>
                                </Grid>
                            </Grid>
                        </Fieldset>

                        <br></br>
                        <Fieldset legend={'     کارمزد  بورس  مربوطه     '} className="fieldsetBorder">
                            <Grid container spacing={16} className="px-3 py-1">
                                <Grid item md={1}>
                                    <h6>درصد کارمزد خرید</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.TseBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>درصد کارمزد فروش  </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.TseSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>حداکثر کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxTseBuyFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>  حداکثر کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.MaxTseSellFee}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>   درصد تخفیف کارمزد خرید </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.TseBuyFeeDiscount}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    درصد تخفیف کارمزد فروش </h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.TseSellFeeDiscount}
                                    </div>
                                </Grid>
                            </Grid>
                        </Fieldset>
                        <br></br>

                        <Grid container spacing={16} className="px-3 py-1">
                            <Grid item md={1}>
                                <h6>  درصد  مالیات فروش</h6>
                            </Grid>
                            <Grid item md={3}>
                                <div className="kadr">
                                    {this.state.SellTax}
                                </div>
                            </Grid>
                            <Grid item md={1}>
                                <h6>      جمع کارمزد ارکان خرید</h6>
                            </Grid>
                            <Grid item md={3}>
                                <div className="kadr">
                                    {this.state.TotalBuyFee}
                                </div>
                            </Grid>

                            <Grid item md={1}>
                                <h6>         جمع کارمزد ارکان فروش</h6>
                            </Grid>
                            <Grid item md={3}>
                                <div className="kadr">
                                    {this.state.TotalSellFee}
                                </div>
                            </Grid>
                            <Grid item md={1}>
                                <h6>             جمع کارمزد ارکان و کارگزاری خرید</h6>
                            </Grid>
                            <Grid item md={3}>
                                <div className="kadr">
                                    {this.state.SumTotalBuyFee}
                                </div>
                            </Grid>
                            <Grid item md={1}>
                                <h6>               جمع کارمزد ارکان و کارگزاری فروش</h6>
                            </Grid>
                            <Grid item md={3}>
                                <div className="kadr">
                                    {this.state.SumTotalSellFee}
                                </div>
                            </Grid>

                            <Grid item md={1}>
                                <h6>              تاریخ اعتبار از</h6>
                            </Grid>
                            <Grid item md={3}>
                                <div className="kadr">
                                    {this.state.ValidFromJalali}
                                </div>
                            </Grid>
                            <Grid item md={1}>
                                <h6>            تاریخ اعتبار تا</h6>
                            </Grid>
                            <Grid item md={3}>
                                <div className="kadr">
                                    {this.state.ValidToJalali}
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                </Paper>

            </React.Fragment>
        );
    }
}

export default TradeSettingObserveWagefinancialtoolsComponent;