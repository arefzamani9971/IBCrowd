import React, { Component } from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Loading from "core/Loading";
import GetSettlementVoucherService from './../services/GetSettlementVoucherService';
import Columns from '../constants/GetSettlementVoucherColumn';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import Grid from '@material-ui/core/Grid';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import Paper from '@material-ui/core/Paper';
import kendo from '@progress/kendo-ui';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import toastr from 'toastr';
import moment from "moment";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import '../components/GetSettlementVoucherComponent.css'

const $ = require("jquery");
let selectedIds = [];


class GetSettlementVoucherComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reRender: false,
            isLoading: false,
            open: false,
            columns: Columns(),
            deleteModal: false,
            confirmModal: false,
            isSettled: true,
            data: []
        };

        this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.getSettlementVoucherList = this.getSettlementVoucherList.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        this.handleCloseConfirmModal = this.handleCloseConfirmModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.search = this.search.bind(this);
    }
    componentDidMount() {
        selectedIds = [];
        this.getSettlementVoucherList();
    }


    getSettlementVoucherList() {

        let self = this;

        $("#settlement-voucher-list").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }

                        var command = {
                            reportFilter:
                            {
                                fromVoucherDate: self.state.fromVoucherDate,
                                toVoucherDate: self.state.toVoucherDate,
                                isSettled: self.state.isSettled,
                                dateFilter: {
                                    startDate: self.state.startDate,
                                    endDate: self.state.endDate
                                }
                            },

                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: "date",
                                        dir: "desc"
                                    }]
                            }
                        }

                        GetSettlementVoucherService.getSettlementVoucherList(command, function (response) {
                            let res = {
                                result: [],
                                totalRecords: 0
                            }
                            if (response.success) {
                                self.setState({
                                    data: response.result

                                })
                                res = {
                                    result: response.result,
                                    totalRecords: response.totalRecords
                                };
                            }
                            option.success(res)
                        })
                    }
                },

                pageSize: 50,
                serverPaging: true,
                serverSorting: true,
                schema: {
                    model: {
                        id: 'id',
                    },
                    data: "result",
                    total: "totalRecords"

                },

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
            noRecords: {
                template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            toolbar: `<button class="main-btns  btn-success" id="confirmSettlementVoucher" >ثبت سند تسویه</button>` +
                `<button class=" main-btns  btn-danger" id="deleteSettlementVoucher">  حذف سند تسویه</button>`,

            dataBound: function (e) {
                var scrollOffset = {
                    left: 10000,
                };
                var container = e.sender.wrapper.children(".k-grid-content");
                container.scrollLeft(scrollOffset.left);

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



                $("#settlement-voucher-list tbody tr td div.id").on("click", function (item) {
                    var grid = $("#settlement-voucher-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.props.history.push(

                        {

                            pathname: self.props.detail.path,
                            state: {
                                id: dataItem.id
                            }
                        })
                });


                
                $("#confirmSettlementVoucher").on("click", function () {
                    // var grid = $("#settlement-voucher-list").data("kendoGrid");
                    // var row = $(item.target).closest("tr");
                    // var dataItem = grid.dataItem(row);
                    self.openConfirmModal();
                });
                $("#deleteSettlementVoucher").on("click", (item) => {
                    self.openDeleteModal();
                });
            },
            columns: self.state.columns,
            change: self.onChange
        });

    };

    findItem = () => {
        let newItems = [];
        selectedIds.map(item => {
            let findDataItem = this.state.data.filter(dataItem => { return item == dataItem.id })[0];
            if (findDataItem) {
                newItems.push({
                    date: findDataItem.date,
                    voucherMasterIdsForSettlement: findDataItem.voucherMasterIdsForSettlement
                })

            }

        })
        return newItems;
    }

    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked
        })

    };
    onChange(arg) {
        let listIds = Object.keys(arg.sender._selectedIds);
        selectedIds = listIds.map((value) => {
            return parseInt(value);
        });
    }

    checkBoxSelectHandles = (dataItem) => {
        if (dataItem.isChecked) {
            selectedIds.push(dataItem.id)
        } else {
            let index = selectedIds.findIndex(item => { return item === dataItem.id });
            selectedIds.splice(index, 1);
        }
    };

    handleExpandSearchPanel() {

        this.setState({
            open: !this.state.open
        })
    }

    search() {
        $("#settlement-voucher-list").data("kendoGrid").dataSource.read(this);
        // this.refreshSelectedItem();
        this.setState({
            open: false
        })
    }

    // refreshSelectedItem() {
    //     selectedIds = [];
    // }

    handleChangeDate(value, name) {

        this.setState({
            [name]: value
        });
    }

    openDeleteModal() {
        this.setState({ deleteModal: true });
    }

    openConfirmModal() {
        this.setState({ confirmModal: true });
    }

    handleCloseDeleteModal() {
        this.setState({
            deleteModal: false,
            selectedId: null
        });
    }
    handleCloseConfirmModal() {
        this.setState({
            confirmModal: false,
            selectedId: null
        });
    }


    removeSettlementVoucher = () => {
        var command = {
            entity:
                this.findItem()
        }

        GetSettlementVoucherService.deleteSettlementVoucher(command, this.successRemove)

    }

    successRemove(response) {
        this.setState({ deleteModal: false });

        if (response.success) {
            toastr.success("سند با موفقیت حذف شد")

        }

    }



    confirmSettlementVoucher = () => {
        var command = {
            entity:
                this.findItem()
        }
        GetSettlementVoucherService.confirmSettlementVoucher(command, this.successConfirm)
    }

    successConfirm(response) {
        this.setState({ deleteModal: false });

        if (response.success) {
            toastr.success("سند با موفقیت ثبت شد")
        }
    }


    render() {


        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container settlement-voucher"}>
                    <Filter search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.fromVoucherDate} label="تاریخ سند از   " handleOnChange={(e) => this.handleChangeDate(e, "fromVoucherDate")} />
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.toVoucherDate} label="تاریخ سند تا   " handleOnChange={(e) => this.handleChangeDate(e, "toVoucherDate")} />
                                </Grid>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.isSettled}
                                            onChange={this.handleChangeCheck('isSettled')}
                                            value="isSettled"
                                            color="primary"
                                        />
                                    }
                                    label="تسویه شده"
                                />

                            </Grid>
                        </div>


                    </Filter>
                    {/* {this.state.isLoading ? <Loading /> : ''} */}
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " "}>
                        <div id="settlement-voucher-list" className="height-page"></div>
                    </div>
                </Paper>


                {/* Confirm  modal  */}

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.confirmModal}
                    onClose={(e) => this.handleCloseConfirmModal(e)}
                >
                    <Paper className="paper-modal">
                        <h3 >
                            <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
                            <span style={{ marginRight: '5px' }}>ثبت سند تسویه </span>

                        </h3>
                        <hr />
                        <h3>
                            آیا از ثبت سند تسویه مطمئن هستید؟
                        </h3>
                        <br />
                        <Button variant="contained" color="secondary" style={{ backgroundColor: 'green', color: '#FFF' }} onClick={this.confirmSettlementVoucher}>
                            ثبت
                        </Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={(e) => this.handleCloseConfirmModal(e)}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>




                {/* Delete modal  */}

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.deleteModal}
                    onClose={(e) => this.handleCloseDeleteModal(e)}
                >
                    <Paper className="paper-modal">
                        <h3 >
                            <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
                            <span style={{ marginRight: '5px' }}>حذف سند تسویه </span>

                        </h3>
                        <hr />
                        <h3>
                            آیا از حذف سند تسویه مطمئن هستید؟
                        </h3>
                        <br />
                        <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.removeSettlementVoucher}>
                            حذف
                        </Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={(e) => this.handleCloseDeleteModal(e)}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
            </React.Fragment>
        );
    }
}

export default GetSettlementVoucherComponent;