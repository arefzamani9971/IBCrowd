import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Loading from "core/Loading";
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import toastr from 'toastr';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import './GetTradeNumberComponent.css';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import GetAllProductsPaging from "../../../../../../services/getProducts";
import GetTradeNumberService from '../services/GetTradeNumberService';
import Columns from '../constants/GetTradeNumberColumn';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import '@progress/kendo-ui';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import kendo from '@progress/kendo-ui';
import UpdateTradeNumber from './updateFee/UpdateTradeNumberComponent';
import { connect } from "react-redux";
import AssignRightAcceptance from './assignRightAcceptance/AssignRightAcceptanceComponent';
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const $ = require("jquery");
class GetTradeNumberComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      openUpdateFee: false,
      openAssignRightAcceptance: false,
      dataItem: {},
      selectedRow: {},
      deleteModal: false,
      date: new Date(),
      response: {},
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
      branchList: {
        name: "branch",
        field: "title",
        label: "شعبه معامله ",
        list: []
      },
      branch: [],
      sectorList: {
        name: "sector",
        field: "title",
        label: "صنعت",
        list: []
      },

      sector: { code: 0, id: '' },
      feeEditTypeList: {
        name: "feeEditType",
        field: "title",
        label: "ویرایش موارد مشابه",
        list: []
      },
      isinsList: {
        name: "isins",

        dataTextField: 'symbol',
        dataValueField: 'isin',
        fieldSearch: 'phrase',
        template: productTemplate,
        headerTemplate: productHeaderTemplate,
        label: "عنوان نماد"
      },
      isins: [],
      customerList: {
        name: "customers",
        dataTextField: 'fullName',
        dataValueField: 'id',

        label: "نام و نام خانوادگی مشتری"
      },
      customers: [],
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
      partyTypeList: {
        name: "partyType",
        field: "title",
        label: "نوع مشتری ",
        list: []
      },
      partyType: { code: 0, id: '' },
      dailyAggregate: true,
      isLoading: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.search = this.search.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
  }



  componentDidMount() {
    this.getDropDownData();
    this.getTradeNumberList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.setUpdateRow !== prevProps.setUpdateRow) {
      this.getTradeNumberList();

    }
  }
  /* #region get drop-Downs */

  getDropDownData() {
    this.getTransactionStateList();
    this.getSecurityTransactionTypeList();
    this.getSecurityTransactionTypeList();
    this.getBranchList();
    this.getFeeEditType();
    this.getProductTypeList();
    this.getPartyTypeList();
    this.getSimpleSecurityExchangeList();
  }



  getTransactionStateList() {
    GetEnum('transactionstatus', response => DropDownListDataProvider(this, "transactionStateList", response))
  }

  getFeeEditType() {
    GetEnum("getfeeedittype", response => DropDownListDataProvider(this, "feeEditTypeList", response));
  }
  getSecurityTransactionTypeList() {
    GetEnum('simplesecuritytransactiontype', response => DropDownListDataProvider(this, "securityTransactionTypeList", response))
  }
  getProductTypeList() {
    GetEnum('producttype', response => DropDownListDataProvider(this, "productTypeList", response))
  }
  getPartyTypeList() {
    GetEnum('partytype', response => DropDownListDataProvider(this, "partyTypeList", response))
  }
  getSimpleSecurityExchangeList() {
    GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response))
  }

  getBranchList() {
    GetBranchService.getBranchesByFilter({}, response => DropDownListDataProvider(this, "branchList", response))
  }


  handleChange(value, name) {
    let item = value.value;

    this.setState({

      [name]: item
    })
  }

  handleChangeDate(value, name) {
    this.setState({
      [name]: value
    });
  }

  handleExpandSearchPanel() {

    this.setState({
      open: !this.state.open
    })
  }

  handleChangeCheck = (event) => {
    this.setState({
      dailyAggregate: event.target.checked
    })

  };

  setCloseModal(name) {
    this.setState({ [name]: false })
  }







  search() {

    if ($("#trades-number-list").data("kendoGrid") !== undefined) {
      $("#trades-number-list").data("kendoGrid").dataSource.read(this);
      this.setState({
        open: false
      })
    }
  }


  getTradeNumberList() {
    let self = this;

    $("#trades-number-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                date: self.state.date,
                branches: self.state.branch.length > 0 ? self.state.branch.map(b => b.id) : [],
                transactionStatuses: self.state.transactionState && self.state.transactionState.length > 0 ? self.state.transactionState.map((t) => t.code) : [],
                securityTransactionType: self.state.securityTransactionType ? self.state.securityTransactionType.code : '',
                isins: self.state.isins && self.state.isins.length > 0 ? self.state.isins.map((isin) => isin.isin) : [],
                dailyAggregate: self.state.dailyAggregate,
                partyIds: self.state.customers,
                simpleSecurityExchange: self.state.simpleSecurityExchange ? self.state.simpleSecurityExchange.code : 0
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
            GetTradeNumberService.getAllTradeNumber(command, function (response) {
              if (response.success)
                self.setState({ response: response })
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
          { field: "discountPercentage", aggregate: "sum" },
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
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);
        if($("div.k-pager-sm")){
          $("div.k-pager-sm").removeClass("k-pager-sm");
        }
        if (this.dataSource.data().length > 0) {
          let grid = $("#trades-number-list").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = items[index].uid;

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(self.state.totalVolume, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(self.state.totalPrice, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-value-sum").text(kendo.toString(self.state.totalValue, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-brokerFee-sum").text(kendo.toString(self.state.totalBrokerFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-realFee-sum").text(kendo.toString(self.state.totalRealFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-csdFee-sum").text(kendo.toString(self.state.totalCsdFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tseFee-sum").text(kendo.toString(self.state.totalTseFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-seoFee-sum").text(kendo.toString(self.state.totalSeoFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tseTmcFee-sum").text(kendo.toString(self.state.totalTseTmcFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-rightToAccessFee-sum").text(kendo.toString(self.state.totalRightToAccessFeeFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tax-sum").text(kendo.toString(self.state.totalCsdFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-totalFee-sum").text(kendo.toString(self.state.totalTotalFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-discountPercentage-sum").text(kendo.toString(self.state.totalDiscountPercentage, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-discount-sum").text(kendo.toString(self.state.totalDiscount, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-netAmount-sum").text(kendo.toString(self.state.totalNetAmount, 'n0'));

          });
        };
        $("#trades-number-list tbody tr td div.text-center div.dropdown div.dropdown-menu span.updateFee").on("click", function (item) {
          var grid = $("#trades-number-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.setState({ openUpdateFee: true, dataItem: { id: dataItem.id } });

        });

        $("#trades-number-list tbody tr td div.text-center div.dropdown div.dropdown-menu span.assignRightAcceptance").on("click", function (item) {
          var grid = $("#trades-number-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.setState({ openAssignRightAcceptance: true, dataItem: { id: dataItem.id } });

        });
        $("#trades-number-list tbody tr td div.text-center button.openDeleteModal").on("click", function (item) {
          var grid = $("#trades-number-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.openDeleteModal(dataItem);


        });
        $("#trades-number-list tbody tr td div.text-center button.pdfDownload").on("click", function (item) {
          var grid = $("#trades-number-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.getRowPdfReport(dataItem);
        });
        




      },
      columns: Columns()
    });

    $("#trades-number-list .excel-report").on("click", function (item) {
      self.getExcelReport();
    });
    $("#trades-number-list .pdf-report").on("click", function (item) {
      self.getPdfReport();
    });

  };
  /* #endregion */
  getCommand = () => {
    var grid = $("#trades-number-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {

        date: this.state.date,
        branches: this.state.branch.length > 0 ? this.state.branch.map(b => b.id) : [],
        transactionStatuses: this.state.transactionState && this.state.transactionState.length > 0 ? this.state.transactionState.map((t) => t.code) : [],
        securityTransactionType: this.state.securityTransactionType ? this.state.securityTransactionType.code : ''
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
  }
  getExcelReport = () => {
    var command = this.getCommand();
    // alert('excel')
    GetTradeNumberService.getExcelExport(command, 'اعلامیه خریدو فروش');
  }
  getPdfReport = () => {
    var command = this.getCommand();
    // alert('excel')
    GetTradeNumberService.getPdfExport(command, 'اعلامیه خریدو فروش');
  }

  getRowPdfReport = (rowData) =>{
    var command = rowData.id;
    GetTradeNumberService.getRowPdfReport(command,'چاپ ردیف اعلامیه خرید و فروش');
    
  }

  openDeleteModal(dataItem) {
    this.setState({ selectedRow: dataItem, deleteModal: true });
  }
  handleCloseDeleteModal() {
    this.setState({ deleteModal: false });
  }


  remove() {
    var command = {
      entity: this.state.selectedVoucher.id
    }
    GetTradeNumberService.deleteTradeRowById(command, this.successRemove)
  }

  successRemove(response) {
    this.setState({ deleteModal: false });

    if (response.success) {
      toastr.success("سند با موفقیت حذف شد")

    }

  }


  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container trade-number"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel}
            {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={4}>

                  <MultiSelectAutoCompleteComponent
                    {...this.state.customerList}
                    handleChange={(value, name) => this.handleChange(value, name)}
                    service={GetPartiesService.simpleSearchCustomers}
                  />

                </Grid>
                <Grid item md={4}>
                  <MultiSelectAutoCompleteComponent
                    {...this.state.isinsList}
                    handleChange={(value, name) => this.handleChange(value, name)}
                    service={GetAllProductsPaging.getAllProductsPagingMethod}
                  />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.date} label="تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "date")} />
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
                    <ComboBoxComponent isFilterable {...this.state.securityTransactionTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.securityTransactionType} />

                  </div>
                </Grid>

                <Grid item md={2}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.branch} />
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
                    <DropDownComponent {...this.state.partyTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.partyType} hasAll />

                  </div>
                </Grid>
                <Grid item md={2} className="d-flex align-items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.dailyAggregate}
                        onChange={(e) => this.handleChangeCheck(e)}
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
          {/* </GridServer> */}
          { this.state.isLoading ? <Loading /> : '' }
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
            <div id="trades-number-list" className="height-page"></div>
          </div>
        </Paper>

        <UpdateTradeNumber dataItem={this.state.dataItem} feeEditTypeList={this.state.feeEditTypeList} open={this.state.openUpdateFee} setCloseModal={(e) => this.setCloseModal("openUpdateFee", e)} />
        <AssignRightAcceptance dataItem={this.state.dataItem} feeEditTypeList={this.state.feeEditTypeList} open={this.state.openAssignRightAcceptance} setCloseModal={(e) => this.setCloseModal("openAssignRightAcceptance", e)} />


        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.deleteModal}
          onClose={(e) => this.handleCloseDeleteModal(e)}
        >
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
            marginTop: '-150px',
          }}>
            <h3 >
              <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
              <span style={{ marginRight: '5px' }}>حذف اعلامیه</span>
              {/*<b>*/}
              {/*حذف {this.props.deleteHeader}*/}
              {/*</b>*/}
            </h3>
            <hr />
            {/*<h6> آیا از حذف <b> {!this.props.stateParams.fullName ?'dsdsdsd': this.props.stateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
            <h3>
              آیا از حذف اعلامیه با شماره  <b>{this.state.selectedRow.ticketNumber} </b>و نام مشتری <b>{this.state.selectedRow.partyFullName} </b>و نام نماد <b>{this.state.selectedRow.symbol}</b> مطمئن هستید؟
            </h3>
            <br />
            <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.remove}>
              حذف
                        </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={(e) => this.handleCloseDeleteModal(e)}>
              انصراف
                        </Button>
          </Paper>
        </Modal>





      </React.Fragment>

    )
  }
}

const mapStateToProps = state => {

  return {

    setUpdateRow: state.setUpdateRow
  };
};

/*<-------------------connect------------->*/
const GetTradeNumber = connect(mapStateToProps)(GetTradeNumberComponent);



export default GetTradeNumber;
