import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetChequeBookColumn';
import Grid from '@material-ui/core/Grid';
import './GetChequeBookComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetChequeBookServices from "../services/GetChequeBookServices";


class GetChequeBookComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            


            chequeBookTitle: {
                name: "chequeBookTitleSelected",
                placeholder: 'عنوان دسته چک',
                dataTextField: 'title',
                dataValueField: 'title',
                fieldSearch: 'phrase',
                template: null,
                headerTemplate: null,
                label: "عنوان دسته چک"
            },
            chequeBookTitleSelected: [],
            bankDeposit: {
                name: "bankDepositSelected",
                placeholder: 'شماره حساب بانک',
                dataTextField: 'fullAccountNumber',
                dataValueField: 'id',
                fieldSearch: 'phrase',
                template: null,
                headerTemplate: null,
                label: "شماره حساب بانک"
            },
            bankDepositSelected: [],
            chequeType: {
                name: "selectedChequeType",
                field: "title",
                label: "نوع چک",
                list: []
            },
            selectedChequeType: { code: 0, title: '' },
            filter: {
                logic: "and",
                filters: []
            }

        };
    }
    componentDidMount() {
        GetEnum('chequetype', response => DropDownListDataProvider(this, "chequeType", response));
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }

    excelReportHandler = () => {
        var command = {
            reportFilter: {

                id: null,
                title: this.state.chequeBookTitleSelected,
                bankDepositId: this.state.bankDepositSelected,
                chequeType: this.state.selectedChequeType.code

            },
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        };
        GetChequeBookServices.getExcelExport(command, 'دسته چک');

    }
    pdfReportHandler = () => {
        var command = {
            reportFilter: {

                id: null,
                title: this.state.chequeBookTitleSelected,
                bankDepositId: this.state.bankDepositSelected,
                chequeType: this.state.selectedChequeType.code

            },
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        };
        GetChequeBookServices.getPdfExport(command, 'دسته چک');
    }




    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container chequeBook"}>
                    <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "created",
                                dir: "desc"
                            }
                        ]}
                        reloadColumnAfterGet
                        service={GetChequeBookServices.getAllCashFlowChequeMasterByFilterMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                id: null,
                                title: this.state.chequeBookTitleSelected,
                                bankDepositId: this.state.bankDepositSelected,
                                chequeType: this.state.selectedChequeType.code
                            }
                        }
                        callServiceAgain
                        reRender
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        hasToolbar={{ haveExcelPfdReport: { excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler } }}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={6}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.chequeBookTitle}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        service={GetChequeBookServices.searchcashflowchequemasterMethod}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.bankDeposit}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        service={GetChequeBookServices.searchBankDepositMethod}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            isFilterable
                                            hasAll
                                            {...this.state.chequeType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedChequeType}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetChequeBookComponent;
