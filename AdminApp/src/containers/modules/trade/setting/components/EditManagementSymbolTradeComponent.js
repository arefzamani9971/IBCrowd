import React, { Component } from 'react';
import Header from 'shared/components/stateHeader/stateHeader';
import Paper from '@material-ui/core/Paper';

import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constant/EditManagementSymbolTradeColumn'
import './EditManagementSymbolTradeComponent.css';
import Grid from '@material-ui/core/Grid';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import Input from 'shared/components/formInput/inputForm';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import EditManagementSymbolTradeService from '../services/EditManagementSymbolTradeService';
import { symbolHeaderTemplateForRepresentativeAutoComplete, symbolTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate'
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';

class EditManagementSymbolTrade extends Component {

    constructor(props) {
        super(props);
        this.state = {



            symbol: {
                name: "selectedSymbol",
                field: "fullTitle",
                placeholder: "جستجوی نماد براساس نام شرکت، نام نماد، نماد سپرده گذاری و شناسه",
                label: "مشخصات نماد",
                list: [],
                template: symbolTemplateForRepresentativeAutoComplete,
                headerTemplate:symbolHeaderTemplateForRepresentativeAutoComplete,
            },
            selectedSymbol: { fillTitle: '' },

            titleStatus: {
                name: "selectedTitle",
                field: "title",
                label: "نام شرکت",
                list: []
            },
            selectedTitleStatus: {},
            symbolStatus: {
                name: "selectedSymbol",
                field: "title",
                label: "نام نماد",
                list: []
            },
            selectedSymbolStatus: {},
            csdSymbolStatus: {
                name: "selectedSymbol",
                field: "title",
                label: " نماد سپرده گذاری",
                list: []
            },
            selectedCsdSymbolStatus: {},
            productType: {
                name: "productTypeSelected",
                field: "title",
                label: "نوع نماد",
                list: []
            },
            selectedProductType: {},
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

        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleChangeAutocomplete=this.handleChangeAutocomplete.bind(this);
    }
    componentDidMount() {
        GetEnum("ProductType", (response) => DropDownListDataProvider(this, "productType", response));
    }

    handleChange(value, name) {

        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    handleChangeCheck = (event, name) => {
        this.setState({
            [name]: event.target.checked
        })

    };

    handleChangeAutocomplete(item) {
        this.setState({
            selectedParty: item.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <Paper className={"main-paper-container management-symbol-exchange"}>
                    <GridServer
                        {... this.props}
                        {... this.state}
                        service={EditManagementSymbolTradeService.getSymbolTradeManagement}
                        Columns={Columns}
                        command={null}
                        sort={this.state.sort}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        reportFilter={
                            {
                                title: this.state.selectedTitleStatus.code,
                                symbol: this.state.selectedSymbolStatus.code,
                                csdSymbol: this.state.selectedCsdSymbolStatus.code,
                                isin: this.state.isin,
                                productType: this.state.selectedProductType.code

                            }
                        }
                        reRender={true}>

                        <div classPage={"height-search"}>


                            <Grid container spacing={8} className="no-margin">


                            {/* <Grid item md={12}>
                                    <AutoCompleteComponent {...this.state.symbol}
                                           handleChange={(value) => this.handleChangeAutocomplete(value, 'selectedSymbol')}
                                        value={this.state.selectedSymbol.fullTitle}
                                        service={EditManagementSymbolTradeService.getAllSymbolBySearch} />
                                </Grid> */}
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <ComboBoxComponent

                                            {...this.state.titleStatus}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedSymbolStatus}


                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <ComboBoxComponent

                                            {...this.state.symbolStatus}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedTitleStatus}


                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <ComboBoxComponent

                                            {...this.state.csdSymbolStatus}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedCsdSymbolStatus}


                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <Input label="شناسه " handleChange={(e) => this.handleChange(e, 'isin')} value={this.state.isin} />
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
                                    <NumberFormatComponent id="lot" label=" آستانه حجم"
                                        value={this.state.lot}
                                        handleChange={(value) => this.handleChange(value, 'lot')}
                                        type="number"
                                        
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




                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>
        );
    }
}

export default EditManagementSymbolTrade;

