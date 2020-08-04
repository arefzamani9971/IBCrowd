import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Columns from '../constants/GetNewsPaperReportMonthlyVoucherTypeColumn';
import Grid from '@material-ui/core/Grid';
import './GetNewsPaperReportMonthlyVoucherTypeComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import Input from 'shared/components/formInput/inputForm';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import kendo from "@progress/kendo-ui";
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import GetNewsPaperReportMonthlyVoucherTypeServices from '../services/GetNewsPaperReportMonthlyVoucherTypeServices';
import GetFiscalYearsService from '../../../accountingBase/fiscalYear/services/GetFiscalYearsService';
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';


const $ = require("jquery");

class GetNewsPaperReportMonthlyVoucherTypeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: Columns(),
            open: false,
            toDebit: undefined,
            fromDebit: undefined,
            toCredit: undefined,
            fromCredit: undefined,
            toDate: '2000-01-01',
            fromDate: "2000-01-01",
            selectedYear: { code: 0 },
            fiscalYearList: {
                name: "selectedYear",
                field: "title",
                label: "سال مالی",
                list: []
            },
            // selectedYear: { title: '', id: 0 },
            voucherMasterStateList: {
                name: "voucherMastrerState",
                label: "وضعیت سند",
                field: "title",
                list: []
            },
            voucherMastrerState: [],
            voucherCategoryIncludeList: {
                name: "voucherCategoryInclude",
                label: "شامل نوع سند",
                field: "title",
                list: []
            },
            voucherCategoryInclude: [],
            voucherCategoryExcludeList: {
                name: "voucherCategoryExclude",
                label: "فاقد نوع سند",
                field: "title",
                list: []
            },
            voucherCategoryExclude: [],
            voucherDailyJournalReportTypeList: {
                name: "voucherDailyJournalReportType",
                label: "نوع گزارش",
                field: "title",
                list: []
            },
            voucherDailyJournalReportType: [],

            costCenterList: {
                name: "costCenter",
                label: "مرکز هزینه",
                field: "title",
                list: []
            },
            costCenter: [],
            toRemain: 0,
            fromRemain: 0
        }

        this.search = this.search.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeFiscalYear = this.handleChangeFiscalYear.bind(this);


    }

    componentDidMount() {

        this.getTradeList();
        GetFiscalYearsService.getFiscalYears({}, (response) => DropDownListDataProvider(this, "fiscalYearList", response, this.handleChangeFiscalYear({ value: response.result[0] })));
        GetEnum("vouchermasterstate", (response) => DropDownListDataProvider(this, "voucherMasterStateList", response));
        GetEnum("DailyJournalReportType", (response) => DropDownListDataProvider(this, "voucherDailyJournalReportTypeList", response));
        GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherCategoryIncludeList", response));
        GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherCategoryExcludeList", response));

        GetCostCentersService.getCostCenters({}, (response) => {
            DropDownListDataProvider(this, "costCenterList", response);

        })

    }

    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };

    handleChangeFiscalYear(value) {
        let item = value.value;
        let today = new Date()
        let enddate = new Date(item.endDate)
        this.setState({

            selectedYear: item,
            fromDate: item.startDate,
            toDate: enddate.getTime() > today.getTime() ? today : enddate,
            reRender: true
        }
        // , () => {
        //     this.getTradeList();
        // }
        );

    }

    handleChangeDate(value, name) {

        this.setState({
            [name]: value
        }, function () {
        })

    }
    

    search() {
        $("#NewsPaperReportMonthlyVoucherType").data("kendoGrid").dataSource.read(this);
        this.setState({
            open: false
        })
        // this.getTradeList();
    };
    getTradeList = () => {
        let self = this;

        $("#NewsPaperReportMonthlyVoucherType").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                fromDebit: self.state.fromDebit === undefined || self.state.fromDebit === '' ? 0 : self.state.fromDebit,
                                toDebit: self.state.toDebit === undefined || self.state.toDebit === '' ? 0 : self.state.toDebit,
                                fiscalYearId: self.state.selectedYear.id,
                                dateFilter: {
                                    startDate: self.state.fromDate,
                                    endDate: self.state.toDate
                                },
                                fromCredit: self.state.fromCredit === undefined || self.state.fromCredit === '' ? 0 : self.state.fromCredit,
                                toCredit: self.state.toCredit === undefined || self.state.toCredit === '' ? 0 : self.state.toCredit,
                                accountBalanceRemainType: 0,
                                month: 5,
                                year: 2019,
                                description: "",
                                voucherState: self.state.voucherMastrerState.length === 0 ? [] : self.state.voucherMastrerState.map((index) => { return index.code }),
                                exceptionVoucherCategory: self.state.voucherCategoryExclude.length === 0 ? [] : self.state.voucherCategoryExclude.map((index) => { return index.code }),
                                includeVoucherCategory: self.state.voucherCategoryInclude.length === 0 ? [] : self.state.voucherCategoryInclude.map((index) => { return index.code }),
                                costCenter: self.state.costCenter.length === 0 ? [] : self.state.costCenter.map((index) => { return index.id }),
                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    []
                            }
                        };
                        GetNewsPaperReportMonthlyVoucherTypeServices.getnewspaperreportmonthlyvouchertypeMethod(command, function (response) {
                            option.success(response);
                        })
                    }
                },
                pageSize: 50,
                // sort: {
                //     field: "created",
                //     dir: "desc"
                // },
                serverPaging: true,
                serverSorting: true,
                schema: {
                    data: "result",
                    total: "totalRecords",
                },
                aggregate: [

                ]
            },
            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            // reorderable: true,
            // navigatable: false,
            // selectable: "multiple",
            columnMenu: {
                messages: {
                    sortAscending: "صعودی",
                    sortDescending: "نزولی",
                    columns: "ستون ها"
                }
            },
            pageable: {
                pageSizes: [50, 150, 200],
                buttonCount: 5,
                messages: {
                    itemsPerPage: "تعداد سطر در هر صفحه",
                    display: "{0} - {1} از {2} مورد",
                    empty: ""
                }
            },
            allowCopy: true,

            noRecords: {
                template: '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            toolbar: `${excelAndPdfToolbar}`,
            dataBound: function (e) {
                var scrollOffset = {
                    left: 10000,
                };
                var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
                container.scrollLeft(scrollOffset.left);
                if (this.dataSource.data().length > 0) {
                    let grid = $("#NewsPaperReportMonthlyVoucherType").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        // if (index === this.dataSource.data().length - 1) {
                        if (index === this.dataSource.data().length) {
                            currentRow.css({ display: 'none', visibility: 'hidden' });
                        } else {
                            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                        }
                    });
                };
            },
            columns: self.state.columns,
        });
        $("#NewsPaperReportMonthlyVoucherType .excel-report").on("click", function (item) {
            self.getExcelReport();
        });
        $("#NewsPaperReportMonthlyVoucherType .pdf-report").on("click", function (item) {
            self.getPdfReport();
        });
    };



    getCommand = () => {
        var grid = $("#NewsPaperReportMonthlyVoucherType").data("kendoGrid");
        var dataSource = grid.dataSource;

        var command = {
            reportFilter: {
                fromDebit: this.state.fromDebit === undefined || this.state.fromDebit === '' ? 0 : this.state.fromDebit,
                toDebit: this.state.toDebit === undefined || this.state.toDebit === '' ? 0 : this.state.toDebit,
                fiscalYearId: this.state.selectedYear.id,
                dateFilter: {
                    startDate: this.state.fromDate,
                    endDate: this.state.toDate
                },
                fromCredit: this.state.fromCredit === undefined || this.state.fromCredit === '' ? 0 : this.state.fromCredit,
                toCredit: this.state.toCredit === undefined || this.state.toCredit === '' ? 0 : this.state.toCredit,
                accountBalanceRemainType: 0,
                month: 5,
                year: 2019,
                description: "",
                voucherState: this.state.voucherMastrerState.length === 0 ? [] : this.state.voucherMastrerState.map((index) => { return index.code }),
                exceptionVoucherCategory: this.state.voucherCategoryExclude.length === 0 ? [] : this.state.voucherCategoryExclude.map((index) => { return index.code }),
                includeVoucherCategory: this.state.voucherCategoryInclude.length === 0 ? [] : this.state.voucherCategoryInclude.map((index) => { return index.code }),
                costCenter: this.state.costCenter.length === 0 ? [] : this.state.costCenter.map((index) => { return index.id }),
            },
            OptionalFilter: {
                page: dataSource ? dataSource.page() : 1,
                take: dataSource ? dataSource.pageSize() : 50,
                // take: option.data.take ? option.data.take : 50,
                sort: dataSource ? dataSource.sort() :
                    [{
                        field: "accountTitle",
                        dir: "asc"
                    }]
            }
        }
        return command;
    }
    getExcelReport = () => {
        var command = this.getCommand();

        GetNewsPaperReportMonthlyVoucherTypeServices.getExcelExport(command, "دفتر روزنامه - سند ماهانه");

    }


    getPdfReport = () => {

        var command = this.getCommand();

        GetNewsPaperReportMonthlyVoucherTypeServices.getPdfExport(command, "دفتر روزنامه - سند ماهانه");

    }


    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className="main-paper-container NewsPaperReportMonthlyVoucherType">
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}
                    >
                        <div classPage={"height-search"}>




                           
                            <Grid container spacing={8} className="no-margin">

                                <Grid item md={2}>

                                    <div className="k-rtl">
                                        <DropDownComponent isFilterable={false} {...this.state.fiscalYearList}
                                            handleChange={(value, name) => this.handleChangeFiscalYear(value)}
                                            value={this.state.selectedYear} />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.fromDate} label="تاریخ سند از " handleOnChange={(e) => this.handleChangeDate(e, "fromDate")} />
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.toDate} label="تاریخ سند تا" handleOnChange={(e) => this.handleChangeDate(e, "toDate")} />
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent isFilterable={false} {...this.state.voucherDailyJournalReportTypeList}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.voucherDailyJournalReportType}  hasAll/>
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent isFilterable={false} {...this.state.voucherMasterStateList}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.voucherMastrerState} hasAll/>
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent isFilterable={false} {...this.state.costCenterList}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.costCenter} hasAll/>
                                    </div>
                                </Grid>
                               
                                

                            </Grid>

                            <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent isFilterable={false} {...this.state.voucherCategoryIncludeList}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.voucherCategoryInclude} hasAll />
                                    </div>
                                </Grid>

                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent isFilterable={false} {...this.state.voucherCategoryExcludeList}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.voucherCategoryExclude}  hasAll/>
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                  <NumberFormatComponent label="بدهکار از "
                    value={this.state.fromDebit}
                    handleChange={(value, error) => this.handleChange(value, 'fromDebit')} type="number" isSeparator />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="بدهکار تا"
                    value={this.state.toDebit}
                    handleChange={(value, error) => this.handleChange(value, 'toDebit')} type="number" isSeparator />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="بستانکار از "
                    value={this.state.fromCredit}
                    handleChange={(value, error) => this.handleChange(value, 'fromCredit')} type="number" isSeparator />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="بستانکار تا"
                    value={this.state.toCredit}
                    handleChange={(value, error) => this.handleChange(value, 'toCredit')} type="number" isSeparator />
                </Grid>
                               
                            </Grid>



                        </div>
                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="NewsPaperReportMonthlyVoucherType" className="height-page"></div>
                    </div>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetNewsPaperReportMonthlyVoucherTypeComponent;
