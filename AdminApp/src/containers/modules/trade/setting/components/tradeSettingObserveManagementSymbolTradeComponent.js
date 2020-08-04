import React, { Component } from 'react';
import Header from 'shared/components/stateHeader/stateHeader';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Paper from '@material-ui/core/Paper';
import Fieldset from 'shared/components/fieldset/fieldset';
import Grid from '@material-ui/core/Grid';
import './tradeSettingObserveManagementSymbolTradeComponent.css'
// import editManagementSymbolTradeService from './../services/editManagementSymbolTradeService';

class TradeSettingObserveManagementSymbolTradeComponent extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }


    componentDidMount() {
        this.getSymbolTradeManagementById();
    }

    //TO API IS NOT DEFINED

    getSymbolTradeManagementById() {
        let command = {
            entity: this.props.location.state.id
        }
        // editManagementSymbolTradeService.getsymbolTradeManagementById(command,this.successGetObserveSymbolTradeById); 
    }

    successGetObserveSymbolTradeById(response){
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
                <Paper className={"main-paper-container observe-management-symbol-trade"}>
                    <div id="detail" classPage={"height-detail"}>
                        <br></br>
                        <Fieldset legend={'  مشاهده مدیریت نماد های معاملاتی'} className="fieldsetBorder">
                            <Grid container spacing={16} className="px-3 py-2">
                                <Grid item md={1}>
                                    <h6>  عنوان نماد :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.symbol}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>   نام شرکت :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.title}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    نماد سپرده گذاری :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.csdSymbol}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    شناسه :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.isin}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    وضعیت :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.status}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    نوع ابزار مالی :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.accountingType}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    نوع نماد :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.productType}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    نوع ETF :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.etfType}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>    نوع بورس :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.stockExchangeId}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>     روز تسویه :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.settlementDay}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>      نام صنعت :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.sectorId}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>       معتبر از :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.validFrom}
                                    </div>
                                </Grid>
                                <Grid item md={1}>
                                    <h6>       معتبر تا :</h6>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="kadr">
                                        {this.state.validTo}
                                    </div>
                                </Grid>
                            </Grid>
                        </Fieldset>
                    </div>
                </Paper>
            </React.Fragment>
        );
    }
}

export default TradeSettingObserveManagementSymbolTradeComponent;