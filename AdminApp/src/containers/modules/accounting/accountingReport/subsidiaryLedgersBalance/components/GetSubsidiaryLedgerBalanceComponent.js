import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import { Grid } from '@material-ui/core';
import kendo from '@progress/kendo-ui';
import Loading from 'core/Loading';
import { Columns4, Columns6 } from '../constants/GetSubsidiaryLedgerBalanceColumn';
import GetSubsidiaryLedgerBalanceService from '../services/GetSubsidiaryLedgerBalanceService';
import GetFiscalYearsService from '../../../../../modules/accounting/accountingBase/fiscalYear/services/GetFiscalYearsService';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Paper from '@material-ui/core/Paper';
import GetEnum from 'services/getEnum';
import moment from 'moment';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetSubsidiaryLedgerService from '../../../accountingBase/subsidaryLedger/services/GetSubsidiaryLedgerService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetGeneralLedgerService from '../../../accountingBase/generalLedger/services/GetGeneralLedgerService'
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import './GetSubsidiaryLedgerBalanceComponent.css'
import { GetMultiSelectElement } from '../../../../../../core/getMultiSelectElement';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import { GetDropDownElement } from '../../../../../../core/getMultiSelectElement';
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const $ = require("jquery");



class GetSubsidaryLedgerBalance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isColumn6: false,
      branch: { id: 0 },
      balanceSheetColumnType: { code: 1 },
      isNotConsiderSettlementDays: false,
      fromVoucherNumber: '',
      toVoucherNumber: '',
      accountBalanceRemainType: { code: 0 },
      costCenter: { id: 0 },
      fromSubsidiaryLedger: { code: 0 },
      toSubsidiaryLedger: { code: 0 },
      fromDate: moment(new Date()),
      toDate: moment(new Date()),
      accountcodesForApi: [],
      accountCodes: [],
      accountBalanceRemainTypeList: {
        name: "accountBalanceRemainType",
        field: "title",
        label: "مانده",
        list: []
      },
      balanceSheetColumn: {
        name: "balanceSheetColumnType",
        field: "title",
        label: "نوع تراز",
        list: []
      },
      fiscalYear: { code: 0 },
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
      fromSubsidiaryLedgerCodeList: {
        name: "fromSubsidiaryLedger",
        field: "fullTitle",
        label: "کد معین از",
        list: []
      },
      toSubsidiaryLedgerCodeList: {
        name: "toSubsidiaryLedger",
        field: "fullTitle",
        label: "کد معین تا",
        list: []
      },
      fromGeneralLedgerCodeList: {
        name: "fromGeneralLedgerCode",
        field: "fullTitle",
        label: "کد کل از",
        list: []
      },
      fromGeneralLedgerCode: { code: '' },
      toGeneralLedgerCodeList: {
        name: "toGeneralLedgerCode",
        field: "fullTitle",
        label: "کد کل تا",
        list: []
      },
      toGeneralLedgerCode: { code: '' },
      accountCodesList: {
        name: "accountCodes",
        field: "fullTitle",
        label: "کدهای کل",
        list: []
      },
      voucherTypeList: {
        name: "voucherType",
        field: "title",
        label: "نوع سند",
        list: []
      },
      voucherType: [],
      exceptionCatagory: [],
      exceptionCatagoryList: {
        name: "exceptionCatagory",
        field: "code",
        list: []
      },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      open: false,
      columns: Columns4(),
      columnsTb: Columns4(),
      isParameter: false,
      isLoading: true
    }

    this.isPdfDownloading = false;
    this.isExcellDwonloading = false;

    this.response = {};
    this.successGetFiscalYears = this.successGetFiscalYears.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.getFiscalYears = this.getFiscalYears.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.getExcelReport = this.getExcelReport.bind(this);
    this.getPdfReport = this.getPdfReport.bind(this);
    this.getCommand = this.getCommand.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
  }

  componentDidMount() {
    let listParams = window.location.href.slice(window.location.href.indexOf('?') + 1).split("=");
    if (listParams.length == 1) {
      localStorage.removeItem("generalLedgerAccountCode");
      if (this.props.location.state) {
        this.setState({
          isColumn6: this.props.location.state.balanceSheetColumnType ? this.props.location.state.balanceSheetColumnType.code === 2 : false,
          branch: this.props.location.state.branch ? this.props.location.state.branch : this.state.branch,
          balanceSheetColumnType: this.props.location.state.balanceSheetColumnType ? this.props.location.state.balanceSheetColumnType : this.state.balanceSheetColumnType,
          isNotConsiderSettlementDays: this.props.location.state.isNotConsiderSettlementDays ? this.props.location.state.isNotConsiderSettlementDays : this.state.isNotConsiderSettlementDays,
          fromVoucherNumber: this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : this.state.fromVoucherNumber,
          toVoucherNumber: this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : this.state.toVoucherNumber,
          accountBalanceRemainType: this.props.location.state.accountBalanceRemainType ? this.props.location.state.accountBalanceRemainType : this.state.accountBalanceRemainType,
          costCenter: this.props.location.state.costCenter ? this.props.location.state.costCenter : this.state.costCenter,
          fromSubsidiaryLedger: this.props.location.state.fromSubsidiaryLedger ? this.props.location.state.fromSubsidiaryLedger : this.state.fromSubsidiaryLedger,
          toSubsidiaryLedger: this.props.location.state.toSubsidiaryLedger ? this.props.location.state.toSubsidiaryLedger : this.state.toSubsidiaryLedger,
          fromDate: this.props.location.state.fromDate ? this.props.location.state.fromDate : this.state.fromDate,
          toDate: this.props.location.state.toDate ? this.props.location.state.toDate : this.state.toDate,
          fiscalYear: this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : this.state.fiscalYear,
          voucherType: this.props.location.state.voucherType ? this.props.location.state.voucherType : this.state.voucherType,
          exceptionCatagory: this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : this.state.exceptionCatagory,
          columns: this.props.location.state.balanceSheetColumn ? this.props.location.state.balanceSheetColumn.code === 1 ? Columns4() : Columns6() : Columns4()
        }, () => {
          this.getDropDownData();
        })
      } else {
        this.getDropDownData();
      }
    } else {
      let params = JSON.parse(localStorage.getItem("generalLedgerAccountCode"));
      this.setState({
        isColumn6: params.balanceSheetColumnType.code === 2,
        isParameter: true,
        accountCode: params.accountCode,
        balanceSheetColumnType: params.balanceSheetColumnType,
        isNotConsiderSettlementDays: params.isNotConsiderSettlementDays,
        fiscalYear: params.fiscalYear,
        fromDate: params.fromDate,
        toDate: params.toDate,
        branch: params.branch,
        fromVoucherNumber: params.fromVoucherNumber,
        toVoucherNumber: params.toVoucherNumber,
        accountBalanceRemainType: params.accountBalanceRemainType,
        costCenter: params.costCenter,
        exceptionCatagory: params.exceptionCatagory,
        columns: params.balanceSheetColumnType.code === 1 ? Columns4() : Columns6(),
        columnsTb: params.balanceSheetColumnType.code === 1 ? Columns4() : Columns6()
      }, () => {
        this.getDropDownData();
      });
    }
  }

  getDropDownData = () => {
    let defaultCommand = {
      entity: ""
    };

    GetEnum("balancesheetcolumntype", (response) => {

      DropDownListDataProvider(this, "balanceSheetColumn", response, () => {

        if (!this.state.isParameter && !this.props.location.state) {
          this.setState({
            balanceSheetColumnType: response.result[0]
          })
        }
      });
    });
    GetCostCentersService.getCostCenters({}, (response) => {
      DropDownListDataProvider(this, "costCenterList", response);
    });
    GetEnum("getexceptioncategory", (response) => DropDownListDataProvider(this, "exceptionCatagoryList", response));
    GetEnum("accountbalanceremaintype", (response) => DropDownListDataProvider(this, "accountBalanceRemainTypeList", response));
    this.getBranches();
    GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherTypeList", response));
    GetSubsidiaryLedgerService.getsubsidiaryledgers(defaultCommand, (response) => {
      DropDownListDataProvider(this, "fromSubsidiaryLedgerCodeList", response)
      DropDownListDataProvider(this, "toSubsidiaryLedgerCodeList", response);
    });
    GetGeneralLedgerService.getGeneralLedgers(defaultCommand, (response) => {
      DropDownListDataProvider(this, "fromGeneralLedgerCodeList", response);
      DropDownListDataProvider(this, "toGeneralLedgerCodeList", response);
      DropDownListDataProvider(this, "accountCodesList", response);
      if (this.state.isParameter) {
        GetMultiSelectElement(this, this.state, "accountCode", "accountCodes", response);
      }
      else if (this.props.location.state && this.props.location.state.accountCode) {
        GetMultiSelectElement(this, this.props.location.state, "accountCode", "accountCodes", response)
      }
      this.getFiscalYears();
    });

  }

  handleChangeCheck = name => (event) => {
    this.setState({
      isLastLevel: event.target.checked,
      [name]: event.target.checked
    })

  };

  getCommand() {
    var grid = $("#subsidiary-ledger-balance").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {


      reportFilter: {
        isNotConsiderSettlementDays: this.state.isNotConsiderSettlementDays,
        fromGeneralLedgerCode: this.state.fromGeneralLedgerCode.code,
        toGeneralLedgerCode: this.state.toGeneralLedgerCode.code,
        accountCodes: this.state.accountCodes.length > 0 ? this.state.accountCodes.map(ac => ac.code) : [],
        vouhcerCategoryExcetionListCode: this.state.exceptionCatagory,
        voucherCategoryInclude: this.state.voucherType.length > 0 ? this.state.voucherType.map((vt) => vt.code) : [],
        fiscalYearId: this.state.fiscalYear.id,
        balanceSheetColumnType: this.state.balanceSheetColumnType.code,
        branchId: this.state.branch ? this.state.branch.id : 0,
        fromVoucherNumber: this.state.fromVoucherNumber !== '' ? this.state.fromVoucherNumber : null,
        toVoucherNumber: this.state.toVoucherNumber !== '' ? this.state.toVoucherNumber : null,
        accountBalanceRemainType: this.state.accountBalanceRemainType.code,
        costCenterId: this.state.costCenter ? this.state.costCenter.id : 0,
        fromSubsidiaryLedgerCode: this.state.fromSubsidiaryLedger ? this.state.fromSubsidiaryLedger.code : '',
        toSubsidiaryLedgerCode: this.state.toSubsidiaryLedger ? this.state.toSubsidiaryLedger.code : '',
        dateFilter: {
          startDate: this.state.fromDate,
          endDate: this.state.toDate
        }
      },
      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
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
    GetSubsidiaryLedgerBalanceService.getExcelExport(command, 'subsiadary-ledger-balance', (response) => {
      this.isExcellDwonloading = false;
      $('.excel-report').removeAttr('disabled');
    });
  }
  getPdfReport() {
    var command = this.getCommand();
    GetSubsidiaryLedgerBalanceService.getPdfExport(command, 'subsiadary-pdf', (response) => {
      this.isPdfDownloading = false;
      $('.pdf-report').removeAttr('disabled');
    });

  }
  getNormalSubsidiaryLedgerBalanceSheet() {
    let self = this;
    $("#subsidiary-ledger-balance").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                isNotConsiderSettlementDays: self.state.isNotConsiderSettlementDays,
                fromGeneralLedgerCode: self.state.fromGeneralLedgerCode.code,
                toGeneralLedgerCode: self.state.toGeneralLedgerCode.code,
                accountCodes: self.state.accountCodes.length > 0 ? self.state.accountCodes.map(ac => ac.code) : [],
                vouhcerCategoryExcetionListCode: self.state.exceptionCatagory,
                voucherCategoryInclude: self.state.voucherType.length > 0 ? self.state.voucherType.map((vt) => vt.code) : [],
                fiscalYearId: self.state.fiscalYear.id,
                balanceSheetColumnType: self.state.balanceSheetColumnType.code,
                branchId: self.state.branch ? self.state.branch.id : 0,
                fromVoucherNumber: self.state.fromVoucherNumber !== '' ? self.state.fromVoucherNumber : null,
                toVoucherNumber: self.state.toVoucherNumber !== '' ? self.state.toVoucherNumber : null,
                accountBalanceRemainType: self.state.accountBalanceRemainType.code,
                costCenterId: self.state.costCenter ? self.state.costCenter.id : 0,
                fromSubsidiaryLedgerCode: self.state.fromSubsidiaryLedger ? self.state.fromSubsidiaryLedger.code : '',
                toSubsidiaryLedgerCode: self.state.toSubsidiaryLedger ? self.state.toSubsidiaryLedger.code : '',
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
            GetSubsidiaryLedgerBalanceService.getNormalSubsidiaryLedgerBalanceSheet(command, function (response) {
              if (response.result && response.result.length > 0) {
                self.response = {
                  totalCreditLeave: response.totalCreditLeave,
                  totalCreditSum: response.totalCreditSum,
                  totalCreditTurnover: response.totalCreditTurnover,
                  totalDebitLeave: response.totalDebitLeave,
                  totalDebitSum: response.totalDebitSum,
                  totalDebitTurnover: response.totalDebitTurnover
                };

              } else {
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
          field: "accountCode",
          dir: "asc"
        },
        serverPaging: true,
        serverSorting: true,
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
          let grid = $("#subsidiary-ledger-balance").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
          });
          //if (index === this.dataSource.data().length - 1) {
          // currentRow.css({ display: 'none', visibility: 'hidden' });

          $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-debit-sum").text(kendo.toString(self.response.totalDebitSum, 'n0'));

          $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-credit-sum").text(kendo.toString(self.response.totalCreditSum, 'n0'));

          $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-debit-leave").text(kendo.toString(self.response.totalDebitLeave, 'n0'));

          $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-credit-leave").text(kendo.toString(self.response.totalCreditLeave, 'n0'));

          $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-debit-turnover").text(kendo.toString(self.response.totalDebitTurnover, 'n0'));

          $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-credit-turnover").text(kendo.toString(self.response.totalCreditTurnover, 'n0'));
          // }
          //else {

          // }

        };

        $("#subsidiary-ledger-balance .excel-report").on("click", function (item) {
          $('.excel-report').attr('disabled', 'disabled');
          if (!self.isExcellDwonloading) {
            self.isExcellDwonloading = true;
            self.getExcelReport();
          }
        });
        $("#subsidiary-ledger-balance .pdf-report").on("click", function (item) {
          $('.pdf-report').attr('disabled', 'disabled');
          if (!self.isPdfDownloading) {
            self.isPdfDownloading = true;
            self.getPdfReport();
          }
        });
        $("#subsidiary-ledger-balance tbody tr td span.subsidiary-account-book").on("click", function (item) {

          var grid = $("#subsidiary-ledger-balance").data("kendoGrid");
          var row = $(item.target).closest("tr");
          let dataItem = grid.dataItem(row);

          let params = {
            fromSubsidiaryLedger: {
              id: dataItem.accountId,
              fullTitle: dataItem.accountTitle,
              code: dataItem.accountCode
            },
            toSubsidiaryLedger: {
              id: dataItem.accountId,
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
            accountBalanceRemainType: self.state.accountBalanceRemainType,
            backButton: { path: self.props.path, title: self.props.title }
          };
          localStorage.setItem("subsidiaryLedgerAccountBook", JSON.stringify(params));
          window.open(`${self.props.detail[1].path}?accountCode=${dataItem.accountCode}`);

          // self.props.history.push(
          //   {
          //     pathname: self.props.detail[1].path,
          //     state: self.props.location.state === undefined ? {
          //       backButton: { path: self.props.path, title: self.props.title },
          //       fiscalYear: self.state.fiscalYear,
          //       fromDate: self.state.fromDate,
          //       toDate: self.state.toDate,
          //       branch: self.state.branch,
          //       balanceSheetColumn: self.state.balanceSheetColumnType,
          //       fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
          //       toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
          //       accountBalanceRemainType: self.state.accountBalanceRemainType,
          //       costCenter: self.state.costCenter,
          //       exceptionCatagory: self.state.exceptionCatagory,
          //       voucherType: self.state.voucherType,
          //       fromSubsidiaryLedger: {
          //         fullTitle: dataItem.accountTitle,
          //         id: dataItem.accountId,
          //         code: dataItem.accountCode
          //       },
          //       toSubsidiaryLedger: {
          //         fullTitle: dataItem.accountTitle,
          //         id: dataItem.accountId,
          //         code: dataItem.accountCode
          //       }
          //     } :
          //       self.props.location.state && self.props.location.state.accountCode !== undefined ? {
          //         backButton: { path: self.props.path, title: self.props.title },
          //         fiscalYear: self.state.fiscalYear,
          //         fromDate: self.state.fromDate,
          //         toDate: self.state.toDate,
          //         branch: self.state.branch,
          //         balanceSheetColumn: self.state.balanceSheetColumn,
          //         fromVoucherNumber: self.state.fromVoucherNumber,
          //         toVoucherNumber: self.state.toVoucherNumber,
          //         accountBalanceRemainType: self.state.accountBalanceRemainType,
          //         costCenter: self.state.costCenter,
          //         exceptionCatagory: self.state.exceptionCatagory,
          //         voucherType: self.state.voucherType,
          //         accountCode: self.props.location.state.accountCode,
          //         fromSubsidiaryLedger: {
          //           id: dataItem.accountId,
          //           fullTitle: dataItem.accountTitle,
          //           code: dataItem.accountCode
          //         },
          //         toSubsidiaryLedger: {
          //           id: dataItem.accountId,
          //           fullTitle: dataItem.accountTitle,
          //           code: dataItem.accountCode
          //         }
          //       } :
          //         {
          //           backButton: { path: self.props.path, title: self.props.title },
          //           fiscalYear: self.state.fiscalYear,
          //           fromDate: self.state.fromDate,
          //           toDate: self.state.toDate,
          //           branch: self.state.branch,
          //           balanceSheetColumn: self.state.balanceSheetColumn,
          //           fromVoucherNumber: self.state.fromVoucherNumber,
          //           toVoucherNumber: self.state.toVoucherNumber,
          //           accountBalanceRemainType: self.state.accountBalanceRemainType,
          //           costCenter: self.state.costCenter,
          //           exceptionCatagory: self.state.exceptionCatagory,
          //           voucherType: self.state.voucherType,
          //           fromSubsidiaryLedger: {
          //             id: dataItem.accountId,
          //             fullTitle: dataItem.accountTitle,
          //             code: dataItem.accountCode
          //           },
          //           toSubsidiaryLedger: {
          //             id: dataItem.accountId,
          //             fullTitle: dataItem.accountTitle,
          //             code: dataItem.accountCode
          //           }
          //         }
          //   })
        });
        $("#subsidiary-ledger-balance tbody tr td span.account-code").on("click", function (item) {

          var grid = $("#subsidiary-ledger-balance").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);

          let params = {
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
            voucherType: self.state.voucherType,
            accountCode: dataItem.accountCode,
            fromSubsidiaryLedger: {
              title: dataItem.accountTitle,
              code: dataItem.accountCode
            },
            toSubsidiaryLedger: {
              title: dataItem.accountTitle,
              code: dataItem.accountCode
            }
          };

          // if (self.state.accountCode) {
          //   params.generalLedgerCode = self.state.accountCode
          // }
          localStorage.setItem("subsidiaryLedgerAccountCode", JSON.stringify(params));
          window.open(`${self.props.detail[0].path}?accountCode=${dataItem.accountCode}`);

          // self.props.history.push(
          //   {
          //     pathname: self.props.detail[0].path,
          //     state: self.props.location.state === undefined ?
          //       {
          //         fiscalYear: self.state.fiscalYear,
          //         fromDate: self.state.fromDate,
          //         toDate: self.state.toDate,
          //         branch: self.state.branch,
          //         balanceSheetColumn: self.state.balanceSheetColumnType,
          //         fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
          //         toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
          //         accountBalanceRemainType: self.state.accountBalanceRemainType,
          //         costCenter: self.state.costCenter,
          //         exceptionCatagory: self.state.exceptionCatagory,
          //         voucherType: self.state.voucherType,

          //         fromSubsidiaryLedger: {
          //           fullTitle: dataItem.accountTitle,
          //           code: dataItem.accountCode
          //         },
          //         toSubsidiaryLedger: {
          //           fullTitle: dataItem.accountTitle,
          //           code: dataItem.accountCode
          //         }
          //       }
          //       :
          //       self.props.location.state && self.props.location.state.accountCode !== undefined ? {

          //         fiscalYear: self.state.fiscalYear,
          //         fromDate: self.state.fromDate,
          //         toDate: self.state.toDate,
          //         branch: self.state.branch,
          //         balanceSheetColumn: self.state.balanceSheetColumnType,
          //         fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
          //         toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
          //         accountBalanceRemainType: self.state.accountBalanceRemainType,
          //         costCenter: self.state.costCenter,
          //         exceptionCatagory: self.state.exceptionCatagory,
          //         voucherType: self.state.voucherType,
          //         accountCode: self.props.location.state.accountCode,

          //         fromSubsidiaryLedger: {
          //           fullTitle: dataItem.accountTitle,
          //           code: dataItem.accountCode
          //         },
          //         toSubsidiaryLedger: {
          //           fullTitle: dataItem.accountTitle,
          //           code: dataItem.accountCode
          //         }
          //       } :

          //         {

          //           fiscalYear: self.state.fiscalYear,
          //           fromDate: self.state.fromDate,
          //           toDate: self.state.toDate,
          //           branch: self.state.branch,
          //           balanceSheetColumn: self.state.balanceSheetColumnType,
          //           fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
          //           toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
          //           accountBalanceRemainType: self.state.accountBalanceRemainType,
          //           costCenter: self.state.costCenter,
          //           exceptionCatagory: self.state.exceptionCatagory,
          //           voucherType: self.state.voucherType,

          //           fromSubsidiaryLedger: {
          //             fullTitle: dataItem.accountTitle,
          //             code: dataItem.accountCode
          //           },
          //           toSubsidiaryLedger: {
          //             fullTitle: dataItem.accountTitle,
          //             code: dataItem.accountCode
          //           }
          //         }



          //   })
        });
      },
      columns: self.state.columns
    });
  }

  getFiscalYears() {
    GetFiscalYearsService.getFiscalYears({}, this.successGetFiscalYears);
  }
  getBranches() {
    var command = {
      optionalFilter: {
        take: 500,
        page: 1

      }
    }
    GetBranchService.getBranchesByFilter(command, (response) => {
      DropDownListDataProvider(this, "branchDropDowm", response);
      GetDropDownElement(this, this.state, "branch", "branch", response, "id")
    });
  }
  successGetFiscalYears(response) {
    if (response.success) {
      if (this.state.isParameter || this.props.location.state) {
        this.setState({
          fiscalYear: this.state.fiscalYear,
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          fiscalYearDropDowm: {
            name: "fiscalYear",
            field: "title",
            label: "سال مالی ",
            list: response.result
          }
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
        })
      }
      this.getNormalSubsidiaryLedgerBalanceSheet();
    }
  }
  handleChangeFiscalYear(value) {
    let item = value.value;
    let today = new Date()
    let enddate = new Date(item.endDate)
    this.setState({
      fiscalYear: item,
      fromDate: item.startDate,
      toDate: enddate.getTime() > today.getTime() ? today : enddate
    })
  }

  handleChange(item, name) {

    this.setState({
      [name]: item.value
    })
  }
  fromHandleChangeSubsidiary(value, name) {
    let item = value.value;
    this.setState({
      [name]: item,
      toSubsidiaryLedger: item,
    });
  }
  toHandleChangeSubsidiary(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  };

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
      columns: item.value.code === 1 ? Columns4() : Columns6()
    }, function () {

    })
  }

  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  search() {
    if ($("#subsidiary-ledger-balance").data("kendoGrid") !== undefined) {
      if (this.state.columnsTb != this.state.columns) {
        $("#subsidiary-ledger-balance").data().kendoGrid.destroy();
        $("#subsidiary-ledger-balance").empty();
        this.getNormalSubsidiaryLedgerBalanceSheet();
      } else {
        $("#subsidiary-ledger-balance").data("kendoGrid").dataSource.read(this);
      }
      this.setState({
        open: false
      })
    }
    else {
      this.getFiscalYears();
      // $("#subsidiary-ledger-balance").data("kendoGrid").dataSource.read(this);
    }
  }

  render() {
    return (
      <React.Fragment>

        <Header {...this.props} backParams={
          !this.state.isParameter && !this.props.location.state ? undefined : {
            fiscalYear: this.state.fiscalYear,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            branch: this.state.branch,
            balanceSheetColumnType: this.state.balanceSheetColumnType,
            fromVoucherNumber: this.state.fromVoucherNumber,
            toVoucherNumber: this.state.toVoucherNumber,
            accountBalanceRemainType: this.state.accountBalanceRemainType,
            costCenter: this.state.costCenter,
            exceptionCatagory: this.state.exceptionCatagory,
            voucherType: this.state.voucherType,
            isNotConsiderSettlementDays: this.state.isNotConsiderSettlementDays
          }
        } />
        <Paper className="main-paper-container subsidiary-ledger-balance">
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
                  <ComboBoxComponent {...this.state.branchDropDowm}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                    value={this.state.branch} />
                </Grid>
                <Grid item md={2}>
                  <DropDownComponent {...this.state.balanceSheetColumn}
                    handleChange={(value, name) => this.handleChangeColumn(value, name)}
                    value={this.state.balanceSheetColumnType} />
                </Grid>
                <Grid item md={2}>
                  <DropDownComponent {...this.state.accountBalanceRemainTypeList}
                    handleChange={(value, name) => this.handleChange(value, name)}
                    value={this.state.accountBalanceRemainType} />
                </Grid>
                <Grid item md={6}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.voucherTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherType} />
                  </div>
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
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.costCenterList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.costCenter} />
                  </div>
                </Grid>


                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromSubsidiaryLedgerCodeList}
                      handleChange={(value, name) => this.fromHandleChangeSubsidiary(value, name)}
                      value={this.state.fromSubsidiaryLedger} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.toSubsidiaryLedgerCodeList}
                      handleChange={(value, name) => this.toHandleChangeSubsidiary(value, name)}
                      value={this.state.toSubsidiaryLedger} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromGeneralLedgerCodeList}
                      handleChange={(value, name) => this.fromHandleChangeGeneral(value, name)}
                      value={this.state.fromGeneralLedgerCode} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.toGeneralLedgerCodeList}
                      handleChange={(value, name) => this.toHandleChangeGeneral(value, name)}
                      value={this.state.toGeneralLedgerCode} />
                  </div>
                </Grid>
                <Grid item md={12}>
                  <div className="k-rtl">
                    <MultiSelectComponent {...this.state.accountCodesList}
                      handleChange={(value, name) => this.handleChange(value, name)} isFilterable
                      value={this.state.accountCodes} />
                  </div>
                </Grid>
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
            <div id="subsidiary-ledger-balance" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>
    )
  }
}


export default GetSubsidaryLedgerBalance;
