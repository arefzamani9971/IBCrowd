import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetIncompletePartyColumn';
import Grid from '@material-ui/core/Grid';
import './GetIncompletePartyListComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetIncompletePartyService from '../services/GetIncompletePartyService';
import moment from 'moment';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';

class GetIncompletePartyListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری",
                list: []
            },
            selectedParty: {},

            attachmentcategorytype: {
                name: "attachmentcategorytypeSelected",
                field: 'captionFA',
                list: [],
                label: "فیلد های ناقصی مشتری"
            },
            attachmentcategorytypeSelected: [],

            partyType: {
                name: "selectedPartyType",
                field: "title",
                label: "نوع مشتری",
                list: []
            },
            selectedPartyType: {},
            fromDate: moment(new Date()).add(-1, "months"),
            toDate: this.props.location.state && this.props.location.state.toDate ? this.props.location.state.toDate : moment(new Date()),

            // filter: {
            //     logic: "and",
            //     filters: []
            // }

        };

        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        // GetEnum('attachmentcategorytype', (res) => {
        // });
        this.getAttachmentCategory();
        GetEnum('partytype', response => DropDownListDataProvider(this, "partyType", response));
        // GetEnum('attachmentcategorytype', response => DropDownListDataProvider(this, "attachmentcategorytype", response));
    }

    getAttachmentCategory() {
        GetIncompletePartyService.getAttachmentCategory(null, (response) => {
            if (response.success) {
                this.setState({
                    attachmentcategorytype: {
                        name: "attachmentcategorytypeSelected",
                        field: 'captionFA',
                        list: response.result,
                        label: "فیلد های ناقصی مشتری"
                    }

                })
            }
        });
    };

    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };

    handleDate = (value, name) => {
        this.setState({
            [name]: value,
        });
    };

    excelReportHandler = () => {
        var command = {
            reportFilter: {
                partyAttachmentList: this.state.attachmentcategorytypeSelected.length > 0 ? this.state.attachmentcategorytypeSelected.map(s => { return s.codeId }) : [],
                partyType: this.state.selectedPartyType.code,
                fromLastModificationDate: this.state.fromDate,
                toLastModificationDate: this.state.toDate,
                partyId:this.state.selectedParty.id
            },
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        };
        GetIncompletePartyService.getExcelExport(command, 'مشتریان ناقص');
    };

    pdfReportHandler(){
        // alert('pdf')
        var command = {
            reportFilter: {

                partyAttachmentList: this.state.attachmentcategorytypeSelected.length > 0 ? this.state.attachmentcategorytypeSelected.map(s => { return s.codeId }) : [],
                partyType: this.state.selectedPartyType.code,
                fromLastModificationDate: this.state.fromDate,
                toLastModificationDate: this.state.toDate,
                partyId:this.state.selectedParty.id

            },
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        };

        GetIncompletePartyService.getPdfExport(command, 'مشتریان ناقص');
    };

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container inCompletePartyList"}>
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
                        service={GetIncompletePartyService.getflatpartyserviceMethod}
                        //dynamicColumns
                        // serviceColumns={GetIncompletePartyService.getAttachmentCategory}
                        Columns={Columns}
                        reportFilter={
                            {
                                partyAttachmentList: this.state.attachmentcategorytypeSelected.length > 0 ? this.state.attachmentcategorytypeSelected.map(s => { return s.codeId }) : [],
                                partyType: this.state.selectedPartyType.code,
                                fromLastModificationDate: this.state.fromDate,
                                toLastModificationDate: this.state.toDate,
                                partyId:this.state.selectedParty.id
                            }
                        }
                        callServiceAgain
                        reRender
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        hasToolbar={{ haveExcelPfdReport: { excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler } }}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={12}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent
                                            {...this.state.attachmentcategorytype}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.attachmentcategorytypeSelected} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={10}>
                                    <AutoCompleteComponent
                                        {...this.state.party}
                                        handleChange={(value) => this.handleChange(value, 'selectedParty')}
                                        service={GetPartiesService.simpleSearchCustomers}
                                        value={this.state.selectedParty.fullName}
                                    />
                                </Grid>

                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.partyType}
                                            handleChange={(value) => this.handleChange(value, 'selectedPartyType')} isFilterable={false}
                                            value={this.state.selectedPartyType} hasAll />
                                    </div>
                                </Grid>
                                <Grid container spacing={8} className="no-margin">
                                    <Grid item md={2} >
                                        <PersianDatePicker label="تاریخ آخرین ویرایش از" max={this.state.toDate} handleOnChange={(e) => this.handleDate(e, 'fromDate')} selectedDate={this.state.fromDate} />
                                    </Grid>
                                    <Grid item md={2} >
                                        <PersianDatePicker label="تاریخ آخرین ویرایش تا" min={this.state.fromDate} handleOnChange={(e) => this.handleDate(e, 'toDate')} selectedDate={this.state.toDate} />
                                    </Grid>
                                </Grid>

                            </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetIncompletePartyListComponent;
