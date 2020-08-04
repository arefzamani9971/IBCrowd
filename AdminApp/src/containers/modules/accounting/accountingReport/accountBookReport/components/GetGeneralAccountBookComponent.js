import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import MainColumns from '../constants/GetAccontBookColumn';
import Grid from '@material-ui/core/Grid';
import Loading from 'core/Loading';
import kendo from '@progress/kendo-ui';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetFiscalYearsService from '../../../accountingBase/fiscalYear/services/GetFiscalYearsService'
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetEnum from 'services/getEnum'
import moment from 'moment';
import GetGeneralAccountBookService from '../services/GetGeneralAccountBookService';
import './GetGeneralAccountBookComponent.css';
import GetGeneralLedgerService from '../../../accountingBase/generalLedger/services/GetGeneralLedgerService';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';

const $ = require("jquery");


class GetGeneralAccountBook extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fromVoucherNumber: '',
      toVoucherNumber: '',
      accountBalanceRemainType: 1,
      toDebit: null,
      fromDebit: null,
      toRemain: null,
      fromRemain: null,
      fromCredit: null,
      toCredit: null,
      voucherMasterId: null,
      open: false,
      haveRemain: true,
      submitType: '',
      columns: MainColumns(),
      fromDate: moment(new Date),
      toDate: moment(new Date),
      selectedSubmitType: { code: 0 },
      voucherMasterState: { code: 0 },
      noLastTrades: false,
      branch: { id: 0 },
      branchList: {
        name: "branch",
        field: "title",
        label: "شعبه",
        list: []
      },
      fiscalYear: { id: 0 },
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
      fromGeneralLedger: { code: '' },
      fromGeneralLedgerList: {
        name: "fromGeneralLedger",
        field: "fullTitle",
        label: "کد کل از",
        list: []
      },
      toGeneralLedger: { code: '' },
      toGeneralLedgerList: {
        name: "toGeneralLedger",
        field: "fullTitle",
        label: "کد کل تا",
        list: []
      },
      exceptionCatagory: [],
      exceptionCatagoryList: {
        name: "exceptionCatagory",
        field: "code",
        list: []
      },
      costCenter: { code: 0, title: '' },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      voucherCategoryInclude: [],
      voucherCategoryIncludeList: {
        name: "voucherCategoryInclude",
        label: "شامل نوع سند",
        field: "title",
        list: []
      },
      voucherCategoryExclude: [],
      voucherCategoryExcludeList: {
        name: "voucherCategoryExclude",
        label: "فاقد نوع سند",
        field: "title",
        list: []
      },
      loading: false,
      stateInfo: null,
      description: '',
      isParameter: false,
      back: null,
      isLoading: false
    }

    this.isPdfDownloading = false;
    this.isExcellDwonloading = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleLoadingFiscalYear = this.handleLoadingFiscalYear.bind(this);
    this.successGetFiscalYears = this.successGetFiscalYears.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.getGeneralLedgers = this.getGeneralLedgers.bind(this);
    this.getFiscalYears = this.getFiscalYears.bind(this);
    this.search = this.search.bind(this);
    this.getExcelReport = this.getExcelReport.bind(this);
    this.getPdfReport = this.getPdfReport.bind(this);


  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.stateInfo) {

      let stateInfo = JSON.parse(this.props.location.state.stateInfo);
      this.props.location.state.backButton = null;
      this.setState({
        stateInfo: stateInfo,
        fromVoucherNumber: stateInfo.fromVoucherNumber,
        toVoucherNumber: stateInfo.toVoucherNumber,
        description: stateInfo.description,
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
      let params = JSON.parse(localStorage.getItem("generalLedgerAccountBook"));
      this.setState({
        isParameter: true,
        fromVoucherNumber: params.fromVoucherNumber,
        toVoucherNumber: params.toVoucherNumber,
        accountBalanceRemainType: params.accountBalanceRemainType,
        fromDate: params.fromDate,
        toDate: params.toDate,
        branch: params.branch,
        fiscalYear: params.fiscalYear,
        fromGeneralLedger: params.fromGeneralLedger,
        toGeneralLedger: params.toGeneralLedger,
        exceptionCatagory: params.exceptionCatagory,
        costCenter: params.costCenter,
        voucherCategoryInclude: params.voucherType,
        back: params.backButton,
        balanceSheetColumnType: params.balanceSheetColumnType
      }, () => {
        this.getDropDownData();
      })

      // localStorage.removeItem("generalLedgerAccountBook");
      // if (this.props.location.state && !this.props.location.state.stateInfo) {
      //   this.setState({
      //     fromVoucherNumber: this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : this.state.fromVoucherNumber,
      //     toVoucherNumber: this.props.location.state && this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : this.state.toVoucherNumber,
      //     accountBalanceRemainType: this.props.location.state.accountBalanceRemainType ? this.props.location.state.accountBalanceRemainType : this.state.accountBalanceRemainType,
      //     fromDate: this.props.location.state.fromDate ? this.props.location.state.fromDate : this.state.fromDate,
      //     toDate: this.props.location.state.toDate ? this.props.location.state.toDate : this.state.toDate,
      //     branch: this.props.location.state.branch ? this.props.location.state.branch : this.state.branch,
      //     fiscalYear: this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : this.state.fiscalYear,
      //     fromGeneralLedger: this.props.location.state.fromGeneralLedger ? this.props.location.state.fromGeneralLedger : this.state.fromGeneralLedger,
      //     toGeneralLedger: this.props.location.state.toGeneralLedger ? this.props.location.state.toGeneralLedger : this.state.toGeneralLedger,
      //     exceptionCatagory: this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : this.state.exceptionCatagory,
      //     costCenter: this.props.location.state.costCenter ? this.props.location.state.costCenter : this.state.costCenter,
      //     voucherCategoryInclude: this.props.location.state.voucherType ? this.props.location.state.voucherType : this.state.voucherCategoryInclude,
      //     balanceSheetColumnType : this.state.balanceSheetColumnType
      //   }, () => {
      //     this.getDropDownData();
      //   })
      // } else {
      //   this.getDropDownData();
      // }
    } else {
      localStorage.removeItem("generalLedgerAccountBook");
      this.getDropDownData();
    }

  }
  getDropDownData() {
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
    });
    // GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherType", response));
    GetEnum("vouchermasterstate", (response) => DropDownListDataProvider(this, "voucherMasterStateList", response, () => {
      let state = this.state.voucherMasterStateList;
      state.list = this.state.voucherMasterStateList.list.filter(item => { return item.code !== 4 });
      this.setState({
        voucherMasterState: this.state.stateInfo ? this.state.stateInfo.voucherMasterState : this.state.voucherMasterState,
        voucherMasterStateList: state
      });
    }))
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

  getGeneralLedgers() {
    GetGeneralLedgerService.getGeneralLedgers({}, (response) => {
      if (response.success) {
        if (this.state.stateInfo) {
          this.setState({
            fromGeneralLedger: this.state.stateInfo.fromGeneralLedger,
            toGeneralLedger: this.state.stateInfo.toGeneralLedger
          })
        }
        this.setState({
          fromGeneralLedgerList: {
            name: "fromGeneralLedger",
            field: "fullTitle",
            label: "کد کل از",
            list: response.result
          },
          toGeneralLedgerList: {
            name: "toGeneralLedger",
            field: "fullTitle",
            label: "کد کل تا",
            list: response.result
          }
        }, () => {
          this.getGeneralAccountBook();
        })

      }

    })
  }
  successGetFiscalYears(response) {
    if (response.success) {
      if (this.state.stateInfo) {
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
      else if (this.state.isParameter) {
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
      } else {
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
      this.getGeneralLedgers();
    }
  }
  getCommand = () => {
    var grid = $("#general-account-book").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        fromGeneralLedgerCode: this.state.fromGeneralLedger.code,
        toGeneralLedgerCode: this.state.toGeneralLedger.code,
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
        costCenterId: this.state.costCenter ? this.state.costCenter.id : '',
        dateFilter: {
          startDate: this.state.fromDate,
          endDate: this.state.toDate
        },
        // generalLedgerId: e.data.generalLedgerId
      },

      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        sort: dataSource && dataSource.sort() ? dataSource.sort() :
          [{
            field: "generalLedgerCode",
            dir: "asc"
          }]
      }

    }

    return command;
  }
  getExcelReport = () => {
    var command = this.getCommand();
    GetGeneralAccountBookService.getExcelExport(command, "general-account-book-excel", (response) => {
      this.isPdfDownloading = false;
      $('.excel-report').removeAttr('disabled');
    });

  }
  getPdfReport() {
    var command = this.getCommand();
    GetGeneralAccountBookService.getPdfExport(command, "general-account-book-pdf", (response) => {
      this.isPdfDownloading = false;
      $('.pdf-report').removeAttr('disabled');
    });
  }
  getGeneralAccountBook() {
    let isFirst = true;
    let self = this;
    $("#general-account-book").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            let command = {
              reportFilter: {
                fromGeneralLedgerCode: self.state.fromGeneralLedger ? self.state.fromGeneralLedger.code : 0,
                toGeneralLedgerCode: self.state.toGeneralLedger ? self.state.toGeneralLedger.code : 0,
                description: self.state.description,
                noLastTrades: self.state.noLastTrades,
                branchId: self.state.branch ? self.state.branch.id : '',
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
                costCenterId: self.state.costCenter ? self.state.costCenter.id : '',
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
                    field: "generalLedgerCode",
                    dir: "asc"
                  }]
              }
            }
            if (!isFirst || self.state.isParameter) {
              self.setState({
                isLoading: true
            });
              GetGeneralAccountBookService.getGeneralAccountBooks(command, function (response) {
                if (response.result && response.result.length > 0) {
                  response.result.map(item => {
                    // item.detail = {
                    //   result: item.resultList,
                    //   totalRecords: item.totalRecords
                    // };
                    // item.resultList.push({
                    //   totalCreditSum: item.totalCreditSum,
                    //   totalDebitSum: item.totalDebitSum,
                    //   totalRemainSum: item.totalRemainSum
                    // })
                    item.generalLedgerId = item.resultList[0].generalLedgerId
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
      resizable: false,
      scrollable: true,
      sortable: false,
      selectable: false,
      columns: self.state.columns,
      pageable: {
        pageSizes: [50, 150, 200],
        buttonCount: 5,
        messages: {
          itemsPerPage: "تعداد سطر در هر صفحه",
          display: "{0} - {1} از {2} مورد",
          empty: ""
        }
      },
      toolbar: excelAndPdfToolbar,
      noRecords: {
        template: ' <p class="no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      detailTemplate: kendo.template($("#template").html()),
      detailInit: function (e) {
        var detailRow = e.detailRow;
        if (!detailRow.find(".detail-account-book")[0]) {
          e.detailCell.append('<div class="detail-account-book"></div>');
        }
        detailRow.find(".detail-account-book").kendoGrid({
          dataSource: {
            transport: {
              read: function (option) {

                // if (e.data.isFirst) {
                //   e.data.isFirst = false;
                //   option.success(e.data.detail)
                // } 
                // else {
                  self.setState({
                    loading: true
                  })

                  let command = {
                    reportFilter: {
                      fromGeneralLedgerId: self.state.fromGeneralLedger ? self.state.fromGeneralLedger.id : 0,
                      toGeneralLedgerId: self.state.toGeneralLedger ? self.state.toGeneralLedger.id : 0,
                      description: self.state.description,
                      noLastTrades: true,
                      branchId: self.state.branch ? self.state.branch.id : '',
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
                      costCenterId: self.state.costCenter ? self.state.costCenter.id : '',
                      dateFilter: {
                        startDate: self.state.fromDate,
                        endDate: self.state.toDate
                      },
                      generalLedgerId: e.data.generalLedgerId
                    },
                    OptionalFilter: {
                      page: option.data.page,
                      take: option.data.take,
                      sort: option.data.sort

                    }
                  }

                  GetGeneralAccountBookService.getspecificgeneralaccountbooks(command, (response) => {
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
                      $(".k-grid-content").scrollTop(0);
                      option.success(response);
                    })

                  })
                // }
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

            let mainGrid = $("#general-account-book").data("kendoGrid");

            let mainItems = mainGrid.dataSource.view();
            let list = this.dataSource.data();
            let mainId = "";
            mainItems.map((item, index) => {
              if (list.length >= 2) {
                if (list[1].fullGeneralLedgerTitle === item.masterTitle) {
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
                  $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-debit-sum").text(kendo.toString(item.totalDebitSum, 'n0'));

                  $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-credit-sum").text(kendo.toString(item.totalCreditSum, 'n0'));

                  if (item.totalRemainSum < 0) {
                    $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-remain-sum").addClass("red-color");

                    $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-remain-sum").text('(' + kendo.toString(Math.abs(item.totalRemainSum), 'n0') + ')');
                  } else {

                    $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-remain-sum").text(kendo.toString(item.totalRemainSum, 'n0'));
                  }

                  let creditSum = $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-page-credit").text();
                  let debitSum = $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-page-debit").text();
                  let remainSumPage = parseInt(debitSum.replace(/,/g, '')) - parseInt(creditSum.replace(/,/g, ''));

                  if (remainSumPage < 0) {
                    $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-page-reamin").addClass("red-color");

                    $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-page-reamin").text('(' + kendo.toString(Math.abs(remainSumPage), 'n0') + ')');
                  } else {
                    $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                      "tr td div.total-page-reamin").text(kendo.toString(remainSumPage, 'n0'));
                  }
                // }
              // });
            };

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
                      backButton: { path: "/main/accounting/report/getGeneralAccountBook", title: "دفتر حساب کل" },
                      stateInfo: JSON.stringify({
                        fromGeneralLedger: self.state.fromGeneralLedger,
                        toGeneralLedger: self.state.toGeneralLedger,
                        fiscalYear: self.state.fiscalYear,
                        fromDate: self.state.fromDate,
                        toDate: self.state.toDate,
                        description: self.state.description,
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
      dataBound: function (e) {
        $("#general-account-book .excel-report").on("click", function () {
          $('.excel-report').attr('disabled', 'disabled');
          if (!self.isExcellDwonloading) {
            self.isExcellDwonloading = true;
            self.getExcelReport();
          }
        });

        $("#general-account-book .pdf-report").on("click", function () {
          $('.pdf-report').attr('disabled', 'disabled');
          if (!self.isPdfDownloading) {
            self.isPdfDownloading = true;
            self.getPdfReport();
          }
        });
        if (this.dataSource.data().length > 0) {
          let grid = $("#general-account-book").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            item.isFirst = true;
          });
        }
        var grid = $("#general-account-book").data("kendoGrid");
        grid.expandRow(".k-master-row");
      }
    });
  }
  handleLoadingFiscalYear(response) {
    let lastFiscalYear = response.result[response.result.length - 1];
    this.setState({ fromDate: lastFiscalYear.startDate, toDate: lastFiscalYear.lastDate });
  }


  handleChangeCheck = (event, name) => {
    this.setState({
      [name]: event.target.checked
    })

  };

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  };

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
      toGeneralLedger: item
    });
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

  search() {
    // $("#general-account-book").data("kendoGrid").dataSource.read(this);
    if ($("#general-account-book").data("kendoGrid") !== undefined) {
      $("#general-account-book").data("kendoGrid").dataSource.read(this);
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
        <Header {...this.props} back={this.state.back} backParams={
          !this.state.isParameter && !this.state.stateInfo ? undefined : {
            fiscalYear: this.state.fiscalYear,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            branch: this.state.branch,
            balanceSheetColumnType: !this.state.balanceSheetColumnType ? { code: 1 } : this.state.balanceSheetColumnType,
            fromVoucherNumber: this.state.fromVoucherNumber,
            toVoucherNumber: this.state.toVoucherNumber,
            accountBalanceRemainType: !this.state.accountBalanceRemainType ? { code: 1 } : this.state.accountBalanceRemainType,
            costCenter: this.state.costCenter,
            exceptionCatagory: this.state.exceptionCatagory,
            voucherType: this.state.voucherCategoryInclude,
            fromGeneralLedger: this.state.fromGeneralLedger,
            toGeneralLedger: this.state.toGeneralLedger,
            isNotConsiderSettlementDays : this.state.noLastTrades
          }
        } />
        <Paper className={"main-paper-container general-account-book not-aggregate"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromGeneralLedgerList}
                      handleChange={(value, name) => this.fromHandleChange(value, name)}
                      value={this.state.fromGeneralLedger} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.toGeneralLedgerList}
                      handleChange={(value, name) => this.toHandleChange(value, name)}
                      value={this.state.toGeneralLedger}
                    />
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
                <Grid item md={6}>
                  <Input label="شرح ردیف سند" handleChange={(e) => this.handleChange(e, 'description')} value={this.state.description} />
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
            <div id="general-account-book" className="height-page"></div>
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

export default GetGeneralAccountBook;
