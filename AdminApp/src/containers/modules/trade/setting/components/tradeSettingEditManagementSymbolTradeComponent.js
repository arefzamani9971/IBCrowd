import React, { Component } from 'react';
import Header from 'shared/components/stateHeader/stateHeader';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Form from 'shared/components/form/form';
import Fieldset from 'shared/components/fieldset/fieldset';
// import editManagementSymbolTradeService from './../services/editManagementSymbolTradeService';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import './tradeSettingEditManagementSymbolTradeComponent.css'
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import Paper from '@material-ui/core/Paper';


class TradeSettingEditManagementSymbolTradeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {


            accountingType: { id: 0 },
            productType: { id: 0 },


            accountingTypeList: {
                name: "accountingType",
                field: "fullTitle",
                label: " نوع ابزار مالی",
                list: []
            },
            productType: {
                name: "productTypeSelected",
                field: "title",
                label: "نوع نماد",
                list: []
            },
            etfType: {
                name: "etfTypeSelected",
                field: "title",
                label: "نوع ETF",
                list: []
            },
            stockExchangeType: {
                name: "stockExchangeTypeSelected",
                field: "title",
                label: "نوع بورس ",
                list: []
            },
            settlementDayType: {
                name: "settlementDayTypeSelected",
                field: "title",
                label: " روز تسویه ",
                list: []
            },
            sectorType: {
                name: "sectorTypeSelected",
                field: "title",
                label: " نام صنعت  ",
                list: []
            },



        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

    }
    componentDidMount() {

        GetEnum("ProductType", (response) => DropDownListDataProvider(this, "productType", response));
        GetEnum("ETFType", (response) => DropDownListDataProvider(this, "etfType", response));
        GetEnum("SettlementDaysEnum", (response) => DropDownListDataProvider(this, "settlementDayType", response));



    }


    handleChange(item, name) {
        this.setState({
            [name]: item.value
        })
    }
    handleChangeCheck = (event, name) => {
        this.setState({
            [name]: event.target.checked
        })

    };

    accountingTypeHandleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item,
            accountingType: item
        });
    }
    productTypeHandleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item,
            accountingType: item
        });
    }
    handleChangeDate(value, name) {
        this.setState(
            {
                [name]: value
            },
            function () { }
        );
    }
    render() {
        console.log("this.state.productType : ", this.state.productType);

        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <br></br>

                <Paper className={"edit-management-symbol-trade main-paper-container"}>
                <Form
                    {...this.props}
                    {...this.state}
                    // service={editManagementSymbolTradeService.saveEditsymbolTradeManagement}
                    SubmitTitle={'ذخیره '}
                    className="form-height"
                >
                <br></br>

                    <Fieldset legend={' اطلاعات نماد'} className="fieldsetBorder">
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
                                <h6>    شناسه :</h6>
                            </Grid>
                            <Grid item md={3}>
                                <div className="kadr">
                                    {this.state.isin}
                                </div>
                            </Grid>
                        </Grid>
                    </Fieldset>






                    <br></br>
                    <Fieldset legend={'ویرایش نماد های معاملاتی'} className="fieldsetBorder py-2">
                        <Grid container spacing={16} className="px-2">

                            <Grid item md={2}>
                                <Input label=" نماد سپرده گذاری" handleChange={(e) => this.handleChange(e, 'symbol')} value={this.state.symbol}  />
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <ComboBoxComponent isFilterable {...this.state.accountingTypeList}
                                        handleChange={(value, name) => this.accountingTypeHandleChange(value, name)}
                                        value={this.state.accountingType} />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <ComboBoxComponent
                                        isFilterable={true}
                                        {...this.state.productType}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.productTypeSelected}

                                    />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <ComboBoxComponent
                                        isFilterable={true}
                                        {...this.state.etfType}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.etfTypeSelected}

                                    />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <ComboBoxComponent
                                        isFilterable={true}
                                        {...this.state.stockExchangeType}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.stockExchangeTypeSelected}

                                    />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <ComboBoxComponent
                                        isFilterable={true}
                                        {...this.state.settlementDayType}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.settlementDayTypeSelected}

                                    />
                                </div>
                            </Grid>
                            <Grid item md={4}>
                                <div className="k-rtl">
                                    <ComboBoxComponent
                                        isFilterable={true}
                                        {...this.state.sectorType}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.sectorTypeSelected}

                                    />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <PersianDatePicker
                                    disabled
                                    selectedDate={this.state.fromDate}
                                    label="از تاریخ "
                                    handleOnChange={e => this.handleChangeDate(e, "fromDate")}
                                />
                            </Grid>
                            <Grid item md={2}>
                                <PersianDatePicker
                                    selectedDate={this.state.toDate}
                                    label="تا تاریخ"
                                    handleOnChange={e => this.handleChangeDate(e, "toDate")}
                                />
                            </Grid>
                            <Grid item md={2}>
                                <FormControlLabel className="chackbox-position"
                                    control={
                                        <Checkbox
                                            checked={this.state.status}
                                            onChange={(e) => this.handleChangeCheck(e, 'status', true)}
                                            value="status"
                                            color="primary"
                                        />
                                    }
                                    label="   وضعیت"
                                />
                            </Grid>


                        </Grid>
                    </Fieldset>
                </Form>

                </Paper>

          



            </React.Fragment>
        );
    }
}

export default TradeSettingEditManagementSymbolTradeComponent;