import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetOrdersColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';
import moment from 'moment';
import './GetOrdersComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetOrdersService from '../services/GetOrdersService';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import { searchProducts } from '../../../../../../services/getProducts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetAllProductsPaging from "../../../../../../services/getProducts";
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import Button from "@material-ui/core/Button";
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from "@material-ui/core/Modal";
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import { Typography, CircularProgress } from '@material-ui/core';
import toastr from 'toastr';

const $ = require("jquery");
let date = new Date();
let selectedIds = [];

class GetOrderManagement extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      /* #region filter state */
      columns: Columns(),
      endDate: new Date(),
      startDate: moment(new Date().setDate(new Date().getDate() - 2)),
      fromSerialNumber: '',
      toSerialNumber: '',
      deleteDescription: '',
      deleteId: null,
      /* #region list state */
      requestCancel: false,

      branchList: {
        name: "branch",
        field: "title",
        label: "شعبه معامله ",
        list: []
      },
      branch: [],
      orderStateList: {
        name: "orderState",
        field: "title",
        label: "وضعیت سفارش ",
        list: []
      },
      orderState: [],
      orderTypeList: {
        name: "orderState",
        field: "title",
        label: "جهت سفارش",
        list: []
      },
      orderType: {},
      simpleSecurityExchangeList: {
        name: "simpleSecurityExchange",
        field: "title",
        label: "نوع بازار ",
        list: []
      },
      simpleSecurityExchange: { code: 0, id: '' },

      orderRejectionReasonList: {
        name: "orderRejectionReason",
        field: "title",
        label: "دلیل حذف سفارش",
        list: []
      },
      orderRejectionReason: { code: 0, id: '' },

      isinsList: {
        name: "isins",
        placeholder: 'جستجوی نماد',
        dataTextField: 'symbol',
        dataValueField: 'isin',
        fieldSearch: 'phrase',
        template: productTemplate,
        headerTemplate: productHeaderTemplate,
        label:"عنوان نماد"
      },
      isins: [],

      customerList: {
        name: "customer",
        // field: "fullName",
        // list: [],
        // value:'',
        field: 'fullName',
        dataValueField: 'id',
        placeholder: 'نام نام خانوادگی کد ملی شماره شناسنامه یا نام پدر مشتری را وارد کنید',
         label:"نام و نام خانوادگی مشتری"
      },

      customer: { id: 0, fullName: '' },
      modalStatus: false,


      /* #endregion */

      /* #endregion */
    };
    /* #region bind */

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.reRenderGrid = this.reRenderGrid.bind(this);
    this.search = this.search.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);

    /* #endregion */



  }

  componentDidMount() {

    this.getDropDownData();

  }
  /* #region get drop-Downs */

  getDropDownData() {
    this.getBranchList();
    this.getOrderType();
    this.getOrderRejectionReason();
    this.getOrderState();
    this.getOrderList();
  }




  handleModal() {

    this.setState({ deleteDescription: '', orderRejectionReason: { code: 0, id: '' }, deleteModal: false });

  }



  getBranchList() {
    GetBranchService.getBranchesByFilter(null, response => DropDownListDataProvider(this, "branchList", response))
  }

  getOrderType() {
    GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response))

  }
  getOrderRejectionReason() {
    GetEnum('Getorderrejectionreason', response => DropDownListDataProvider(this, "orderRejectionReasonList", response))

  }
  getOrderState() {
    GetEnum('getDailyOrderState', response => DropDownListDataProvider(this, "orderStateList", response))



  }




  /* #endregion */


  /* #region handle change filters */

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
  handleChangeDate(value, name) {

    this.setState({
      [name]: value
    })

  }

  handleChangeCheck = (event, name) => {

    this.setState({
      [name]: event.target.checked
    })

  };


  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  handlePartyChange(value) {
    this.setState({ customer: value.value });
  }

  search() {
    $("#orders-list").data("kendoGrid").dataSource.read(this);
    this.setState({
      open : false
    })
    selectedIds=[];
  }
  checkBoxSelectHandles = (dataItem) => {
    if (dataItem.isChecked) {
      selectedIds.push(dataItem.id)
    }else{
      let index = selectedIds.findIndex(item => {return item === dataItem.id});
      selectedIds.splice(index , 1);
    }
    if (selectedIds.length === 0) {
      $('#delete').attr('disabled', 'disabled');
    } else {
      $('#delete').removeAttr('disabled');
    }
  };
  getOrderList() {
    let self = this;

    $("#orders-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                partyId: self.state.customer.id,
                isins: self.state.isins,
                orderState: self.state.orderState.length > 0 ? self.state.orderState.map(order => order.code) : [],
                orderType: self.state.simpleSecurityExchange.code,
                fromSerialNumber: self.state.fromSerialNumber !== '' ? Number(self.state.fromSerialNumber) : 0,
                toSerialNumber: self.state.toSerialNumber !== '' ? Number(self.state.toSerialNumber) : 0,
                requestCancel: self.state.requestCancel,
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
            GetOrdersService.getAllOrdersList(command, function (response) {
              option.success(response)
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
          model: {
            id: 'id'
          },
          data: "result",
          total: "totalRecords"

        },
        aggregate: [
          { field: "amount", aggregate: "sum" },
          { field: "volume", aggregate: "sum" },
          { field: "price", aggregate: "sum" },
          { field: "remainingAmount", aggregate: "sum" },
          { field: "remainingVolume", aggregate: "sum" },

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
      // toolbar: `<button id="delete"  disabled="true">حذف</button>${excelAndPdfToolbar}`,
      toolbar: `${excelAndPdfToolbar}`,
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
          let grid = $("#orders-list").data("kendoGrid");
          let items = grid.dataSource.view();
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
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1 && this.dataSource.data().length > 1) {
              $("#delete").on("click", function () {
                self.setState({
                  deleteModal: true,
                })
              });
              $("#orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-amount-sum").text(kendo.toString(item.totalAmountSum, 'n0'));

              $("#orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(item.totalVolumeSum, 'n0'));

              $("#orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(item.totalPriceeSum, 'n0'));

              $("#orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-remainingAmount-sum").text(kendo.toString(item.totalRemainingAmountSum, 'n0'));

              $("#orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-remainingVolume-sum").text(kendo.toString(item.totalRemainingVolumeSum, 'n0'));
              $("#orders-list tbody tr td span.edit").on("click", function (item) {
                var grid = $("#orders-list").data("kendoGrid");
                var row = $(item.target).closest("tr");
                var dataItem = grid.dataItem(row);

                self.props.history.push(
                  {
                    pathname: '/main/order/orders/updateOrder',
                    state: {
                      stateParams: {
                        selectedParty: { id: dataItem.partyId, fullName: dataItem.partyFullName },
                        selectedBranch: { title: dataItem.branchName, id: dataItem.branchId },
                        selectedProduct: { symbol: dataItem.symbol, fullProductName: dataItem.symbol, id: dataItem.productId },
                        orderSide: dataItem.orderSide,
                        serialNumber: dataItem.serialNumber,
                        amount: dataItem.amount,
                        maxPrice: dataItem.maxPrice,
                        minPrice: dataItem.minPrice,
                        quantity: dataItem.volume,
                        dataCondition: dataItem.dateCondition,
                        toDate: dataItem.validUntil,
                        description: dataItem.senderDescription,
                        id: dataItem.id

                      }
                    }

                  })
              });

              $("#orders-list tbody tr td span.delete").on("click", function (item) {
                var grid = $("#orders-list").data("kendoGrid");
                var row = $(item.target).closest("tr");
                var dataItem = grid.dataItem(row);

                self.setState({

                  selectedId: dataItem.id
                }, function () {
                  self.setState({
                    deleteModal: true
                  });
                })

              });

            }
            else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            }

          });
        };




      },
      columns: Columns()
    });

  };


  reRenderGrid() {
    var command = {
      entity: {
        orderIds: this.state.selectedId ? [this.state.selectedId] : selectedIds,
        OrderRejectionReason: this.state.orderRejectionReason.code
      }
    };
    var self = this;
    GetOrdersService.deleteOrder(command, (res) => {

      if (res.success) {

        toastr.success(res.message);
        self.search();

        if (self.state.selectedId)
          self.setState({
            selectedId: null,
            deleteModal: false
          });
        else {
          self.setState({
            deleteModal: false
          });
        }

      }
      else {
        self.setState({
          selectedId: null,
        });
      }

    })
  };
  //close modal
  handleClose = () => {
    this.setState({ deleteModal: false });
  };



  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container orders-list"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">

                <Grid item md={12}>
                  <AutoCompleteComponent {...this.state.customerList}
                    handleChange={(value) => this.handlePartyChange(value)}
                    value={this.state.customer.fullName}
                    service={GetPartiesService.simpleSearchCustomers} />
                  <MultiSelectAutoCompleteComponent
                    {...this.state.isinsList}
                    handleChange={(value , name) => this.handleChange(value, name)}
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
                    <ComboBoxComponent isFilterable {...this.state.simpleSecurityExchangeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.simpleSecurityExchange} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <Input label="از شماره سریال " type="number" handleChange={(e) => this.handleChange(e, 'fromSerialNumber')} value={this.state.fromSerialNumber} />
                </Grid>
                <Grid item md={2}>
                  <Input label="تا سند سریال " type="number" handleChange={(e) => this.handleChange(e, 'toSerialNumber')} value={this.state.toSerialNumber} />
                </Grid>
                <Grid item md={2}>
                  <FormControlLabel
                    style={{ marginTop: 14 }}
                    control={
                      <Checkbox
                        checked={this.state.requestCancel}
                        onChange={(value) => this.handleChangeCheck(value, 'requestCancel')}
                        value="requestCancel"
                        color="primary"

                      />
                    }
                    label="درخواست انصراف مشتری"
                  />
                </Grid>
                <Grid item md={12}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.orderStateList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.orderState} />
                  </div>
                </Grid>

                {/* <Grid item md={7}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.branch} />
                  </div>
                </Grid> */}








              </Grid>
            </div>

          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="orders-list" className="height-page"></div>
          </div>
        </Paper>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.deleteModal}
          onClose={this.handleClose}
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
            <h3>
              <FaIcon color="gray" name="fa fa-trash" size={20} />
              <span style={{ marginRight: '5px' }}>حذف</span>
              {/*<b>*/}
              {/*حذف {this.props.deleteHeader}*/}
              {/*</b>*/}
            </h3>
            <hr />
            <div style={{ position: 'relative' }}>
              {/* {
                                this.state.issuingChequeModalLoader
                                ?
                                <div style={{backgroundColor: '#ffffffad', position: 'absolute', top: 0, left: 0, width: '580px', height: '100%', zIndex: 9999}} id="issuingChequeModalLoader">
                                    <div  className="flex flex-1 flex-col items-center justify-center height-page">
                                        <CircularProgress/>
                                    </div>
                                </div>
                                :
                                null
                            } */}

              {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <PersianDatePicker selectedDate={this.state.chequeDate} label="تاریخ چک" handleOnChange={(value) => this.handleDate(value, 'chequeDate')} disabled/>
                                </Grid>
                            </Grid> */}



              {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <Input label="شماره سریال چک" type="text" handleChange={(value) => this.chequeSerialNumberH(value)}
                                           value={this.state.chequeSerialNumber} required />
                                </Grid>
                            </Grid> */}


              {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <NumberFormatComponent
                                        id="" label="مبلغ چک"
                                        value={this.state.chequeAmount}
                                        handleChange={(value) => this.handleChange(value, 'chequeAmount')}
                                        type="number"
                                        isSeparator={true}
                                        disabled
                                        
                                    />
                                </Grid>
                            </Grid> */}
              <Grid container spacing={8} className="no-margin">
                <Grid item md={11}>
                  <div className="k-rtl">
                    <DropDownComponent {...this.state.orderRejectionReasonList}
                      handleChange={(value) => this.handleChange(value, 'orderRejectionReason')} isFilterable={false}
                      value={this.state.orderRejectionReason} required />
                  </div>
                </Grid>
              </Grid>
              {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <RadioButtons {...this.state.chequeDetailType} radioH={this.radioChange}/>
                                </Grid>
                            </Grid> */}
              {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <Input label="شرح چک" handleChange={(e) => this.handleChange(e, 'deleteDescription')} value={this.state.deleteDescription} isMultiLine={true} />
                                </Grid>
                            </Grid> */}
              {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.chequeHashur}
                                        onChange={this.handleChangeCheck('chequeHashur')}
                                        value="chequeHashur"
                                        color="primary"
                                    />
                                }
                                label="هاشور حواله"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.chequeDateLetter}
                                        onChange={this.handleChangeCheck('chequeDateLetter')}
                                        value="chequeDateLetter"
                                        color="primary"
                                    />
                                }
                                label="تاریخ به حروف"
                            /> */}
            </div>
            <br />
            <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.reRenderGrid}>
              حذف
                        </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleClose}>
              انصراف
                        </Button>
          </Paper>
        </Modal>
      </React.Fragment>

    )
  }
}

export default GetOrderManagement;
