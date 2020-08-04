import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import { Grid } from '@material-ui/core';
import '@progress/kendo-ui';
import Loading from 'core/Loading';
import { Columns4, Columns6 } from '../constants/GetGeneralLedgerBalanceColumn';
import GetGeneralLedgerBalanceService from '../services/GetGeneralLedgerBalanceService';
import GetFiscalYearsService from '../../../../../modules/accounting/accountingBase/fiscalYear/services/GetFiscalYearsService';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Paper from '@material-ui/core/Paper';
import GetEnum from 'services/getEnum';
import moment from 'moment';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import './GetGeneralLedgerBalanceComponent.css';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GetGeneralLedgerService from '../../../accountingBase/generalLedger/services/GetGeneralLedgerService'

const $ = require("jquery");


class GetGeneralLedgerBalanceComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,

      isColumn6: this.props.location.state && this.props.location.state.balanceSheetColumnType ? this.props.location.state.balanceSheetColumnType.code === 2 : false,
      branch: this.props.location.state && this.props.location.state.branch ? this.props.location.state.branch : {
        id: 0
      },
      columns: this.props.location.state && this.props.location.state.balanceSheetColumnType ? this.props.location.state.balanceSheetColumnType.code === 1 ? Columns4(this.props) : Columns6(this.props) : Columns4(this.props),
      balanceSheetColumnType: this.props.location.state && this.props.location.state.balanceSheetColumnType !== undefined ? this.props.location.state.balanceSheetColumnType : {
        code: 1
      },
      fromVoucherNumber: this.props.location.state && this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : '',
      toVoucherNumber: this.props.location.state && this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : '',
      accountBalanceRemainType: this.props.location.state && this.props.location.state.accountBalanceRemainType ? this.props.location.state.accountBalanceRemainType : { code: 1 },
      fromDate: this.props.location.state && this.props.location.state.fromDate ? this.props.location.state.fromDate : moment(new Date()).add(-6, "years"),
      toDate: this.props.location.state && this.props.location.state.toDate ? this.props.location.state.toDate : moment(new Date()),
      costCenter: this.props.location.state && this.props.location.state.costCenter ? this.props.location.state.costCenter : { id: 0 },
      exceptionCatagory: this.props.location.state && this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : [],
      voucherType: this.props.location.state && this.props.location.state.voucherType ? this.props.location.state.voucherType : [],
      fiscalYear: this.props.location.state && this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : {
        id: 0
      },
      isNotConsiderSettlementDays: this.props.location.state && this.props.location.state.isNotConsiderSettlementDays ? this.props.location.state.isNotConsiderSettlementDays : false,
      balanceSheetColumn: {
        name: "balanceSheetColumnType",
        field: "title",
        label: "نوع تراز",
        list: []
      },
      fiscalYearDropDowm: {
        name: "fiscalYear",
        field: "title",
        label: "سال مالی ",
        list: []
      },
      branchDropDowm: {
        name: "branch",
        field: "title",
        label: "شعبه",
        list: []
      },
      fromGeneralLedgerCodeList: {
        name: "fromGeneralLedgerCode",
        field: "fullTitle",
        label: "کد کل از",
        list: []
      },
      fromGeneralLedgerCode: this.props.location.state && this.props.location.state.fromGeneralLedger ? this.props.location.state.fromGeneralLedger : { code: '' },
      toGeneralLedgerCodeList: {
        name: "toGeneralLedgerCode",
        field: "fullTitle",
        label: "کد کل تا",
        list: []
      },
      toGeneralLedgerCode: this.props.location.state && this.props.location.state.toGeneralLedgerCode ? this.props.location.state.toGeneralLedgerCode : { code: '' },
      accountBalanceRemainTypeList: {
        name: "accountBalanceRemainType",
        field: "title",
        label: "مانده",
        list: []
      },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      exceptionCatagoryList: {
        name: "exceptionCatagory",
        field: "code",
        list: []
      },
      voucherTypeList: {
        name: "voucherType",
        field: "title",
        label: "نوع سند",
        list: []
      },
      dataItem: null,
      isLoading: true
    }

    this.isPdfDownloading = false;
    this.isExcellDwonloading = false;
    this.successGetFiscalYears = this.successGetFiscalYears.bind(this);
    this.successGetBalanceSheetColumnType = this.successGetBalanceSheetColumnType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.successGetBranch = this.successGetBranch.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.getGeneralLedgerBalance = this.getGeneralLedgerBalance.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.getFiscalYears = this.getFiscalYears.bind(this);
    this.search = this.search.bind(this);
    this.getExcelReport = this.getExcelReport.bind(this);
    this.getPdfReport = this.getPdfReport.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);

    this.getCommand = this.getCommand.bind(this);
  }

  componentDidMount() {
    this.setState({
      columnsTb: this.state.columns
    })
    this.getFiscalYears();
    GetEnum("balancesheetcolumntype", this.successGetBalanceSheetColumnType);
    GetEnum("getexceptioncategory", (response) => DropDownListDataProvider(this, "exceptionCatagoryList", response));
    GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherTypeList", response));
    GetGeneralLedgerService.getGeneralLedgers({}, (response) => DropDownListDataProvider(this, "fromGeneralLedgerCodeList", response));
    GetGeneralLedgerService.getGeneralLedgers({}, (response) => DropDownListDataProvider(this, "toGeneralLedgerCodeList", response));

    GetEnum("accountbalanceremaintype", (response) => DropDownListDataProvider(this, "accountBalanceRemainTypeList", response, () => {
      this.setState({
        accountBalanceRemainType: response.result.filter(item => { return item.code === this.state.accountBalanceRemainType.code })[0],
        accountBalanceRemainTypeList: {
          name: "accountBalanceRemainType",
          field: "title",
          label: "مانده",
          list: response.result.filter(item => { return item.code !== 4 })
        }
      })
    }));
    GetCostCentersService.getCostCenters({}, (response) => {
      DropDownListDataProvider(this, "costCenterList", response);
    });
    this.getBranches();

  }

  getCommand() {
    var grid = $("#general-ledger-balance").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        // accountCodes: [],
        isNotConsiderSettlementDays: this.state.isNotConsiderSettlementDays,
        fiscalYearId: this.state.fiscalYear.id,
        balanceSheetColumnType: this.state.balanceSheetColumnType.code,
        branchId: this.state.branch ? this.state.branch.id : 0,
        fromVoucherNumber: this.state.fromVoucherNumber !== '' ? Number(this.state.fromVoucherNumber) : 0,
        toVoucherNumber: this.state.toVoucherNumber !== '' ? Number(this.state.toVoucherNumber) : 0,
        fromGeneralLedgerCode: this.state.fromGeneralLedgerCode ? this.state.fromGeneralLedgerCode.code : "",
        toGeneralLedgerCode: this.state.toGeneralLedgerCode ? this.state.toGeneralLedgerCode.codeلهف : "",
        accountBalanceRemainType: this.state.accountBalanceRemainType.code,
        costCenterId: this.state.costCenter ? this.state.costCenter.id : 0,
        vouhcerCategoryExcetionListCode: this.state.exceptionCatagory,
        voucherCategoryInclude: this.state.voucherType.length > 0 ? this.state.voucherType.map((vt) => vt.code) : [],
        dateFilter: {
          startDate: this.state.fromDate,
          endDate: this.state.toDate
        }
      },

      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource ? dataSource.sort() :
          [{
            field: "accountCode",
            dir: "asc"
          }]
      }
    }
    return command;
  }
  getExcelReport() {
    var command = this.getCommand();
    GetGeneralLedgerBalanceService.getExcelExport(command, 'general-ledger-balance', (response) => {
      this.isExcellDwonloading = false;
      $('.excel-report').removeAttr('disabled');
    });
  }

  handleChangeCheck = name => (event) => {
    this.setState({
      isLastLevel: event.target.checked,
      [name]: event.target.checked
    })
  };

  getPdfReport() {
    var command = this.getCommand();

    GetGeneralLedgerBalanceService.getPdfExport(command, "general-pdf", (response) => {
      this.isPdfDownloading = false;
      $('.pdf-report').removeAttr('disabled');
    });
  }

  getGeneralLedgerBalance() {
    let self = this;
    $("#general-ledger-balance").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                isNotConsiderSettlementDays: self.state.isNotConsiderSettlementDays,
                fiscalYearId: self.state.fiscalYear.id,
                balanceSheetColumnType: self.state.balanceSheetColumnType.code,
                branchId: self.state.branch ? self.state.branch.id : 0,
                fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
                toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
                fromGeneralLedgerCode: self.state.fromGeneralLedgerCode ? self.state.fromGeneralLedgerCode.code : "",
                toGeneralLedgerCode: self.state.toGeneralLedgerCode ? self.state.toGeneralLedgerCode.code : "",
                accountBalanceRemainType: self.state.accountBalanceRemainType.code,
                costCenterId: self.state.costCenter ? self.state.costCenter.id : 0,
                vouhcerCategoryExcetionListCode: self.state.exceptionCatagory,
                voucherCategoryInclude: self.state.voucherType.length > 0 ? self.state.voucherType.map((vt) => vt.code) : [],
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
                    field: "accountCode",
                    dir: "asc"
                  }]
              }
            }
            self.setState({
              isLoading: true
            });
            GetGeneralLedgerBalanceService.getNormalGeneralLedgerBalanceSheet(command, function (response) {
              if (response.result == null || response.result.length == 0) {
                response = {
                  result: [],
                  totalRecords: 0
                }
              }
              self.setState({
                isLoading: false
              }, function () {
                option.success(response)
              });
            })
          }
        },
        pageSize: 50,
        sort: {
          field: "created",
          dir: "desc"
        },
        serverPaging: false,
        serverSorting: false,
        schema: {
          data: "result",
          total: "totalRecords",
          model: {
            fields: {
              accountCode: "accountCode",
              accountTitle: "accountTitle",
              debitTurnover: "debitTurnover",
              creditTurnover: "creditTurnover",
              debitSum: "debitSum",
              creditSum: "creditSum",
              debitLeave: "debitLeave",
              creditLeave: "creditLeave"
            }
          }
        },
        aggregate: [
          { field: "debitTurnover", aggregate: "sum" },
          { field: "creditTurnover", aggregate: "sum" },
          { field: "debitSum", aggregate: "sum" },
          { field: "creditSum", aggregate: "sum" },
          { field: "debitLeave", aggregate: "sum" },
          { field: "creditLeave", aggregate: "sum" }]
      },

      autoBind: true,
      sortable: {
        allowUnsort: false
      },
      resizable: true,
      reorderable: true,
      navigatable: false,
      scrollable: true,
      selectable: "multiple, cell",
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
        template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      dataBound: function (e) {

        //   var scrollOffset = {
        //     left:10000 ,
        // };
        //   var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        //   container.scrollLeft(scrollOffset.left);
        if ($("div.k-pager-sm")) {
          $("div.k-pager-sm").removeClass("k-pager-sm");
        }
        if (this.dataSource.data().length > 0) {
          let grid = $("#general-ledger-balance").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
          })
        }
        $("#general-ledger-balance .k-grid-toolbar .report-area .excel-report").click(function (item) {
          $('.excel-report').attr('disabled', 'disabled');
          if (!self.isExcellDwonloading) {
            self.isExcellDwonloading = true;
            self.getExcelReport();
          }

        });
        $("#general-ledger-balance .k-grid-toolbar .report-area  .pdf-report").click(function (item) {

          $('.pdf-report').attr('disabled', 'disabled');
          if (!self.isPdfDownloading) {
            self.isPdfDownloading = true;
            self.getPdfReport();
          }

        });
        $("#general-ledger-balance tbody tr td a.general-account-book").on("click", function (item) {
          var grid = $("#general-ledger-balance").data("kendoGrid");
          var row = $(item.target).closest("tr");
          let dataItem = grid.dataItem(row);

          let params = {
            fromGeneralLedger: {
              fullTitle: dataItem.accountTitle,
              code: dataItem.accountCode
            },
            toGeneralLedger: {
              fullTitle: dataItem.accountTitle,
              code: dataItem.accountCode
            },
            fiscalYear: self.state.fiscalYear,
            fromDate: self.state.fromDate,
            toDate: self.state.toDate,
            branch: self.state.branch,
            balanceSheetColumnType: self.state.balanceSheetColumnType,
            fromVoucherNumber: self.state.fromVoucherNumber,
            toVoucherNumber: self.state.toVoucherNumber,
            costCenter: self.state.costCenter,
            voucherType: self.state.voucherType,
            exceptionCatagory: self.state.exceptionCatagory,
            accountCode: dataItem.accountCode,
            accountBalanceRemainType: self.state.accountBalanceRemainType,
            backButton: { path: self.props.path, title: self.props.title }
          };
          localStorage.setItem("generalLedgerAccountBook", JSON.stringify(params));
          window.open(`${self.props.detail[1].path}?accountCode=${dataItem.accountCode}`,'_self',);

          //OTHER WAY TO OPEN LINKS: without reload but without open in newtab too.

          // if (dataItem.accountCode) {
          //   self.props.history.push(
          //     {
          //       pathname: `/main/accounting/report/getGeneralAccountBook?accountCode=${dataItem.accountCode}`,
          //       state: {
          //         accountCode: dataItem.accountCode,
          //       }
          //     })
          // }

        });
        $("#general-ledger-balance tbody tr td a.account-code").on("click", function (item) {
          var grid = $("#general-ledger-balance").data("kendoGrid");
          var row = $(item.target).closest("tr");

          var dataItem = grid.dataItem(row);

          let params = {
            accountCode: dataItem.accountCode,
            fiscalYear: self.state.fiscalYear,
            fromDate: self.state.fromDate,
            toDate: self.state.toDate,
            branch: self.state.branch,
            balanceSheetColumnType: self.state.balanceSheetColumnType,
            fromVoucherNumber: self.state.fromVoucherNumber,
            toVoucherNumber: self.state.toVoucherNumber,
            accountBalanceRemainType: self.state.accountBalanceRemainType,
            costCenter: self.state.costCenter,
            exceptionCatagory: self.state.exceptionCatagory,
            isNotConsiderSettlementDays: self.state.isNotConsiderSettlementDays,
            voucherType: self.state.voucherType
          };
          localStorage.setItem("generalLedgerAccountCode", JSON.stringify(params));
          window.open(`${self.props.detail[0].path}?accountCode=${dataItem.accountCode}`, '_self');

        });
      },
      columns: self.state.columns
    });


  };

  getFiscalYears() {
    GetFiscalYearsService.getFiscalYears({}, this.successGetFiscalYears);
  }
  successGetBalanceSheetColumnType(response) {
    if (response.success) {
      this.setState({
        balanceSheetColumnType: this.props.location.state && this.props.location.state.balanceSheetColumnType ? this.props.location.state.balanceSheetColumnType : response.result[0],
        balanceSheetColumn: {
          name: "balanceSheetColumnType",
          field: "title",
          label: "نوع تراز",
          list: response.result
        }
      })
    }
  }

  getBranches() {
    var command = {
      optionalFilter: {
        take: 500,
        page: 1
      }
    }
    GetBranchService.getBranchesByFilter(command, this.successGetBranch);
  }

  successGetBranch(response) {
    if (response.result) {
      this.setState({
        branchDropDowm: {
          name: "branch",
          field: "title",
          label: "شعبه",
          list: response.result
        }
      })
    }
  }

  successGetFiscalYears(response) {
    if (response.success) {
      if (this.props.location.state) {

        this.setState({
          fiscalYear: this.props.location.state.fiscalYear,
          fromDate: this.props.location.state.fromDate,
          toDate: this.props.location.state.toDate,
          fiscalYearDropDowm: {
            name: "fiscalYear",
            field: "title",
            label: "سال مالی ",
            list: response.result
          }
        }, function () {
          this.getGeneralLedgerBalance()
        })
      }
      else {
        this.setState({
          fiscalYear: response.result[0],
          fromDate: response.result[0].startDate,
          toDate: new Date(),
          fiscalYearDropDowm: {
            name: "fiscalYear",
            field: "title",
            label: "سال مالی ",
            list: response.result
          }
        }, function () {
          this.getGeneralLedgerBalance()
        })
      }

    }
  }
  handleChangeFiscalYear(value) {
    let item = value.value;
    let today = new Date()
    let enddate = new Date(item.endDate)

    this.setState((state, props) => ({
      fiscalYear: item,
      fromDate: item.startDate,
      toDate: enddate.getTime() > today.getTime() ? today : enddate
    }))
  }

  fromHandleChangeGeneral(value, name) {
    let item = value.value;
    this.setState({
      [name]: item,
      toGeneralLedgerCode: item
    });
  }
  toHandleChangeGeneral(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  };

  handleChange(item, name) {
    this.setState({
      [name]: item.value
    })
  }
  handleChangeDate(item, name) {
    this.setState({
      [name]: item
    })
  }

  handleChangeColumn(item) {
    this.setState({
      columnsTb: this.state.columns,
      balanceSheetColumnType: item.value,
      isColumn6: item.value && item.value.code === 2,
      columns: item.value.code === 1 ? Columns4(this.props) : Columns6(this.props)
    })
  }

  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open

    })
  }

  search() {
    if ($("#general-ledger-balance").data("kendoGrid") !== undefined) {
      if (this.state.columnsTb != this.state.columns) {
        $("#general-ledger-balance").data().kendoGrid.destroy();
        $("#general-ledger-balance").empty();
        this.getGeneralLedgerBalance();
      } else {
        $("#general-ledger-balance").data("kendoGrid").dataSource.read(this);
      }

      this.setState({
        open: false
      })
    }
    else {
      this.getFiscalYears();

    }
  }


  render() {

    return (

      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container general-ledger-balance"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={2}>
                  <DropDownComponent {...this.state.fiscalYearDropDowm}
                    handleChange={(value, name) => this.handleChangeFiscalYear(value)} isFilterable={true}
                    value={this.state.fiscalYear} />
                </Grid>
                <Grid item md={2} >
                  <PersianDatePicker label="از تاریخ" max={this.state.toDate} handleOnChange={(e) => this.handleChangeDate(e, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={2} >
                  <PersianDatePicker label="تا تاریخ" min={this.state.fromDate} handleOnChange={(e) => this.handleChangeDate(e, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>
                <Grid item md={2}>
                  <ComboBoxComponent  {...this.state.branchDropDowm}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                    value={this.state.branch} />
                </Grid>
                <Grid item md={2}>
                  <DropDownComponent {...this.state.balanceSheetColumn}
                    handleChange={(value, name) => this.handleChangeColumn(value)} isFilterable={false}
                    value={this.state.balanceSheetColumnType} />
                </Grid>
                <Grid item md={2}>
                  <ComboBoxComponent isFilterable {...this.state.costCenterList}
                    handleChange={(value, name) => this.handleChange(value, name)}
                    value={this.state.costCenter} />
                </Grid>

                <Grid item md={2}>
                  <ComboBoxComponent isFilterable {...this.state.fromGeneralLedgerCodeList}
                    handleChange={(value, name) => this.fromHandleChangeGeneral(value, name)}
                    value={this.state.fromGeneralLedgerCode} />
                </Grid>
                <Grid item md={2}>
                  <ComboBoxComponent isFilterable {...this.state.toGeneralLedgerCodeList}
                    handleChange={(value, name) => this.toHandleChangeGeneral(value, name)}
                    value={this.state.toGeneralLedgerCode} />
                </Grid>
                <Grid item md={2} >
                  <NumberFormatComponent id="fromVoucherNumber" label="شماره سند از"
                    value={this.state.fromVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'fromVoucherNumber')} type="number" />
                </Grid>
                <Grid item md={2} >
                  <NumberFormatComponent id="toVoucherNumber" label="شماره سند تا"
                    value={this.state.toVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'toVoucherNumber')} type="number" />
                </Grid>


                <Grid item md={2}>
                  <DropDownComponent {...this.state.accountBalanceRemainTypeList}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                    value={this.state.accountBalanceRemainType} />
                </Grid>
                <Grid item md={12}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.voucherTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherType} />
                  </div>
                </Grid>

              </Grid>
              <Grid container spacing={8} className="no-margin">
                <CheckBoxList {...this.state.exceptionCatagoryList} value={this.state.exceptionCatagory} handleChange={(value, name) => this.handleChange(value, name)} />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.isNotConsiderSettlementDays}
                      onChange={this.handleChangeCheck('isNotConsiderSettlementDays')}
                      value="isLastLevel"
                      color="primary"
                    />
                  }
                  label="فاقد معاملات آخر"
                />
              </Grid>
            </div>

          </Filter>
          {this.state.isLoading ? <Loading /> : ''}
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
            <div id="general-ledger-balance" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment >

    )
  }
}


export default GetGeneralLedgerBalanceComponent;