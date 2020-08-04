import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import MainColumns from '../constants/GetAccontBookColumn';
import Grid from '@material-ui/core/Grid';
import kendo from '@progress/kendo-ui';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetFiscalYearsService from '../../../accountingBase/fiscalYear/services/GetFiscalYearsService'
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetEnum from 'services/getEnum'
import moment from 'moment';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GetSubsidairyAccountBookService from '../services/GetSubsidiaryAccountBookService';
import './GetSubsidiaryAccountBookComponent.css';
import GetSubsidiaryLedgerService from '../../../accountingBase/subsidaryLedger/services/GetSubsidiaryLedgerService';
import GetGeneralLedgerService from '../../../accountingBase/generalLedger/services/GetGeneralLedgerService'
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import Loading from 'core/Loading';
const $ = require("jquery");


class GetSubsidiaryAccountBook extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fromVoucherNumber: '',
      toVoucherNumber: '',
      toDebit: null,
      fromDebit: null,
      toRemain: null,
      fromRemain: null,
      fromCredit: null,
      toCredit: null,
      voucherMasterId: null,
      haveRemain: true,
      noLastTrades: false,
      accountBalanceRemainType: { code: 0 },
      open: false,
      columns: MainColumns(),
      generalLedger: { code: '' },
      fromDate: moment(new Date),
      toDate: moment(new Date),
      branch: { id: 0 },
      costCenter: { code: 0, title: '' },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      fiscalYear: { code: 0 },
      voucherMasterState: { code: 0 },
      branchList: {
        name: "branch",
        field: "title",
        label: "شعبه",
        list: []
      },

      fiscalYearList: {
        name: "fiscalYear",
        field: "title",
        label: "سال مالی",
        list: []
      },
      voucherMasterStateList: {
        name: "voucherMasterState",
        field: "title",
        label: "وضعیت سند",
        list: []
      },
      fromSubsidiaryLedger: { id: 0 },
      fromSubsidiaryLedgerList: {
        name: "fromSubsidiaryLedger",
        field: "fullTitle",
        label: " از حساب معین",
        list: []
      },
      toSubsidiaryLedger: { id: 0 },
      toSubsidiaryLedgerList: {
        name: "toSubsidiaryLedger",
        field: "fullTitle",
        label: " تا حساب معین",
        list: []
      },
      exceptionCatagory: [],
      exceptionCatagoryList: {
        name: "exceptionCatagory",
        field: "code",
        list: []
      },
      generalLedgerList: {
        name: "generalLedger",
        field: "fullTitle",
        label: " حساب کل",
        list: []
      },
      voucherCategoryIncludeList: {
        name: "voucherCategoryInclude",
        label: "شامل نوع سند",
        field: "title",
        list: []
      },
      voucherCategoryInclude: [],
      voucherCategoryExcludeList: {
        name: "voucherCategoryExclude",
        label: "فاقد نوع سند",
        field: "title",
        list: []
      },
      voucherCategoryExclude: [],
      loading: false,
      stateInfo: null,
      description: '',
      isParameter: false,
      balanceSheetColumn: {},
      back: null,
      isLoading: false
    }
    this.isPdfDownloading = false;
    this.isExcellDwonloading = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleLoadingFiscalYear = this.handleLoadingFiscalYear.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.successGetFiscalYears = this.successGetFiscalYears.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.getFiscalYears = this.getFiscalYears.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.stateInfo) {
      let stateInfo = JSON.parse(this.props.location.state.stateInfo);
      this.props.location.state.backButton = null;
      this.setState({
        stateInfo: stateInfo,
        fromVoucherNumber: stateInfo.fromVoucherNumber,
        toVoucherNumber: stateInfo.toVoucherNumber,
        fromDebit: stateInfo.fromDebit,
        toDebit: stateInfo.toDebit,
        fromCredit: stateInfo.fromCredit,
        toCredit: stateInfo.toCredit,
        fromRemain: stateInfo.fromRemain,
        toRemain: stateInfo.toRemain,
        noLastTrades: stateInfo.noLastTrades,
        haveRemain: stateInfo.haveRemain
      })
    }
    let listParams = window.location.href.slice(window.location.href.indexOf('?') + 1).split("=");
    if (listParams.length > 1) {

      let params = JSON.parse(localStorage.getItem("subsidiaryLedgerAccountBook"));
      this.setState({
        isParameter: true,
        fromVoucherNumber: params.fromVoucherNumber,
        toVoucherNumber: params.toVoucherNumber,
        accountBalanceRemainType: params.accountBalanceRemainType,
        fromDate: params.fromDate,
        toDate: params.toDate,
        branch: params.branch,
        fiscalYear: params.fiscalYear,
        fromSubsidiaryLedger: params.fromSubsidiaryLedger,
        toSubsidiaryLedger: params.toSubsidiaryLedger,
        exceptionCatagory: params.exceptionCatagory,
        costCenter: params.costCenter,
        voucherCategoryInclude: params.voucherType,
        back: params.backButton,
        balanceSheetColumnType: params.balanceSheetColumnType
      }, () => {
        this.getDropDownData();
      })


      // if (this.props.location.state && !this.props.location.state.stateInfo) {
      //   this.setState({
      //     fromVoucherNumber: this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : this.state.fromVoucherNumber,
      //     toVoucherNumber: this.props.location.state && this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : this.state.toVoucherNumber,
      //     accountBalanceRemainType: this.props.location.state.accountBalanceRemainType ? this.props.location.state.accountBalanceRemainType : this.state.accountBalanceRemainType,
      //     fromDate: this.props.location.state.fromDate ? this.props.location.state.fromDate : this.state.fromDate,
      //     toDate: this.props.location.state.toDate ? this.props.location.state.toDate : this.state.toDate,
      //     branch: this.props.location.state.branch ? this.props.location.state.branch : this.state.branch,
      //     fiscalYear: this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : this.state.fiscalYear,
      //     fromSubsidiaryLedger: this.props.location.state.fromSubsidiaryLedger ? this.props.location.state.fromSubsidiaryLedger : this.state.fromSubsidiaryLedger,
      //     toSubsidiaryLedger: this.props.location.state.toSubsidiaryLedger ? this.props.location.state.toSubsidiaryLedger : this.state.toSubsidiaryLedger,
      //     exceptionCatagory: this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : this.state.exceptionCatagory,
      //     costCenter: this.props.location.state.costCenter ? this.props.location.state.costCenter : this.state.costCenter,
      //     voucherCategoryInclude: this.props.location.state.voucherType ? this.props.location.state.voucherType : this.state.voucherCategoryInclude
      //   }, () => {
      //     this.getDropDownData();
      //   })
      // } else {
      //   this.getDropDownData();
      // }
    } else {
      localStorage.removeItem("subsidiaryLedgerAccountBook");
      this.getDropDownData();
    }
  }

  getDropDownData() {
    let defaultCommand = {
      entity: ""
    }
    GetBranchService.getBranchesByFilter({}, (response) => DropDownListDataProvider(this, "branchList", response, () => {
      if (this.state.stateInfo) {
        this.setState({
          branch: this.state.stateInfo.branch
        })
      }
    }));
    GetEnum("getexceptioncategory", (response) => DropDownListDataProvider(this, "exceptionCatagoryList", response, () => {
      if (this.state.stateInfo) {
        this.setState({
          exceptionCatagory: this.state.stateInfo.exceptionCatagory
        })
      }
    }));
    GetCostCentersService.getCostCenters({}, (response) => {
      DropDownListDataProvider(this, "costCenterList", response, () => {
        if (this.state.stateInfo) {
          this.setState({
            costCenter: this.state.stateInfo.costCenter
          })
        }
      });
    })
    // GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherType", response));
    GetEnum("vouchermasterstate", (response) => DropDownListDataProvider(this, "voucherMasterStateList", response, () => {
      let state = this.state.voucherMasterStateList;
      state.list = this.state.voucherMasterStateList.list.filter(item => { return item.code !== 4 });
      this.setState({
        voucherMasterState: this.state.stateInfo ? this.state.stateInfo.voucherMasterState : this.state.voucherMasterState,
        voucherMasterStateList: state
      });
    }));
    GetGeneralLedgerService.getGeneralLedgers(defaultCommand, (response) => {
      DropDownListDataProvider(this, "generalLedgerList", response, () => {
        if (this.state.stateInfo) {
          this.setState({
            generalLedger: this.state.stateInfo.generalLedger
          })
        }
      });
      // GetDropDownElement(this, this.props.location.state, 'generalLedgerCode', ['fromGeneralLedger', 'toGenralLedger'], response);
    })
    GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherCategoryIncludeList", response, () => {
      if (this.state.stateInfo) {
        this.setState({
          voucherCategoryInclude: this.state.stateInfo.voucherCategoryInclude
        });
      }
    }));
    GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherCategoryExcludeList", response, () => {
      if (this.state.stateInfo) {
        this.setState({
          voucherCategoryExclude: this.state.stateInfo.voucherCategoryExclude
        });
      }
    }));
    this.getFiscalYears();
  }

  getFiscalYears() {

    GetFiscalYearsService.getFiscalYears({}, this.successGetFiscalYears);
  }

  successGetFiscalYears(response) {

    if (response.success) {
      if (this.state.isParameter) {
        this.setState({
          fiscalYear: this.state.fiscalYear,
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          fiscalYearList: {
            name: "fiscalYear",
            field: "title",
            label: "سال مالی ",
            list: response.result
          },
        })
      }

      else if (this.state.stateInfo) {
        let stateInfo = this.state.stateInfo;
        this.setState({
          fiscalYear: stateInfo.fiscalYear,
          fromDate: stateInfo.fromDate,
          toDate: stateInfo.toDate,
          fiscalYearList: {
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
          fiscalYearList: {
            name: "fiscalYear",
            field: "title",
            label: "سال مالی ",
            list: response.result
          }
        })
      }
      this.getSubsidiaryLedgers();

    }
  }

  getSubsidiaryLedgers() {
    GetSubsidiaryLedgerService.getsubsidiaryledgers({}, (response) => {
      if (response.success) {
        if (this.state.stateInfo) {
          this.setState({
            fromSubsidiaryLedger: this.state.stateInfo.fromSubsidiaryLedger,
            toSubsidiaryLedger: this.state.stateInfo.toSubsidiaryLedger
          })
        }
        this.setState({
          fromSubsidiaryLedgerList: {
            name: "fromSubsidiaryLedger",
            field: "fullTitle",
            label: "کد معین از",
            list: response.result
          },
          toSubsidiaryLedgerList: {
            name: "toSubsidiaryLedger",
            field: "fullTitle",
            label: "کد معین تا",
            list: response.result
          }
        })

      }
      this.getSubsidiaryAccountBooks();
    })
  }

  getCommand = () => {
    var grid = $("#subsidiary-account-book").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        fromSubsidiaryLedgerCode: this.state.fromSubsidiaryLedger ? this.state.fromSubsidiaryLedger.code : null,
        toSubsidiaryLedgerCode: this.state.toSubsidiaryLedger ? this.state.toSubsidiaryLedger.code : null,
        generalLedgerId: this.state.generalLedger ? this.state.generalLedger.id : null,
        description: this.state.description,
        noLastTrades: this.state.noLastTrades,
        branchId: this.state.branch ? this.state.branch.id : '',
        fiscalYearId: this.state.fiscalYear.id,
        fromVoucherId: this.state.fromVoucherNumber,
        toVoucherId: this.state.toVoucherNumber,
        voucherCategoryExceptions: [...this.state.exceptionCatagory, ...this.state.voucherCategoryExclude.map((vc) => { return vc.code })],
        voucherCategoryInclude: [...this.state.voucherCategoryInclude.map((vc) => { return vc.code })],
        fromCredit: this.state.fromCredit,
        toCredit: this.state.toCredit,
        fromDebit: this.state.fromDebit,
        toDebit: this.state.toDebit,
        fromRemain: this.state.fromRemain,
        toRemain: this.state.toRemain,
        voucherMasterState: this.state.voucherMasterState.code,
        haveRemain: this.state.haveRemain,
        costCenterId: this.state.costCenter ? this.state.costCenter.id : null,
        dateFilter: {
          startDate: this.state.fromDate,
          endDate: this.state.toDate
        },
      },

      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource && dataSource.sort() ? dataSource.sort() :
          [{
            field: "subsidiaryLedgerCode",
            dir: "asc"
          }]
      }

    }

    return command;
  }
  getExcelReport = () => {

    var command = this.getCommand();
    GetSubsidairyAccountBookService.getExcelExport(command, "subsidiary-account-book-excel", (response) => {
      this.isPdfDownloading = false;
      $('.excel-report').removeAttr('disabled');
    });
  }
  getPdfReport() {
    var command = this.getCommand();
    GetSubsidairyAccountBookService.getPdfExport(command, "subsidiary-account-book-pdf", (response) => {
      this.isPdfDownloading = false;
      $('.pdf-report').removeAttr('disabled');
    });
  }
  getSubsidiaryAccountBooks() {
    let isFirst = true;
    let self = this;
    let grid = this;
    $("#subsidiary-account-book").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              grid = option.data
            }
            let command = {
              reportFilter: {
                fromSubsidiaryLedgerCode: self.state.fromSubsidiaryLedger ? self.state.fromSubsidiaryLedger.code : null,
                toSubsidiaryLedgerCode: self.state.toSubsidiaryLedger ? self.state.toSubsidiaryLedger.code : null,
                description: self.state.description,
                generalLedgerId: self.state.generalLedger.id,
                noLastTrades: self.state.noLastTrades,
                branchId: self.state.branch ? self.state.branch.id : null,
                fiscalYearId: self.state.fiscalYear.id,
                fromVoucherId: self.state.fromVoucherNumber,
                toVoucherId: self.state.toVoucherNumber,
                voucherCategoryExceptions: [...self.state.exceptionCatagory, ...self.state.voucherCategoryExclude.map((vc) => { return vc.code })],
                voucherCategoryInclude: [...self.state.voucherCategoryInclude.map((vc) => { return vc.code })],
                fromCredit: self.state.fromCredit,
                toCredit: self.state.toCredit,
                fromDebit: self.state.fromDebit,
                toDebit: self.state.toDebit,
                fromRemain: self.state.fromRemain,
                toRemain: self.state.toRemain,
                voucherMasterState: self.state.voucherMasterState.code,
                haveRemain: self.state.haveRemain,
                costCenterId: self.state.costCenter ? self.state.costCenter.id : null,
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
                    field: "subsidiaryLedgerCode",
                    dir: "asc"
                  }]
              }
            }
            if (!isFirst || self.state.isParameter) {
              self.setState({
                isLoading: true
            });
              GetSubsidairyAccountBookService.getSubsidiaryAccountBooks(command, function (response) {
                if (response.result && response.result.length > 0) {
                  response.result.map(item => {
                    item.detail = {
                      result: item.resultList,
                      totalRecords: item.totalRecords
                    };
                    item.resultList.push({
                      totalCreditSum: item.totalCreditSum,
                      totalDebitSum: item.totalDebitSum,
                      totalRemainSum: item.totalRemainSum
                    })
                    item.subsidiaryLedgerId = item.resultList[0].subsidiaryLedgerId
                  });
                } else {
                  response = {
                    result: [],
                    totalRecords: 0
                  }
                }
                self.setState({
                  loading: false,
                  isLoading: false
                }, () => {
                  option.success(response);
                })
              });
            } else {
              let res = { result: [] };
              isFirst = false;
              self.setState({
                loading: false
              }, () => {
                option.success(res);
              })
            }
          }

        },
        pageSize: 50,
        serverPaging: true,
        schema: {
          data: "result",
          total: "totalRecords"
        }
      },
      autoBind: true,
      resizable: true,
      scrollable: true,
      sortable: false,
      selectable: false,
      columns: grid.state.columns,
      pageable: {
        pageSizes: [50, 150, 200],
        buttonCount: 5,
        messages: {
          itemsPerPage: "تعداد سطر در هر صفحه",
          display: "{0} - {1} از {2} مورد",
          empty: ""
        }
      },
      noRecords: {
        template: ' <p class="no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      toolbar: excelAndPdfToolbar,
      detailTemplate: kendo.template($("#template").html()),
      detailInit: function (e) {
        let detailRow = e.detailRow;
        if (!detailRow.find(".detail-account-book")[0]) {
          e.detailCell.append('<div class="detail-account-book"></div>');
        }
        detailRow.find(".detail-account-book").kendoGrid({
          dataSource: {
            transport: {
              read: function (option) {
                if (e.data.isFirst) {
                  e.data.isFirst = false;
                  option.success(e.data.detail)
                } else {
                  // if (option.data.page === 1) {
                  //   self.setState({
                  //     loading: true
                  //   })
                  //   self.search();
                  // }
                  // else {
                  self.setState({
                    loading: true
                  })
                  let command = {
                    reportFilter: {
                      fomSubsidiaryLedgerId: self.state.fromSubsidiaryLedger ? self.state.fromSubsidiaryLedger.id : null,
                      toSubsidiaryLedgerId: self.state.toSubsidiaryLedger ? self.state.toSubsidiaryLedger.id : null,
                      description: self.state.description,
                      noLastTrades: self.state.noLastTrades,
                      branchId: self.state.branch ? self.state.branch.id : null,
                      fiscalYearId: self.state.fiscalYear.id,
                      fromVoucherId: self.state.fromVoucherNumber,
                      toVoucherId: self.state.toVoucherNumber,
                      voucherCategoryExceptions: [...self.state.exceptionCatagory, ...self.state.voucherCategoryExclude.map((vc) => { return vc.code })],
                      voucherCategoryInclude: [...self.state.voucherCategoryInclude.map((vc) => { return vc.code })],
                      fromCredit: self.state.fromCredit,
                      toCredit: self.state.toCredit,
                      fromDebit: self.state.fromDebit,
                      toDebit: self.state.toDebit,
                      fromRemain: self.state.fromRemain,
                      toRemain: self.state.toRemain,
                      voucherMasterState: self.state.voucherMasterState.code,
                      haveRemain: self.state.haveRemain,
                      costCenterId: self.state.costCenter ? self.state.costCenter.id : null,
                      dateFilter: {
                        startDate: self.state.fromDate,
                        endDate: self.state.toDate
                      },
                      subsidiaryLedgerId: e.data.subsidiaryLedgerId
                    },
                    OptionalFilter: {
                      page: option.data.page,
                      take: option.data.take,
                      sort: option.data.sort

                    }
                  }
                  GetSubsidairyAccountBookService.getSpecificSubsidiaryAccountBooks(command, (response) => {
                    if (response.result && response.result.length > 0) {
                      response.result.push({
                        totalCreditSum: response.totalCreditSum,
                        totalDebitSum: response.totalDebitSum,
                        totalRemainSum: response.totalRemainSum
                      })
                    } else {
                      response = {
                        result: [],
                        totalRecords: 0
                      }
                    }
                    self.setState({
                      loading: false
                    }, () => {
                      $('.k-grid-content').scrollTop(0);
                      option.success(response);
                    })
                  })
                  // }
                }
              }
            },
            pageSize: 1000,
            sort: {
              field: "created",
              dir: "desc"
            },
            serverPaging: true,
            serverFiltering: true,
            schema: {
              data: "result",
              total: "totalRecords"

            },
            aggregate: [
              { field: "debit", aggregate: "sum" },
              { field: "credit", aggregate: "sum" }]
          },

          sortable: false,
          resizable: true,
          scrollable: true,
          autoBind: true,
          selectable: "multiple, cell",
          allowCopy: true,
          pageable: {
            pageSizes: [1000, 1500, 2000],
            buttonCount: 5,
            messages: {
              itemsPerPage: "تعداد سطر در هر صفحه",
              display: "{0} - {1} از {2} مورد",
              empty: ""
            }
          },
          noRecords: {
            template: ' <p class="no-data">رکوردی جهت نمایش وجود ندارد.</p>'
          },
          dataBound: function (e) {

            let mainGrid = $("#subsidiary-account-book").data("kendoGrid");
            let mainItems = mainGrid.dataSource.view();
            let list = this.dataSource.data();
            let mainId = "";
            mainItems.map((item, index) => {
              if (list.length >= 2) {
                if (list[1].fullSubsidiaryTitle === item.masterTitle) {
                  mainId = mainItems[index].uid;
                }
              }
            });
            if (this.dataSource.data().length > 0) {
              let items = this.dataSource.data();
              // items.map((item, index) => {

                // if (index === this.dataSource.data().length - 1) {
                  let item = items[this.dataSource.data().length - 1];
                  let id = item.uid;

                  if (!item.id) {
                    let currentRow = $(".detail-account-book table tbody").find("tr[data-uid='" + id + "']");
                    currentRow.css({ display: 'none', visibility: 'hidden' });
                  }
                  $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-debit-sum").text(kendo.toString(item.totalDebitSum, 'n0'));

                  $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-credit-sum").text(kendo.toString(item.totalCreditSum, 'n0'));

                  if (item.totalRemainSum < 0) {
                    $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-remain-sum").addClass("red-color");

                    $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-remain-sum").text('(' + kendo.toString(Math.abs(item.totalRemainSum), 'n0') + ')');
                  } else {

                    $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-remain-sum").text(kendo.toString(item.totalRemainSum, 'n0'));
                  }

                  let creditSum = $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-page-credit").text();
                  let debitSum = $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-page-debit").text();

                  let remainSumPage = parseInt(debitSum.replace(/,/g, '')) - parseInt(creditSum.replace(/,/g, ''));

                  if (remainSumPage < 0) {
                    $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-page-reamin").addClass("red-color");

                    $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-page-reamin").text('(' + kendo.toString(Math.abs(remainSumPage), 'n0') + ')');
                  } else {
                    $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-page-reamin").text(kendo.toString(remainSumPage, 'n0'));
                  }

                }

              // });
            // };

            $(".detail-account-book div table tbody tr td.voucherNumber").on("click", function (item) {
              let grid = $(".detail-account-book").data("kendoGrid");

              let row = $(item.target).closest("tr");
              let dataItem = grid.dataItem(row);
              if (dataItem.voucherNumber !== 0) {
                self.props.history.push(
                  {
                    pathname: "/main/accounting/report/getVoucherDetail",
                    state: {
                      id: dataItem.voucherMasterId,
                      backButton: { path: "/main/accounting/report/getSubsidiaryAccountBook", title: "دفتر حساب معین" },
                      stateInfo: JSON.stringify({
                        fromSubsidiaryLedger: self.state.fromSubsidiaryLedger,
                        toSubsidiaryLedger: self.state.toSubsidiaryLedger,
                        generalLedger: self.state.generalLedger,
                        fiscalYear: self.state.fiscalYear,
                        fromDate: self.state.fromDate,
                        toDate: self.state.toDate,
                        voucherMasterState: self.state.voucherMasterState,
                        branch: self.state.branch,
                        costCenter: self.state.costCenter,
                        fromVoucherNumber: self.state.fromVoucherNumber,
                        toVoucherNumber: self.state.toVoucherNumber,
                        fromDebit: self.state.fromDebit,
                        toDebit: self.state.toDebit,
                        fromCredit: self.state.fromCredit,
                        toCredit: self.state.toCredit,
                        fromRemain: self.state.fromRemain,
                        toRemain: self.state.toRemain,
                        voucherCategoryInclude: self.state.voucherCategoryInclude,
                        voucherCategoryExclude: self.state.voucherCategoryExclude,
                        exceptionCatagory: self.state.exceptionCatagory,
                        noLastTrades: self.state.noLastTrades,
                        haveRemain: self.state.haveRemain
                      })
                    }
                  })
              }

            });
          },
          columns: [
            {
              title: "تاریخ",
              width: "80px",
              attributes: { class: "text-center" },
              field: "voucherDateJalali",
              footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
            },
            {
              title: "شماره سند",
              width: "70px",
              attributes: { class: "voucherNumber text-center cursor-pointer text-blue" },
              field: "voucherNumber"
            },
            {
              title: "شرح",
              width: "400px",
              field: "description"
            },
            {
              title: "بدهکار",
              width: "180px",
              filter: "numeric",
              format: "{0:n0}",
              aggregates: ["sum"],
              footerTemplate: "<div class='total-page-debit'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-debit-sum"></div>',
              field: "debit"
            },
            {
              title: "بستانکار",
              width: "180px",
              filter: "numeric",
              format: "{0:n0}",
              aggregates: ["sum"],
              footerTemplate: "<div class='total-page-credit'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-credit-sum"></div>',
              field: "credit"
            },
            {
              title: "مانده",
              width: "180px",
              filter: "numeric",
              format: "{0:n0}",
              template: '#if(data.remain>=0){#' +
                '<b>#= Math.abs(data.remain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(data.remain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#',
              footerTemplate: '<div class="total-page-reamin"></div>' +
                '<div class="total-remain-sum"></div>',
              field: "remain"
            },
            {
              title: "شعبه",
              width: "100px",
              attributes: { class: "text-center" },
              field: "branchName"
            }
          ]

        });
      },
      dataBound: function () {

        if (this.dataSource.data().length > 0) {
          let grid = $("#subsidiary-account-book").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            item.isFirst = true;
          });
        }

        var grid = $("#subsidiary-account-book").data("kendoGrid");
        grid.expandRow(".k-master-row");

        $("#subsidiary-account-book .excel-report").on("click", function () {
          $('.excel-report').attr('disabled', 'disabled');
          if (!self.isExcellDwonloading) {
            self.isExcellDwonloading = true;
            self.getExcelReport();
          }
        });
        $("#subsidiary-account-book .pdf-report").on("click", function () {
          $('.pdf-report').attr('disabled', 'disabled');
          if (!self.isPdfDownloading) {
            self.isPdfDownloading = true;
            self.getPdfReport();
          }
        });
      }
    });
  }

  handleLoadingFiscalYear(response) {
    let lastFiscalYear = response.result[response.result.length - 1];
    this.setState({ fromDate: lastFiscalYear.startDate, toDate: lastFiscalYear.lastDate });
  }

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }

  toHandleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  };

  fromHandleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item,
      toSubsidiaryLedger: item
    });
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

  handleChangeDate(value, name) {
    this.setState({
      [name]: value
    }, function () {
    })
  }
  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open

    })
  }

  handleChangeCheck = (event, name) => {
    this.setState({
      [name]: event.target.checked
    })

  };
  search() {
    if ($("#subsidiary-account-book").data("kendoGrid") !== undefined) {
      $("#subsidiary-account-book").data("kendoGrid").dataSource.read(this);
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
        {/* <Header  {...this.props} browserBack={this.props.location.state ? this.props.location.state.browserBack === true : false} /> */}
        <Header {...this.props} back={this.state.back} backParams={
          !this.state.isParameter && !this.state.stateInfo === undefined ? undefined : {
            //   this.props.location.state && this.props.location.state.accountCode !== undefined ? {
            //     fiscalYear: this.state.fiscalYear,
            //     fromDate: this.state.fromDate,
            //     toDate: this.state.toDate,
            //     branch: this.state.branch,
            //     fromVoucherNumber: this.state.fromVoucherNumber,
            //     toVoucherNumber: this.state.toVoucherNumber,
            //     accountBalanceRemainType: this.props.location.state.accountBalanceRemainType,
            //     costCenter: this.state.costCenter,
            //     exceptionCatagory: this.state.exceptionCatagory,
            //     voucherType: this.state.voucherType,
            //     fromSubsidiaryLedger: this.state.fromSubsidiaryLedger,
            //     toSubsidiaryLedger: this.state.toSubsidiaryLedger,
            //     accountCode: this.props.location.state.accountCode
            //   } :
            fiscalYear: this.state.fiscalYear,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            branch: this.state.branch,
            fromVoucherNumber: this.state.fromVoucherNumber,
            toVoucherNumber: this.state.toVoucherNumber,
            balanceSheetColumnType: !this.state.balanceSheetColumnType ? { code: 1 } : this.state.balanceSheetColumnType,
            accountBalanceRemainType: !this.state.accountBalanceRemainType ? { code: 1 } : this.state.accountBalanceRemainType,
            costCenter: this.state.costCenter,
            exceptionCatagory: this.state.exceptionCatagory,
            voucherType: this.state.voucherCategoryInclude,
            fromSubsidiaryLedger: this.state.fromSubsidiaryLedger,
            toSubsidiaryLedger: this.state.toSubsidiaryLedger,
            isNotConsiderSettlementDays: this.state.noLastTrades
          }
        } />
        <Paper className={"main-paper-container subsidiary-account-book  not-aggregate"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">

                <Grid item md={4}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromSubsidiaryLedgerList}
                      handleChange={(value, name) => this.fromHandleChange(value, name)}
                      value={this.state.fromSubsidiaryLedger} />
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.toSubsidiaryLedgerList}
                      handleChange={(value, name) => this.toHandleChange(value, name)}
                      value={this.state.toSubsidiaryLedger} />
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.generalLedgerList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.generalLedger} />
                  </div>
                </Grid>


                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.fiscalYearList}
                      handleChange={(value, name) => this.handleChangeFiscalYear(value)}
                      value={this.state.fiscalYear} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "fromDate")} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "toDate")} />
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.voucherMasterStateList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherMasterState} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.branch} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.costCenterList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.costCenter} />
                  </div>
                </Grid>

                <Grid item md={2}>
                  <NumberFormatComponent label="شماره سند از "
                    value={this.state.fromVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'fromVoucherNumber')} type="number" />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="شماره سند تا"
                    value={this.state.toVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'toVoucherNumber')} type="number" />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="بدهکار از "
                    value={this.state.fromDebit}
                    handleChange={(value, error) => this.handleChange(value, 'fromDebit')} type="number" isSeparator />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="بدهکار تا"
                    value={this.state.toDebit}
                    handleChange={(value, error) => this.handleChange(value, 'toDebit')} type="number" isSeparator />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="بستانکار از "
                    value={this.state.fromCredit}
                    handleChange={(value, error) => this.handleChange(value, 'fromCredit')} type="number" isSeparator />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="بستانکار تا"
                    value={this.state.toCredit}
                    handleChange={(value, error) => this.handleChange(value, 'toCredit')} type="number" isSeparator />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="مانده از "
                    value={this.state.fromRemain}
                    handleChange={(value, error) => this.handleChange(value, 'fromRemain')} type="number" isSeparator />
                </Grid>
                <Grid item md={2}>
                  <NumberFormatComponent label="مانده تا"
                    value={this.state.toRemain}
                    handleChange={(value, error) => this.handleChange(value, 'toRemain')} type="number" isSeparator />
                </Grid>
                <Grid item md={4}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.voucherCategoryIncludeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherCategoryInclude} />
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.voucherCategoryExcludeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherCategoryExclude} />
                  </div>
                </Grid>

              </Grid>
              <Grid container spacing={8} className="no-margin">
                <CheckBoxList {...this.state.exceptionCatagoryList} value={this.state.exceptionCatagory} handleChange={(value, name) => this.handleChange(value, name)} />
                <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.noLastTrades}
                        onChange={(e) => this.handleChangeCheck(e, 'noLastTrades', true)}
                        value="noLastTrades"
                        color="primary"
                      />
                    }
                    label="فاقد معاملات آخر"
                  />
                </Grid>
                <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.haveRemain}
                        onChange={(e) => this.handleChangeCheck(e, 'haveRemain', true)}
                        value="haveRemain"
                        color="primary"
                      />
                    }
                    label="با مانده ابتدای دوره"
                  />
                </Grid>
              </Grid>
            </div>
          </Filter>
          { this.state.isLoading ? <Loading /> : '' }
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
            <div id="subsidiary-account-book" className="height-page"></div>
            {
              this.state.loading
                ?
                <Loading /> :
                <script type="text/x-kendo-template" id="template">
                  <div className="detail-account-book cursor-default"></div>
                </script>
            }
          </div>
        </Paper>
      </React.Fragment>

    )
  }
}

export default GetSubsidiaryAccountBook;

