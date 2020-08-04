import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import { Grid } from '@material-ui/core';
import kendo from '@progress/kendo-ui';
import Paper from '@material-ui/core/Paper';
import GetEnum from 'services/getEnum';
import moment from 'moment';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import './GetCustomerAccountBookComponent.css'
import { GetDropDownElement } from '../../../../../../core/getMultiSelectElement';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import GetCustomerAccountBookService from '../services/GetCustomerAccountBookService';
import GetPartiesService from "../../customersList/services/GetPartiesService";
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';

import { Column } from '../constants/GetCustomerAccountBookColumn';


const $ = require("jquery");
let isPdfDownloading = false;
let isExcellDwonloading = false;
class GetCustomerAccountBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fromDate: moment(new Date()).add(-1, "years"),
      toDate: moment(new Date()),
      accountcodesForApi: [],
      reRender: false,
      bankAccountType: 0,
      bankAccount: {
        name: "bankAccountType",
        field: "title",
        label: "نوع گزارش",
        list: []
      },
      party: {
        name: "selectedParty",
        field: "fullName",
        placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
        label: "نام و نام خانوادگی مشتری",
        list: []
      },
      selectedParty: {
        fullName: '',
        id: 0
      },
      open: false,
      columns: Column()

    }
    this.isFirst = true;
    this.response = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeParty = this.handleChangeParty.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.successBankAccountType = this.successBankAccountType.bind(this);
    this.search = this.search.bind(this);

  }


  componentDidMount() {
    // if (this.props.location.state && this.props.location.state.accountCode)
    //   this.setState({ accountCodes: [{ code: this.props.location.state.accountCode }] });
    this.getDropDownData();
    this.getCustomerAccountBook();
  }

  getDropDownData() {

    let defaultCommand = {
      entity: ""
    }
    GetEnum("accountbookreporttype", this.successBankAccountType);
  }

  getCommand = () => {
    var grid = $("#customer-account-book").data("kendoGrid");
    var dataSource = grid.dataSource;
    var command = {
      reportFilter: {
        detailLedgerId: this.state.selectedParty.detailLedgerId,
        partyId: this.state.selectedParty.id,
        accountBookReportType: this.state.bankAccountType.code,
        dateFilter: {
          startDate: this.state.fromDate,
          endDate: this.state.toDate
        }
      },
      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        sort: dataSource && dataSource.sort() ? dataSource.sort() :
          [{
            field: "detailLedgerId",
            dir: "asc"
          }]
      }


    }
    return command;
  }
  getExcelReport = () => {
    var command = this.getCommand();
    // GetCustomerAccountBookService.getExcelExport(command, (response) => {
    //   isExcellDwonloading = false;
    //   $('.excel-report').removeAttr('disabled');
    // });

  }
  getPdfReport = () => {
    var command = this.getCommand();
    
    // GetCustomerAccountBookService.getPdfExport(command, function (response) {
    //   isPdfDownloading = false;
    //   $('.pdf-report').removeAttr('disabled');
    // });
  }





  getCustomerAccountBook() {
    let self = this;
    $("#customer-account-book").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                detailLedgerId: self.state.selectedParty.detailLedgerId,
                partyId: self.state.selectedParty.id,
                accountBookReportType: self.state.bankAccountType.code,
                dateFilter: {
                  startDate: self.state.fromDate,
                  endDate: self.state.toDate
                }
              },

              OptionalFilter: {
                page: option.data.page ? option.data.page : 1,
                take: option.data.take ? option.data.take : 50,
                sort: option.data.sort ? option.data.sort :
                  []
              }
            }


            if (self.isFirst) {
              var res = {
                result: [],
                totalRecords: 0
              };
              option.success(res);
            } else {
              GetCustomerAccountBookService.getCustomerAccountBook(command, function (response) {
                
                var res = {
                  result: [],
                  totalRecords: 0
                };
                if (response.result && response.result.length > 0) {

                  self.response = {
                    totalCreditSum: response.totalCredit,
                    totalDebitSum: response.totalDebit,
                    totalRemainSum: response.totalRemain,
                    totalCreditRemain: response.totalCreditRemain,
                    totalDebitRemain: response.totalDebitRemain
                  }
                  response.result.map(item => {
                    res.result.push(item.accountBookRow)
                  });
                  res.totalRecords = response.totalRecords;


                }
                option.success(res);
              })
            }

          }
        },

        pageSize: 50,
        serverPaging: true,
        serverSorting: true,
        schema: {
          data: "result",
          total: "totalRecords",
        },
        aggregate: [
          { field: "credit", aggregate: "sum" },
          { field: "debit", aggregate: "sum" },
          { field: "debitRemain", aggregate: "sum" },
          { field: "creditRemain", aggregate: "sum" }]
      },

      autoBind: true,
      sortable: false,
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
      toolbar: excelAndPdfToolbar,
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
      dataBound: function (e) {
        if($("div.k-pager-sm")){
          $("div.k-pager-sm").removeClass("k-pager-sm");
        }
        $("#customer-account-book .excel-report").on("click", function () {
          $('.excel-report').attr('disabled', 'disabled');
          if (!isExcellDwonloading) {
            isExcellDwonloading = true;
            self.getExcelReport();
          }
 
        });

        $("#customer-account-book .pdf-report").on("click", function () {
          $('.pdf-report').attr('disabled', 'disabled');
          if (!isPdfDownloading) {
            isPdfDownloading = true;
            self.getPdfReport();
          }

        });

        var scrollOffset = {
          left: 10000,
        };
        var container = e.sender.wrapper.children(".k-grid-content");
        container.scrollLeft(scrollOffset.left);

        if (this.dataSource.data().length > 0) {

          $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-debit-sum").text(kendo.toString(self.response.totalDebitSum, 'n0'));

          $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-credit-sum").text(kendo.toString(self.response.totalCreditSum, 'n0'));

          $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-debit-remain").text(kendo.toString(self.response.totalDebitRemain, 'n0'));

          $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-credit-remain").text(kendo.toString(self.response.totalCreditRemain, 'n0'));

          if (self.response.totalRemainSum < 0) {
            $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
              "tbody tr td div.total-remain-sum").addClass("red-color");

            $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
              "tbody tr td div.total-remain-sum").text('(' + kendo.toString(Math.abs(self.response.totalRemainSum), 'n0') + ')');
          } else {

            $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
              "tbody tr td div.total-remain-sum").text(kendo.toString(self.response.totalRemainSum, 'n0'));
          }


          let creditSum = $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-credit").text();
          let debitSum = $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
            "tbody tr td div.total-debit").text();

          let remainSumPage = parseInt(debitSum.replace(/,/g, '')) - parseInt(creditSum.replace(/,/g, ''));

          if (remainSumPage < 0) {
            $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
              "tbody tr td div.total-page-reamin").addClass("red-color");

            $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
              "tbody tr td div.total-page-reamin").text('(' + kendo.toString(Math.abs(remainSumPage), 'n0') + ')');
          } else {
            $("#customer-account-book .k-grid-footer .k-grid-footer-wrap " +
              "tbody tr td div.total-page-reamin").text(kendo.toString(remainSumPage, 'n0'));
          }
        }



      },
      columns: self.state.columns
    });
  }

  successBankAccountType(response) {
    if (response.success) {
      this.setState({
        bankAccountType: response.result[1],
        bankAccount: {
          name: "bankAccountType",
          field: "title",
          label: "نوع گزارش",
          list: response.result
        }

      })
    }
  }


  handleChangeParty(item) {
    this.setState({
      selectedParty: item.value
    });
    // if (item.value != "")
    //   this.getCustomerAccountBook();
  }
  handleChange(item, name) {
    this.setState({
      [name]: item.value
    });
  }
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

  search() {
    if ($("#customer-account-book").data("kendoGrid") !== undefined) {
      this.isFirst = false
      $("#customer-account-book").data("kendoGrid").dataSource.read(this);
      this.setState({
        open: false
      })
    }
    // $("#customer-account-book").data("kendoGrid").dataSource.read(this);
    // this.setState({
    //   open : false
    // })
  }


  render() {

    return (
      <React.Fragment>
        <Header {...this.props} browserBack={this.props.location.state ? this.props.location.state.browserBack === true : false} />
        <Paper className={"main-paper-container customer-account-book"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">

                <Grid item md={6}>
                  <div className="k-rtl">
                    <AutoCompleteComponent
                      {...this.state.party}
                      handleChange={(value) => this.handleChangeParty(value)}
                      service={GetPartiesService.simpleSearchCustomers}
                      value={this.state.selectedParty.fullName}
                    />
                  </div>
                </Grid>

                <Grid item md={2} >
                  <PersianDatePicker label="از تاریخ" max={this.state.toDate} handleOnChange={(e) => this.handleChangeDate(e, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={2} >
                  <PersianDatePicker label="تا تاریخ" min={this.state.fromDate} handleOnChange={(e) => this.handleChangeDate(e, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>


                <Grid item md={2}>
                  <DropDownComponent {...this.state.bankAccount}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                    value={this.state.bankAccountType} />
                </Grid>



              </Grid>
            </div>
          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="customer-account-book" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>
    )
  }
}
export default GetCustomerAccountBook;

