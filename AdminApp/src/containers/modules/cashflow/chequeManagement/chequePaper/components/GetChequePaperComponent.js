import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetChequePaperColumn';
import Grid from '@material-ui/core/Grid';
import "./GetChequePaperComponent.css";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import Input from 'shared/components/formInput/inputForm';
import GetChequePaperServices from "../services/GetChequePaperServices";
import GetChequeBookServices from "../../chequeBook/services/GetChequeBookServices";

class GetChequePaperComponent extends React.Component {

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

            chequeStatus: {
                name: "selectedChequeStatus",
                field: "title",
                label: "وضعیت چک",
                list: []
            },
            selectedChequeStatus: {},


            chequeType: {
                name: "selectedChequeType",
                field: "title",
                label: "نوع چک",
                list: []
            },
            selectedChequeType: {},



            fromSerial: '',
            toSerial: ''
        };
    }

    removeMultiSelectHandles(event, name) {
        let list = this.state[name];

        for (let i = 0; i < this.state[name].length; i++) {
            if (event.id === this.state[name][i].id) {
                list.splice(i, 1);
            }
        }
        this.setState({
            [name]: list
        });
    }

    componentDidMount() {

        GetEnum("chequestate", (response) => { DropDownListDataProvider(this, "chequeStatus", response) });
        GetEnum('chequetype', response => DropDownListDataProvider(this, "chequeType", response));
    }
    handleChange(value, name) {

        let item = value.value;
        this.setState({
            [name]: item
        })
    }

    excelReportHandler = () => {
        // alert('excel')
        var command = {
            reportFilter: {

                title: this.state.chequeBookTitleSelected,
                chequeState: this.state.selectedChequeStatus.code,
                fromSerial: this.state.fromSerial,
                toSerial: this.state.toSerial,
                chequeType: this.state.selectedChequeType.code,

            },
            sort: [
                {
                    field: "id",
                    dir: "desc"
                }
            ]
        };
        GetChequePaperServices.getExcelExport(command, 'برگه چک');

    }
    pdfReportHandler = () => {
        // alert('pdf')
        var command = {
            reportFilter: {

                title: this.state.chequeBookTitleSelected,
                chequeState: this.state.selectedChequeStatus.code,
                fromSerial: this.state.fromSerial,
                toSerial: this.state.toSerial,
                chequeType: this.state.selectedChequeType.code,

            },
            sort: [
                {
                    field: "id",
                    dir: "desc"
                }
            ]
        };
        GetChequePaperServices.getPdfExport(command, 'برگه چک');
    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container chequePaper"}>
                    <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "id",
                                dir: "desc"
                            }
                        ]}
                        reloadColumnAfterGet={true}
                        service={GetChequePaperServices.getallcashflowchequedetailbyfilterMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                title: this.state.chequeBookTitleSelected,
                                chequeState: this.state.selectedChequeStatus.code,
                                fromSerial: this.state.fromSerial,
                                toSerial: this.state.toSerial,
                                chequeType: this.state.selectedChequeType.code,

                            }
                        }
                        callServiceAgain={true}
                        reRender
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        hasToolbar={
                            {
                                haveExcelPfdReport: {
                                    excelReportHandler: this.excelReportHandler,
                                    pdfReportHandler: this.pdfReportHandler,
                                },

                            }
                        }
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={8}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.chequeBookTitle}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        service={GetChequeBookServices.searchcashflowchequemasterMethod}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            {...this.state.chequeStatus}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.selectedChequeStatus}
                                            hasAll
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            {...this.state.chequeType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.selectedChequeType}
                                            hasAll
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <Input label="از سریال" handleChange={(e) => this.handleChange(e, 'fromSerial')} value={this.state.fromSerial} />
                                </Grid>
                                <Grid item md={2}>
                                    <Input label="تا سریال" handleChange={(e) => this.handleChange(e, 'toSerial')} value={this.state.toSerial} />
                                </Grid>
                            </Grid>

                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetChequePaperComponent;
