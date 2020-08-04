import React from 'react';
import '@progress/kendo-ui';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import FaIcon from 'shared/components/Icon/Icon';
import Header from 'shared/components/stateHeader/stateHeader'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import moment from 'moment';
import toastr from 'toastr';
import { getAllRepresentativeTemplate, getAllRepresentativeHeaderTemplate } from 'constants/autoCompleteTemplate';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import GetMainMarket from "../../../../../../services/GetMainMarkets";
import GetCreditPartySerivce from '../services/GetCreditPartySerivce';
import EditCreditPartyService from '../services/EditCreditPartyService';
import DeleteCreditPartyService from '../services/DeleteCreditPartyService';
import Columns from '../constants/GetCreditPartyColumn';
import './GetCreditPartyComponent.css';

const $ = require("jquery");
let selectedIds = [];

class GetCreditPartyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fromDate: moment(new Date()).add(-1, 'months'),
            toDate: null,
            columns: Columns(),
            open: false,
            deleteModal: false,
            editModal: false,
            validUntil: new Date(),
            activationModal: false,
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری",
                list: []
            },
            selectedParty: { fullName: '', id: 0 },
            getAllRepresentative: {
                name: "selectedGetAllRepresentative",
                field: "fullName",
                headerTemplate: getAllRepresentativeHeaderTemplate,
                template: getAllRepresentativeTemplate,
                placeholder: "جستجوی معرف  بر اساس نام و نام خانوادگی، کدملی، نام پدر",
                label: 'نام و نام خانوادگی معرف',
                list: []
            },
            selectedGetAllRepresentative: { fullName: '', id: 0 },
            fromAmount: '',
            toAmount: '',
            isActive: null,
            archiveNumber: undefined,
            isActiveForEdit: {
                defaultValue: false,
                list: [{ title: 'فعال', code: true }, { title: 'غیرفعال', code: false }],
            },
            activationStatusFilter: {
                name: "selectedActivationStatusFilter",
                field: "title",
                label: "وضعیت فعال/غیر فعال",
                dataItemKey: 'code',
                list: [
                    { title: 'غیر فعال', code: false },
                    { title: 'فعال', code: true },
                    { title: 'همه', code: null },
                ],
            },
            selectedActivationStatusFilter: { title: 'همه', code: null },
            mainMarket: {
                name: "mainMarketSelected",
                field: 'title',
                list: [],
                label: "بازار"
            },
            mainMarketSelected: []
        }
    }

    // LIFE_CYCLE
    componentDidMount() {
        GetMainMarket((response) => DropDownListDataProvider(this, "mainMarket", response));
        this.getTradeList();
        selectedIds = [];
    };

    // HANDLE_FUCTIONS
    handleDeleteModalClose = () => {
        this.setState({
            deleteModal: false,
            selectedId: null
        })
    };
    handleEditModalClose = () => {
        this.setState({
            editModal: false
        })
    };
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
    search = () => {
        if ($("#credit-party-list").data("kendoGrid") !== undefined) {
            $("#credit-party-list").data("kendoGrid").dataSource.read(this);
            this.refreshSelectedItems();
            this.setState({
                open: false
            })
        }
    };
    confirmDeleteH = () => {
        DeleteCreditPartyService.deletepartyservicesMethod({ entity: { ids: this.state.selectedId ? [this.state.selectedId] : selectedIds } }, (res) => {
            if (res.isError === false) {
                this.setState({
                    deleteModal: false
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    this.refreshSelectedItems();
                })
            }
            this.setState({
                selectedId: null
            });
        })
    };
    confirmEditeH = () => {
        EditCreditPartyService.updatevaliduntilpartyservicesMethod({ entity: { ids: selectedIds, validUntil: this.state.validUntil } }, (res) => {
            if (res.isError === false) {
                this.setState({
                    editModal: false
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    this.refreshSelectedItems();
                })
            }
        })
    };
    handleChangeParty = (item, name) => {
        this.setState({
            [name]: item.value
        });
    };

    // FUNCTIONS
    onChange(arg) {
        let listIds = Object.keys(arg.sender._selectedIds);
        selectedIds = listIds.map((value) => {
            return parseInt(value);
        });
        if (selectedIds.length === 0) {
            $('#delete').attr('disabled', 'disabled');
            $('#edit').attr('disabled', 'disabled');
        } else {
            $('#delete').removeAttr('disabled');
            $('#edit').removeAttr('disabled');
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
            $('#delete').attr('disabled', 'disabled');
            $('#edit').attr('disabled', 'disabled');
        } else {
            $('#delete').removeAttr('disabled');
            $('#edit').removeAttr('disabled');
        }
    };
    refreshSelectedItems() {
        $('#delete').attr('disabled', 'disabled');
        $('#edit').attr('disabled', 'disabled');
        selectedIds = [];
    };

    // JQUERY_KENDO
    getTradeList = () => {
        let self = this;
        $("#credit-party-list").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                partyId: self.state.selectedParty.id,
                                representativeId: self.state.selectedGetAllRepresentative.id,
                                fromAmount: self.state.fromAmount ? parseInt(self.state.fromAmount.replace(/,/g, '')) : 0,
                                toAmount: self.state.toAmount ? parseInt(self.state.toAmount.replace(/,/g, '')) : 0,
                                archiveNumber: self.state.archiveNumber,
                                isActive: self.state.selectedActivationStatusFilter.code,
                                mainMarkets: self.state.mainMarketSelected.length > 0 ? self.state.mainMarketSelected.map(s => { return s.id }) : [],
                                dateFilter: {
                                    startDate: self.state.fromDate,
                                    endDate: self.state.toDate
                                }
                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: "partyId",
                                        dir: "asc"
                                    }]
                            }
                        };
                        GetCreditPartySerivce.getflatpartyserviceMethod(command, function (response) {
                            option.success(response);
                        });
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
                template: '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            toolbar: `
                          <button id="delete" disabled="true">حذف</button>
                          <button id="edit" disabled="true">ویرایش</button>
                          `,
            dataBound: function (e) {
                var scrollOffset = {
                    left: 10000
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
                if (this.dataSource.data().length > 0) {
                    let grid = $("#credit-party-list").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        if (index === this.dataSource.data().length) {
                            currentRow.css({ display: 'none', visibility: 'hidden' });
                        } else {
                            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                        }
                    });
                };
                $("#delete").on("click", function (item) {
                    self.setState({
                        deleteModal: true,
                    })
                });
                $("#edit").on("click", function () {
                    self.setState({
                        editModal: true,
                    })
                });
                $("#credit-party-list tbody tr td span.edit").on("click", function (item) {
                    var grid = $("#credit-party-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.props.history.push(
                        {
                            pathname: self.props.edit.path,
                            state: {
                                stateParams: {
                                    id: dataItem.id,
                                }
                            }
                        }
                    )
                });
                $("#credit-party-list tbody tr td span.delete").on("click", function (item) {
                    var grid = $("#credit-party-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.setState({
                        selectedId: dataItem.id
                    }, function () {
                        self.setState({
                            deleteModal: true
                        });
                    });
                });
            },
            columns: self.state.columns,
            change: self.onChange
        });
    };

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} stateParams={this.state.selectedParty ? { partyId: this.state.selectedParty.id  } : null} />
                <Paper className="main-paper-container credit-party-list">
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}>
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={8}>
                                    <div className="k-rtl">
                                        <AutoCompleteComponent
                                            {...this.state.party}
                                            handleChange={(value) => this.handleChangeParty(value, 'selectedParty')}
                                            service={GetPartiesService.simpleSearchCustomers}
                                            value={this.state.selectedParty.fullName} />
                                    </div>
                                </Grid>
                                <Grid item md={4}>
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
                                    <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ اتمام اعتبار" handleOnChange={(value) => this.handleDate(value, 'fromDate')} />
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ اتمام اعتبار " handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                                </Grid>
                                <Grid item md={2}>
                                    <NumberFormatComponent id="" label="از مبلغ اعتبار"
                                        value={this.state.fromAmount}
                                        handleChange={(value) => this.handleChange(value, 'fromAmount')} type="number" isSeparator={true} />
                                </Grid>
                                <Grid item md={2}>
                                    <NumberFormatComponent id="" label="تا مبلغ اعتبار"
                                        value={this.state.toAmount}
                                        handleChange={(value) => this.handleChange(value, 'toAmount')} type="number" isSeparator={true} />
                                </Grid>
                                <Grid item md={4}>
                                    <div className="k-rtl">
                                        <AutoCompleteComponent
                                            {...this.state.getAllRepresentative}
                                            handleChange={(value) => this.handleChangeParty(value, 'selectedGetAllRepresentative')}
                                            service={GetCreditPartySerivce.getallrepresentativeforautocompleteMethod}
                                            value={this.state.selectedGetAllRepresentative.fullName} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                {/* <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')} />
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                                </Grid> */}
                                <Grid item md={2}>
                                    <NumberFormatComponent id="" label="عدد شماره بایگانی"
                                        value={this.state.archiveNumber}
                                        handleChange={(value) => this.handleChange(value, 'archiveNumber')} type="number" isSeparator={false} />
                                </Grid>
                                {/* <Grid item md={2}>
                                    <NumberFormatComponent id="" label="از مبلغ"
                                        value={this.state.fromAmount}
                                        handleChange={(value) => this.handleChange(value, 'fromAmount')} type="number" isSeparator={true} />
                                </Grid>
                                <Grid item md={2}>
                                    <NumberFormatComponent id="" label="تا مبلغ"
                                        value={this.state.toAmount}
                                        handleChange={(value) => this.handleChange(value, 'toAmount')} type="number" isSeparator={true} />
                                </Grid> */}
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.activationStatusFilter}
                                            handleChange={(value) => this.handleChange(value, 'selectedActivationStatusFilter')} isFilterable={false}
                                            value={this.state.selectedActivationStatusFilter} />
                                    </div>
                                </Grid>
                                <Grid item md={3}>
                                </Grid>
                            </Grid>
                        </div>
                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="credit-party-list" className="height-page"></div>
                    </div>
                </Paper>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.deleteModal}
                    onClose={this.handleDeleteModalClose}>
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
                        marginTop: '-150px'
                    }}>
                        <h3>
                            <FaIcon color="gray" name="fa fa-trash" size={20} />
                            <span style={{ marginRight: '5px' }}>حذف</span>
                        </h3>
                        <hr />
                        <h3>آیا از حذف موارد انتخابی مطمئن می باشید؟</h3>
                        <br />
                        <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.confirmDeleteH}>
                            حذف
                        </Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleDeleteModalClose}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.editModal}
                    onClose={this.handleEditModalClose}>
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
                        marginTop: '-150px'
                    }}>
                        <h3>
                            <span style={{ marginRight: '5px' }}>ویرایش</span>
                        </h3>
                        <hr />
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={10}>
                                <h3> آیا از ویرایش <strong>تاریخ اتمام اعتبار</strong> مطمئن می باشید؟ </h3>
                            </Grid>
                            <Grid item md={10}>
                                <PersianDatePicker selectedDate={this.state.validUntil} label="تاریخ انجام" handleOnChange={(value) => this.handleDate(value, 'validUntil')} />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" onClick={this.confirmEditeH}>
                            ویرایش
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleEditModalClose}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
            </React.Fragment>
        )
    }

}

export default GetCreditPartyComponent;