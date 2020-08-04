import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Columns from '../constants/GetTradesColumn';
import Grid from '@material-ui/core/Grid';
import Loading from "core/Loading";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';
import './GetTradesComponent.css';
import GetTradesService from '../services/GetTradesService';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import { GetAllSectors } from '../../../../../../services/getSectors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetAllProductsPaging from "../../../../../../services/getProducts";
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import AutoCompleteMultiSelect from "shared/components/autoCompleteMultiSelectCustom/autoCompleMultiSelect";
import '@progress/kendo-ui';

const $ = require("jquery");

class GetTrades extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      columns: Columns(),
      endDate: new Date(),
      isMinimumWage: false,
      isMaximumWage: false,
      dailyAggregate: true,
      open: false,
      transactionStateList: {
        name: "transactionState",
        field: "title",
        label: "وضعیت معامله ",
        list: []
      },
      transactionState: [],
      securityTransactionTypeList: {
        name: "securityTransactionType",
        field: "title",
        label: "نوع معامله ",
        list: []
      },
      securityTransactionType: { code: 0, id: '' },
      partyTypeList: {
        name: "partyType",
        field: "title",
        label: "نوع مشتری ",
        list: []
      },
      partyType: { code: 0, id: '' },
      simpleSecurityExchangeList: {
        name: "simpleSecurityExchange",
        field: "title",
        label: "نوع بازار ",
        list: []
      },
      simpleSecurityExchange: { code: 0, id: '' },
      productTypeList: {
        name: "productType",
        field: "title",
        label: "نوع زیر بازار ",
        list: []
      },
      productType: { code: 0, id: '' },
      branchList: {
        name: "branch",
        field: "title",
        label: "شعبه معامله ",
        list: []
      },
      branch: [],
      isinsList: {
        name: "isins",
        placeholder: 'جستجوی نماد',
        dataTextField: 'symbol',
        dataValueField: 'isin',
        fieldSearch: 'phrase',
        template: productTemplate,
        headerTemplate: productHeaderTemplate,
        label: "عنوان نماد"
      },
      isins: [],

      sectorList: {
        name: "sector",
        field: "title",
        label: "صنعت",
        list: []
      },
      sector: { code: 0, id: '' },
      customerList: {
        name: "customers",
        dataTextField: 'fullName',
        dataValueField: 'id',
        placeholder: 'نام نام خانوادگی کد ملی شماره شناسنامه یا نام پدر مشتری را وارد کنید',
        label: "نام و نام خانوادگی مشتری"
      },
      customers: [],
      isLoading: true
    };
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getDropDownData();
  }

  getTransactionStateList() {
    GetEnum('transactionstatus', response => DropDownListDataProvider(this, "transactionStateList", response))
  }

  getSecurityTransactionTypeList() {
    GetEnum('simplesecuritytransactiontype', response => DropDownListDataProvider(this, "securityTransactionTypeList", response))
  }

  getPartyTypeList() {
    GetEnum('partytype', response => DropDownListDataProvider(this, "partyTypeList", response))
  }

  getSimpleSecurityExchangeList() {
    GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response))
  }

  getProductTypeList() {
    GetEnum('producttype', response => DropDownListDataProvider(this, "productTypeList", response))
  }

  getBranchList() {
    GetBranchService.getBranchesByFilter({}, response => DropDownListDataProvider(this, "branchList", response))
  }
  getSectors() {
    GetAllSectors(response => DropDownListDataProvider(this, "sectorList", response))
  }
  getDropDownData() {
    this.getTransactionStateList();
    this.getSecurityTransactionTypeList();
    this.getPartyTypeList();
    this.getSimpleSecurityExchangeList();
    this.getSecurityTransactionTypeList();
    this.getProductTypeList();
    this.getBranchList();
    this.getSectors();
    this.getTradeList();
  }

  handleChange = (value, name) => {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
  handleChangeDate = (value, name) => {

    this.setState({
      [name]: value
    })

  }
  handleChangeCheck = (event, name) => {
    this.setState({
      [name]: event.target.checked
    })

  };

  handleExpandSearchPanel = () => {
    this.setState({
      open: !this.state.open
    })
  };
  search() {
    $("#trades-list").data("kendoGrid").dataSource.read(this);
    this.setState({
      open: false
    })
  };
  getTradeList = () => {
    let self = this;
    let that = this;

    $("#trades-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              that = option.data
            }
            var command = {
              reportFilter: {
                securityTransactionType: self.state.securityTransactionType ? self.state.securityTransactionType.code : 0,
                partyType: self.state.partyType ? self.state.partyType.code : 0,
                transactionStatuses: self.state.transactionState && self.state.transactionState.length > 0 ? self.state.transactionState.map(t => t.code) : [],
                simpleSecurityExchange: self.state.simpleSecurityExchange ? self.state.simpleSecurityExchange.code : 0,
                productType: self.state.productType ? self.state.productType.code : 0,
                sectors: self.state.sector && self.state.sector.id !== '' && Object.keys(self.state.sector).length > 0 ? [self.state.sector.id] : [],
                branches: self.state.branch && self.state.branch.length > 0 ? self.state.branch.map(b => b.id) : [],
                customers: self.state.customers && self.state.customers.length > 0 ? self.state.customers : [],
                isins: self.state.isins && self.state.isins.length > 0 ? self.state.isins : [],
                isMinimumWage: self.state.isMinimumWage,
                isMaximumWage: self.state.isMaximumWage,
                dailyAggregate: self.state.dailyAggregate,
                dateFilter: {
                  startDate: self.state.startDate,
                  endDate: self.state.endDate
                },
              },
              OptionalFilter: {
                page: option.data.page ? option.data.page : 1,
                take: option.data.take ? option.data.take : 50,
                sort: option.data.sort ? option.data.sort :
                  [{
                    field: "date",
                    dir: "asc"
                  }]
              }
            }
            self.setState({
              isLoading: true
          });
            GetTradesService.getAllTradesList(command, function (response) {
              if (!response.success) {
                response.result = [];
              } 
              if (response.result && response.result.length > 0) {
                self.response = {
                  totalVolume: response.totalVolume,
                  totalTotalPrice: response.totalTotalPrice,
                  totalValue: response.totalValue,
                  totalBrokerFee: response.totalBrokerFee,
                  totalRealFee: response.totalRealFee,
                  totalCSDFee: response.totalCSDFee,
                  totalTseFee: response.totalTseFee,
                  totalSeoFee: response.totalSeoFee,
                  totalTseTmcFee: response.totalTseTmcFee,
                  totalRightToAccessFee: response.totalRightToAccessFee,
                  totalTax: response.totalTax,
                  totalTotalFee: response.totalTotalFee,
                  totalDiscount: response.totalDiscount,
                  totalNetAmount: response.totalNetAmount
                };
              }
              self.setState({
                isLoading: false
              }, () => {
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
        serverPaging: true,
        serverSorting: true,
        schema: {
          data: "result",
          total: "totalRecords"

        },
        aggregate: [
          { field: "volume", aggregate: "sum" },
          { field: "price", aggregate: "sum" },
          { field: "value", aggregate: "sum" },
          { field: "brokerFee", aggregate: "sum" },
          { field: "realFee", aggregate: "sum" },
          { field: "csdFee", aggregate: "sum" },
          { field: "tseFee", aggregate: "sum" },
          { field: "seoFee", aggregate: "sum" },
          { field: "tseTmcFee", aggregate: "sum" },
          { field: "rightToAccessFee", aggregate: "sum" },
          { field: "tax", aggregate: "sum" },
          { field: "totalFee", aggregate: "sum" },
          { field: "discount", aggregate: "sum" },
          { field: "netAmount", aggregate: "sum" }
        ]
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
        template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      toolbar: excelAndPdfToolbar,
      dataBound: function (e) {
        var scrollOffset = {
          left: 10000,
        };
        var container = e.sender.wrapper.children(".k-grid-content");
        container.scrollLeft(scrollOffset.left);
        if($("div.k-pager-sm")){
          $("div.k-pager-sm").removeClass("k-pager-sm");
        }
        if (this.dataSource.data().length > 0) {
          let grid = $("#trades-list").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = item.uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1) {
              // currentRow.css({ display: 'none', visibility: 'hidden' });
              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(self.response.totalVolume, 'n0'));
              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(self.response.totalTotalPrice, 'n0'));
              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-value-sum").text(kendo.toString(self.response.totalValue, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-brokerFee-sum").text(kendo.toString(self.response.totalBrokerFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-realFee-sum").text(kendo.toString(self.response.totalRealFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-csdFee-sum").text(kendo.toString(self.response.totalCSDFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tseFee-sum").text(kendo.toString(self.response.totalTseFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-seoFee-sum").text(kendo.toString(self.response.totalSeoFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tseTmcFee-sum").text(kendo.toString(self.response.totalTseTmcFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-rightToAccessFee-sum").text(kendo.toString(self.response.totalRightToAccessFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tax-sum").text(kendo.toString(self.response.totalTax, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-totalFee-sum").text(kendo.toString(self.response.totalTotalFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-discount-sum").text(kendo.toString(self.response.totalDiscount, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-netAmount-sum").text(kendo.toString(self.response.totalNetAmount, 'n0'));
            } else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            }

          });
        };


      },
      columns: that.state.columns

    });
    $("#trades-list .excel-report").on("click", function (item) {
      self.getExcelReport();
    });
    $("#trades-list .pdf-report").on("click", function (item) {
      self.getPdfReport();
    });
  };
  getCommand = () => {
    var grid = $("#trades-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        securityTransactionType: this.state.securityTransactionType ? this.state.securityTransactionType.code : 0,
        partyType: this.state.partyType ? this.state.partyType.code : 0,
        transactionStatuses: this.state.transactionState && this.state.transactionState.length > 0 ? this.state.transactionState.map(t => t.code) : [],
        simpleSecurityExchange: this.state.simpleSecurityExchange ? this.state.simpleSecurityExchange.code : 0,
        productType: this.state.productType ? this.state.productType.code : 0,
        sectors: this.state.sector && this.state.sector.id !== '' && Object.keys(this.state.sector).length > 0 ? [this.state.sector.id] : [],
        branches: this.state.branch && this.state.branch.length > 0 ? this.state.branch.map(b => b.id) : [],
        customers: this.state.customers && this.state.customers.length > 0 ? this.state.customers : [],
        isins: this.state.isins && this.state.isins.length > 0 ? this.state.isins : [],
        isMinimumWage: this.state.isMinimumWage,
        isMaximumWage: this.state.isMaximumWage,
        dailyAggregate: this.state.dailyAggregate,
        dateFilter: {
          startDate: this.state.startDate,
          endDate: this.state.endDate
        }
      },
      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource ? dataSource.sort() :
          [{
            field: "date",
            dir: "asc"
          }]
      }
    }
    return command;
  };
  getExcelReport = () => {
    var command = this.getCommand();
    // alert('excel')
    GetTradesService.getExcelExport(command, 'معاملات');
  };


  getPdfReport = () => {
    var command = this.getCommand();
    // alert('pdf')
    GetTradesService.getPdfExport(command, "معاملات");

  }
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container trades-list"}>
          <Filter search={this.search} handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={12}>
                  <AutoCompleteMultiSelect/>
                  <MultiSelectAutoCompleteComponent
                    {...this.state.customerList}
                    handleChange={(value, name) => this.handleChange(value, name)}
                    service={GetPartiesService.simpleSearchCustomers}
                  />
                  <MultiSelectAutoCompleteComponent
                    {...this.state.isinsList}
                    handleChange={(value, name) => this.handleChange(value, name)}
                    service={GetAllProductsPaging.getAllProductsPagingMethod}
                  />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.startDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "startDate")} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "endDate")} />
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.transactionStateList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.transactionState} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.securityTransactionTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.securityTransactionType} />

                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.simpleSecurityExchangeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.simpleSecurityExchange} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent
                      isFilterable
                      {...this.state.productTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.productType} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.sectorList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.sector} />
                  </div>
                </Grid>
                <Grid item md={7}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.branch} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent {...this.state.partyTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.partyType} hasAll />
                  </div>
                </Grid>
                <Grid item md={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isMinimumWage}
                        onChange={(e) => this.handleChangeCheck(e, 'isMinimumWage')}
                        value="isMinimumWage"
                        color="primary"
                      />
                    }
                    label="حداقل کارمزد"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isMaximumWage}
                        onChange={(e) => this.handleChangeCheck(e, 'isMaximumWage')}
                        value="isMaximumWage"
                        color="primary"
                      />
                    }
                    label="حداکثر کارمزد"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.dailyAggregate}
                        onChange={(e) => this.handleChangeCheck(e, 'dailyAggregate')}
                        value="dailyAggregate"
                        color="primary"
                      />
                    }
                    label="تجمیع روزانه"
                  />
                </Grid>
              </Grid>
            </div>
          </Filter>
          { this.state.isLoading ? <Loading /> : '' }
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
            <div id="trades-list" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>

    )
  }
}

export default GetTrades;
