import React from "react";
import Header from "shared/components/stateHeader/stateHeader";
import Form from "../../../../../../shared/components/form/form";
import AddVouchersService from "../services/AddVouchersService";
import { Grid as KendoGrid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import Button from "@material-ui/core/Button";
import {
  getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetTemplate, getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetHeaderTemplate, costCenterHeaderTemplate, costCenterTemplate
} from "../../../../../../constants/autoCompleteTemplate";
import GetDetailLedgerService from "../../../accountingBase/detailLedger/services/GetDetailLedgerService";
import AutoCompleteComponent from "shared/components/dropDown/autocomplete";
import Input from "shared/components/formInput/inputForm";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import toastr from "toastr";
import { HotKeys } from "react-hotkeys";
import Grid from "@material-ui/core/Grid";
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownComponent from "shared/components/dropDown/dropDown";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import ComboBoxComponent from "shared/components/dropDown/comboBox/comboBox";
import GetSubsidiaryLedgerService from "../../../accountingBase/subsidaryLedger/services/GetSubsidiaryLedgerService";
import GetEnum from "services/getEnum";
import GetVouchersDetailService from "../services/GetVoucherDetailService";
import NumberFormatComponent from "shared/components/numberFormat/numberFormat";
import GetCostCentersService from "../../../accountingBase/costCenter/services/GetCostCentersService";
import FaIcon from "shared/components/Icon/Icon";
import GetVouchersMasterService from "../services/GetVouchersMasterService";

import faMessages from "constants/fa.json";
import { LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import SearchCostCentersService from "../services/SearchCostCentersService";
import Loading from 'core/Loading';
import './AddVoucherComponent.css';

loadMessages(faMessages, "fa-FA");
const keyMap = {
  ADD_NEW: "ctrl+enter",
  DELETE_ROW: "del",
  EDIT: "f2",
  ESC: "esc",
  ENTER: "enter",
  SUBMIT: "shift+enter",
  CANCEL: "f3"
};

export class Renderers {

  constructor(enterEdit, exitEdit, editFieldName) {

    this.enterEdit = enterEdit;
    this.exitEdit = exitEdit;
    this.editFieldName = editFieldName;
    this.cellRender = this.cellRender.bind(this);
    this.rowRender = this.rowRender.bind(this);
  }

  cellRender(tdElement, cellProps) {

    const dataItem = cellProps.dataItem;
    const field = cellProps.field;
    const additionalProps =
      cellProps.dataItem[this.editFieldName] &&
        cellProps.field === cellProps.dataItem[this.editFieldName]
        ? {
          ref: td => {
            const input = td && td.querySelector("input");
            if (!input || input === document.activeElement) {
              return;
            }
            if (input.type === "checkbox") {
              input.focus();
            } else {
              input.select();
            }
          }
        }
        : {
          onClick: () => {
            this.enterEdit(dataItem, field);
          }
        };

    return React.cloneElement(
      tdElement,
      { ...tdElement.props, ...additionalProps },
      tdElement.props.children
    );
  }

  rowRender(trElement, dataItem) {
    const trProps = {
      ...trElement.props,
      onMouseDown: () => {
        this.preventExit = true;
        clearTimeout(this.preventExitTimeout);
        this.preventExitTimeout = setTimeout(() => {
          this.preventExit = undefined;
        });


      },
      onBlur: () => {
        clearTimeout(this.blurTimeout);
        if (!this.preventExit) {
          this.blurTimeout = setTimeout(() => {
            this.exitEdit();
          });
        }
      },
      onFocus: () => {
        clearTimeout(this.blurTimeout);
      }
    };

    return React.cloneElement(
      trElement,
      { ...trProps },
      trElement.props.children
    );
  }
}
export class DragCell extends React.Component {

  render() {
    return (
      <td
        onDragOver={() => {
          DragCell.reorder(this.props.dataItem);

        }}
      >
        <span
          draggable="true"
          style={{ cursor: "move" }}
          onDragStart={e => {
            DragCell.dragStart(this.props.dataItem);
            e.dataTransfer.setData("dragging", "");
          }}
        >
          {this.props.dataItem.id > 0 ? this.props.dataItem.id : "ردیف جدید"}
        </span>
      </td>
    );
  }
}

export class CreateVoucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subsidiaryLedgerList: {
        name: "subsidiaryLedger",
        field: "fullTitle",
        label: "حساب معین",
        list: []
      },
      open: false,
      openRelationModal: false,
      activeItem: null,
      voucherMasterId: this.props.location.state && this.props.location.state.id ? this.props.location.state.id : 0,
      voucherMasterDescription: "",
      voucherMasterDate: new Date(),
      voucherMasternumber: "",
      voucherTypeList: {
        name: "voucherType",
        field: "title",
        label: "نوع سند",
        list: [],
        dataItemKey: "code"
      },
      voucherType: { code: "" },
      voucherStateList: {
        name: "voucherState",
        field: "title",
        label: "وضعیت سند",
        dataItemKey: "code",
        list: []
      },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      tempDataItem: {
        creditString: "",
        debitString: "",
        description: "",
        detailLedgerCode: "",
        costCenterId: "",
        costCenterTitle: "",
        costCenterCode: "",
        detailLedgerTitle: "",
        detailLedgerId: 0,
        subsidiaryLedgerTitle: "",
        subsidiaryLedgerCode: "",
        subsidiaryLedgerId: 0,
        fullCode: "",
        requiredCostCenter: false
      },
      voucherState: { code: "" },
      data: [],
      dataClone: [],
      dataItem: {
        creditString: "",
        debitString: "",
        description: "",
        detailLedgerCode: "",
        costCenterId: "",
        costCenterTitle: "",
        costCenterCode: "",
        detailLedgerTitle: "",
        detailLedgerId: 0,
        subsidiaryLedgerTitle: "",
        subsidiaryLedgerCode: "",
        subsidiaryLedgerId: 0,
        fullCode: "",
        requiredCostCenter: false
      },

      openDeleteModal: false,
      iniDataItem: {
        creditString: "",
        debitString: "",
        description: "",
        detailLedgerCode: "",
        costCenterId: "",
        costCenterTitle: "",
        costCenterCode: "",
        detailLedgerTitle: "",
        detailLedgerId: 0,
        subsidiaryLedgerTitle: "",
        subsidiaryLedgerCode: "",
        subsidiaryLedgerId: 0,
        fullCode: "",
        id: -1,
        inEdit: true,
        requiredCostCenter: false
      },
      subsidiaryLedger: { code: '' },
      detailLedger: { fullTitle: "", code: "" },
      settingInfo: {
        voucherRowIsRequired: false,
        voucherDescriptionIsRequired: false
      },
      reRender: false,
      loading: false
    };


    this.enterInsert = this.enterInsert.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.enterEdit = this.enterEdit.bind(this);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
    this.getCredit = this.getCredit.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getDebit = this.getDebit.bind(this);
    this.deleteByKeyboard = this.deleteByKeyboard.bind(this);
    this.pureData = this.pureData.bind(this);
    this.commandCell = this.commandCell.bind(this);
    this.successResponseDraft = this.successResponseDraft.bind(this);
    this.escapeButton = this.escapeButton.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeVoucherMaster = this.handleChangeVoucherMaster.bind(this);
    this.getVoucherDetailById = this.getVoucherDetailById.bind(this);
    this.successGetVoucherDetail = this.successGetVoucherDetail.bind(this);
    this.getDetailLedger = this.getDetailLedger.bind(this);
    // this.enter = this.enter.bind(this);
    DragCell.reorder = this.reorder.bind(this);
    DragCell.dragStart = this.dragStart.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.editByKeyboard = this.editByKeyboard.bind(this);
    this.saveManualVoucher = this.saveManualVoucher.bind(this);
    this.successSaveManualVoucher = this.successSaveManualVoucher.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getCostCenter = this.getCostCenter.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.inputKeyDownPress = this.inputKeyDownPress.bind(this);
    this.getVoucherMasterInformation = this.getVoucherMasterInformation.bind(
      this
    );
    this.successGetVoucherMasterInformation = this.successGetVoucherMasterInformation.bind(
      this
    );
    this.renderers = new Renderers(
      this.enterEdit.bind(this),
      this.exitEdit.bind(this),
      "inEdit"
    );
    this.costCenter = this.costCenter.bind(this);
    this.openRelationModal = this.openRelationModal.bind(this);
  }

  componentDidMount() {

    // this.getCostCenter();
    this.getVoucherMasterInformation();
    this.getCurrentAccountSetting();
    // if (this.props.location.state && this.props.location.state.stateInfo) {
    //   let stateInfo = JSON.parse(this.props.location.state.stateInfo);
    //   this.setState({
    //     stateInfo: stateInfo
    //   });
    // }
    this.getDropDownData();

    GetEnum("voucherMasterState", response => {
      if (response.success) {
        var voucherState = this.state.voucherStateList;
        voucherState.list = response.result.filter(item => {
          return item.code !== 3 && item.code !== 4 && item.code !== -1;
        });
        this.setState({
          voucherStateList: voucherState
        });
      }
    });
    AddVouchersService.getManualVoucherCategories({}, response => {
      DropDownListDataProvider(this, "voucherTypeList", response);
    });
  }

  getCurrentAccountSetting() {
    AddVouchersService.getCurrentAccountSetting((response) => {
      if (response.result) {
        this.setState({
          settingInfo: response.result
        })

      }
    })
  }

  getDropDownData() {
    let defaultCommand = {
      entity: ""
    };

    GetEnum("getexceptioncategory", response =>
      DropDownListDataProvider(this, "exceptionCatagoryList", response, () => {
        if (this.state.stateInfo) {
          this.setState({
            exceptionCatagory: this.state.stateInfo.exceptionCatagory
          });
        }
      })
    );
    GetSubsidiaryLedgerService.getsubsidiaryledgers(defaultCommand, response => {
      DropDownListDataProvider(this, "subsidiaryLedgerList", response);
      // DropDownListDataProvider(
      //   this,
      //   "fromSubsidiaryLedgerList",
      //   response,
      //   () => {
      //     if (this.state.stateInfo) {
      //       this.setState({
      //         fromSubsidiaryLedger: this.state.stateInfo.fromSubsidiaryLedger
      //       });
      //     }
      //   }
      // );
      // DropDownListDataProvider(
      //   this,
      //   "toSubsidiaryLedgerList",
      //   response,
      //   () => {
      //     if (this.state.stateInfo) {
      //       this.setState({
      //         toSubsidiaryLedger: this.state.stateInfo.toSubsidiaryLedger
      //       });
      //     }
      //   }
      // );
      // GetDropDownElement(
      //   this,
      //   this.props.location.state,
      //   "fromSubsidiaryLedgerCode",
      //   "fromSubsidiaryLedger",
      //   'subsidiaryLedgerList',
      //   response
      // );
    }
    );
  }

  getCostCenter() {
    GetCostCentersService.getCostCenters({}, response => {
      DropDownListDataProvider(this, "costCenterList", response);
    });
  }

  getVoucherMasterInformation() {
    let command = {
      entity: this.state.voucherMasterId,
      reportFilter: {
        toDetailLedgerId: this.state.toDetailLedger ? this.state.toDetailLedger.id : 0
      }
    };
    if (this.state.voucherMasterId !== 0) {
      this.setState({
        loading: true
      });
      GetVouchersMasterService.getVoucherMasterById(command, this.successGetVoucherMasterInformation);
    }
  }

  successGetVoucherMasterInformation(response) {
    if (response.success) {
      let description = response.result.description;
      let voucherDate = response.result.voucherDate;
      let voucherStateId = response.result.voucherStateId;
      let voucherStateTitle = response.result.voucherStateEnumTitle;

      let voucherCategoryId = response.result.voucherCategoryId;
      let voucherCategoryTitle = response.result.voucherCategoryTitle;
      this.setState({
        voucherMasterDescription: description,
        voucherMasterDate: voucherDate,
        voucherType: { code: voucherCategoryId, title: voucherCategoryTitle },
        voucherState: { code: voucherStateId, title: voucherStateTitle }
      }, () => {
        this.getVoucherDetailById();
      });
    }
  }

  getVoucherDetailById() {
    var command = {
      reportFilter: {
        voucherMasterId: this.state.voucherMasterId,
        toDetailLedgerId: this.state.toDetailLedger ? this.state.toDetailLedger.id : 0
      }
    };

    // if (this.state.voucherMasterId !== 0) {
    GetVouchersDetailService.getVoucherDetailList(command, this.successGetVoucherDetail);
    // }
    // else {
    //   this.setState({

    //     data: [],
    //     dataItem: {
    //       creditString: "",
    //       debitString: "",
    //       description: "",
    //       detailLedgerCode: "",
    //       costCenterId: "",
    //       costCenterTitle: "",
    //       costCenterCode: "",
    //       detailLedgerTitle: "",
    //       detailLedgerId: 0,
    //       subsidiaryLedgerTitle: "",
    //       subsidiaryLedgerCode: "",
    //       subsidiaryLedgerId: 0,
    //       requiredCostCenter: false
    //     }
    //   });
    // }
  }
  successGetVoucherDetail(response) {
    if (response.success) {

      let dataItem = this.state.dataItem
      response.result.map(item => {
        item.id = item.rowNumber;
        item.fullCode = item.detailLedgerCode != '' ?
          item.subsidiaryLedgerCode + " - " + item.detailLedgerCode : item.subsidiaryLedgerCode;
        item.costCenterId = item.costCenterId > 0 ? item.costCenterId : "";
        item.debitString = item.debitString.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        item.creditString = item.creditString.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      });

      // this.setState({ 
      //   data: response.result,
      //  });

      this.setState({
        data: response.result,
        dataClone: JSON.parse(JSON.stringify(response.result)),
        dataItem: {
          creditString: "",
          debitString: "",
          description: "",
          detailLedgerCode: "",
          costCenterId: "",
          costCenterTitle: "",
          costCenterCode: "",
          detailLedgerTitle: "",
          detailLedgerId: 0,
          subsidiaryLedgerTitle: "",
          subsidiaryLedgerCode: "",
          subsidiaryLedgerId: 0,
          requiredCostCenter: false,
          id: -1,
          inEdit: false
        }
      }, () => {
        if (dataItem.id === -1) {
          this.renderDragVoucher();
          this.enterInsert();
        } else {
          this.renderDragVoucher();
        }
      });
    }
    this.setState({
      loading: false
    })
  }
  componentDidUpdate(revProps, prevState) { }

  updateDraft = (data) => {
    console.log("updateDraft")
    data.map(item => {
      item.credit = parseInt(item.creditString.replace(/,/g, "")) > 0 ? parseInt(item.creditString.replace(/,/g, "")) : 0;
      item.debit = parseInt(item.debitString.replace(/,/g, "")) > 0 ? parseInt(item.debitString.replace(/,/g, "")) : 0;
    });

    let dataClone = data !== undefined ? JSON.parse(JSON.stringify(data)) : undefined;
    var command = {
      entity: {
        voucherMaster: {
          description: this.state.voucherMasterDescription,
          voucherStateId: this.state.voucherState ? this.state.voucherState.code : 0,
          voucherCategoryId: this.state.voucherType ? this.state.voucherType.code : 0,
          voucherDate: this.state.voucherMasterDate,
          id: this.state.voucherMasterId
        },
        voucherDetails: dataClone !== undefined ? dataClone : this.state.data
      }
    };
    this.setState({
      loading: true
    });
    AddVouchersService.updateDraftManualVoucher(command, this.successResponseDraft);
  }


  saveDraft(data) {
    console.log("saveDraft")
    data.map(item => {
      item.credit = parseInt(item.creditString.replace(/,/g, "")) > 0 ? parseInt(item.creditString.replace(/,/g, "")) : 0;
      item.debit = parseInt(item.debitString.replace(/,/g, "")) > 0 ? parseInt(item.debitString.replace(/,/g, "")) : 0;
    });
    console.log(this.state.data);
    var command = {
      entity: {
        voucherMaster: {
          description: this.state.voucherMasterDescription,
          voucherStateId: this.state.voucherState ? this.state.voucherState.code : 0,
          voucherCategoryId: this.state.voucherType ? this.state.voucherType.code : 0,
          voucherDate: this.state.voucherMasterDate,
          id: this.state.voucherMasterId
        },
        voucherDetails: this.state.data
      }
    };
    this.setState({
      loading: true
    });
    AddVouchersService.saveDraftManualVoucher(command, this.successResponseDraft);
  }

  deleteDraft = () => {
    let data = this.state.data;
    let dataClone = JSON.parse(JSON.stringify(data));

    let index = data.findIndex(item => { return item.id === this.state.dataItem.id });
    if (index > -1) {
      data.splice(index, 1);
    }
    var command = {
      entity: {
        voucherMaster: {
          description: this.state.voucherMasterDescription,
          voucherStateId: this.state.voucherState ? this.state.voucherState.code : 0,
          voucherCategoryId: this.state.voucherType ? this.state.voucherType.code : 0,
          voucherDate: this.state.voucherMasterDate,
          id: this.state.voucherMasterId
        },
        voucherDetails: data
      }
    };

    AddVouchersService.deleteDraftManualVoucher(command, (response) => {
      this.setState({
        openDeleteModal: false,
      })
      if (response.success) {

        // data.splice(data.indexOf(this.state.dataItem), 1);

        toastr.success(response.message);
        this.setState({
          loading: true,
          voucherMasterId: response.result
        }, () => {
          this.getVoucherDetailById();
        });
      } else {
        this.setState({
          loading: false,
          data: JSON.parse(JSON.stringify(dataClone)),
          dataClone: dataClone
        })
      }

    });
  }
  successResponseDraft(response) {
    if (response.success) {
      // let dataItem = this.state.dataItem;
      // let data = this.state.data;
      // data[data.indexOf(dataItem)].inEdit = false;

      this.setState({
        voucherMasterId: response.result
      }, () => {
        this.getVoucherDetailById();
      });

      toastr.success(response.message);
      // this.setState({
      //   data: data,
      //   dataClone: JSON.parse(JSON.stringify(data)),
      //   dataItem: {
      //     creditString: "",
      //     debitString: "",
      //     description: "",
      //     detailLedgerCode: "",
      //     costCenterId: "",
      //     costCenterTitle: "",
      //     detailLedgerTitle: "",
      //     detailLedgerId: 0,
      //     subsidiaryLedgerTitle: "",
      //     subsidiaryLedgerCode: "",
      //     subsidiaryLedgerId: 0,
      //     requiredCostCenter: false,
      //     id: -1,
      //     inEdit: false
      //   }
      // }, () => {
      //   if (dataItem.id === -1) {
      //     this.renderDragVoucher();
      //     this.enterInsert();
      //   } else {
      //     this.renderDragVoucher();
      //   }
      // });
    } else {
      this.setState({
        loading: false
      })
    }

  }

  saveManualVoucher() {
    if ((!this.state.settingInfo.voucherDescriptionIsRequired || this.state.voucherMasterDescription !== "") && this.state.voucherState.code > 0 && this.state.voucherType.code > 0) {
      if (this.state.data && this.state.data.length > 0) {
        let findNewData = this.state.data.filter(item => { return item.inEdit == true });
        if (findNewData.length == 0) {
          this.setState({
            loading: true
          })
          var command = {
            entity: {
              voucherMaster: {
                description: this.state.voucherMasterDescription,
                voucherStateId: this.state.voucherState ? this.state.voucherState.code : 0,
                voucherCategoryId: this.state.voucherType ? this.state.voucherType.code : 0,
                voucherDate: this.state.voucherMasterDate,
                id: this.state.voucherMasterId
              },
              voucherDetails: this.state.data
            }
          };
          AddVouchersService.saveManualVoucher(command, this.successSaveManualVoucher);
        } else {
          toastr.error("یکی از ردیف سندها ذخیره نشده است");
        }
      }
    } else {
      if (this.state.settingInfo.voucherDescriptionIsRequired && this.state.voucherMasterDescription === "")
        toastr.error("شرح سند نباید خالی باشد");
      if (this.state.voucherState.code === "")
        toastr.error("وضعیت سند نباید خالی باشد");
      if (this.state.voucherType.code === "")
        toastr.error("نوع سند نباید خالی باشد");
    }
  }

  successSaveManualVoucher(response) {
    this.setState({
      loading: false
    })
    if (response.success) {
      toastr.success(response.message);
      this.props.history.push(this.props.back.path);
    }

  }

  goBack() {
    this.props.history.push(this.props.back.path);
  }

  reorder(dataItem) {
    if (this.state.activeItem === dataItem) {
      return;
    }
    let reorderedData = this.state.data.slice();
    let prevIndex = reorderedData.findIndex(p => p === this.state.activeItem);
    let nextIndex = reorderedData.findIndex(p => p === dataItem);
    reorderedData.splice(prevIndex, 1);
    reorderedData.splice(nextIndex, 0, this.state.activeItem);

    this.setState({
      data: reorderedData,
      active: this.state.activeItem
    });
  }

  dragStart(dataItem) {
    this.setState({
      data: this.state.data,
      activeItem: dataItem
    });
  }

  commandCell = event => {
    return (
      <td
      >
        {!event.dataItem.inEdit ? (
          <React.Fragment>
            <button
              disabled={this.state.dataItem.inEdit}
              className="k-primary k-button k-grid-edit-command"
              onClick={e => this.edit(e, event)}
            >
              ویرایش
            </button>
            <button
              disabled={this.state.dataItem.inEdit}
              className="k-danger k-button k-grid-edit-command"
              onClick={e => this.delete(e, event)}
            >
              حذف
            </button>
          </React.Fragment>
        ) : (
            <React.Fragment>
              <button
                className="k-primary k-button k-grid-edit-command"
                onClick={e => this.saveChanges(e, event)}>
                ذخیره
            </button>
              <button
                className="k-button k-grid-edit-command"
                onClick={e => this.handleCancel(e, event)}
              >
                انصراف
            </button>
            </React.Fragment>

          )}
      </td>
    );
  };

  pureData(data) {
    let dataItem = this.state.dataItem;
    if (data.length > 0 && data[data.indexOf(dataItem)] !== undefined) {
      data[data.indexOf(dataItem)].inEdit = false;
    }

    return data;
  }

  errorHandling(dataItem) {
    let list = Object.keys(dataItem);

    list.map(item => {
      switch (item) {
        case "subsidiaryLedgerCode":
          if (dataItem.subsidiaryLedgerCode == '') {
            toastr.error("کد حساب نمی تواند خالی باشد");
          }
          break;
        case "description":
          if (this.state.settingInfo.voucherRowIsRequired && dataItem.description == '') {
            toastr.error("توضیحات نمی تواند خالی باشد");
          }
          break;
        case "debitString":
          if (dataItem.debitString == '' && dataItem.creditString == '') {
            toastr.error("بکی از فیلدهای بستانکار یا بدهکار باید مقدار داشته باشد");
          }
          if (dataItem.debitString == '0' && dataItem.creditString == '0') {
            toastr.error("فیلدهای بدهکار یا بستانکار نمی تواند همزمان صفر باشد")
          }
          if (dataItem.creditString == '' && dataItem.debitString == '0') {
            toastr.error("فیلد بدهکار نمی تواند صفر باشد")
          }
          break;
        case "creditString":
          if (dataItem.debitString == '' && dataItem.creditString == '0') {
            toastr.error("فیلد بستانکار نمی تواند صفر باشد")
          }
          break;
        case "costCenterTitle":
          if (dataItem.requiredCostCenter && dataItem.costCenterTitle == '') {
            toastr.error("مرکز هزینه نمی تواند خالی باشد");
          }
          break;
        default:
          break;
      }
    })

  }

  checkRequirementItems(data, newData) {


    if (newData.subsidiaryLedgerCode != '' && (!this.state.settingInfo.voucherRowIsRequired || newData.description != '') &&
      ((newData.debitString != '' && newData.debitString != '0') || (newData.creditString != '' && newData.creditString != '0')) && (!newData.requiredCostCenter || newData.costCenterTitle != '')) {
      if ((!this.state.settingInfo.voucherDescriptionIsRequired || this.state.voucherMasterDescription !== "")
        && this.state.voucherState.code > 0 && this.state.voucherType.code > 0) {

        if (this.state.voucherMasterId == 0) {
          this.saveDraft(data);
        } else {
          this.updateDraft(data);
        }

      } else {
        if (this.state.settingInfo.voucherDescriptionIsRequired && this.state.voucherMasterDescription === "")
          toastr.error("شرح سند نباید خالی باشد");
        if (this.state.voucherState.code === "")
          toastr.error("وضعیت سند نباید خالی باشد");
        if (this.state.voucherType.code === "")
          toastr.error("نوع سند نباید خالی باشد");
      }
    } else {
      this.errorHandling(newData);
    }

  }

  // enterInsertButton(e) {
  //   console.log("enterInsertButton");
  //   e.preventDefault();
  //   const dataItem = {
  //     creditString: "",
  //     debitString: "",
  //     description: "",
  //     detailLedgerCode: "",
  //     costCenterId: "",
  //     costCenterTitle: "",
  //     detailLedgerTitle: "",
  //     detailLedgerId: 0,
  //     subsidiaryLedgerTitle: "",
  //     subsidiaryLedgerCode: "",
  //     subsidiaryLedgerId: 0,
  //     fullCode: "",
  //     requiredCostCenter: false,
  //     id: -1,
  //     inEdit: true
  //   };

  //   if (JSON.stringify(this.state.dataItem) !== JSON.stringify(this.state.iniDataItem)) {
  //     // let data = this.pureData(this.state.data);
  //     let data = this.state.data;
  //     if (data.length > 0) {

  //       let findNewData = data.filter(item => { return item.inEdit == true });
  //       if (findNewData.length > 0) {
  //         toastr.error("یکی از ردیف سندها ذخیره نشده است")
  //       } else {
  //         data.push(dataItem);
  //         this.setState({
  //           data: data,
  //           dataItem: dataItem
  //         });
  //       }

  //     } else {
  //       data.push(dataItem);
  //       this.setState({
  //         data: data,
  //         dataItem: dataItem
  //       });
  //     }
  //   } else {
  //     toastr.error("یکی از ردیف سندها ذخیره نشده است");
  //   }
  // }
  enterInsert(e) {
    console.log("enterInsert");
    if (e) {
      e.preventDefault();
    }
    const dataItem = {
      creditString: "",
      debitString: "",
      description: "",
      detailLedgerCode: "",
      costCenterId: "",
      costCenterTitle: "",
      costCenterCode: "",
      detailLedgerTitle: "",
      detailLedgerId: 0,
      subsidiaryLedgerTitle: "",
      subsidiaryLedgerCode: "",
      subsidiaryLedgerId: 0,
      requiredCostCenter: false,
      id: -1,
      inEdit: true
    };

    if (JSON.stringify(this.state.dataItem) !== JSON.stringify(this.state.iniDataItem)) {
      // let data = this.pureData(this.state.data);
      let data = this.state.data;
      if (data.length > 0) {
        let findNewData = data.filter(item => { return item.inEdit == true });
        if (findNewData.length > 0) {
          toastr.error("یکی از ردیف سندها ذخیره نشده است")
        } else {
          data.push(dataItem);
          this.setState({
            data: data,
            dataItem: dataItem
          });
        }

      } else {
        data.push(dataItem);
        this.setState({
          data: data,
          dataItem: dataItem
        });
      }

    } else {
      toastr.error("یکی از ردیف سندها ذخیره نشده است");
    }
  }

  enterEdit(dataItem) {
    // console.log("enterEdit");
    this.update(this.state.data, dataItem).inEdit = true;
    this.setState({
      data: this.state.data.slice()
    });
  }

  handleChangeVoucherMaster(value, name) {
    this.setState({ [name]: value.value });
  }

  // cancel(dataItem) {
  //   if (dataItem.ProductID) {
  //     let originalItem = this.state.data.find(p => p.ProductID === dataItem.ProductID);
  //     this.update(this.state.data, originalItem);
  //   } else {
  //     this.update(this.state.data, dataItem, !dataItem.ProductID);
  //   }
  //   this.setState({
  //     data: this.state.data.slice()
  //   });
  // }

  delete(e, event) {
    e.preventDefault();
    let data = this.pureData(this.state.data);

    // if (data.length > 0 && data[data.length - 1].id === -1)
    //   data.splice(data.length - 1, 1);
    this.setState({
      openDeleteModal: true,
      dataItem: event.dataItem,
      data: data
    });
  }

  deleteByKeyboard() {
    if (this.state.dataItem.id && this.state.dataItem.id > 0) {
      this.setState({ openDeleteModal: true });
    }
  }
  remove(e) {
    console.log("remove");
    e.preventDefault();

    this.deleteDraft();
  }

  itemChange(event) {
    const value = event.value;
    const name = event.field;
    if (!name) {
      return;
    }
    const updatedData = this.state.data.slice();
    const item = this.update(updatedData, event.dataItem);
    item[name] = value;
    this.setState({
      data: updatedData
    });
  }

  update(data, item, remove) {
    console.log("update")
    let updated;
    let index = data.findIndex(p => p === item || (item.ProductID && p.ProductID === item.ProductID));
    if (index >= 0) {
      updated = Object.assign({}, item);
      data[index] = updated;
    } else {
      let id = 1;
      data.forEach(p => { id = Math.max(p.ProductID + 1, id); });
      updated = Object.assign({}, item, { ProductID: id });
      data.unshift(updated);
      index = 0;
    }
    if (remove) {
      data = data.splice(index, 1);
    }
    return data[index];
  }
  handleChangeAutoCompleteDetailLedger(value) {

    let data = this.state.data;
    let dataItem = this.state.dataItem;
    // let tempDataItem = this.state.tempDataItem;

    if (value.value === "") {
      // if (dataItem.detailLedgerCode === "") {
      dataItem.detailLedgerTitle = "";
      dataItem.detailLedgerId = 0;
      dataItem.detailLedgerCode = "";
      dataItem.subsidiaryLedgerTitle = "";
      dataItem.subsidiaryLedgerCode = "";
      dataItem.subsidiaryLedgerId = 0;
      dataItem.fullCode = "";
      dataItem.requiredCostCenter = false;
      // }
    } else {
      dataItem.subsidiaryLedgerCode = value.value.subsidiaryLedgerCode;
      dataItem.subsidiaryLedgerTitle = value.value.subsidiaryLedgerTitle;
      dataItem.subsidiaryLedgerId = value.value.subsidiaryLedgerId;
      dataItem.detailLedgerCode = value.value.detailLedgerCode;
      dataItem.detailLedgerTitle = value.value.detailLedgerTitle;
      dataItem.detailLedgerId = value.value.detailLedgerId;
      dataItem.fullCode = value.value.detailLedgerCode != '' ?
        value.value.subsidiaryLedgerCode + " - " + value.value.detailLedgerCode : value.value.subsidiaryLedgerCode;
      dataItem.requiredCostCenter = value.value.requiredCostCenter
      // tempDataItem.subsidiaryLedgerCode = value.value.subsidiaryLedgerCode;
      // tempDataItem.subsidiaryLedgerTitle = value.value.subsidiaryLedgerTitle;
      // tempDataItem.subsidiaryLedgerId = value.value.subsidiaryLedgerId;
      // tempDataItem.detailLedgerCode = value.value.detailLedgerCode;
      // tempDataItem.detailLedgerTitle = value.value.detailLedgerTitle;
      // tempDataItem.detailLedgerId = value.value.detailLedgerId;
      // tempDataItem.fullCode = value.value.detailLedgerCode != '' ?
      //   value.value.subsidiaryLedgerCode + " - " + value.value.detailLedgerCode : value.value.subsidiaryLedgerCode;
      // tempDataItem.requiredCostCenter = value.value.requiredCostCenter;
      document.getElementById("description").focus();
    }

    data[data.indexOf(dataItem)] = dataItem;
    this.setState({
      data: data,
      dataItem: dataItem
      // tempDataItem: tempDataItem
    });
  }

  handleChangeAutoCompleteCostCenter(value, name) {
    let data = this.state.data;
    let dataItem = this.state.dataItem;
    // let tempDataItem = this.state.tempDataItem;

    if (value.value == "") {
      dataItem.costCenterId = "";
      dataItem.costCenterTitle = "";
      dataItem.costCenterCode = ""
    } else {
      dataItem.costCenterId = value.value.id;
      dataItem.costCenterTitle = value.value.fullName;
      dataItem.costCenterCode = value.value.code;
      // tempDataItem.costCenterTitle = value.value.fullName;
      // tempDataItem.costCenterTitle = value.value.fullName;

    }

    data[data.indexOf(dataItem)] = dataItem;

    this.setState({
      data: data,
      dataItem: dataItem
      // tempDataItem: tempDataItem
    });
  }


  handleChangeComboBox(value, name) { }

  getDetailLedger(event) {
    return (

      <td className="voucher-td">
        {event.dataItem.inEdit ? (
          <div className="k-rtl">
            <div>
              <AutoCompleteComponent
                handleChange={value =>
                  this.handleChangeAutoCompleteDetailLedger(value)
                }
                headerTemplate={
                  getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetHeaderTemplate
                }
                template={
                  getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetTemplate
                }
                fieldSearch={"phrase"}
                keyDownPress
                onKeyDownPress={this.inputKeyDown}
                focus
                label="کد حساب"
                ref={input => {
                  this.nameInput = input;
                }}
                field="fullCode"
                value={this.state.dataItem.fullCode}
                placeholder="کد حساب یا کد تفصیل را وارد کنید"
                service={
                  GetDetailLedgerService.getNormalDetailedgerAndSubsidiaryLedgerBalanceSheet
                }

              />
            </div>
            <span onClick={this.openRelationModal}>
              <FaIcon name="fa fa-plus-circle icon-relation cursor-pointer" size={20} />
            </span>
          </div>
        ) : (
            <b onClick={() => this.onRowClick(event)}>{event.dataItem.fullCode}</b>
          )}
      </td>
    );
  }
  openRelationModal() {
    this.setState({
      openRelationModal: true
    });
  }

  getDescription(event) {
    return (
      <td
      >
        {event.dataItem.inEdit ? (
          <Input
            className="m-0"
            label="توضیحات"
            keyDownPress
            onKeyDownPress={this.inputKeyDown}
            isMultiLine
            rows={1}
            required={
              this.state.settingInfo.voucherRowIsRequired
            }
            handleChange={e => this.handleChange(e, "description")}
            id="description"
            value={this.state.dataItem.description}
          />
        ) : (
            <b onClick={() => this.onRowClick(event)}>{event.dataItem.description}</b>
          )}
      </td>
    );
  }


  getDebit(event) {
    return (
      <td
      >
        {event.dataItem.inEdit ? (
          <NumberFormatComponent

            label="بدهکار"

            disabled={
              this.state.dataItem.creditString !== 0 &&
              this.state.dataItem.creditString &&
              parseInt(this.state.dataItem.creditString.replace(/,/g, "")) > 0
            }
            required={
              !this.state.dataItem.creditString ||
              this.state.dataItem.creditString === 0 ||
              parseInt(this.state.dataItem.creditString.replace(/,/g, "")) === 0
            }
            isSeparator
            keyDownPress
            onKeyDownPress={this.inputKeyDownPress}
            type="number"
            handleChange={e => this.handleChange(e, "debitString")}
            id="debitString"
            value={this.state.dataItem.debitString}
          />
        ) : (
            <b onClick={() => this.onRowClick(event)}>
              {event.dataItem.debitString}
            </b>
          )}
      </td>
    );
  }

  getCredit(event) {
    return (
      <td
      >
        {event.dataItem.inEdit ? (
          <NumberFormatComponent
            label="بستانکار"
            disabled={
              this.state.dataItem.debitString !== 0 &&
              this.state.dataItem.debitString &&
              parseInt(this.state.dataItem.debitString.replace(/,/g, "")) > 0
            }
            isSeparator
            keyDownPress
            onKeyDownPress={this.inputKeyDownPress}
            type="number"
            required={
              !this.state.dataItem.debitString ||
              this.state.dataItem.debitString === 0 ||
              parseInt(this.state.dataItem.debitString.replace(/,/g, "")) === 0
            }
            handleChange={e => this.handleChange(e, "creditString")}
            id="creditString"
            value={this.state.dataItem.creditString}
          />
        ) : (
            <b onClick={() => this.onRowClick(event)}>
              {event.dataItem.creditString}
            </b>
          )}
      </td>
    );
  }

  handleChangeDate(value) {
    this.setState({
      voucherMasterDate: value
    });
  }
  edit(e, event) {
    console.log("edit");
    e.preventDefault();

    let data = this.state.data;

    if (data.length > 0) {
      if (data[data.length - 1].id === -1) {
        data.splice(data.length - 1, 1);
      } else {
        let dataItem = data.filter(d => d.id === event.dataItem.id)[0];
        if (dataItem) {
          dataItem.inEdit = true;
          data[data.indexOf(dataItem)].inEdit = true;
        } else {
          dataItem = this.state.iniDataItem;
          if (data[data.length - 1].id === -1) data.splice(data.length - 1, 1);
        }
        this.setState({
          data: data,
          tempDataItem: JSON.parse(JSON.stringify(dataItem)),
          dataItem: dataItem,
        });
      }
    }
  }

  editByKeyboard() {
    console.log("editByKeyboard", this.state.dataItem);
    if (this.state.dataItem.id && this.state.dataItem.id > 0) {

      let data = JSON.parse(JSON.stringify(this.state.data));

      if (data.length > 0) {
        if (data[data.length - 1].id === -1) {
          data.splice(data.length - 1, 1);
        } else {
          let dataItem = data.filter(d => { return d.id === this.state.dataItem.id })[0];
          if (dataItem) {
            dataItem.inEdit = true;
            data[data.indexOf(dataItem)].inEdit = true;
          } else {
            dataItem = this.state.iniDataItem;
            if (data[data.length - 1].id === -1) data.splice(data.length - 1, 1);
          }
          this.setState({
            data: data,
            tempDataItem: JSON.parse(JSON.stringify(dataItem)),
            dataItem: dataItem,
          });

        }
      }
    }




    // let dataItem = this.state.dataItem;
    // if (data[data.indexOf(dataItem)]) {
    //   dataItem.inEdit = true;

    //   data[data.indexOf(dataItem)].inEdit = true;

    //   this.setState({ data: data }, this.exitEdit());
    // } else {
    //   toastr.error("لطفا ابتدا سطر را انتخاب کنید س‍‍‍پس کلید f2 بفشارید  ");
    // }

  }

  exitEdit() {
    let data = this.state.data;
    if (JSON.stringify(this.state.dataItem) !== JSON.stringify(this.state.iniDataItem) && data.length > 0) {
      this.setState({
        data: data,
        dataItem: this.state.dataItem
      });
    }
  }

  renderDragVoucher = () => {
    let cloneData = JSON.stringify(this.state.data);
    let findNewData = this.state.data.filter(item => { return item.inEdit == true });
    if (findNewData.length === 0) {
      this.state.data.map((item, index) => {
        item.id = index + 1
      })

      if (cloneData !== JSON.stringify(this.state.data)) {
        this.setState({
          reRender: !this.state.reRender
        })
      }
    }

  }

  saveChanges(e, event) {
    e.preventDefault();
    let data = this.state.data;
    let dataItem = this.state.dataItem;
    data[data.indexOf(dataItem)] = dataItem;
    this.checkRequirementItems(data, dataItem);
    // }

  }

  escapeButton() {
    console.log("escapeButton");
    let data = this.state.data;

    let findEditDataItem = data.filter(item => item.inEdit == true);

    if (findEditDataItem.length > 0) {

      if (this.state.dataItem.id === -1 && data.length > 0) {
        data.splice(data.length - 1, 1);
      }
      let newData = data.filter(item => { return item.inEdit == true && item.Id === -1 })[0];

      if (JSON.stringify(this.state.dataItem) == JSON.stringify(this.state.iniDataItem) || (newData && newData.inEdit)) {
        let index = data.findIndex(item => { return item.inEdit == true });
        data.splice(index, 1);
      } else {
        // data = this.getFromTempDataItem(this.state.data);
        // data = this.pureData(this.state.data);
        this.state.tempDataItem.inEdit = false;
        let index = this.state.data.findIndex(item => { return item.id === this.state.dataItem.id });
        data[index] = this.state.tempDataItem;
      }
      this.setState({
        data: data,
        dataItem: {
          creditString: "",
          debitString: "",
          description: "",
          detailLedgerCode: "",
          costCenterId: "",
          costCenterTitle: "",
          costCenterCode: "",
          detailLedgerTitle: "",
          detailLedgerId: 0,
          subsidiaryLedgerTitle: "",
          subsidiaryLedgerCode: "",
          subsidiaryLedgerId: 0,
          requiredCostCenter: false
        }
      }, this.renderDragVoucher());
    }


  }

  handleCancel(e, event) {
    console.log("handleCancel")
    e.preventDefault();
    let data = this.state.data;

    if (event.dataItem.id === -1 && data.length > 0) {
      data.splice(data.length - 1, 1);
    }

    let newData = data.filter(item => { return item.inEdit == true && item.Id === -1 })[0];

    if (JSON.stringify(event.dataItem) == JSON.stringify(this.state.iniDataItem) || (newData && newData.inEdit)) {
      let index = data.findIndex(item => { return item.inEdit == true });
      data.splice(index, 1);
    } else {
      // data = this.getFromTempDataItem(this.state.data);
      this.state.tempDataItem.inEdit = false;
      let index = this.state.data.findIndex(item => { return item.id === event.dataItem.id });
      data[index] = this.state.tempDataItem;
    }

    this.setState({
      data: data,
      dataItem: {
        creditString: "",
        debitString: "",
        description: "",
        detailLedgerCode: "",
        costCenterId: "",
        costCenterTitle: "",
        costCenterCode: "",
        detailLedgerTitle: "",
        detailLedgerId: 0,
        subsidiaryLedgerTitle: "",
        subsidiaryLedgerCode: "",
        subsidiaryLedgerId: 0,
        requiredCostCenter: false
      }
    }, this.renderDragVoucher());
  }

  handleChange(value, name) {
    let item = value.value;
    let dataItem = this.state.dataItem;
    dataItem[name] = value.value;

    this.setState({
      [name]: item,
      dataItem: dataItem
    });
  }

  // getFromTempDataItem(data) {
  //   let dataItem = this.state.dataItem;
  //   let tempDataItem = this.state.tempDataItem;
  //   dataItem.subsidiaryLedgerCode = tempDataItem.subsidiaryLedgerCode;
  //   dataItem.subsidiaryLedgerTitle = tempDataItem.subsidiaryLedgerTitle;
  //   dataItem.subsidiaryLedgerId = tempDataItem.subsidiaryLedgerId;
  //   dataItem.detailLedgerCode = tempDataItem.detailLedgerCode;
  //   dataItem.detailLedgerTitle = tempDataItem.detailLedgerTitle;
  //   dataItem.detailLedgerId = tempDataItem.detailLedgerId;
  //   dataItem.costCenterId = tempDataItem.costCenterId;
  //   dataItem.costCenterTitle = tempDataItem.costCenterTitle;
  //   dataItem.fullCode = tempDataItem.fullCode;
  //   dataItem.requiredCostCenter = tempDataItem.requiredCostCenter;
  //   this.setState({
  //     dataItem: dataItem
  //   }, () => {
  //     data = this.pureData(this.state.data);
  //   });
  //   return data;
  // }

  handleCloseModal() {
    this.setState({ openDeleteModal: false });
  }

  // enter() {
  //   let data = this.state.data;
  //   let findNewData = data.filter(item => { return item.inEdit == true })[0];
  //   if (findNewData) {
  //     this.checkRequirementItems(data, findNewData);
  //   }
  // }

  inputKeyDownPress(event) {
    console.log("inputKeyDownPress", event.keyCode)
    switch (event.keyCode) {
      case 13:
        this.saveChanges(event);
        break;
      case 27:
        this.escapeButton();
        break;
    }

  }

  inputKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.escapeButton();
    }
  }

  // displayCostCenter(event){
  //   return <td>

  //     {event.dataItem.inEdit ?
  //      <ComboBoxComponent isFilterable {...this.state.costCenterList}
  //      handleChange={(value, name) => this.handleChange(value, name)}
  //      value={this.state.costCenter} />
  //       :
  //       <b>{event.dataItem.costCenter.title}</b>}

  //   </td>
  // }

  saveAddModal() {
    let command = {
      entity: {
        subsidiaryLedgerCode: this.state.subsidiaryLedger.code,
        detailLedgerCode: this.state.detailLedger.code,
      }
    }
    AddVouchersService.savesubsidiaryLedgerDetailLedgerRelation(command, (response) => {
      if (response.success) {
        toastr.success(response.message);
        let relation = {
          value: {
            subsidiaryLedgerCode: this.state.subsidiaryLedger.code,
            subsidiaryLedgerTitle: this.state.subsidiaryLedger.title,
            subsidiaryLedgerId: this.state.subsidiaryLedger.id,
            detailLedgerCode: this.state.detailLedger.code,
            detailLedgerTitle: this.state.detailLedger.title,
            detailLedgerId: this.state.detailLedger.id,
          }
        }
        document.getElementById("description").focus();
        this.handleChangeAutoCompleteDetailLedger(relation);
        this.closeAddModal();
      }
    });
  }

  closeAddModal() {
    this.setState({
      openRelationModal: false,
      detailLedger: { fullTitle: '', code: '' },
      subsidiaryLedger: { code: '' }
    });
  }
  removeOnKeyDown = (e) => {
    console.log("removeKeyPress", e.keyCode);
    if (e.keyCode == 13) {
      this.remove(e);
    }
  }
  onRowClick(e) {
    console.log("onRowClick");
    // let iniDataItem = {
    //   creditString: "",
    //   debitString: "",
    //   description: "",
    //   detailLedgerCode: "",
    //   costCenterId: "",
    //   costCenterTitle: "",
    //   detailLedgerTitle: "",
    //   detailLedgerId: 0,
    //   subsidiaryLedgerTitle: "",
    //   subsidiaryLedgerCode: "",
    //   subsidiaryLedgerId: 0,
    //   requiredCostCenter: false
    // }


    let findEditDataItem = this.state.data.filter(item => { return item.inEdit == true });


    if (findEditDataItem.length === 0) {
      this.setState({ dataItem: e.dataItem });
    }

    // if (JSON.stringify(this.state.dataItem) === JSON.stringify(iniDataItem) && !this.state.dataItem.inEdit) {

    //   console.log("onRowClick", this.state.dataItem);
    //   this.setState({ dataItem: e.dataItem });
    // }

  }
  costCenter(event) {
    return (
      <td
        className="voucher-td"
      >
        {event.dataItem.inEdit ? (
          <div className="k-rtl">

            <AutoCompleteComponent
              type="text" pattern="[0-9]*"
              // {...this.state.costCenterList}
              required={this.state.dataItem.requiredCostCenter}
              handleChange={value =>
                this.handleChangeAutoCompleteCostCenter(value)
              }
              headerTemplate={costCenterHeaderTemplate}
              template={costCenterTemplate}
              fieldSearch={"phrase"}
              keyDownPress
              minLength={1}
              onKeyDownPress={this.inputKeyDownPress}
              label="مرکز هزینه"
              field="fullName"
              ref={input => {
                this.nameInput = input;
              }}
              value={this.state.dataItem.costCenterId}
              placeholder="کد / عنوان"
              service={SearchCostCentersService}
            />
          </div>
        ) : (
            <b onClick={() => this.onRowClick(event)}>{event.dataItem.costCenterTitle}</b>
          )}
      </td>
    );
  }
  render() {
    const handlers = {
      ADD_NEW: this.enterInsert,
      DELETE_ROW: this.deleteByKeyboard,
      EDIT: this.editByKeyboard,
      ESC: this.escapeButton,
      // ENTER: this.enter,
      SUBMIT: this.saveManualVoucher,
      CANCEL: this.goBack
    };

    return (
      <HotKeys className="height-page" keyMap={keyMap} handlers={handlers}>
        <React.Fragment>
          <Header {...this.props} />
          <Form
            {...this.props}
            {...this.state}
            service={AddVouchersService.saveManualVoucher}
            entity={{
              voucherMaster: {
                description: this.state.voucherMasterDescription,
                voucherStateId: this.state.voucherState
                  ? this.state.voucherState.code
                  : 0,
                voucherCategoryId: this.state.voucherType
                  ? this.state.voucherType.code
                  : 0,
                voucherDate: this.state.voucherMasterDate,
                id: this.state.voucherMasterId
              },
              voucherDetails: this.state.data
            }}
            disabled={(this.state.settingInfo.voucherDescriptionIsRequired && this.state.voucherMasterDescription === "") || this.state.voucherState.code == 0 || this.state.voucherType.code == 0
              || this.state.data.length == 0 || this.state.data.filter(item => { return item.inEdit == true }).length > 0}
          >
            {
              this.state.loading ? <Loading /> : ''}
            <div className="voucher-height add-voucher height-page"
              onBlur={this.renderDragVoucher}>
              <Grid container spacing={8} className="my-2">
                <Grid item md={2}>
                  <PersianDatePicker
                    selectedDate={this.state.voucherMasterDate}
                    label="تاریخ سند"
                    handleOnChange={this.handleChangeDate}
                  />
                </Grid>
                <Grid item md={5}>
                  <Input
                    label="شرح سند"
                    required={
                      this.state.settingInfo.voucherDescriptionIsRequired
                    }
                    handleChange={e =>
                      this.handleChangeVoucherMaster(e, "voucherMasterDescription")
                    }
                    value={this.state.voucherMasterDescription}
                  />
                </Grid>

                <Grid item md={2}>

                  <DropDownComponent
                    {...this.state.voucherStateList}
                    handleChange={(value, name) =>
                      this.handleChangeVoucherMaster(value, name)
                    }
                    required
                    value={this.state.voucherState}
                  />
                  {/* <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.voucherStateList}
                      handleChange={(value, name) => this.handleChangeVoucherMaster(value, name)}
                      value={this.state.voucherState} />
                  </div> */}
                </Grid>
                <Grid item md={2}>
                  <DropDownComponent
                    {...this.state.voucherTypeList}
                    isFilterable={true}
                    handleChange={(value, name) =>
                      this.handleChangeVoucherMaster(value, name)
                    }
                    required
                    value={this.state.voucherType}
                  />
                  {/* <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.voucherTypeList}
                      handleChange={(value, name) => this.handleChangeVoucherMaster(value, name)}
                      value={this.state.voucherType} />
                  </div> */}
                </Grid>
              </Grid>


              <LocalizationProvider language="fa-FA">
                <KendoGrid
                  data={this.state.data}
                  rowHeight={50}
                  onItemChange={this.itemChange}
                  rowRender={this.renderers.rowRender}
                  editField="inEdit"
                  selectedField="selected"
                  onRowClick={e =>
                    this.onRowClick(e)
                    //    {
                    //   this.setState({ dataItem: e.dataItem });
                    // }
                  }
                >
                  <GridToolbar>
                    <Button
                      className="btn-save-modal"
                      variant="contained"
                      color="primary"
                      className="btn-save-modal"
                      onClick={this.enterInsert}
                    >
                      افزودن ردیف سند
                    </Button>
                    {/* <button
                      type="button"
                      title="افزودن سند"
                      className="background-blue-page"
                      onClick={this.enterInsertButton}
                    >

                    </button> */}
                  </GridToolbar>
                  <Column

                    editable={true}
                    field="voucherNumber"
                    cell={DragCell}
                    title="ردیف"
                    width="80px"
                  />
                  <Column
                    field="detailLedgerCode"
                    editor={this.getDetailLedger}
                    title="کد حساب"
                    cell={this.getDetailLedger}
                    width="190px"
                  />
                  {/* <Column field="detailLedgerCode" editor={this.getVoucher} title="کد حساب" cell={this.getVoucher} /> */}
                  <Column

                    field="detailLedgerTitle"
                    editable={false}
                    title="عنوان حساب تفصیل"
                    width="190px"
                  />
                  <Column

                    field="subsidiaryLedgerTitle"
                    width="190px"
                    editable={false}
                    title="عنوان حساب معین"
                  />

                  <Column
                    field="description"
                    title="شرح ردیف سند"
                    cell={this.getDescription}
                    editable={false}
                  />
                  {/* <Column field="description" title="مرکز هزینه" cell={this.displayCostCenter} editable={false} /> */}
                  <Column
                    field="debitString"
                    cell={this.getDebit}
                    title="بدهکار"
                    editable={false}
                    width="200px"
                  />
                  <Column
                    field="creditString"
                    cell={this.getCredit}
                    title="بستانکار"
                    editable={false}
                    width="200px"
                  />
                  <Column
                    field="constCenter"
                    title="مرکز هزینه"
                    cell={this.costCenter}
                    width="140px"
                  />
                  <Column
                    cell={this.commandCell}
                    width="115px"
                    title="عملیات"
                    editable={false}
                  />
                </KendoGrid>
              </LocalizationProvider>
            </div>
            {addModal(this)}
          </Form>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.openDeleteModal}
            onKeyDown={(e) => this.removeOnKeyDown(e)}
            onClose={(e) => this.handleCloseModal(e)}
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
                <span style={{ marginRight: '5px' }}>حذف ردیف سند دستی</span>
                {/*<b>*/}
                {/*حذف {this.props.deleteHeader}*/}
                {/*</b>*/}
              </h3>
              <hr />
              {/*<h6> آیا از حذف <b> {!this.props.sateParams.fullName ?'dsdsdsd': this.props.sateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
              <h3>آیا از حذف ردیف
              سند
              به شماره
                 <b> {this.state.dataItem.id} </b>
                 و کد حساب
                <b> {this.state.dataItem.fullCode} </b>
                  مطمئن هستید ؟</h3>
                <br />
              <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={(e) => this.remove(e)} >
                حذف
              </Button>
              <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={(e) => this.handleCloseModal(e)}>
                انصراف
              </Button>
            </Paper>
          </Modal>
        </React.Fragment>
      </HotKeys>
    );
  }


}

function addModal(that) {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={that.state.openRelationModal}
      className="modal-full-width"
    >
      <Paper className="paper-modal">
        <h3>
          <FaIcon color="orange" name="fas fa-plus" size={20} />
          <span className="margin-right-5">افزودن کد حساب</span>
        </h3>
        <hr />
        <Grid container spacing={8} className="no-margin">
          <Grid item md={7}>
            <div className="k-rtl">
              <AutoCompleteComponent
                handleChange={value =>
                  that.handleChange(value, "detailLedger")
                }
                autoWidth={true}

                template={'<div  class="dropdown-header">' +
                  '<span style="width:300px;" class="k-state-default">#: data.title #</span>' +
                  '<span style="width:100px;" class="k-state-default">#: data.code #</span>' +
                  "</div>"}
                fieldSearch={"searchPhrase"}
                field="fullTitle"
                headerTemplate={'<div class="dropdown-header ">' +
                  '<span style="width:300px;" class="k-widget k-header " >عنوان</span>' +
                  '<span style="width:100px;" class="k-widget k-header" >کد حساب</span>' +
                  "</div>"}
                value={that.state.detailLedger.fullTitle}
                label="حساب تفصیل"
                placeholder="کد تفصیل را وارد کنید"
                service={GetDetailLedgerService.getDetailLedgersForAutoComplete}
              />
            </div>
          </Grid>
          <Grid item md={4}>
            <div className="k-rtl">
              <ComboBoxComponent
                isFilterable
                {...that.state.subsidiaryLedgerList}
                handleChange={(value, name) => that.handleChange(value, name)}
                value={that.state.subsidiaryLedger}
              />
            </div>
          </Grid>
        </Grid>
        <br />
        <Button
          variant="contained"
          className="btn-save-modal"
          onClick={e => that.saveAddModal(e, that)}
        >
          افزودن
        </Button>
        <Button
          variant="contained"
          className="btn-cancel-modal"
          onClick={that.closeAddModal.bind(that)}
        >
          انصراف
        </Button>
      </Paper>
    </Modal>
  );
}
