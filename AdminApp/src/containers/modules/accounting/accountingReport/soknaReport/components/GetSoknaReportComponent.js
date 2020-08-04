import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Columns from '../constants/GetSoknaReportColumn';
import Grid from '@material-ui/core/Grid';
import Loading from "core/Loading";
import './GetSoknaReportComponent.css';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import kendo from "@progress/kendo-ui";
import GetSoknaReportService from '../services/GetSoknaReportService';
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
const $ = require("jquery");

class GetSoknaReportComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "ناو نام خانوادگی مشتری"
            },
            selectedParty: { fullName: '', id: 0 },
            fromCredit: null,
            toCredit: null,
            columns: Columns(),
            open: false,
            isLoading: true
        }
    }

    componentDidMount() {

        this.getTradeList();
    }

    search = () => {
        // $("#receiveList").data("kendoGrid").dataSource.read(this);
        this.getTradeList();
        this.setState({
            open: false
        })
    };
    getTradeList = () => {
        let self = this;
        $("#sokna-report").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                PartyId: self.state.selectedParty.id,
                                FromCredit: self.state.fromCredit ? parseInt(self.state.fromCredit.replace(/,/g, '')) : '',
                                ToCredit: self.state.toCredit ? parseInt(self.state.toCredit.replace(/,/g, '')) : '',

                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: "fullPartyName",
                                        dir: "asc"
                                    }]
                            }
                        };
                        self.setState({
                            isLoading: true
                        });
                        GetSoknaReportService.GetSoknaReportServiceMethod(command, function (response) {
                            // $("#soknaReport .k-grid-footer .k-grid-footer-wrap " +
                            //     "tbody tr td div.total-amount-sum").text(kendo.toString(response.totalAmountSum, 'n0'));
                            self.setState({
                                isLoading: false
                              }, () => {
                                option.success(response);
                              });
                        })
                    }
                },
                pageSize: 50,
                sort: {
                    field: "fullPartyName",
                    dir: "asc"
                },
                serverPaging: true,
                serverSorting: true,
                schema: {
                    model: {
                        id: 'id'
                    },
                    data: "result",
                    total: "totalRecords",
                },
                aggregate: [
                    { field: "remainT0", aggregate: "sum" },
                ]
            },
            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            navigatable: false,
            selectable: "cell , multiple",
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
            dataBound: function (e) {
                var scrollOffset = {
                    left: 10000,
                };
                var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
                container.scrollLeft(scrollOffset.left);
                if($("div.k-pager-sm")){
                    $("div.k-pager-sm").removeClass("k-pager-sm");
                  }
                if (this.dataSource.data().length > 0) {
                    let grid = $("#sokna-report").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        // if (index === this.dataSource.data().length) {
                        //     currentRow.css({ display: 'none', visibility: 'hidden' });
                        // } 
                    });

                };

            },
            columns: self.state.columns,
        });

    };



    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };

    //Pdf and Excel Export Methods

    getCommand = () => {
        var grid = $("#receiveList").data("kendoGrid");
        var dataSource = grid.dataSource;

        var command = {
            reportFilter: {
                id: 0,
                startAmount: this.state.fromPrice,
                endAmount: this.state.toPrice,
                states: this.state.cashFlowStateSelected.length > 0 ? this.state.cashFlowStateSelected.map(s => { return s.code }) : [],
                mainMarkets: this.state.mainMarketSelected.length > 0 ? this.state.mainMarketSelected.map(s => { return s.id }) : [],
                bankDeposits: this.state.bankDepositSelected.length > 0 ? this.state.bankDepositSelected.map((v) => v.id) : [],
                startDate: this.state.fromDate,
                endDate: this.state.toDate
            },
            OptionalFilter: {
                page: dataSource ? dataSource.page() : 1,
                take: dataSource ? dataSource.pageSize() : 50,
                // take: option.data.take ? option.data.take : 50,
                sort: dataSource ? dataSource.sort() :
                    [{
                        field: "fullPartyName",
                        dir: "asc"
                    }]
            }
        }
        return command;
    }
    getExcelReport = () => {
        var command = this.getCommand();
        alert('excel');
        // GetAllCashFlowCategoryService.getExcelExport(command, 'receiveListExcel');

    }
    getPdfReport = () => {
        var command = this.getCommand();
        alert('pdf');
        // GetAllCashFlowCategoryService.getPdfExport(command, "receiveListPdf");

    }

    //Pdf and Excel Export Methods
    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    render() {

        return (
            <React.Fragment>

                <Header {...this.props} />
                <Paper className="main-paper-container soknaReport">
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={12}>
                                    <AutoCompleteComponent {...this.state.party}
                                        handleChange={(value) => this.handleChange(value, 'selectedParty')}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.simpleSearchCustomers} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="از مانده"
                                        value={this.state.fromCredit}
                                        handleChange={(value) => this.handleChange(value, 'fromCredit')} type="number" isSeparator={true} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="تا مانده"
                                        value={this.state.toCredit}
                                        handleChange={(value) => this.handleChange(value, 'toCredit')} type="number" isSeparator={true} />
                                </Grid>

                            </Grid>


                        </div>

                    </Filter>
                    { this.state.isLoading ? <Loading /> : '' }
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
                        <div id="sokna-report" className="height-page"></div>
                    </div>
                </Paper>


            </React.Fragment>

        )
    }
}

export default GetSoknaReportComponent;
