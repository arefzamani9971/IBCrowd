import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import { Grid } from '@material-ui/core';
import '@progress/kendo-ui';
import Paper from '@material-ui/core/Paper';
import GetEnum from 'services/getEnum';
import moment from 'moment';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import './GetLiquidityReportComponent.css';
import GetLiquidityReportService from '../services/GetLiquidityReportService';
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetLiquidityReportColumn';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';

class GetLiquidityReportComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: this.props.location.state && this.props.location.state.fromDate ? this.props.location.state.fromDate : moment(new Date().setDate(new Date().getDate() - 7)),
      toDate: this.props.location.state && this.props.location.state.toDate ? this.props.location.state.toDate : moment(new Date()),
      voucherState: [],

      // open: false,
      // isColumn6: this.props.location.state && this.props.location.state.balanceSheetColumnType ? this.props.location.state.balanceSheetColumnType.code === 2 : false,
      // branch: this.props.location.state && this.props.location.state.branch ? this.props.location.state.branch : {
      //   id: 0
      // },
      // balanceSheetColumnType: this.props.location.state && this.props.location.state.balanceSheetColumnType !== undefined ? this.props.location.state.balanceSheetColumnType : {
      //   code: 1
      // },
      // fromVoucherNumber: this.props.location.state && this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : '',
      // toVoucherNumber: this.props.location.state && this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : '',
      // accountBalanceRemainType: this.props.location.state && this.props.location.state.accountBalanceRemainType ? this.props.location.state.accountBalanceRemainType : 1,
      // costCenter: this.props.location.state && this.props.location.state.costCenter ? this.props.location.state.costCenter : { id: 0 },
      // exceptionCatagory: this.props.location.state && this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : [],
      // fiscalYear: this.props.location.state && this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : {
      //   id: 0
      // },
      // fiscalYearDropDowm: {
      //   name: "fiscalYear",
      //   field: "title",
      //   label: "سال مالی ",
      //   list: []
      // },
      voucherStateList: {
        name: "voucherState",
        field: "title",
        label: "وضعیت سند",
        list: []
      },
      voucherState: { code: "" },
      dataItem: null,

    }
  }

  componentDidMount() {
    // GetEnum("vouchermasterstate", this.successGetVoucherMasterState)
    GetEnum("voucherMasterState", response => {
      if (response.success) {
        var voucherState = this.state.voucherStateList;
        voucherState.list = response.result
        this.setState({
          voucherStateList: voucherState
        });
      }
    });
    this.setState({
      isLoading: true
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.voucherState.code !== this.state.voucherState || nextState.fromDate !== this.state.fromDate || nextState.toDate !== this.state.toDate;
  }

  excelReportHandler = () => {
    var command = {
      ReportFilter: {
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        voucherState: this.state.voucherState
      },
      OptionalFilter: {
        sort: [
          {
            field: "created",
            dir: "desc"
          }
        ]
      }
    }
    GetLiquidityReportService.getExcelExport(command, 'liquidity-report-list');
  }

  pdfReportHandler = () => { }


  // handleChangeFiscalYear = (item) => {
  //   this.setState({
  //     fiscalYear: item.value,
  //     fromDate: item.value.startDate,
  //     toDate: item.value.endDate,
  //   })
  // }

  handleChange = (item, name) => {
    this.setState({
      [name]: item.value
    })
  }

  handleChangeDate = (item, name) => {
    this.setState({
      [name]: item
    })
  }


  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container liquidity-report-list"}>

          <GridServer
            {...this.props}
            {...this.state}
            reloadColumnAfterGet={true}
            Columns={Columns}
            service={GetLiquidityReportService.getLiquidityReport}
            onLoadingChange={this.onLoadingChange}
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haveExcelPfdReport: { excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler } }}

            sort={[
              {
                field: "voucherDate",
                dir: "desc"
              }
            ]}

            reportFilter={
              {
                voucherStates: this.state.voucherState && this.state.voucherState.length > 0 ? this.state.voucherState.map(s => s.code) : [],

                dateFilter: {
                  startDate: this.state.fromDate,
                  endDate: this.state.toDate
                }
              }
            }
          >
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={2} >
                  <PersianDatePicker label="از تاریخ" max={this.state.toDate} handleOnChange={(e) => this.handleChangeDate(e, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={2} >
                  <PersianDatePicker label="تا تاریخ" min={this.state.fromDate} handleOnChange={(e) => this.handleChangeDate(e, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>
                <Grid item md={6}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable
                      {...this.state.voucherStateList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherState}
                      service={GetLiquidityReportService.getLiquidityReport}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )
  }
}

const GetLiquidityReport = GetLiquidityReportComponent

export default withStyles(styles)(GetLiquidityReport);

