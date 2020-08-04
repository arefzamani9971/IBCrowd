import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import { Grid } from '@material-ui/core';
import kendo from '@progress/kendo-ui';
import Loading from 'core/Loading';
import { Columns4, Columns6 } from '../constants/GetDetailLedgerBalanceColumn';
import GetFiscalYearsService from '../../../../../modules/accounting/accountingBase/fiscalYear/services/GetFiscalYearsService';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Paper from '@material-ui/core/Paper';
import GetEnum from 'services/getEnum';
import moment from 'moment';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetDetailLedgerBalanceService from '../services/GetDetailLedgerBalanceService';
import GetSubsidiaryLedgerService from '../../../accountingBase/subsidaryLedger/services/GetSubsidiaryLedgerService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import './GetDetailLedgerBalanceComponent.css';
import { GetDropDownElement } from '../../../../../../core/getMultiSelectElement';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import AutoCompleteComponent from "shared/components/dropDown/autocomplete";
import { detailLedgerTemplate, detailLedgerHeaderTemplate } from '../../../../../../constants/autoCompleteTemplate';
import GetDetailLedgerService from '../../../accountingBase/detailLedger/services/GetDetailLedgerService';
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const $ = require("jquery");


class GetDetailLedgerBalance extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isColumn6: false,
      branch: {
        id: 0
      },
      balanceSheetColumnType: {
        code: 1
      },
      fromVoucherNumber: '',
      toVoucherNumber: '',
      accountBalanceRemainType: { id: 0 },
      costCenter: { id: 0 },
      voucherType: [],
      exceptionCatagory: [],
      fromSubsidiaryLedger: { fulltitle: '', code: '' },
      toSubsidiaryLedger: { fulltitle: '', code: '' },
      fromDate: moment(new Date),
      toDate: moment(new Date),
      isNotConsiderSettlementDays: false,
      fromDetailLedger: { id: '', title: '' },
      toDetailLedger: { id: '', title: '' },
      accountBalanceRemainTypeList: {
        name: "accountBalanceRemainType",
        field: "title",
        label: "مانده",
        list: []
      },
      fiscalYear: { code: 0 },
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
      voucherTypeList: {
        name: "voucherType",
        field: "title",
        label: "نوع سند",
        list: []
      },
      exceptionCatagoryList: {
        name: "exceptionCatagory",
        field: "code",
        list: []
      },
      mainClassId: { id: 0 },
      mainClassIdList: {
        name: "mainClassId",
        label: "گروه تفصیل",
        field: "title",
        list: []
      },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      open: false,
      isParameter: false,
      columns: Columns4(),
      isLoading: true
    }

    this.isPdfDownloading = false;
    this.isExcellDwonloading = false;
    this.response = {};
    this.successGetFiscalYears = this.successGetFiscalYears.bind(this);
    this.successGetBalanceSheetColumnType = this.successGetBalanceSheetColumnType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.successGetBranch = this.successGetBranch.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.getExcelReport = this.getExcelReport.bind(this);
    this.getPdfReport = this.getPdfReport.bind(this);
    this.getCommand = this.getCommand.bind(this);
    this.getFiscalYears = this.getFiscalYears.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.search = this.search.bind(this);

  }

  componentDidMount() {
    let listParams = window.location.href.slice(window.location.href.indexOf('?') + 1).split("=");
    if (listParams.length == 1) {
      localStorage.removeItem("subsidiaryLedgerAccountCode");
      if (this.props.location.state) {
        this.setState({
          isColumn6: this.props.location.state.balanceSheetColumnType ? this.props.location.state.balanceSheetColumnType.code === 2 : false,
          branch: this.props.location.state.branch ? this.props.location.state.branch : this.state.branch,
          balanceSheetColumnType: this.props.location.state.balanceSheetColumnType ?
            this.props.location.state.balanceSheetColumnType : this.state.balanceSheetColumnType,
          fromVoucherNumber: this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : this.state.fromVoucherNumber,
          toVoucherNumber: this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : this.state.toVoucherNumber,
          accountBalanceRemainType: this.props.location.state.accountBalanceRemainType ? this.props.location.state.accountBalanceRemainType : this.state.accountBalanceRemainType,
          costCenter: this.props.location.state.costCenter ? this.props.location.state.costCenter : this.state.costCenter,
          voucherType: this.props.location.state.voucherType ? this.props.location.state.voucherType : this.state.voucherType,
          exceptionCatagory: this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : this.state.exceptionCatagory,
          fromSubsidiaryLedger: this.props.location.state.fromSubsidiaryLedger ? this.props.location.state.fromSubsidiaryLedger : this.state.fromSubsidiaryLedger,
          toSubsidiaryLedger: this.props.location.state.toSubsidiaryLedger ? this.props.location.state.toSubsidiaryLedger : this.state.toSubsidiaryLedger,
          fromDetailLedger: this.props.location.state.fromDetailLedger ? this.props.location.state.fromDetailLedger : this.state.fromDetailLedger,
          toDetailLedger: this.props.location.state.toDetailLedger ? this.props.location.state.toDetailLedger : this.state.toDetailLedger,
          fromDate: this.props.location.state.fromDate ? this.props.location.state.fromDate : this.state.fromDate,
          toDate: this.props.location.state.toDate ? this.props.location.state.toDate : this.state.toDate,
          isNotConsiderSettlementDays: this.props.location.state.isNotConsiderSettlementDays ? this.props.location.state.isNotConsiderSettlementDays : this.state.isNotConsiderSettlementDays,
          fiscalYear: this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : this.state.fiscalYear,
          columns: this.props.location.state.balanceSheetColumnType ?
            this.props.location.state.balanceSheetColumnType.code === 1 ? Columns4() : Columns6() : Columns4()
        }, () => {
          
          this.getDropDownData();
        })
      } else {
        this.getDropDownData();
      }
    } else {
      let params = JSON.parse(localStorage.getItem("subsidiaryLedgerAccountCode"));
      console.log(params);
      this.setState({
        isColumn6: params.balanceSheetColumnType.code === 2,
        isParameter: true,
        accountCode: params.accountCode,
        balanceSheetColumnType: params.balanceSheetColumnType,
        fromSubsidiaryLedger: params.fromSubsidiaryLedger,
        toSubsidiaryLedger: params.toSubsidiaryLedger,
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
        console.log(this.state);
        this.getDropDownData();
      });
    }

  }

  getDropDownData() {
    let defaultCommand = {
      entity: ""
    }

    GetEnum("balancesheetcolumntype", this.successGetBalanceSheetColumnType);
    GetEnum("getexceptioncategory", (response) => DropDownListDataProvider(this, "exceptionCatagoryList", response));
    GetEnum("accountbalanceremaintype", (response) => DropDownListDataProvider(this, "accountBalanceRemainTypeList", response));
    this.getBranches();
    GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherTypeList", response));
    GetSubsidiaryLedgerService.getsubsidiaryledgers(defaultCommand, (response) => {
      DropDownListDataProvider(this, "fromSubsidiaryLedgerCodeList", response);
      DropDownListDataProvider(this, "toSubsidiaryLedgerCodeList", response);

      if (this.state.isParameter) {
        GetDropDownElement(this, this.state, "accountCode", "fromSubsidiaryLedger", response);
        GetDropDownElement(this, this.state, "accountCode", "toSubsidiaryLedger", response);
      }
      else if (this.props.location.state && this.props.location.state.accountCode) {
        GetDropDownElement(this, this.props.location.state, "accountCode", "fromSubsidiaryLedger", response);
        GetDropDownElement(this, this.props.location.state, "accountCode", "toSubsidiaryLedger", response);
      }


    });
    GetDetailLedgerService.getMainClassId((response) => {
      DropDownListDataProvider(this, "mainClassIdList", response);
    });
    GetCostCentersService.getCostCenters({}, (response) => {
      DropDownListDataProvider(this, "costCenterList", response);
    })
    this.getFiscalYears();
  }

  getCommand() {
    var grid = $("#detail-ledger-balance").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {

        fromDetailLedgerCode: this.state.fromDetailLedger ? this.state.fromDetailLedger.code : '',
        toDetailLedgerCode: this.state.toDetailLedger ? this.state.toDetailLedger.code : '',
        vouhcerCategoryExcetionListCode: this.state.exceptionCatagory,
        voucherCategoryInclude: this.state.voucherType.length ? this.state.voucherType.map((vt) => vt.code) : [],
        fiscalYearId: this.state.fiscalYear.id,
        balanceSheetColumnType: this.state.balanceSheetColumnType.code,
        branchId: this.state.branch ? this.state.branch.id : 0,
        mainClassId: this.state.mainClassId.id,
        isNotConsiderSettlementDays: this.state.isNotConsiderSettlementDays,
        costCenterId: this.state.costCenterId,
        fromVoucherNumber: this.state.fromVoucherNumber !== '' ? this.state.fromVoucherNumber : 0,
        toVoucherNumber: this.state.toVoucherNumber !== '' ? this.state.toVoucherNumber : 0,
        accountBalanceRemainType: this.state.accountBalanceRemainType.code,
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
    GetDetailLedgerBalanceService.getExcelExport(command, 'detail-ledger-balance', (response) => {
      this.isExcellDwonloading = false;
      $('.excel-report').removeAttr('disabled');
    });
  }
  getPdfReport() {
    var command = this.getCommand();
    GetDetailLedgerBalanceService.getPdfExport(command, 'detail-pdf', (response) => {
      this.isPdfDownloading = false;
      $('.pdf-report').removeAttr('disabled');
    });
  }
  getNormalDetailedgerBalanceSheet() {

    let self = this;
    $("#detail-ledger-balance").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                isNotConsiderSettlementDays: self.state.isNotConsiderSettlementDays,
                fromDetailLedgerCode: self.state.fromDetailLedger ? self.state.fromDetailLedger.code : '',
                toDetailLedgerCode: self.state.toDetailLedger ? self.state.toDetailLedger.code : '',
                vouhcerCategoryExcetionListCode: self.state.exceptionCatagory,
                voucherCategoryInclude: self.state.voucherType.length ? self.state.voucherType.map((vt) => vt.code) : [],
                fiscalYearId: self.state.fiscalYear.id,
                balanceSheetColumnType: self.state.balanceSheetColumnType.code,
                branchId: self.state.branch ? self.state.branch.id : 0,
                mainClassId: self.state.mainClassId.id,
                costCenterId: self.state.costCenterId,
                fromVoucherNumber: self.state.fromVoucherNumber !== '' ? self.state.fromVoucherNumber : 0,
                toVoucherNumber: self.state.toVoucherNumber !== '' ? self.state.toVoucherNumber : 0,
                accountBalanceRemainType: self.state.accountBalanceRemainType.code,
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
            GetDetailLedgerBalanceService.getNormalDetailedgerBalanceSheet(command, function (response) {
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
        if($("div.k-pager-sm")){
          $("div.k-pager-sm").removeClass("k-pager-sm");
        }
        if (this.dataSource.data().length > 0) {
          let grid = $("#detail-ledger-balance").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
          });
          // if (index === this.dataSource.data().length - 1) {
          // currentRow.css({ display: 'none', visibility: 'hidden' });
          $("#detail-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-debit-sum").text(kendo.toString(self.response.totalDebitSum, 'n0'));

          $("#detail-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-credit-sum").text(kendo.toString(self.response.totalCreditSum, 'n0'));

          $("#detail-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-debit-leave").text(kendo.toString(self.response.totalDebitLeave, 'n0'));

          $("#detail-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-credit-leave").text(kendo.toString(self.response.totalCreditLeave, 'n0'));

          $("#detail-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-debit-turnover").text(kendo.toString(self.response.totalDebitTurnover, 'n0'));

          $("#detail-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-credit-turnover").text(kendo.toString(self.response.totalCreditTurnover, 'n0'));
          // } else {

          // }

        };
        $("#detail-ledger-balance .excel-report").on("click", function (item) {
          $('.excel-report').attr('disabled', 'disabled');
          if (!self.isExcellDwonloading) {
            self.isExcellDwonloading = true;
            self.getExcelReport();
          }
        });
        $("#detail-ledger-balance .pdf-report").on("click", function (item) {
          $('.pdf-report').attr('disabled', 'disabled');
          if (!self.isPdfDownloading) {
            self.isPdfDownloading = true;
            self.getPdfReport();
          }
        });
        $("#detail-ledger-balance tbody tr td span.detail-account-book").on("click", function (item) {
          var grid = $("#detail-ledger-balance").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          let params = {
            fromDetailLedger: {
              id: dataItem.accountId,
              fullTitle: dataItem.accountTitle,
              code: dataItem.accountCode
            },
            toDetailLedger: {
              id: dataItem.accountId,
              fullTitle: dataItem.accountTitle,
              code: dataItem.accountCode
            },
            fromSubsidiaryLedger: self.state.fromSubsidiaryLedger,
            toSubsidiaryLedger: self.state.toSubsidiaryLedger,
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
            noLastTrades : self.state.isNotConsiderSettlementDays,
            backButton: { path: self.props.path, title: self.props.title }
          };
          localStorage.setItem("detailLedgerAccountBook", JSON.stringify(params));
          window.open(`${self.props.detail.path}?accountCode=${dataItem.accountCode}`);

          // self.props.history.push(
          //   {
          //     pathname: self.props.detail.path,
          //     state: self.props.location.state === undefined ? {
          //       backButton: { path: self.props.path, title: self.props.title },
          //       mainClassId: self.state.mainClassId,
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

          //       fromDetailLedger: {
          //         id: dataItem.accountId,
          //         code: dataItem.accountCode,
          //         fullTitle: dataItem.accountTitle
          //       },
          //       toDetailLedger: {
          //         id: dataItem.accountId,
          //         code: dataItem.accountCode,
          //         fullTitle: dataItem.accountTitle
          //       },
          //       startDate: self.state.fromDate,
          //       endDate: self.state.toDate,

          //       fromSubsidiaryLedger: self.state.fromSubsidiaryLedger,
          //       toSubsidiaryLedger: self.state.toSubsidiaryLedger,

          //     } :
          //       self.props.location.state && self.props.location.state.accountCode !== undefined ? {
          //         backButton: { path: self.props.path, title: self.props.title },
          //         fiscalYear: self.state.fiscalYear,
          //         fromDate: self.state.fromDate,
          //         toDate: self.state.toDate,
          //         branch: self.state.branch,
          //         mainClassId: self.state.mainClassId,

          //         balanceSheetColumn: self.state.balanceSheetColumn,
          //         fromVoucherNumber: self.state.fromVoucherNumber,
          //         toVoucherNumber: self.state.toVoucherNumber,
          //         accountBalanceRemainType: self.state.accountBalanceRemainType,
          //         costCenter: self.state.costCenter,
          //         exceptionCatagory: self.state.exceptionCatagory,
          //         voucherType: self.state.voucherType,
          //         accountCode: self.props.location.state.accountCode,
          //         // fromSubsidiaryLedger : {
          //         //   id : dataItem.accountId,
          //         //   fullTitle : dataItem.accountTitle
          //         // },
          //         // toSubsidiaryLedger : {
          //         //   id : dataItem.accountId,
          //         //   fullTitle : dataItem.accountTitle
          //         // },
          //         fromDetailLedger: {
          //           id: dataItem.accountId,
          //           code: dataItem.accountCode,
          //           fullTitle: dataItem.accountTitle
          //         },
          //         toDetailLedger: {
          //           id: dataItem.accountId,
          //           code: dataItem.accountCode,
          //           fullTitle: dataItem.accountTitle
          //         },
          //         startDate: self.state.fromDate,
          //         endDate: self.state.toDate,

          //         fromSubsidiaryLedger: self.state.fromSubsidiaryLedger,
          //         toSubsidiaryLedger: self.state.toSubsidiaryLedger,

          //       } :
          //         {
          //           backButton: { path: self.props.path, title: self.props.title },
          //           fiscalYear: self.state.fiscalYear,
          //           fromDate: self.state.fromDate,
          //           toDate: self.state.toDate,
          //           mainClassId: self.state.mainClassId,

          //           branch: self.state.branch,
          //           balanceSheetColumn: self.state.balanceSheetColumn,
          //           fromVoucherNumber: self.state.fromVoucherNumber,
          //           toVoucherNumber: self.state.toVoucherNumber,
          //           accountBalanceRemainType: self.state.accountBalanceRemainType,
          //           costCenter: self.state.costCenter,
          //           exceptionCatagory: self.state.exceptionCatagory,
          //           voucherType: self.state.voucherType,
          //           fromDetailLedger: {
          //             id: dataItem.accountId,
          //             code: dataItem.accountCode,
          //             fullTitle: dataItem.accountTitle
          //           },
          //           toDetailLedger: {
          //             id: dataItem.accountId,
          //             code: dataItem.accountCode,
          //             fullTitle: dataItem.accountTitle
          //           },
          //           startDate: self.state.fromDate,
          //           endDate: self.state.toDate,

          //           fromSubsidiaryLedger: self.state.fromSubsidiaryLedger,
          //           toSubsidiaryLedger: self.state.toSubsidiaryLedger,
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

  handleChangeCheck = name => (event) => {
    this.setState({
      isLastLevel: event.target.checked,
      [name]: event.target.checked
    })

  };

  successGetBalanceSheetColumnType(response) {
    if (response.success) {
      //   this.setState({
      //     balanceSheetColumnType: response.result[0],
      //     balanceSheetColumn: {
      //       name: "balanceSheetColumnType",
      //       field: "title",
      //       label: "نوع تراز",
      //       list: response.result
      //     }

      //   })
      // }
      // DropDownListDataProvider(this, "balanceSheetColumn", response);

      if (this.props.location.state && this.props.location.state.balanceSheetColumn) {
        this.setState({
          balanceSheetColumn: {
            name: "balanceSheetColumnType",
            field: "title",
            label: "نوع تراز",
            list: response.result
          },
          list: response.result,
          balanceSheetColumnType: this.props.location.state.balanceSheetColumn,
          isColumn6: this.props.location.state.balanceSheetColumn.code === 2
        })
      }

      else {
        this.setState({
          balanceSheetColumnType: response.result[0], balanceSheetColumn: {
            name: "balanceSheetColumnType",
            field: "title",
            label: "نوع تراز",
            list: response.result
          },
        })
      }

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
      this.getNormalDetailedgerBalanceSheet();

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

  fromHandleChangeDetail(value, name) {
    let item = value.value;
    this.setState({
      [name]: item,
      toDetailLedger: item
    });
  }
  toHandleChangeDetail(value, name) {
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
  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  handleChangeColumn(item) {
    this.setState({
      columnsTb: this.state.columns,
      balanceSheetColumnType: item.value,
      isColumn6: item.value && item.value.code === 2,
      columns: item.value.code === 1 ? Columns4() : Columns6(),

    });
    //, function () {
    // $("#detail-ledger-balance").data().kendoGrid.destroy();
    // $("#detail-ledger-balance").empty();
    // this.getNormalDetailedgerBalanceSheet();
    //})
  }

  search() {
    if ($("#detail-ledger-balance").data("kendoGrid") !== undefined) {
      if (this.state.columnsTb != this.state.columns) {
        $("#detail-ledger-balance").data().kendoGrid.destroy();
        $("#detail-ledger-balance").empty();
        this.getNormalDetailedgerBalanceSheet();
      } else {
        $("#detail-ledger-balance").data("kendoGrid").dataSource.read(this);
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
        {/* <Header {...this.props} browserBack={this.props.location.state ? this.props.location.state.browserBack === true : false} /> */}
        <Header {...this.props} backParams={
          !this.state.isParameter && !this.props.location.state ? undefined :
            // this.props.location.state && this.props.location.state.accountCode !== undefined ? {
            //   fiscalYear: this.state.fiscalYear,
            //   fromDate: this.state.fromDate,
            //   toDate: this.state.toDate,
            //   branch: this.state.branch,
            //   balanceSheetColumn: this.state.balanceSheetColumnType,
            //   fromVoucherNumber: this.state.fromVoucherNumber,
            //   toVoucherNumber: this.state.toVoucherNumber,
            //   accountBalanceRemainType: this.state.accountBalanceRemainType,
            //   costCenter: this.state.costCenter,
            //   exceptionCatagory: this.state.exceptionCatagory,
            //   voucherType: this.state.voucherType,
            //   fromSubsidiaryLedger: this.state.fromSubsidiaryLedger,
            //   toSubsidiaryLedger: this.state.toSubsidiaryLedger,
            //   accountCode: this.props.location.state.accountCode
            // } :
            {
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
              fromSubsidiaryLedger: this.state.fromSubsidiaryLedger,
              toSubsidiaryLedger: this.state.toSubsidiaryLedger,
              isNotConsiderSettlementDays: this.state.isNotConsiderSettlementDays

            }
        } />
        <Paper className="main-paper-container detail-ledger-balance">
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
                    handleChange={(value, name) => this.handleChangeColumn(value, name)} isFilterable={false}
                    value={this.state.balanceSheetColumnType} />
                </Grid>
                <Grid item md={2}>
                  <DropDownComponent {...this.state.accountBalanceRemainTypeList}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
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
                  <NumberFormatComponent id="fromVoucherNumber" label="از شماره سند"
                    value={this.state.fromVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'fromVoucherNumber')} type="number" />
                </Grid>
                <Grid item md={2} >
                  <NumberFormatComponent id="toVoucherNumber" label="تا شماره سند"
                    value={this.state.toVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'toVoucherNumber')} type="number" />
                </Grid>

                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.mainClassIdList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.mainClassId} />
                  </div>
                </Grid>
                <Grid item md={5}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromSubsidiaryLedgerCodeList}
                      handleChange={(value, name) => this.fromHandleChangeSubsidiary(value, name)}
                      value={this.state.fromSubsidiaryLedger} />
                  </div>
                </Grid>
                <Grid item md={5}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.toSubsidiaryLedgerCodeList}
                      handleChange={(value, name) => this.toHandleChangeSubsidiary(value, name)}
                      value={this.state.toSubsidiaryLedger} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.costCenterList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.costCenter} />
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="k-rtl">
                    <AutoCompleteComponent
                      handleChange={(value) => this.fromHandleChangeDetail(value, "fromDetailLedger")}
                      headerTemplate={detailLedgerHeaderTemplate}
                      template={detailLedgerTemplate}
                      fieldSearch={"searchPhrase"}
                      label="از تفصیل"
                      field="fullTitle"
                      value={this.state.fromDetailLedger.fullTitle}
                      placeholder="کد حساب یا کد تفصیل را وارد کنید"
                      service={GetDetailLedgerService.getDetailLedgersForAutoComplete} />
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="k-rtl">
                    <AutoCompleteComponent
                      handleChange={(value) => this.toHandleChangeDetail(value, "toDetailLedger")}
                      headerTemplate={detailLedgerHeaderTemplate}
                      fieldSearch={"searchPhrase"}
                      field="fullTitle"
                      template={detailLedgerTemplate}
                      value={this.state.toDetailLedger.fullTitle}
                      label="تا تفصیل"
                      placeholder="کد حساب یا کد تفصیل را وارد کنید"
                      service={GetDetailLedgerService.getDetailLedgersForAutoComplete} />
                  </div>
                </Grid>

              </Grid>
              <Grid container spacing={8}>
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
                  label={<span className={"font-size-13"}>فاقد معاملات آخر</span>}
                />
              </Grid>

            </div>
          </Filter>
          { this.state.isLoading ? <Loading /> : '' }
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
            <div id="detail-ledger-balance" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>
    )
  }
}
export default GetDetailLedgerBalance;

