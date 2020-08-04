import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import GetVouchersMasterService from '../services/GetVouchersMasterService';
import Columns from '../constants/GetVouchersMasterColumn';
import Grid from '@material-ui/core/Grid';
import Loading from "core/Loading";
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetFiscalYearsService from '../../../../../modules/accounting/accountingBase/fiscalYear/services/GetFiscalYearsService'
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetEnum from 'services/getEnum';
import kendo from '@progress/kendo-ui';
import Radio from '@material-ui/core/Radio';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import toastr from 'toastr';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import '../components/GetVoucherMasterComponent.css'
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment';
import { Checkbox } from '@material-ui/core/Checkbox';
import OperationModal from './../../../../../../shared/components/operationModal/operationModal';

const $ = require("jquery");
let selectedIds = [];

class GetVouchersMaster extends React.Component {
  constructor(props) {
    super(props)

    
    this.state = {
      userInfo: {},
      fromVoucherNumber: 0,
      toVoucherNumber: 0,
      columns: Columns(),
      voucherMasterId: 0,
      renderCount: 0,
      voucherType: { code: 0 },
      submitType: '',
      open: false,
      toDate: moment(new Date()),
      fromDate: moment(new Date()),
      selectedBranch: { code: 0 },
      selectedSubmitType: { code: 0 },
      selectedYear: { code: 0 },
      deleteModal: false,
      selectedVoucher: {},
      branchList: {
        name: "selectedBranch",
        field: "title",
        label: "شعبه",
        list: []
      },
      submitTypeList: {
        name: "selectedSubmitType",
        field: "title",
        label: "نوع ثبت",
        list: []
      },
      fiscalYearList: {
        name: "selectedYear",
        field: "title",
        label: "سال مالی",
        list: []
      },
      voucherTypeList: {
        name: "voucherType",
        field: "title",
        label: "نوع سند",
        list: []
      },
      response: {},
      confirmDocumentationModal: false,
      lockModal: false,
      unlockModal: false,
      voucherConfirmationModal: false,
      openModal: false,
      operationModalInfo: {
        name: "printVoucher",
        title: "چاپ اسناد",
        actionTitle: "چاپ",
        hasPrintType: false,

        radioButtonList: [
          {
            label: "اسناد انتخابی",
            title: "selectedVoucher",
            detail: null,
          },

          {
            label: "بر اساس شماره سند",
            title: "voucherNumber",
            detail: {
              type: "number",
              from: {
                label: "از سند",
                title: 'fromVoucherNumber',
                value: ''
              },

              to: {
                label: "تا سند",
                title: 'toVoucherNumber',
                value: ''
              }

            }
          },
          {
            label: "بر اساس تاریخ",
            title: "voucherDate",
            detail: {
              type: "date",
              from: {
                label: "از تاریخ",
                title: 'fromDate',
                value: null
              },

              to: {
                label: "تا تاریخ",
                title: 'toDate',
                value: null
              }

            }
          },
        ]
      },
      reRender: false,
      isLoading: true
    }
    this.isPdfDownloading = false;
    this.isExcellDwonloading = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeFiscalYear = this.handleChangeFiscalYear.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    // this.openLockModal = this.openLockModal.bind(this);
    // this.handleCloseLockModal = this.handleCloseLockModal.bind(this);
    // this.locked = this.locked.bind(this);
    // this.openUnLockModal = this.openUnLockModal.bind(this);
    // this.handleCloseUnLockModal = this.handleCloseUnLockModal.bind(this);
    // this.unlocked = this.unlocked.bind(this);
    this.remove = this.remove.bind(this);
    this.successRemove = this.successRemove.bind(this);
    this.search = this.search.bind(this);
    // this.acceptedVoucher = this.acceptedVoucher.bind(this);
    this.handleConfirmOperationVoucherModal = this.handleConfirmOperationVoucherModal.bind(this)


  }

  componentDidMount() {
    this.getDropDownData();
  }


  increaseCount() {
    this.setState((state) => ({ increaseCount: state.increaseCount + 1 }));
  }

  getDropDownData() {

    GetFiscalYearsService.getFiscalYears({}, (response) => DropDownListDataProvider(this, "fiscalYearList", response, this.handleChangeFiscalYear({ value: response.result[0] })));
    GetBranchService.getBranchesByFilter({}, (response) => DropDownListDataProvider(this, "branchList", response));
    GetVoucherTypeService({}, (response) => DropDownListDataProvider(this, "voucherTypeList", response));
    GetEnum("VoucherInsertMode", (response) => DropDownListDataProvider(this, "submitTypeList", response));
  }

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }




  handleChangeFiscalYear(value) {
    let item = value.value;
    let today = new Date()
    let enddate = new Date(item.endDate)
    this.setState({

      selectedYear: item,
      fromDate: item.startDate,
      toDate: enddate.getTime() > today.getTime() ? today : enddate,
    }, () => {
      this.getVoucherMasterList();
    });

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

  //TODO unlocked buttons in refresh the page

  refreshSelectedItem() {
    // $('#confirmDocumentation').attr('disabled', 'disabled');
    // $('#lockDocumentation').attr('disabled', 'disabled');
    // $('#unlockDocumentation').attr('disabled', 'disabled');
    selectedIds = [];
  }


  search() {
    $("#voucher-master-list").data("kendoGrid").dataSource.read(this);
    this.refreshSelectedItem();
    this.setState({
      open: false
    })

  }


  // acceptedVoucher() {
  //   let command = {
  //     entity: selectedIds
  //   }
  //   GetVouchersMasterService.finalizeVouchersById(command, (response) => {

  //     if (response.success) {
  //       toastr.success("اسناد انتخاب شده با موفقیت قطعی شد");
  //       this.clodeModalConfirmation();
  //       this.getVoucherMasterList();
  //     }
  //   })
  // }

  getVoucherMasterList() {
    let self = this;
    $("#voucher-master-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter:
              {
                voucherMasterId: self.state.voucherMasterId,
                fromVoucherNumber: self.state.fromVoucherNumber,
                toVoucherNumber: self.state.toVoucherNumber,
                branchId: self.state.selectedBranch.id,
                voucherInsertMode: self.state.selectedSubmitType.code,
                voucherCategoryId: self.state.voucherType.code,
                fiscalYearId: self.state.selectedYear.id,
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
                    field: "voucherNumber",
                    dir: "desc"
                  }]
              }
            }
            self.setState({
              isLoading: true
            });
            GetVouchersMasterService.getFlatVoucherMasters(command, function (response) {
              if (response.success) {
                self.setState({ response: response })

              }
              self.setState({
                loading: false,
                isLoading: false
              }, () => {
                option.success(response)
              });
            })
          }
        },

        pageSize: 50,
        sort: {
          field: "voucherNumber",
          dir: "desc"
        },
        serverPaging: true,
        serverSorting: true,
        schema: {
          model: {
            id: 'id',
          },
          data: "result",
          total: "totalRecords"

        },
        aggregate: [
          { field: "amount", aggregate: "sum" },
        ]
      },
      // sortable: true,
      // filterable: true,
      // columnMenu: true,

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
      toolbar: `<button class="main-btns bg-success" id="confirmDocumentation" >قطعی کردن اسناد</button>` +
        `<button class="main-btns  btn-bg-orange" id="lockDocumentation">قفل کردن اسناد</button>` +
        `<button class="main-btns btn-bg-blue" id="unlockDocumentation" >باز کردن اسناد</button>` +
        `<button  class="main-btns bg-secondary" id="voucherConfirmation">تایید اسناد</button>` +
        `<button  class="main-btns bg-info" id="voucherPrint">چاپ سند</button> ${excelAndPdfToolbar}`,
      dataBound: function (e) {
        var scrollOffset = {
          left: 10000,
        };
        var container = e.sender.wrapper.children(".k-grid-content");
        container.scrollLeft(scrollOffset.left);
        if ($("div.k-pager-sm")) {
          $("div.k-pager-sm").removeClass("k-pager-sm");
        }

        let grid = e.sender;
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
          console.log("isChecked : ", isChecked);


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

        if (this.dataSource.data().length > 0) {
          let grid = $("#voucher-master-list").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");

            currentRow.find(".id").css({ color: '#039be5', cursor: 'pointer' });
            if (index === this.dataSource.data().length - 1) {
              $("#voucher-master-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-amount-sum").text(kendo.toString(self.state.response.voucherMasterAmountSum, 'n0'));

            }
          })
        }



        $("#voucher-master-list tbody tr td div.id").on("click", function (item) {
          var grid = $("#voucher-master-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.props.history.push(
            {

              pathname: self.props.detail.path,
              state: {
                id: dataItem.id
              }
            })
        });

        $("#voucher-master-list tbody tr td.voucherNumber").on("click", function (item) {
          var grid = $("#voucher-master-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.props.history.push(
            {

              pathname: self.props.detail.path,
              state: {
                id: dataItem.id
              }
            })
        });
        $("#voucher-master-list tbody tr td div span.edit").on("click", function (item) {
          var grid = $("#voucher-master-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          if (dataItem.isEditable) {
            self.props.history.push(
              {
                pathname: self.props.edit.path,
                state: {
                  id: dataItem.id
                }
              })
          }
        });

        $("#voucher-master-list tbody tr td div span.delete").on("click", function (item) {
          var grid = $("#voucher-master-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);

          if (dataItem.isDeletable) {

            self.openDeleteModal(dataItem);
          }
        });

        $("#confirmDocumentation").on("click", function () {
          self.setState({
            operationModalInfo: {
              name: "confirmDocumentation",

              title: "قطعی کردن اسناد",
              actionTitle: "تایید",
              hasPrintType: false,

              radioButtonList: [
                {
                  label: "اسناد انتخابی",
                  title: "selectedVoucher",
                  detail: null,
                },

                {
                  label: "بر اساس شماره سند",
                  title: "voucherNumber",
                  detail: {
                    type: "number",
                    from: {
                      label: "از سند",
                      title: 'fromVoucherNumber',
                      value: ''
                    },

                    to: {
                      label: "تا سند",
                      title: 'toVoucherNumber',
                      value: ''
                    }

                  }
                },
                {
                  label: "بر اساس تاریخ",
                  title: "voucherDate",
                  detail: {
                    type: "date",
                    from: {
                      label: "از تاریخ",
                      title: 'fromDate',
                      value: null
                    },

                    to: {
                      label: "تا تاریخ",
                      title: 'toDate',
                      value: null
                    }

                  }
                },
              ]
            }
          }, self.setState({
            openModal: true
          })



          )



        });
        $("#voucherConfirmation").on("click", function () {


          self.setState({
            operationModalInfo: {
              name: "voucherConfirmation",

              title: "تایید اسناد",
              actionTitle: "تایید",
              hasPrintType: false,

              radioButtonList: [
                {
                  label: "اسناد انتخابی",
                  title: "selectedVoucher",
                  detail: null,
                },

                {
                  label: "بر اساس شماره سند",
                  title: "voucherNumber",
                  detail: {
                    type: "number",
                    from: {
                      label: "از سند",
                      title: 'fromVoucherNumber',
                      value: ''
                    },

                    to: {
                      label: "تا سند",
                      title: 'toVoucherNumber',
                      value: ''
                    }

                  }
                },
                {
                  label: "بر اساس تاریخ",
                  title: "voucherDate",
                  detail: {
                    type: "date",
                    from: {
                      label: "از تاریخ",
                      title: 'fromDate',
                      value: null
                    },

                    to: {
                      label: "تا تاریخ",
                      title: 'toDate',
                      value: null
                    }

                  }
                },
              ]
            }
          }, self.setState({
            openModal: true
          })



          )

        });








        $("#lockDocumentation").on("click", function () {

          self.setState({
            operationModalInfo: {
              name: "lockDocumentation",

              title: "قفل کردن اسناد",
              actionTitle: "تایید",
              hasPrintType: false,

              radioButtonList: [
                {
                  label: "اسناد انتخابی",
                  title: "selectedVoucher",
                  detail: null,
                },

                {
                  label: "بر اساس شماره سند",
                  title: "voucherNumber",
                  detail: {
                    type: "number",
                    from: {
                      label: "از سند",
                      title: 'fromVoucherNumber',
                      value: ''
                    },

                    to: {
                      label: "تا سند",
                      title: 'toVoucherNumber',
                      value: ''
                    }

                  }
                },
                {
                  label: "بر اساس تاریخ",
                  title: "voucherDate",
                  detail: {
                    type: "date",
                    from: {
                      label: "از تاریخ",
                      title: 'fromDate',
                      value: null
                    },

                    to: {
                      label: "تا تاریخ",
                      title: 'toDate',
                      value: null
                    }

                  }
                },
              ]
            }
          }, self.setState({
            openModal: true
          })



          )

        });

        $("#unlockDocumentation").on("click", function (item) {

          self.setState({
            operationModalInfo: {
              name: "unlockDocumentation",
              title: "باز کردن اسناد",
              actionTitle: "تایید",
              hasPrintType: false,

              radioButtonList: [
                {
                  label: "اسناد انتخابی",
                  title: "selectedVoucher",
                  detail: null,
                },

                {
                  label: "بر اساس شماره سند",
                  title: "voucherNumber",
                  detail: {
                    type: "number",
                    from: {
                      label: "از سند",
                      title: 'fromVoucherNumber',
                      value: ''
                    },

                    to: {
                      label: "تا سند",
                      title: 'toVoucherNumber',
                      value: ''
                    }

                  }
                },
                {
                  label: "بر اساس تاریخ",
                  title: "voucherDate",
                  detail: {
                    type: "date",
                    from: {
                      label: "از تاریخ",
                      title: 'fromDate',
                      value: null
                    },

                    to: {
                      label: "تا تاریخ",
                      title: 'toDate',
                      value: null
                    }

                  }
                },
              ]
            }
          }, self.setState({
            openModal: true
          })



          )

        });
        $("#voucherPrint").on("click", function () {
          self.setState({
            operationModalInfo: {
              name: "voucherPrint",
              title: "چاپ اسناد",
              actionTitle: "چاپ",
              hasPrintType: true,

              radioButtonList: [
                {
                  label: "اسناد انتخابی",
                  title: "selectedVoucher",
                  detail: null,
                },

                {
                  label: "بر اساس شماره سند",
                  title: "voucherNumber",
                  detail: {
                    type: "number",
                    from: {
                      label: "از سند",
                      title: 'fromVoucherNumber',
                      value: ''
                    },

                    to: {
                      label: "تا سند",
                      title: 'toVoucherNumber',
                      value: ''
                    }

                  }
                },
                {
                  label: "بر اساس تاریخ",
                  title: "voucherDate",
                  detail: {
                    type: "date",
                    from: {
                      label: "از تاریخ",
                      title: 'fromDate',
                      value: null
                    },

                    to: {
                      label: "تا تاریخ",
                      title: 'toDate',
                      value: null
                    }

                  }
                },
              ]
            }
          }, self.setState({
            openModal: true
          })



          )


        });




        $("#voucher-master-list .excel-report").on("click", function (item) {
          $('.excel-report').attr('disabled', 'disabled');
          if (!self.isExcellDwonloading) {
            self.isExcellDwonloading = true;
            self.getExcelReport();
          }
        });
                //TODO there is no API for pdf
        $("#voucher-master-list .pdf-report").on("click", function (item) {
          self.getPdfReport();
          // alert('pdf');
        });
      },
      columns: self.state.columns,
      change: self.onChange
    });

  };

  onChange(arg) {
    let listIds = Object.keys(arg.sender._selectedIds);
    selectedIds = listIds.map((value) => {
      return parseInt(value);
    });
    // if (selectedIds.length === 0) {
    //   $('#confirmDocumentation').attr('disabled', 'disabled');

    // } else {
    //   $('#confirmDocumentation').removeAttr('disabled');

    // }
    // if (selectedIds.length === 0) {
    //   $('#lockDocumentation').attr('disabled', 'disabled');

    // } else {
    //   $('#lockDocumentation').removeAttr('disabled');

    // }
    // if (selectedIds.length === 0) {
    //   $('#unlockDocumentation').attr('disabled', 'disabled');

    // } else {
    //   $('#unlockDocumentation').removeAttr('disabled');

    // }
    // if (selectedIds.length === 0) {
    //   $('#voucherConfirmation').attr('disabled', 'disabled');

    // } else {
    //   $('#voucherConfirmation').removeAttr('disabled');

    // }


  }
  getCommand = () => {
    var grid = $("#voucher-master-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter:
      {
        voucherMasterId: this.state.voucherMasterId,
        fromVoucherNumber: this.state.fromVoucherNumber,
        toVoucherNumber: this.state.toVoucherNumber,
        branchId: this.state.selectedBranch.id,
        branchTitle: this.state.selectedBranch.title,
        voucherInsertMode: this.state.selectedSubmitType.code,
        voucherCategoryId: this.state.voucherType.code,
        fiscalYearId: this.state.selectedYear.id,
        detailLegderCode: "",
        subsidiaryLedgerCode: "",
        generalLedgerCode: "",
        // voucherInsertMode: 0,
        // voucherCategoryId: 0,
        voucherMasterState: 0,
        description: "",
        amount: 0,
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
            field: "voucherNumber",
            dir: "asc"
          }]
      }
    }
    return command;
  }
  getExcelReport = () => {
    var command = this.getCommand();
    GetVouchersMasterService.getExcelExport(command, "voucher-master-list", (response) => {
      this.isPdfDownloading = false;
      $('.excel-report').removeAttr('disabled');
    });
  }

  getPdfReport() {
    // var command = this.getCommand();
    // GetVouchersMasterService.getPdfExport(command, function (response) {
    // });

  }
  openDeleteModal(dataItem) {
    this.setState({ selectedVoucher: dataItem, deleteModal: true });
  }
  handleCloseDeleteModal() {
    this.setState({ deleteModal: false });
  }


  //TODO remove method because of repetition

  // openLockModal(dataItem) {
  //   this.setState({ selectedVoucher: dataItem, lockModal: true });
  // }

  //TODO remove method because of repetition


  // handleCloseLockModal() {
  //   this.refreshSelectedItem();
  //   this.setState({
  //     lockModal: false
  //   })
  // }

  handleCloseVoucherconfirmationModal() {
    this.refreshSelectedItem();
    this.setState({
      voucherConfirmationModal: false
    })
  }

  //TODO remove method because of repetition


  // openUnLockModal(dataItem) {
  //   this.setState({ selectedVoucher: dataItem, unlockModal: true });
  // }



  //TODO remove method because of repetition

  // handleCloseUnLockModal() {
  //   // this.refreshSelectedItem();
  //   this.setState({
  //     unlockModal: false
  //   })
  // }
  //TODO remove method because of repetition

  // handleCloseVoucherPrintModal = () => {
  //   // this.refreshSelectedItem();
  //   this.setState({
  //     openModal: false
  //   })
  // }


  remove() {
    var command = {
      entity: this.state.selectedVoucher.id
    }
    GetVouchersMasterService.deleteVoucherMaster(command, this.successRemove)
  }

  successRemove(response) {
    this.setState({ deleteModal: false });

    if (response.success) {
      this.getVoucherMasterList();
      toastr.success("سند با موفقیت حذف شد")

    }

  }

  // TODO remove method because of repetition


  // locked() {
  //   let command = {
  //     entity: selectedIds
  //   }
  //   GetVouchersMasterService.lockVoucherMaster(command, (response) => {
  //     if (response.success) {
  //       toastr.success("اسناد انتخاب شده با موفقیت قفل شد");
  //       this.handleCloseLockModal();
  //       this.getVoucherMasterList();
  //     }
  //     this.handleCloseLockModal();
  //   })
  // }




  // TODO remove method because of repetition


  // unlocked() {
  //   let command = {
  //     entity: selectedIds
  //   }
  //   GetVouchersMasterService.unlockVoucherMaster(command, (response) => {
  //     if (response.success) {
  //       toastr.success("اسناد انتخاب شده با موفقیت باز شد");
  //       this.handleCloseUnLockModal();
  //       this.getVoucherMasterList();
  //     }
  //     this.handleCloseUnLockModal();

  //   })
  // }

  checkBoxSelectHandles = (dataItem) => {
    if (dataItem.isChecked) {
      selectedIds.push(dataItem.id)
    } else {
      let index = selectedIds.findIndex(item => { return item === dataItem.id });
      selectedIds.splice(index, 1);
    }

    // if (selectedIds.length === 0) {
    //   $('#confirmDocumentation').attr('disabled', 'disabled');
    // } else {
    //   $('#confirmDocumentation').removeAttr('disabled');
    // }
    // if (selectedIds.length === 0) {
    //   $('#lockDocumentation').attr('disabled', 'disabled');
    // } else {
    //   $('#lockDocumentation').removeAttr('disabled');
    // }
    // if (selectedIds.length === 0) {
    //   $('#unlockDocumentation').attr('disabled', 'disabled');
    // } else {
    //   $('#unlockDocumentation').removeAttr('disabled');
    // }
    // if (selectedIds.length === 0) {
    //   $('#voucherConfirmation').attr('disabled', 'disabled');
    // } else {
    //   $('#voucherConfirmation').removeAttr('disabled');
    // }






  };

  clodeModalConfirmation() {
    this.refreshSelectedItem();
    this.setState({
      confirmDocumentationModal: false
    })
  }

  handleCloseVoucherModal = () => {


    this.setState({
      openModal: false
    })

  }

  successResultModalConfirmation = (response) => {

    if (response.success) {
      toastr.success(response.message);
      this.getVoucherMasterList();
    }
  }

  successPrintVoucherDetail = (response) => {
    this.successResultModalConfirmation(response);
  }

  successUnlockVoucherMaster = (response) => {
    this.successResultModalConfirmation(response);
  }

  successLockVoucherMaster = (response) => {
    this.successResultModalConfirmation(response);

  }

  successConfirmVouchers = (response) => {
    this.successResultModalConfirmation(response);

  }

  successFinalizeVouchersById = (response) => {
    this.successResultModalConfirmation(response);

  }


  successPdfResponse = (response) => {
    this.handleCloseVoucherModal();
  }



  handleConfirmOperationVoucherModal = (name, data) => {
    data.voucherIds = selectedIds;
    data.insertMode = this.state.selectedSubmitType.code;
    data.voucherCategoryId = this.state.voucherType.code;
    let pdfCommand = {
      ReportFilter: data
    }
    let newCommand = {
      entity: data
    }

    switch (name) {
      case "voucherPrint":
        switch (pdfCommand.ReportFilter.voucherPrintTypeSelected) {
          case 1:
            GetVouchersMasterService.getDetailedAccountingVoucherPdfReport(pdfCommand, (resposne) => this.successPdfResponse(resposne));
            break;
          case 2:
            GetVouchersMasterService.getGeneralGroupedAccountingVoucherPdfReport(pdfCommand, (resposne) => this.successPdfResponse(resposne));
            break;
          case 3:
            GetVouchersMasterService.GetFullGroupedAccountingVoucherPdfReport(pdfCommand, (resposne) => this.successPdfResponse(resposne));
            break;
          case 4:
            GetVouchersMasterService.GetVerticalAccountingVoucherPdfReport(pdfCommand, (resposne) => this.successPdfResponse(resposne));
            break;
          default:
            break;
        }
        break;
      case "unlockDocumentation":
        GetVouchersMasterService.unlockVoucherMaster(newCommand, (response) => this.successUnlockVoucherMaster(response));
        break;
      case "lockDocumentation":
        GetVouchersMasterService.lockVoucherMaster(newCommand, (response) => this.successUnlockVoucherMaster(response));
        break;
      case "voucherConfirmation":
        GetVouchersMasterService.confirmVouchers(newCommand, (response) => this.successConfirmVouchers(response));
        break;
      case "confirmDocumentation":
        GetVouchersMasterService.finalizeVouchersById(newCommand, (response) => this.successFinalizeVouchersById(response));
        break;
      default:
        break;
    }

  }

  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container voucher-master"}>

          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

            <div classPage={"height-search"}>

              <Grid container spacing={8} className="no-margin">
                <Grid item md={2}>
                  <DropDownComponent isFilterable {...this.state.fiscalYearList}
                    handleChange={(value, name) => this.handleChangeFiscalYear(value)}
                    value={this.state.selectedYear} />

                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.fromDate} label="تاریخ سند از " handleOnChange={(e) => this.handleChangeDate(e, "fromDate")} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.toDate} label="تاریخ سند تا" handleOnChange={(e) => this.handleChangeDate(e, "toDate")} />
                </Grid>
                <Grid item md={2}>
                  <Input label="از سند شماره " type="number" handleChange={(e) => this.handleChange(e, 'fromVoucherNumber')} value={this.state.fromVoucherNumber} />
                </Grid>
                <Grid item md={2}>
                  <Input label="تا سند شماره " type="number" handleChange={(e) => this.handleChange(e, 'toVoucherNumber')} value={this.state.toVoucherNumber} />
                </Grid>

                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedBranch} />

                    {/* <DropDownComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedBranch} hasAll /> */}
                  </div>
                </Grid>

                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent {...this.state.submitTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedSubmitType} hasAll />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.voucherTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherType} hasAll />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Filter>
          {this.state.isLoading ? <Loading /> : ''}
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid") + " " + (this.state.isLoading ? 'hidden-item' : 'show-item')}>
            <div id="voucher-master-list" className="height-page"></div>
          </div>
        </Paper>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.deleteModal}
          onClose={(e) => this.handleCloseDeleteModal(e)}
        >
        <Paper className="paper-modal">
            <h3 >
              <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
              <span style={{ marginRight: '5px' }}>حذف سند</span>
              {/*<b>*/}
              {/*حذف {this.props.deleteHeader}*/}
              {/*</b>*/}
            </h3>
            <hr />
            {/*<h6> آیا از حذف <b> {!this.props.stateParams.fullName ?'dsdsdsd': this.props.stateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
            <h3>آیا از حذف سند با شماره  <b>{this.state.selectedVoucher.voucherNumber}</b> و شرح <b>{this.state.selectedVoucher.description}</b> مطمئن می باشید؟</h3>
            <br />
            <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.remove}>
              حذف
                        </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={(e) => this.handleCloseDeleteModal(e)}>
              انصراف
                        </Button>
          </Paper>
        </Modal>

        {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.confirmDocumentationModal}

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
              <span className="margin-right-5">قطعی کردن اسناد</span>
            </h3>
            <hr />
            <h3>آیا از قطعی کردن اسناد انتخاب شده اطمینان دارید ؟</h3>
            <hr />
            <Button variant="contained" color="primary" style={{ marginRight: '5px' }}
              onClick={this.acceptedVoucher}>
      
              <span style={{ margin: '0 5px' }}>
                بله
              </span>
            </Button>
            <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }}
              onClick={this.clodeModalConfirmation.bind(this)}>
      
              <span style={{ margin: '0 5px' }}>
                خیر
              </span>
            </Button>
          </Paper>
        </Modal> */}


        {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.lockModal}
          onClose={(e) => this.handleCloseLockModal(e)}
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
              <span className="margin-right-5">قفل کردن اسناد</span>
            </h3>
            <hr />
            <h3>آیا از قفل کردن اسناد انتخاب شده اطمینان دارید ؟</h3>
            <hr />
            <Button variant="contained" color="primary" style={{ marginRight: '5px' }}
              onClick={this.locked}>
              <span style={{ margin: '0 5px' }}>
                بله
              </span>
            </Button>
            <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }}
              onClick={(e) => this.handleCloseLockModal(e)}>
              <span style={{ margin: '0 5px' }}>
                خیر
              </span>
            </Button>
          </Paper>
        </Modal> */}
        {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.unlockModal}
          onClose={(e) => this.handleCloseUnLockModal(e)}
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
              <span className="margin-right-5">باز کردن اسناد</span>
            </h3>
            <hr />
            <h3>آیا از باز کردن اسناد انتخاب شده اطمینان دارید ؟</h3>
            <hr />
            <Button variant="contained" color="primary" style={{ marginRight: '5px' }}
              onClick={this.unlocked}>
              <span style={{ margin: '0 5px' }}>
                بله
              </span>
            </Button>
            <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }}
              onClick={(e) => this.handleCloseUnLockModal(e)}>
              <span style={{ margin: '0 5px' }}>
                خیر
              </span>
            </Button>
          </Paper>
        </Modal> */}

        {/* voucher confirmation modal */}



        {/* accepted voucher modal */}






        {/* unlock voucher modal */}


        {/* voucher print Modal  */}
        <OperationModal selectedIds={selectedIds} {...this.state.operationModalInfo} openModal={this.state.openModal}

          handleClose={(name) => this.handleCloseVoucherModal(name)} confirmOpertion={(name, command) => this.handleConfirmOperationVoucherModal(name, command)} />
      </React.Fragment>

    )
  }
}

export default GetVouchersMaster;
