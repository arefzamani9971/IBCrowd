import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import '@progress/kendo-ui';
import toastr from 'toastr';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import FaIcon from 'shared/components/Icon/Icon';
import styles from '../../../../../layout/panel/theme';
import Columns from '../constants/detailLedgerColumns'
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import DeleteDetailLedgerService from '../services/DeleteDetailLedgerService';
import GetDetailLedgerService from '../services/GetDetailLedgerService'
import "./GetDetailLedgerComponent.css";

const $ = require("jquery");
let selectedIds = [];

class GetDetailLedger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            fromCode: null,
            toCode: null,
            open: false,
            deleteModal: false,
            columns: Columns(),
        }
        this.isPdfDownloading = false;
        this.isExcellDwonloading = false;
       
    }

    // LIFE_CYCLE
    componentDidMount() {
        this.getTradeList();
    }

    // HANDLE_FUNCTION
    handleChangeTitle=(item)=> {
        this.setState({ title: item.value })
    }
    handleChangeFromCode=(item)=> {
        this.setState({
            fromCode: item.value,
            toCode: item.value
        })
    }
    handleChangeToCode=(item)=> {
        this.setState({
            toCode: item.value,
        })
    }
    search = () => {
        if ($("#detail-ledger-list").data("kendoGrid") !== undefined) {
            $("#detail-ledger-list").data("kendoGrid").dataSource.read(this);
            this.refreshSelectedItems();
            this.setState({
                open: false
            })
        }
    };
    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        });
    };
    handleDeleteModalClose = () => {
        this.setState({
            deleteModal: false,
            selectedId: null
        })
    };
    
    confirmDeleteH = () => {
        DeleteDetailLedgerService.deletedetailledgers({ entity: { ids: this.state.selectedId ? [this.state.selectedId] : selectedIds } }, (res) => {
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

    // FUNCITON
    getCommand() {
        var command = {
            ReportFilter: {
                fromCode: this.state.fromCode,
                toCode: this.state.toCode,
                title: this.state.title
            },
            OptionalFilter: {
                sort: [
                    {
                        field: "created",
                        dir: "desc"
                    }
                ]
            }
        }
        return command;
    }
    excelReportHandler = () => {
        var command = this.getCommand();
        GetDetailLedgerService.getExcelExport(command, 'detail-ledger', (response) => {
            this.isExcellDwonloading = false;
            $('.excel-report').removeAttr('disabled');
        });
    }
    pdfReportHandler = () => {
        this.isPdfDownloading = false;
        $('.pdf-report').removeAttr('disabled');
    }
    refreshSelectedItems() {
        $('#delete').attr('disabled', 'disabled');
        selectedIds = [];
    };
    onChange(arg) {
        let listIds = Object.keys(arg.sender._selectedIds);
        selectedIds = listIds.map((value) => {
            return parseInt(value);
        });
        if (selectedIds.length === 0) {
            $('#delete').attr('disabled', 'disabled');
        } else {
            $('#delete').removeAttr('disabled');
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
        } else {
            $('#delete').removeAttr('disabled');
        }
    };

    // JQUERY_KENDO
    getTradeList = () => {
        let self = this;
        $("#detail-ledger-list").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                fromCode: self.state.fromCode === null || self.state.fromCode === '' ? 0 : self.state.fromCode,
                                toCode: self.state.toCode === null || self.state.toCode === '' ? 0 : self.state.toCode,
                                title: self.state.title
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
                        GetDetailLedgerService.getDetailledgers(command, function (response) {
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
            toolbar: `<button id="delete" disabled="true">حذف</button>` + excelAndPdfToolbar,
            dataBound: function (e) {
                var scrollOffset = {
                    left: 10000
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
                if (this.dataSource.data().length > 0) {
                    let grid = $("#detail-ledger-list").data("kendoGrid");
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
                $("#detail-ledger-list .k-grid-toolbar .report-area .excel-report").click(function (item) {
                    $('.excel-report').attr('disabled', 'disabled');
                    if (!self.isExcellDwonloading) {
                        self.isExcellDwonloading = true;
                        self.excelReportHandler();
                    }
                });
                $("#detail-ledger-list .k-grid-toolbar .report-area  .pdf-report").click(function (item) {
                    $('.pdf-report').attr('disabled', 'disabled');
                    if (!self.isPdfDownloading) {
                        self.isPdfDownloading = true;
                        self.pdfReportHandler();
                    }
                });
                $("#detail-ledger-list tbody tr td span.edit").on("click", function (item) {
                    var grid = $("#detail-ledger-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.props.history.push(
                        {
                            pathname: self.props.edit.path,
                            state: {
                                stateParams: {
                                    code: dataItem.code,
                                }
                            }
                        }
                    )
                });
                $("#detail-ledger-list tbody tr td span.delete").on("click", function (item) {
                    var grid = $("#detail-ledger-list").data("kendoGrid");
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
            columns: this.state.columns,
            change: self.onChange
        });
    };

    render() {
        return (
            <React.Fragment>

                <Header {...this.props} />
                <Paper className="main-paper-container detail-ledger">
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}>
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={4} className="padding-right-10">
                                    <Input label="عنوان" handleChange={this.handleChangeTitle} value={this.state.title} />
                                </Grid>
                                <Grid item md={2} className="padding-right-10">
                                    <Input label="از کد" handleChange={this.handleChangeFromCode} type="number" min={this.state.toCode} value={this.state.fromCode} />
                                </Grid>
                                <Grid item md={2} className="padding-right-10">
                                    <Input label="تا کد" type="number" min={this.state.fromCode} handleChange={this.handleChangeToCode} value={this.state.toCode} />
                                </Grid>
                            </Grid>
                        </div>
                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="detail-ledger-list" className="height-page"></div>
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
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(GetDetailLedger);