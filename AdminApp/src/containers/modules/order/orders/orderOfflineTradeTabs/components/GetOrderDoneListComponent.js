import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetOrderDoneColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';
import moment from 'moment';
// import './GetOrdersStatusComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import { searchProducts } from '../../../../../../services/getProducts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetAllProductsPaging from "../../../../../../services/getProducts";
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import { Grid as KendoGrid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import faMessages from 'constants/fa.json';
import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import toastr from 'toastr';
import './GetOrderDoneListComponent.css'
import GetTseOrderBranchService from '../services/GetTseOrderBranchService';
import GetOrdersDispatchService from '../../orderDispatch/services/GetOrderDispatchService';
loadMessages(faMessages, 'fa-FA');
const $ = require("jquery");
let selectedIds = [];
class GetOrderDoneList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      /* #region filter state */

      columns: Columns(),
      endDate: new Date(),
      startDate: moment(new Date().setDate(new Date().getDate() - 30)),
      fromSerialNumber: '',
      toSerialNumber: '',
      deleteId: null,
      backToWaitingListModal: false,
      deleteModal: false,
      /* #region list state */


      branchList: {
        name: "branch",
        field: "title",
        label: "شعبه تخصیصی ",
        list: []
      },
      branch: { code: 0, title: '', id: 0 },
      branchMultiSelectList: {
        name: "branchMultiSelect",
        field: "title",
        label: "شعبه تخصیصی ",
        list: []
      },
      branchMultiSelect: [],
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
        label: "دلیل ابطالسفارش",
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
      description: '',
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

      assignToBranch: false
      /* #endregion */

      /* #endregion */
    };
    /* #region bind */

    this.handleChange = this.handleChange.bind(this);
    this.reRenderGrid = this.reRenderGrid.bind(this);
    this.search = this.search.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.assignToWaiting = this.assignToWaiting.bind(this);
    this.assignToActiveOrders = this.assignToActiveOrders.bind(this);
    this.assignToNotEnteredOrders = this.assignToNotEnteredOrders.bind(this);
    this.checkBoxClose = this.checkBoxClose.bind(this);


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
    setInterval(() => {
      this.getOrderList();
      this.setState({ counter: this.state.counter + 1 });
    }, 300000);
  }









  getBranchList() {

    GetBranchService.getTseBranches(response => {
      DropDownListDataProvider(this, "branchList", response)
      DropDownListDataProvider(this, "branchMultiSelectList", response)
    })
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
  getOrderList() {
    let self = this;

    $("#done-orders").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                requestCancel: self.state.requestCancel,
                partyId: self.state.customer.id,
                isins: self.state.isins,
                orderState: self.state.orderState.length > 0 ? self.state.orderState.map(order => order.code) : [],
                orderType: self.state.simpleSecurityExchange.code,
                fromSerialNumber: self.state.fromSerialNumber !== '' ? Number(self.state.fromSerialNumber) : 0,
                toSerialNumber: self.state.toSerialNumber !== '' ? Number(self.state.toSerialNumber) : 0,
                dateFilter: {
                  startDate: self.state.startDate,
                  endDate: self.state.endDate
                },
                branchIds: self.state.branchMultiSelect.length > 0 ? self.state.branchMultiSelect.map(i => i.id) : []
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
            GetTseOrderBranchService.getAllDoneOrderList(command, function (response) {
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
        // aggregate: [
        //   { field: "amount", aggregate: "sum" },
        //   { field: "volume", aggregate: "sum" },
        //   { field: "price", aggregate: "sum" },
        //   { field: "remainingAmount", aggregate: "sum" },
        //   { field: "remainingVolume", aggregate: "sum" },

        // ]
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
      toolbar:
        ` <button id="assignToNotEntered" disabled="true">
          بازگشت به سفارشهای وارد نشده
          </button>
          <button id="assignToActive" disabled="true">
          بازگشت به سفارش های فعال
          </button>
      
   ${excelAndPdfToolbar}`,
      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content");
        container.scrollLeft(scrollOffset.left);
        if($("div.k-pager-sm")){
          $("div.k-pager-sm").removeClass("k-pager-sm");
        }
        if (this.dataSource.data().length > 0) {
          let grid = $("#done-orders").data("kendoGrid");
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

          $("#assignToNotEntered").on("click", function () {
            self.assignToNotEnteredOrders();
          });
          $("#assignToActive").on("click", function () {
            self.assignToActiveOrders();
          });
          items.map((item, index) => {

            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1 && this.dataSource.data().length > 1) {
            }
            else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            }

          });
        };
      },
      columns: Columns()
    });

    $("#done-orders .excel-report").on("click", function (item) {
      self.getExcelReport();
    
    });
    $("#done-orders .pdf-report").on("click", function (item) {
        self.getPdfReport();
       
    });

  };




  getCommand = () => {
    var grid = $("#done-orders").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
    reportFilter: {
      requestCancel: this.state.requestCancel,
      partyId: this.state.customer.id,
      isins: this.state.isins,
      orderState: this.state.orderState.length > 0 ? this.state.orderState.map(order => order.code) : [],
      orderType: this.state.simpleSecurityExchange.code,
      fromSerialNumber: this.state.fromSerialNumber !== '' ? Number(this.state.fromSerialNumber) : 0,
      toSerialNumber: this.state.toSerialNumber !== '' ? Number(this.state.toSerialNumber) : 0,
      dateFilter: {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      },
      branchIds: this.state.branchMultiSelect.length > 0 ? this.state.branchMultiSelect.map(i => i.id) : []
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
  GetTseOrderBranchService.getExcelExportDownloadExcelGetAllDoneOrder(command, 'سفارش های انجام شده');

}

getPdfReport = () => {
var command = this.getCommand();
// alert('pdf')
// GetTseOrderBranchService.getPdfExportDownloadExcelGetAllNotEntered(command, "سفارش وارد نشده");

}

  search() {
    $("#done-orders").data("kendoGrid").dataSource.read(this);
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
      $('#assignToNotEntered').attr('disabled', 'disabled');
      $('#assignToActive').attr('disabled', 'disabled');

    } else {
      $('#assignToNotEntered').removeAttr('disabled');
      $('#assignToActive').removeAttr('disabled');
    }
  };
  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  checkBoxClose = () => {

    selectedIds = [];


    $('#assignToActive').attr('disabled', 'disabled');
    $('#assignToDone').attr('disabled', 'disabled');
    $('#assignToNotEntered').attr('disabled', 'disabled');


  };
  assignToWaiting() {
    var command = {
      entity: {
        orderIds: this.state.selectedId ? [this.state.selectedId] : selectedIds,
        orderRejectionReason: this.state.orderRejectionReason.code,
        description: this.state.orderRejectionReason.code === 9 ? this.state.description : null

      }
    };
    var self = this;
    GetOrdersDispatchService.backwardOrderToPendingOrder(command, (res) => {

      if (res.success) {

        toastr.success(res.message);
        self.search();

        if (self.state.selectedId)
          self.setState({
            selectedId: null,
            backToWaitingListModal: false
          });
        else {
          self.setState({
            backToWaitingListModal: false
          });
        }
        this.checkBoxClose();
      }
      else {
        self.setState({
          selectedId: null,
        });
      }

    })
  };

  assignToNotEnteredOrders() {

    var command = {
      entity: this.state.selectedId ? [this.state.selectedId] : selectedIds,


    };
    var self = this;
    GetTseOrderBranchService.assignToNotEnteredOrders(command, (res) => {

      if (res.success) {

        toastr.success(res.message);
        self.search();

        if (self.state.selectedId)
          self.setState({
            selectedId: null,

          });

          this.checkBoxClose();
      }
      else {
        self.setState({
          selectedId: null,
        });
      }

    })
  };

  assignToActiveOrders() {

    var command = {
      entity: this.state.selectedId ? [this.state.selectedId] : selectedIds,

    };
    var self = this;
    GetTseOrderBranchService.assignToActiveOrders(command, (res) => {

      if (res.success) {

        toastr.success(res.message);
        self.search();

        if (self.state.selectedId)
          self.setState({
            selectedId: null,

          });

          this.checkBoxClose();

      }
      else {
        self.setState({
          selectedId: null,
        });
      }
    })
  };


  reRenderGrid() {

    var command = {
      entity: {
        orderIds: this.state.selectedId ? [this.state.selectedId] : selectedIds,
        OrderRejectionReason: this.state.orderRejectionReason.code,
        description: this.state.orderRejectionReason.code === 9 ? this.state.description : null
      }
    };
    var self = this;
    GetOrdersDispatchService.backwardOrderToPendingOrder(command, (res) => {

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
        this.checkBoxClose();
      }
      else {
        self.setState({
          selectedId: null,
        });
      }

    })
  };

  handleCloseAssignBranchModal = () => {
    this.setState({ backToWaitingListModal: false });
  };

  render() {

    return (
      <React.Fragment>
        <Paper className={"main-paper-container done-orders"}>
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
                  <Input label="تا شمارهسریال " type="number" handleChange={(e) => this.handleChange(e, 'toSerialNumber')} value={this.state.toSerialNumber} />
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
                    <MultiSelectComponent isFilterable {...this.state.branchMultiSelectList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.branchMultiSelect} />
                  </div>
                </Grid>
                <Grid item md={12}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.orderStateList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.orderState} />
                  </div>
                </Grid>

              </Grid>
            </div>

          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="done-orders" className="height-page"></div>
          </div>
        </Paper>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.backToWaitingListModal}
          onClose={this.handleCloseAssignBranchModal}
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
              <FaIcon color="gray" name="fa fa-undo" size={20} />
              <span style={{ marginRight: '5px' }}>بازگشت به لیست انتظار</span>

            </h3>
            <hr />
            <div style={{ position: 'relative' }}>

              <Grid container spacing={8} className="no-margin">
                <Grid item md={11}>
                  <div className="k-rtl">
                    <DropDownComponent {...this.state.orderRejectionReasonList}
                      handleChange={(value) => this.handleChange(value, 'orderRejectionReason')} isFilterable={false}
                      value={this.state.orderRejectionReason} required />
                  </div>
                </Grid>
                {
                  this.state.orderRejectionReason.code === 9 ?
                    <Grid item md={11}>
                      <Input isMultiLine label=" توضیحات" textArea handleChange={(e) => this.handleChange(e, 'description')}
                        value={this.state.description} />
                    </Grid>
                    : ''
                }
              </Grid>

            </div>
            <br />
            <Button variant="contained" color="primary" onClick={this.assignToWaiting}>
              تایید
                        </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleCloseAssignBranchModal}>
              انصراف
                        </Button>
          </Paper>
        </Modal>
      </React.Fragment>

    )
  }
}

export default GetOrderDoneList;
