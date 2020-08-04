import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Columns from '../constants/GetCustomersServiceColumn';
import Grid from '@material-ui/core/Grid';
import './GetCustomersServiceComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import RadioButtons from "shared/components/radioButtons/radioButtons";
import moment from 'moment';
import GetMainMarket from "../../../../../../services/GetMainMarkets";
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import kendo from "@progress/kendo-ui";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import FaIcon from 'shared/components/Icon/Icon';
import toastr from 'toastr';
import GetCustomersServicesSerivce from '../services/GetCustomersServicesSerivce';
import DeleteCustomerServicesService from '../services/DeleteCustomerServicesService';
import EditCustomerServicesService from '../services/EditCustomerServicesService';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import { getAllRepresentativeTemplate, getAllRepresentativeHeaderTemplate, getServicesHeaderTemplate, getServicesTemplate } from 'constants/autoCompleteTemplate';
import ActiveorinActivePartyServices from '../services/ActiveorinActivePartyServices';
const $ = require("jquery");
let selectedIds = [];
class GetCustomersServiceComponent extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            fromDate: moment(new Date()).add(-1, 'months'),
            toDate: null,

            // mainMarket: {
            //     name:"mainMarketSelected",
            //     field:'title',
            //     list:[],
            //     label:"بازار"
            // },
            // mainMarketSelected: [],


            columns: Columns(),
            open: false,

            deleteModal: false,
            getAmount: 0,
            idForDelete: 0,
            partyFullName: '',

            editModal: false,
            validUntil: new Date(),


            activationModal: false,
            // isActiveForEdit: false,


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


            serviceList: {
                name: "selectedService",
                field: "title",
                label: "عنوان خدمت",
                list: []
            },
            selectedService: { id: 0 },


            mainMarket: {
                name: "mainMarketSelected",
                field: 'title',
                list: [],
                label: "بازار"
            },



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






            mainMarketSelected: [],

        }
    }
    radioChange = event => {
        var str = event.target.value;
        var mybool = JSON.parse(str);
        this.setState({
            isActiveForEdit: {
                ...this.state.isActiveForEdit,
                defaultValue: mybool
            }
        });
    };
    //close modal
    handleDeleteModalClose = () => {
        this.setState({
            deleteModal: false
        })
    };
    handleEditModalClose = () => {
        this.setState({
            editModal: false
        })
    };

    handleActivationModalClose = () => {
        this.setState({
            activationModal: false
        })
    }
    //close modal

    componentDidMount() {

        GetMainMarket((response) => DropDownListDataProvider(this, "mainMarket", response));

        GetCustomersServicesSerivce.getservicesMethod({}, (response) => {
            DropDownListDataProvider(this, "serviceList", response);
        })
        this.getTradeList();
        //     var command ={
        //         optionalFilter: {
        //             take: 100,
        //             page: 1,
        //         },
        //         reportFilter: {
        //             phrase: ''
        //         },
        //    }
        //     GetCustomersServicesSerivce.getservicesMethod(command, (res) => {

        //     });
    }


    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };

    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
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

    getTradeList = () => {
        let self = this;

        $("#customersServiceList").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                partyId: self.state.selectedParty.id,
                                serviceId: self.state.selectedService.id,
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
                        GetCustomersServicesSerivce.getflatpartyserviceMethod(command, function (response) {
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
                // aggregate: [
                //     { field: "amount", aggregate: "sum" },
                // ]
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
                      <button id="editActivation" disabled="true">فعال/غیرفعال سازی خدمت</button>          
                    `,
            dataBound: function (e) {
                var scrollOffset = {
                    left: 10000,

                };
                var container = e.sender.wrapper.children(".k-grid-content");
                container.scrollLeft(scrollOffset.left);
                if ($("div.k-pager-sm")) {
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
                    let grid = $("#customersServiceList").data("kendoGrid");
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
                // $("#receiveList .excel-report").on("click", function (item) {
                //     self.getExcelReport();
                // });
                // $("#receiveList .pdf-report").on("click", function (item) {
                //     self.getPdfReport();
                // });

                $("#delete").on("click", function (item) {
                    // var grid = $("#customersServiceList").data("kendoGrid");
                    // var row = $(item.target).closest("tr");
                    // var dataItem = grid.dataItem(row);
                    self.setState({
                        deleteModal: true,
                    })
                });
                $("#edit").on("click", function () {
                    self.setState({
                        editModal: true,
                    })
                });
                $("#editActivation").on("click", function () {
                    self.setState({
                        activationModal: true,
                    })
                })
            },
            columns: self.state.columns,
            change: self.onChange
        });

    };

    onChange(arg) {
        let listIds = Object.keys(arg.sender._selectedIds);
        selectedIds = listIds.map((value) => {
            return parseInt(value);
        });
        if (selectedIds.length === 0) {
            $('#delete').attr('disabled', 'disabled');
            $('#edit').attr('disabled', 'disabled');
            $('#editActivation').attr('disabled', 'disabled');
        } else {
            $('#delete').removeAttr('disabled');
            $('#edit').removeAttr('disabled');
            $('#editActivation').removeAttr('disabled');
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
            $('#editActivation').attr('disabled', 'disabled');
        } else {
            $('#delete').removeAttr('disabled');
            $('#edit').removeAttr('disabled');
            $('#editActivation').removeAttr('disabled');
        }

    };
    refreshSelectedItems() {
        $('#delete').attr('disabled', 'disabled');
        $('#edit').attr('disabled', 'disabled');
        $('#editActivation').attr('disabled', 'disabled');
        selectedIds = [];
    }
    search = () => {
        if ($("#customersServiceList").data("kendoGrid") !== undefined) {
            $("#customersServiceList").data("kendoGrid").dataSource.read(this);
            this.refreshSelectedItems();
            this.setState({
                open: false
            })

        }
        // $("#receiveList").data("kendoGrid").dataSource.read(this);
        // this.getTradeList();
        // this.refreshSelectedItems();
        // this.setState({
        //     open: false
        // })
    };

    confirmDeleteH = () => {
        DeleteCustomerServicesService.deletepartyservicesMethod({ entity: { ids: selectedIds } }, (res) => {
            if (res.isError === false) {
                this.setState({
                    deleteModal: false
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    this.refreshSelectedItems();

                })
            }
        })

    };
    confirmEditeH = () => {

        EditCustomerServicesService.updatepartyservicesMethod({ entity: { ids: selectedIds, validUntil: this.state.validUntil } }, (res) => {
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


    // getCommand = () => {
    //     var grid = $("#receiveList").data("kendoGrid");
    //     var dataSource = grid.dataSource;

    //     var command = {
    //       reportFilter: {
    //         id: 0,
    //         startAmount: this.state.fromPrice,
    //         endAmount: this.state.toPrice,
    //         states: this.state.cashFlowStateSelected.length> 0 ? this.state.cashFlowStateSelected.map(s=>{return s.code}) : [],
    //         mainMarkets: this.state.mainMarketSelected.length> 0 ? this.state.mainMarketSelected.map(s=>{return s.id}) : [],
    //         bankDeposits: this.state.bankDepositSelected.length > 0 ?  this.state.bankDepositSelected.map((v) => v.id):[],
    //         startDate: this.state.fromDate,
    //         endDate: this.state.toDate
    //       },
    //       OptionalFilter: {
    //         page: dataSource ? dataSource.page() : 1,
    //         take: dataSource ? dataSource.pageSize() : 50,
    //         // take: option.data.take ? option.data.take : 50,
    //         sort: dataSource ? dataSource.sort() :
    //           [{
    //             field: "dueDate",
    //             dir: "asc"
    //           }]
    //       }
    //     }
    //     return command;
    //   }
    //   getExcelReport = () => {
    //     var command = this.getCommand();
    //     alert('excel');
    //     GetAllCashFlowCategoryService.getExcelExport(command, 'receiveListExcel');

    //   }


    //   getPdfReport = () => {
    //     var command = this.getCommand();
    //     // alert('pdf');
    //     GetAllCashFlowCategoryService.getPdfExport(command, "receiveListPdf");

    //   }
    handleChangeParty = (item, name) => {
        this.setState({
            [name]: item.value
        });
    }


    confirmActivation = () => {
        let command = {
            entity: {
                ids: selectedIds,
                isActive: this.state.isActiveForEdit.defaultValue
            }
        }
        ActiveorinActivePartyServices.activeorinactivepartyservicesMethod(command, (res) => {
            if (res.isError === false) {
                this.setState({
                    activationModal: false
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    this.refreshSelectedItems();
                })
            }

        })
        
    }
    render() {

        return (
            <React.Fragment>

                <Header {...this.props} stateParams={this.state.selectedParty ? { partyId: this.state.selectedParty.id } : null} />
                <Paper className="main-paper-container customersServiceList">
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={7}>
                                    <div className="k-rtl">
                                        <AutoCompleteComponent
                                            {...this.state.party}
                                            handleChange={(value) => this.handleChangeParty(value, 'selectedParty')}
                                            service={GetPartiesService.simpleSearchCustomers}
                                            value={this.state.selectedParty.fullName}
                                        />
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
                                <Grid item md={4}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            {...this.state.serviceList}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedService}
                                            hasAll />
                                        {/* <AutoCompleteComponent
                                            {...this.state.serviceList}
                                            handleChange={(value) => this.handleChangeParty(value, 'selectedService')}
                                            service={GetCustomersServicesSerivce.getservicesMethod}
                                            value={this.state.selectedService.title}
                                        /> */}
                                    </div>
                                </Grid>
                                <Grid item md={6}>
                                    <div className="k-rtl">
                                        <AutoCompleteComponent
                                            {...this.state.getAllRepresentative}
                                            handleChange={(value) => this.handleChangeParty(value, 'selectedGetAllRepresentative')}
                                            service={GetCustomersServicesSerivce.getallrepresentativeforautocompleteMethod}
                                            value={this.state.selectedGetAllRepresentative.fullName}
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    {/* <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.isActive}
                                                onChange={this.handleChangeCheck('isActive')}
                                                value="isActive"
                                                color="primary"
                                            />
                                        }
                                        label="فعال"
                                     /> */}
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.activationStatusFilter}
                                            handleChange={(value) => this.handleChange(value, 'selectedActivationStatusFilter')} isFilterable={false}
                                            value={this.state.selectedActivationStatusFilter} />
                                    </div>

                                </Grid>
                            </Grid>

                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')} />

                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                                </Grid>
                                <Grid item md={2}>
                                    <NumberFormatComponent id="" label="عدد شماره بایگانی"
                                        value={this.state.archiveNumber}
                                        handleChange={(value) => this.handleChange(value, 'archiveNumber')} type="number" isSeparator={false} />
                                </Grid>
                                <Grid item md={2}>
                                    <NumberFormatComponent id="" label="از مبلغ"
                                        value={this.state.fromAmount}
                                        handleChange={(value) => this.handleChange(value, 'fromAmount')} type="number" isSeparator={true} />
                                </Grid>
                                <Grid item md={2}>
                                    <NumberFormatComponent id="" label="تا مبلغ"
                                        value={this.state.toAmount}
                                        handleChange={(value) => this.handleChange(value, 'toAmount')} type="number" isSeparator={true} />
                                </Grid>

                                <Grid item md={3}>


                                </Grid>

                            </Grid>
                        </div>

                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="customersServiceList" className="height-page"></div>
                    </div>
                </Paper>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.deleteModal}
                    onClose={this.handleDeleteModalClose}
                >
                    <Paper className="paper-modal">

                        <h3>
                            <FaIcon color="gray" name="fa fa-trash" size={20} />
                            <span style={{ marginRight: '5px' }}>حذف</span>
                            {/*<b>*/}
                            {/*حذف {this.props.deleteHeader}*/}
                            {/*</b>*/}
                        </h3>
                        <hr />
                        {/* <h6> آیا از حذف <b> {!this.props.stateParams.fullName ?'dsdsdsd': this.props.stateParams.fullName}</b> اطمینان دارید؟ </h6> */}
                        {/* <h3> آیا از حذف دریافت مشتری <strong>{this.state.partyFullName}</strong> به مبلغ <strong>{this.state.getAmount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</strong> مطمئن می باشید. </h3> */}
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
                    onClose={this.handleEditModalClose}
                >
                <Paper className="paper-modal">

                        <h3>
                            <span style={{ marginRight: '5px' }}>ویرایش</span>
                        </h3>
                        <hr />
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={10}>
                                <h3> آیا از ویرایش <strong>تاریخ اعتبار خدمت </strong> مطمئن می باشید؟ </h3>
                            </Grid>
                            <Grid item md={10}>
                                <PersianDatePicker selectedDate={this.state.validUntil} label="تاریخ انجام" handleOnChange={(value) => this.handleDate(value, 'validUntil')} />
                                {/* <NoDataDatePicker isNull={true} selectedDate={this.state.validUntil} label="تاریخ" handleOnChange={(value) => this.handleDate(value, 'validUntil')} /> */}
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
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.activationModal}
                    onClose={this.handleActivationModalClose}
                >
                <Paper className="paper-modal">

                        <h3>
                            <span style={{ marginRight: '5px' }}>فعال /غیرفعال سازی خدمت</span>
                        </h3>
                        <hr />
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={10}>
                                <h3> آیا از <strong> فعال /غیرفعال</strong> سازی خدمت  خود مطمئن می باشید؟ </h3>
                            </Grid>
                            {/* <Grid item md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.isActiveForEdit}
                                                onChange={this.handleChangeCheck('isActiveForEdit')}
                                                value=""
                                                color="primary"
                                            />
                                        }
                                        label="فعال"
                                     />
                            </Grid> */}
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={11}>
                                <div style={{ margin: '20px 0' }}>
                                    <RadioButtons {...this.state.isActiveForEdit} radioH={this.radioChange} />
                                </div>
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" onClick={this.confirmActivation}>
                            تایید
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleActivationModalClose}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>


            </React.Fragment>

        )
    }
}

export default GetCustomersServiceComponent;
