import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetReceiveListColumn';
import Grid from '@material-ui/core/Grid';
import Loading from "core/Loading";
import './GetReceiveListComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";


import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';



import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import NoDataDatePicker from "shared/components/persianDatePicker/noDataDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import Input from 'shared/components/formInput/inputForm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';

// import {chequeBookTitleWidoutHeaderTemplate} from "../../../../../../constants/chequeBookTitleWidoutHeaderTemplate";
import GetChequeBookServices from "../../../chequeManagement/chequeBook/services/GetChequeBookServices";

import moment from 'moment';
import GetMainMarket from "../../../../../../services/GetMainMarkets";
import GetAllCashFlowCategoryService from "../services/GetAllCashFlowCategoryService";

import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import GetTradesService from "../../../../trade/trades/tradesList/services/GetTradesService";
import kendo from "@progress/kendo-ui";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import FaIcon from 'shared/components/Icon/Icon';
import DeleteReceiveService from "../services/DeleteReceiveService";
import { GridToolbar } from "@progress/kendo-react-grid";
import confirmationReceiveService from "../services/confirmationReceiveService";
import finalConfirmationReceiveService from "../services/finalConfirmationReceiveService";
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import toastr from 'toastr';
const $ = require("jquery");
let selectedIds = [];

class GetReceiveListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fromDate: new Date(),
            toDate: moment(new Date().setDate(new Date().getDate() + 7)),
            fromPrice: null,
            toPrice: null,
            cashFlowState: {
                name: "cashFlowStateSelected",
                field: 'title',
                list: [],
                label: "وضعیت دریافت"
            },
            cashFlowStateSelected: [],


            mainMarket: {
                name: "mainMarketSelected",
                field: 'title',
                list: [],
                label: "بازار"
            },
            mainMarketSelected: [],

            bankDeposit: {
                name: "bankDepositSelected",
                placeholder: 'بانک دریافتی',
                dataTextField: 'fullAccountNumber',
                dataValueField: 'id',
                fieldSearch: 'phrase',
                template: null,
                headerTemplate: null
            },
            bankDepositSelected: [],
            columns: Columns(),
            open: false,
            modalStatus: false,
            idForDelete: 0,
            rowData: [],

            finalConfirmationModal: false,
            confirmationModal: false,
            fromPartyFullName: '',



            confirmationDueDate: null,
            finalConfirmationDueDate: null,

            getAmount: 0,
            isLoading: true,
            party: {
                name: "selectedFromPartyFullName",
                field: "fullName",
                placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری"
            },
            selectedFromPartyFullName: { fullName: '' }
        }
        this.search = this.search.bind(this);
    }
    //close modal
    handleClose = () => {
        this.setState({ modalStatus: false });
    };
    finalConfirmationModalCloseH = () => {
        this.setState({ finalConfirmationModal: false, finalConfirmationDueDate: null })
    };
    confirmationModalCloseH = () => {
        this.setState({ confirmationModal: false, confirmationDueDate: null })
    };
    //close modal

    componentDidMount() {
        GetMainMarket((response) => DropDownListDataProvider(this, "mainMarket", response));
        // GetEnum("cashflowstate", (response)=>  {DropDownListDataProvider(this,"cashFlowState",response)});
        GetEnum("CashFlowStateExceptDeleted", (response) => { DropDownListDataProvider(this, "cashFlowState", response) });
        this.getTradeList();
    }
    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handleDate = (value, name) => {
        this.setState({
            [name]: value
        })
    };

    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };
    search() {
        $("#receiveList").data("kendoGrid").dataSource.read(this);
        this.setState({
            open: false
        })
        selectedIds=[];
        // this.getTradeList();
    };
    getTradeList = () => {
        let self = this;
        $("#receiveList").kendoGrid({
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
                        GetAllCashFlowCategoryService.getflatreceiveMethod(command, function (response) {
                            if (response.result && response.result.length > 0) {
                                self.response = {
                                    totalAmountSum: response.totalAmountSum,
                                    totalRequestedAmountSum: response.totalRequestedAmountSum
                                };
                              } else {
                                response = {
                                  result: [],
                                  totalRecords: 0
                                }
                              }
                            // $("#receiveList .k-grid-footer .k-grid-footer-wrap " +
                            // "tbody tr td div.total-requestedAmount-sum").text(kendo.toString(response.total.requestedAmountSum, 'n0'));
                            // self.setState({response:response});
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
                    field: "created",
                    dir: "desc"
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
                    { field: "amount", aggregate: "sum" },
                    { field: "requestedAmount", aggregate: "sum" }
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
            toolbar: `<button id="confirmation" disabled="true">
                        تایید
                      </button>
                    <button id="finalConfirmation" disabled="true">
                    تایید نهایی</button>
                    ${excelAndPdfToolbar}
                    
                    `,
            dataBound: function (e) {

                var scrollOffset = {
                    left: 10000,
                };
                var container = e.sender.wrapper.children(".k-grid-content");
                container.scrollLeft(scrollOffset.left);
                if($("div.k-pager-sm")){
                    $("div.k-pager-sm").removeClass("k-pager-sm");
                  }
                let grid = e.sender;
                let rows = grid.tbody.find("[role='row']");

                rows.unbind("click");
                rows.click(function (e) {
                    if ($(e.target).hasClass("k-checkbox-label")) {
                        return;
                    }
                    let row = $(e.target).closest("tr");
                    let checkbox = $(row).find(".k-checkbox");
                    var dataItem = grid.dataItem(row);
                    let isChecked = $(checkbox).prop('checked');

                    if (row.hasClass("k-state-selected")) {
                        if (isChecked) {
                            row.removeClass('k-state-selected');
                            $(checkbox).prop('checked', false);
                        }
                        dataItem.isChecked = false;
                    } else {
                        if (!isChecked) {
                            row.addClass('k-state-selected');
                            $(checkbox).prop('checked', true);
                        }
                        dataItem.isChecked = true;
                    }
                    self.checkBoxSelectHandles(dataItem);

                });
                //Select Checkbox Rows by Clicking Anywhere on the Row
                if (this.dataSource.data().length > 0) {
                    let grid = $("#receiveList").data("kendoGrid");
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
                    $("#receiveList .k-grid-footer .k-grid-footer-wrap " +
                        "tbody tr td div.total-amount-sum").text(kendo.toString(self.response.totalAmountSum, 'n0'));
                    $("#receiveList .k-grid-footer .k-grid-footer-wrap " +
                        "tbody tr td div.total-requestedAmount-sum").text(kendo.toString(self.response.totalRequestedAmountSum, 'n0'));
                };

                $("#receiveList tbody tr td span.edit").on("click", function (item) {
                    var grid = $("#receiveList").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.props.history.push(
                        {
                            pathname: '/main/cashFlow/receive/editReceive',
                            state: {
                                stateParams: {
                                    partyId: dataItem.partyId,
                                    id: dataItem.id,
                                    fullName: dataItem.fullName,
                                    nationalId: dataItem.nationalId
                                }
                            }

                        })
                });
                $("#receiveList tbody tr td span.delete").on("click", function (item) {
                    var grid = $("#receiveList").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    // alert(dataItem.fromPartyFullName);
                    self.setState({
                        modalStatus: true,
                        getAmount: dataItem.amount,
                        idForDelete: dataItem.id,
                        fromPartyFullName: dataItem.fromPartyFullName,
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
            columns: self.state.columns,
            change: self.onChange
        });
        $("#confirmation").on("click", function () {
            self.setState({
                confirmationModal: true,
            })
        });
        $("#finalConfirmation").on("click", function () {
            self.setState({
                finalConfirmationModal: true
            })
        });
        $("#receiveList .excel-report").on("click", function (item) {
            self.getExcelReport();
        });
        $("#receiveList .pdf-report").on("click", function (item) {
            self.getPdfReport();
        });
    };
    onChange(arg) {
        let listIds = Object.keys(arg.sender._selectedIds);
        selectedIds = listIds.map((value) => {
            return parseInt(value);
        });
        if (selectedIds.length === 0) {
            $('#confirmation').attr('disabled', 'disabled');
            $('#finalConfirmation').attr('disabled', 'disabled');
        } else {
            $('#confirmation').removeAttr('disabled');
            $('#finalConfirmation').removeAttr('disabled');
        }
    }
    checkBoxSelectHandles = (dataItem) => {
        if (dataItem.isChecked) {
            selectedIds.push(dataItem.id)
        } else {
            let index = selectedIds.findIndex(item => { return item === dataItem.id });
            selectedIds.splice(index, 1);
        }
        if (selectedIds.length === 0) {
            $('#confirmation').attr('disabled', 'disabled');
            $('#finalConfirmation').attr('disabled', 'disabled');
        } else {
            $('#confirmation').removeAttr('disabled');
            $('#finalConfirmation').removeAttr('disabled');
        }
    };
    reRenderGrid = () => {

        DeleteReceiveService.deletecashflowmasterbyidMethod({ entity: this.state.idForDelete }, (res) => {
            if (res.isError === false) {
                this.setState({
                    modalStatus: false
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                    // $('#issuingCheque').attr('disabled', 'disabled');
                    // $('#chequeDelete').attr('disabled', 'disabled');
                })
            } else {

                this.setState({
                    modalStatus: false
                }, () => {
                    this.getTradeList();
                    $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                    // $('#issuingCheque').attr('disabled', 'disabled');
                    // $('#chequeDelete').attr('disabled', 'disabled');
                })
            }


        })
    };
    finalConfirmationModalH = () => {
        finalConfirmationReceiveService.finalconfirmationmoneyrequestMethod({ entity: { cashFlowMasterIds: selectedIds, dueDate: this.state.finalConfirmationDueDate } }, (res) => {
            if (res.isError === false) {
                this.setState({
                    finalConfirmationModal: false,
                    finalConfirmationDueDate: null
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    selectedIds = [];
                    $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                })
            }
        })
    };
    confirmationModalH = () => {
        confirmationReceiveService.confirmationreceiveMethod({ entity: { ids: selectedIds, dueDate: this.state.confirmationDueDate } }, (res) => {
            if (res.isError === false) {
                this.setState({
                    confirmationModal: false,
                    confirmationDueDate: null

                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    selectedIds = [];
                    $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                })
            }
        })
    };
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
                bankDeposits: this.state.bankDepositSelected,
                startDate: this.state.fromDate,
                endDate: this.state.toDate,
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

        GetAllCashFlowCategoryService.getExcelExport(command, 'دریافت');

    }


    getPdfReport = () => {
        var command = this.getCommand();

        GetAllCashFlowCategoryService.getPdfExport(command, "دریافت");

    }

    handlePartyChange = (item) => {
        this.setState({
            selectedFromPartyFullName: item.value
        })
    }
    render() {
        return (
            <React.Fragment>

                <Header {...this.props} />
                <Paper className="main-paper-container receiveList">
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
                                    <NoDataDatePicker isNull={false} selectedDate={this.state.fromDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')} />
                                    {/* <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')}/> */}

                                </Grid>
                                <Grid item md={2}>
                                    <NoDataDatePicker isNull={false} selectedDate={this.state.toDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                                    {/* <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')} /> */}
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
                                <Grid item md={10}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.bankDeposit}
                                       handleChange={(value , name) => this.handleChange(value, name)}
                                        service={GetChequeBookServices.searchBankDepositMethod}
                                    />
                                </Grid>
                            </Grid>
                        </div>

                    </Filter>
                    { this.state.isLoading ? <Loading /> : '' }
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
                        <div id="receiveList" className="height-page"></div>
                    </div>
                </Paper>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modalStatus}
                    onClose={this.handleClose}
                >
                    <Paper style={{
                        width: '600px',
                        padding: '1rem .5rem ',
                        height: 'auto',
                        outline: 'none',
                        position: 'absolute',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                        backgroundColor: '#fff',
                        top: '50%',
                        left: '45%',
                        marginLeft: '-300px',
                        marginTop: '-150px',
                    }}>
                        <h3>
                            <FaIcon color="gray" name="fa fa-trash" size={20} />
                            <span style={{ marginRight: '5px' }}>حذف</span>
                            {/*<b>*/}
                            {/*حذف {this.props.deleteHeader}*/}
                            {/*</b>*/}
                        </h3>
                        <hr />
                        {/*<h6> آیا از حذف <b> {!this.props.stateParams.fullName ?'dsdsdsd': this.props.stateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
                        <h3> آیا از حذف دریافت مشتری <strong>{this.state.fromPartyFullName}</strong> به مبلغ <strong>{this.state.getAmount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</strong> مطمئن می باشید. </h3>
                        <br />
                        <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.reRenderGrid}>
                            حذف
                        </Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleClose}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.finalConfirmationModal}
                    onClose={this.finalConfirmationModalCloseH}
                >
                    <Paper style={{
                        width: '600px',
                        padding: '1rem .5rem ',
                        height: 'auto',
                        outline: 'none',
                        position: 'absolute',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                        backgroundColor: '#fff',
                        top: '50%',
                        left: '45%',
                        marginLeft: '-300px',
                        marginTop: '-150px',
                    }}>
                        <h3>
                            <span style={{ marginRight: '5px' }}>تایید نهایی</span>
                        </h3>
                        <hr />
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={10}>
                                <h3> آیا از <strong>تایید نهایی</strong> خود مطمئن می باشید. </h3>
                            </Grid>
                            <Grid item md={10}>
                                {/* <PersianDatePicker selectedDate={this.state.finalConfirmationDueDate} label="تاریخ انجام" handleOnChange={(value) => this.handleDate(value, 'finalConfirmationDueDate')} /> */}
                                <NoDataDatePicker isNull={true} selectedDate={this.state.finalConfirmationDueDate} label="تاریخ انجام" handleOnChange={(value) => this.handleDate(value, 'finalConfirmationDueDate')} />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" onClick={this.finalConfirmationModalH}>
                            تایید نهایی
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.finalConfirmationModalCloseH}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.confirmationModal}
                    onClose={this.confirmationModalCloseH}
                >
                    <Paper style={{
                        width: '600px',
                        padding: '1rem .5rem ',
                        height: 'auto',
                        outline: 'none',
                        position: 'absolute',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                        backgroundColor: '#fff',
                        top: '50%',
                        left: '45%',
                        marginLeft: '-300px',
                        marginTop: '-150px',
                    }}>
                        <h3>
                            <span style={{ marginRight: '5px' }}> تایید</span>
                        </h3>
                        <hr />
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={10}>
                                <h3> آیا از <strong>تایید </strong> خود مطمئن می باشید. </h3>
                            </Grid>
                            <Grid item md={10}>
                                {/* <PersianDatePicker selectedDate={this.state.confirmationDueDate} label="تاریخ انجام" handleOnChange={(value) => this.handleDate(value, 'confirmationDueDate')} /> */}
                                <NoDataDatePicker isNull={true} selectedDate={this.state.confirmationDueDate} label="تاریخ انجام" handleOnChange={(value) => this.handleDate(value, 'confirmationDueDate')} />
                            </Grid>
                        </Grid>

                        <Button variant="contained" color="primary" onClick={this.confirmationModalH}>
                            تایید
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.confirmationModalCloseH}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>

            </React.Fragment>

        )
    }
}

export default GetReceiveListComponent;
