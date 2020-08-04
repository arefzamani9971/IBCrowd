import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Loading from "core/Loading";
import './GetPaymentAndReceiveListComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import moment from 'moment';
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetMainMarket from "../../../../../../services/GetMainMarkets";
import GetChequeBookServices from "../../../chequeManagement/chequeBook/services/GetChequeBookServices";
import Columns from "../constants/GetPaymentAndReceiveListConstants";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import kendo from "@progress/kendo-ui";
import GetPaymentAndReceiveServices from "../services/GetPaymentAndReceiveServices";
const $ = require("jquery");

class GetPaymentAndReceiveListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: moment(new Date),
            toDate: moment(new Date().setDate(new Date().getDate() + 7)),
            fromPrice: null,
            toPrice: null,
            cashFlowState: {
                name: "cashFlowStateSelected",
                field: 'title',
                list: [],
                label: "وضعیت"
            },
            cashFlowStateSelected: [],


            mainMarket: {
                name: "mainMarketSelected",
                field: 'title',
                list: [],
                label: "بازار"
            },
            mainMarketSelected: [],
            columns: Columns(),
            open: false,
            transactionType: {
                name: "selectedTransactionType",
                field: "title",
                label: "نوع تراکنش",
                list: []
            },
            selectedTransactionType: { code: 0, title: '' },
            bankDeposit: {
                name: "bankDepositSelected",
                placeholder: 'بانک دریافتی',
                dataTextField: 'fullAccountNumber',
                dataValueField: 'id',
                fieldSearch: 'phrase',
                template: null,
                headerTemplate: null,
                label: "بانک دریافتی"
            },
            bankDepositSelected: [],
            isLoading: true,
            party: {
                name: "selectedFromPartyFullName",
                field: "fullName",
                placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری"
            },
            selectedFromPartyFullName: { fullName: '' }
        };
        this.isPdfDownloading = false;
        this.isExcellDwonloading = false;
        this.handleChangeDate = this.handleChangeDate.bind(this);

    }

    componentDidMount() {
        GetMainMarket((response) => DropDownListDataProvider(this, "mainMarket", response));
        // GetEnum("cashflowstate", (response)=>  {DropDownListDataProvider(this,"cashFlowState",response)});
        GetEnum("CashFlowStateExceptDeleted", (response) => { DropDownListDataProvider(this, "cashFlowState", response) });
        GetEnum("cashflowtransactiontype", (response) => { DropDownListDataProvider(this, "transactionType", response) });
        this.getTradeList();
    }

    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    // handleDate = (value, name) => {
    //     this.setState({
    //         [name]: value
    //     })
    // };

    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };
    search = () => {
        // $("#paymentAndReceiveList").data("kendoGrid").dataSource.read(this);
        this.getTradeList();
        this.setState({
            open: false
        })
    };
    handleChangeDate(value, name) {
        console.log("value : ", value);
        console.log("name : ", name);


        this.setState({
            [name]: value
        }, function () {
        })
    }
    getCommand = () => {
        var grid = $("#paymentAndReceiveList").data("kendoGrid");
        var dataSource = grid.dataSource;
        var command = {
            reportFilter: {
                id: 0,
                startAmount: this.state.fromPrice,
                endAmount: this.state.toPrice,
                states: this.state.cashFlowStateSelected.length > 0 ? this.state.cashFlowStateSelected.map(s => { return s.code }) : [],
                mainMarkets: this.state.mainMarketSelected.length > 0 ? this.state.mainMarketSelected.map(s => { return s.id }) : [],
                bankDeposits: this.state.bankDepositSelected,
                cashFlowTransactionType: this.state.selectedTransactionType.code,
                dateFilter: {
                    startDate: this.state.fromDate,
                    endDate: this.state.toDate,
                },
                startDate: this.state.fromDate,
                endDate: this.state.toDate,
                cashFlowTransactionType: this.state.selectedTransactionType.code,
                partyId: this.state.selectedFromPartyFullName.id
            },
            OptionalFilter: {
                page: dataSource ? dataSource.page() : 1,
                take: dataSource ? dataSource.pageSize() : 50,
                // take: option.data.take ? option.data.take : 50,
                sort: dataSource ? dataSource.sort() :
                    [{
                        field: "dueDate",
                        dir: "asc"
                    }]
            }
        }
        return command;
    }
    getExcelReport = () => {
        var command = this.getCommand();
        GetPaymentAndReceiveServices.getExcelExport(command, function (response) {
            this.isExcellDwonloading = false;
            $('.excel-report').removeAttr('disabled');
        });

    };
    getPdfReport() {
        var command = this.getCommand();
        console.log("command : " , command);
        GetPaymentAndReceiveServices.getPdfExport(command, function (response) {
            this.isPdfDownloading = false;
            $('.pdf-report').removeAttr('disabled');
        });





    }
    getTradeList = () => {
        let self = this;

        $("#paymentAndReceiveList").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                id: 0,
                                startAmount: self.state.fromPrice ? parseInt(self.state.fromPrice.replace(/,/g, '')) : '',
                                endAmount: self.state.toPrice ? parseInt(self.state.toPrice.replace(/,/g, '')) : '',
                                states: self.state.cashFlowStateSelected.length > 0 ? self.state.cashFlowStateSelected.map(s => { return s.code }) : [],
                                mainMarkets: self.state.mainMarketSelected.length > 0 ? self.state.mainMarketSelected.map(s => { return s.id }) : [],
                                bankDeposits: self.state.bankDepositSelected,
                                startDate: self.state.fromDate,
                                endDate: self.state.toDate,
                                cashFlowTransactionType: self.state.selectedTransactionType.code,
                                partyId: self.state.selectedFromPartyFullName.id
                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: "dueDate",
                                        dir: "asc"
                                    }]
                            }
                        };
                        self.setState({
                            isLoading: true
                        });
                        GetPaymentAndReceiveServices.getflatreceiveandpaymentMethod(command, function (response) {
                            self.setState({
                                isLoading: false
                            }, () => {
                                option.success(response);
                            });
                            $("#paymentAndReceiveList .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-amount-sum").text(kendo.toString(response.totalAmountSum, 'n0'));
                            $("#paymentAndReceiveList .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-remainValue-sum").text(kendo.toString(response.totalRemainValueSum, 'n0'));
                            $("#paymentAndReceiveList .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-requestedAmount-sum").text(kendo.toString(response.totalRequestedAmountSum, 'n0'));
                        })
                    }
                },

                pageSize: 50,
                sort: {
                    field: "created",
                    dir: "desc"
                },
                serverPaging: true,
                serverSorting: true,
                schema: {
                    data: "result",
                    total: "totalRecords"

                },
                aggregate: [
                    { field: "remainValue", aggregate: "sum" },
                    { field: "amount", aggregate: "sum" },
                    { field: "requestedAmount", aggregate: "sum" },
                ]
            },

            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            reorderable: true,
            navigatable: false,
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
            toolbar: excelAndPdfToolbar,
            noRecords: {
                template: '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            dataBound: function (e) {
                var scrollOffset = {
                    left: 10000,
                };
                var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
                container.scrollLeft(scrollOffset.left);
                if ($("div.k-pager-sm")) {
                    $("div.k-pager-sm").removeClass("k-pager-sm");
                }

                if (this.dataSource.data().length > 0) {
                    let grid = $("#paymentAndReceiveList").data("kendoGrid");
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
                $("#paymentAndReceiveList .excel-report").on("click", function (item) {
                    $('.excel-report').attr('disabled', 'disabled');
                    if (!self.isExcellDwonloading) {
                        self.isExcellDwonloading = true;
                        self.getExcelReport();
                    }
                });
                $("#paymentAndReceiveList .pdf-report").on("click", function (item) {
                    $('.pdf-report').attr('disabled', 'disabled');
                    if (!self.isPdfDownloading) {
                        self.isPdfDownloading = true;
                        self.getPdfReport();
                    }
                });
                // $("#paymentAndReceiveList tbody tr td span.edit").on("click", function (item) {
                //     var grid = $("#paymentAndReceiveList").data("kendoGrid");
                //     var row = $(item.target).closest("tr");
                //     var dataItem = grid.dataItem(row);
                //     self.props.history.push(
                //         {
                //             pathname: '/main/cashFlow/receive/editReceive',
                //             state: {
                //                 stateParams:{
                //                     partyId:  dataItem.partyId,
                //                     id: dataItem.id,
                //                     fullName: dataItem.fullName,
                //                     nationalId: dataItem.nationalId
                //                 }
                //             }
                //
                //         })
                // });
                //
                $("#paymentAndReceiveList tbody tr td span.delete").on("click", function (item) {
                    // var grid = $("#paymentAndReceiveList").data("kendoGrid");
                    // var row = $(item.target).closest("tr");
                    // var dataItem = grid.dataItem(row);
                    // alert(dataItem.id);

                    self.setState({
                        modalStatus: true
                    })
                    // self.props.history.push(
                    //     {
                    //         pathname: '/main/cashFlow/receive/editReceive',
                    //         state: {
                    //             stateParams:{
                    //                 partyId:  dataItem.partyId,
                    //                 id: dataItem.id,
                    //                 fullName: dataItem.fullName,
                    //                 nationalId: dataItem.nationalId
                    //             }
                    //         }
                    //
                    //     })
                });


            },
            columns: self.state.columns
        });

    };
    handlePartyChange = (item) => {
        this.setState({
            selectedFromPartyFullName: item.value
        })
    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container paymentAndReceiveList"}>
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={10}>
                                    <AutoCompleteComponent {...this.state.party}
                                        handleChange={(value) => this.handlePartyChange(value)}
                                        value={this.state.selectedFromPartyFullName.fullName}
                                        service={GetPartiesService.simpleSearchCustomers} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "fromDate")} />
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "toDate")} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="از مبلغ"
                                        value={this.state.fromPrice}
                                        handleChange={(value) => this.handleChange(value, 'fromPrice')} type="number" isSeparator={true} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="تا مبلغ"
                                        value={this.state.toPrice}
                                        handleChange={(value) => this.handleChange(value, 'toPrice')} type="number" isSeparator={true} />
                                </Grid>

                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent
                                            {...this.state.cashFlowState}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.cashFlowStateSelected} />
                                    </div>
                                </Grid>
                                <Grid item md={5}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent
                                            {...this.state.mainMarket}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.mainMarketSelected} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            isFilterable={false}
                                            {...this.state.transactionType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedTransactionType}
                                        />
                                    </div>

                                </Grid>
                                <Grid item md={8}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.bankDeposit}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        service={GetChequeBookServices.searchBankDepositMethod}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Filter>
                    {this.state.isLoading ? <Loading /> : ''}
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
                        <div id="paymentAndReceiveList" className="height-page"></div>
                    </div>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetPaymentAndReceiveListComponent;
