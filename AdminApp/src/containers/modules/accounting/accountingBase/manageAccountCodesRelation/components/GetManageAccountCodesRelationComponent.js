import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Header from 'shared/components/stateHeader/stateHeader'
import Input from 'shared/components/formInput/inputForm';
import FaIcon from "shared/components/Icon/Icon";
import Filter from "shared/components/kendoGrid/filterPanel/filterPanel";
import AutoCompleteComponent from "shared/components/dropDown/autocomplete";
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import toastr from "toastr";
import { excelAndPdfToolbar } from "../../../../../../constants/excelPdfToolbar";
import Columns from '../constants/GetManageAccountCodesRelationColumns';
import GetManageAccountCodesRelationService from '../services/GetManageAccountCodesRelationService';
import DeleteManageAccountCodesRelationService from '../services/DeleteManageAccountCodesRelationService';
import GetSubsidiaryLedgerService from '../../subsidaryLedger/services/GetSubsidiaryLedgerService';
import GetDetailLedgerService from '../../detailLedger/services/GetDetailLedgerService';
import './GetManageAccountCodesRelationComponent.css'

const $ = require("jquery");
let selectedIds = [];

class GetManageAccountCodesRelation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: Columns(),
            deleteModal: false,
            open: false,
            selectedRelationForDelete: {},
            detailLedgerFrom: { fullTitle: "", code: "" },
            detailLedgerTo: { fullTitle: "", code: "" },
            subsidiaryLedgerListFrom: {
                name: "subsidiaryLedgerFrom",
                field: "fullTitle",
                label: "حساب معین از",
                list: []
            },
            subsidiaryLedgerFrom: { code: '' },
            subsidiaryLedgerListTo: {
                name: "subsidiaryLedgerTo",
                field: "fullTitle",
                label: "حساب معین تا",
                list: []
            },
            subsidiaryLedgerTo: { code: '' },
            title: '',
            // status: false
        };

        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deletePartyGroup = this.deletePartyGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
        this.search = this.search.bind(this);
    }

    // LIFE_CYCLE
    componentDidMount() {
        this.getSubsiadaryLedgerList();
        this.getManageAccountCodesRelation();
    }

    // HANDLE_FUNCTION
    openDeleteModal(dataItem) {
        this.setState({ selectedRelationForDelete: dataItem, deleteModal: true });
    }
    closeModal() {
        this.setState({
            deleteModal: false
        });
    }
    handleChangeCheck = (event, name) => {
        this.setState({
            [name]: event.target.checked
        })
    };
    handleChange(event, name) { 
        let value = event.value;
        this.setState({
            [name]: value
        });
    }
    deletePartyGroup() {
        if (this.state.selectedRelationForDelete.id) {
            let command = {
                entity: this.state.selectedRelationForDelete.id
            };
            DeleteManageAccountCodesRelationService.deleteRelation(command, response => {
                if (response.success) {
                    this.setState({
                        deleteModal: false
                    });
                    this.getManageAccountCodesRelation();
                    this.refreshSelectedItems();
                    this.setState({
                        selectedRelationForDelete: {}
                    });
                    toastr.success(response.message);
                }
            });
        } else {
            let command = {
                entity: selectedIds
            };
            DeleteManageAccountCodesRelationService.deleteRelations(command, response => {
                if (response.success) {
                    this.setState({
                        deleteModal: false
                    });
                    this.getManageAccountCodesRelation();
                    this.refreshSelectedItems();
                    this.setState({
                        selectedRelationForDelete: {}
                    });
                    toastr.success(response.message);
                }
            });
        }
    }
    handleExpandSearchPanel() {
        this.setState({
            open: !this.state.open
        });
    }
    handleChangeTitle = (item) => {
        this.setState({ title: item.value })
    }
    search() {
        if ($("#party-group-list").data("kendoGrid") !== undefined) {
            $("#party-group-list").data("kendoGrid").dataSource.read(this);
            this.refreshSelectedItems();
            this.setState({
                open: false
            });
        }
    }

    // FUNCTION
    getSubsiadaryLedgerList() {
        let defaultCommand = {
            entity: ""
        }
        GetSubsidiaryLedgerService.getsubsidiaryledgers(defaultCommand, (response) => {
            DropDownListDataProvider(this, "subsidiaryLedgerListFrom", response);
            DropDownListDataProvider(this, "subsidiaryLedgerListTo", response);
        })
    }
    onChange(arg) {
        let listIds = Object.keys(arg.sender._selectedIds);
        selectedIds = listIds.map(value => {
            return parseInt(value);
        });
        if (selectedIds.length === 0) {
            $("#delete").attr("disabled", "disabled");
        } else {
            $("#delete").removeAttr("disabled");
        }
    }
    checkBoxSelectHandles = dataItem => {
        if (dataItem.isChecked) {
            selectedIds.push(dataItem.id);
        } else {
            let index = selectedIds.findIndex(item => {
                return item === dataItem.id;
            });
            selectedIds.splice(index, 1);
        }
        if (selectedIds.length === 0) {
            $("#delete").attr("disabled", "disabled");
        } else {
            $("#delete").removeAttr("disabled");
        }
    };
    refreshSelectedItems() {
        $("#delete").attr("disabled", "disabled");
        selectedIds = [];
    }

    // JQUERY_GRID
    getManageAccountCodesRelation() {
        let self = this;
        $("#party-group-list").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data;
                        }
                        var command = {
                            reportFilter: {
                                fullTitle: self.state.title,
                                // status: self.state.status,
                                fromSubsidiaryLedgerCode: self.state.subsidiaryLedgerFrom.code,
                                toSubsidiaryLedgerCode: self.state.subsidiaryLedgerTo.code,
                                fromDetailLedgerCode: self.state.detailLedgerFrom.code,
                                toDetailLedgerCode: self.state.detailLedgerTo.code,

                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [
                                        {
                                            field: "created",
                                            dir: "desc"
                                        }
                                    ]
                            }
                        };
                        GetManageAccountCodesRelationService.getAccountCodes(command, function (response) {
                            if (!response.result) {
                                response = {
                                    Result: [],
                                    totalRecords: 0
                                };
                            }
                            option.success(response);
                        });
                    }
                },
                sort: {
                    field: "created",
                    dir: "desc"
                },
                pageSize: 50,
                serverPaging: true,
                serverSorting: true,
                schema: {
                    model: {
                        id: "id"
                    },
                    data: "result",
                    total: "totalRecords"
                }
            },
            sortable: true,
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
                template:
                    '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            toolbar: `<button id="delete"  disabled="true">حذف</button>
                    ${excelAndPdfToolbar}`,
            dataBound: function (e) {
                var scrollOffset = {
                    left: 10000
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
                    let isChecked = $(checkbox).prop("checked");
                    if (row.hasClass("k-state-selected")) {
                        if (isChecked) {
                            row.removeClass("k-state-selected");
                            $(checkbox).prop("checked", false);
                        }
                        dataItem.isChecked = false;
                    } else {
                        if (!isChecked) {
                            row.addClass("k-state-selected");
                            $(checkbox).prop("checked", true);
                        }
                        dataItem.isChecked = true;
                    }
                    self.checkBoxSelectHandles(dataItem);
                });
                $("#party-group-list tbody tr td div span.delete").on("click", function (item) {
                    var grid = $("#party-group-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.openDeleteModal(dataItem);
                });
                $("#delete").on("click", function () {
                    self.setState({
                        deleteModal: true,
                        selectedRelationForDelete: {}
                    });
                });
            },
            columns: self.state.columns,
            change: self.onChange
        });
    }


    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container  manage-account-codes-relation"}>
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}>
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <ComboBoxComponent
                                        isFilterable={true}
                                        {...this.state.subsidiaryLedgerListFrom}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.subsidiaryLedgerFrom} />
                                </Grid>
                                <Grid item md={5}>
                                    <ComboBoxComponent
                                        isFilterable={true}
                                        {...this.state.subsidiaryLedgerListTo}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.subsidiaryLedgerTo} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <AutoCompleteComponent
                                        handleChange={value =>
                                            this.handleChange(value, "detailLedgerFrom")
                                        }
                                        autoWidth={false}
                                        template={'<div  class="dropdown-header">' +
                                            '<span style="width:70%;" class="k-state-default">#: data.title #</span>' +
                                            '<span style="width:30%;" class="k-state-default">#: data.code #</span>' +
                                            "</div>"}
                                        fieldSearch={"searchPhrase"}
                                        field="fromDetailLedgerCode"
                                        headerTemplate={'<div class="dropdown-header ">' +
                                            '<span style="width:70%;" class="k-widget k-header">عنوان</span>' +
                                            '<span style="width:30%;" class="k-widget k-header">کد حساب</span>' +
                                            "</div>"}
                                        value={this.state.detailLedgerFrom.fullTitle}
                                        label="حساب تفصیل از"
                                        placeholder="کد تفصیل را وارد کنید"
                                        service={GetDetailLedgerService.getDetailLedgersForAutoComplete}
                                    />
                                </Grid>
                                <Grid item md={5}>
                                    <AutoCompleteComponent
                                        handleChange={value =>
                                            this.handleChange(value, "detailLedgerTo")
                                        }
                                        autoWidth={false}

                                        template={'<div  class="dropdown-header">' +
                                            '<span style="width:70%;" class="k-state-default">#: data.title #</span>' +
                                            '<span style="width:30%;" class="k-state-default">#: data.code #</span>' +
                                            "</div>"}
                                        fieldSearch={"searchPhrase"}
                                        field="fullTitle"
                                        headerTemplate={'<div class="dropdown-header ">' +
                                            '<span style="width:70%;" class="k-widget k-header " >عنوان</span>' +
                                            '<span style="width:30%;" class="k-widget k-header" >کد حساب</span>' +
                                            "</div>"}
                                        value={this.state.detailLedgerTo.fullTitle}
                                        label="حساب تفصیل از"
                                        placeholder="کد تفصیل را وارد کنید"
                                        service={GetDetailLedgerService.getDetailLedgersForAutoComplete} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <Input label="عنوان" handleChange={this.handleChangeTitle} value={this.state.title} />
                                </Grid>
                                {/* <Grid item md={5}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.status}
                                                onChange={(e) => this.handleChangeCheck(e, 'status', true)}
                                                value="status"
                                                color="primary" />
                                        }
                                        label="فعال" />
                                </Grid> */}
                            </Grid>
                        </div>
                    </Filter>
                    <div className={
                        "k-rtl " +
                        (this.state.open ? "height-open-grid" : "height-content-grid")
                    }>
                        <div id="party-group-list" className="height-page"></div>
                    </div>
                    {deleteModal(this)}
                </Paper>
            </React.Fragment>
        );
    }

}

function deleteModal(that) {
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={that.state.deleteModal}>
            <Paper className="paper-modal">
                <h3>
                    <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
                    {
                        that.state.selectedRelationForDelete.id ?
                            <span className="margin-right-5">حذف ارتباط</span> :
                            <span className="margin-right-5">حذف ارتباط  ها</span>
                    }
                </h3>
                <hr />
                {
                    that.state.selectedRelationForDelete.id ?
                        <h3>آیا از حذف ارتباط مورد نظر مطمئن می باشید؟</h3> :
                        <h3>آیا از حذف ارتباط های مورد نظر مطمئن می باشید؟</h3>
                }
                <br />
                <Button
                    variant="contained"
                    className="btn-delete-modal"
                    onClick={that.deletePartyGroup}>
                    حذف
                </Button>
                <Button
                    variant="contained"
                    className="btn-cancel-modal"
                    onClick={that.closeModal.bind(that)}>
                    انصراف
                </Button>
            </Paper>
        </Modal>
    );
}

export default GetManageAccountCodesRelation;