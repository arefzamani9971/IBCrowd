import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import Input from 'shared/components/formInput/inputForm';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetAllProductsPaging from '../../../../../../services/getProducts';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import moment from 'moment';
import Columns from '../constants/GetStockRightTimingListColumn';
import GetStockRightTimingListService from '../services/GetStockRightTimingListService';
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';

import './GetStockRightTimingListComponent.css';

class GetStockRightTimingListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSymbol: {},
      tracingNo: null,
      reviewStatusType: {
        name: "selectedReviewStatusType",
        field: "title",
        label: "وضعیت بررسی",
        list: []
      },
      selectedReviewStatusType: { code: null, title: null },
      fromDate: new Date(),
      toDate: moment(new Date().setDate(new Date().getDate() + 7))
    };
    this.getSymbolValue = this.getSymbolValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    GetEnum('ReviewStatusType', response => DropDownListDataProvider(this, "reviewStatusType", response));
  }

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
  handleDate = (value, name) => {
    this.setState({
      [name]: value
    })
  };

  getSymbolValue(value) {
    this.setState({
      selectedSymbol: value
    });
  }
  excelReportHandler = () => {
    // var command = {
    //   reportFilter: {
    //     id: null,
    //     isin: this.state.selectedSymbol.isin,
    //     reviewStatusType: this.state.selectedReviewStatusType.code,
    //   },
    //   sort: [
    //     {
    //       field: "created",
    //       dir: "desc"
    //     }
    //   ]
    // };
    // GetStockRightTimingListService.getExcelExport(command, 'دسته چک');
  }
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container chequeBook"}>
          <GridServer
            {...this.props}
            {...this.state}
            sort={[
              {
                field: "created",
                dir: "desc"
              }
            ]}
            reloadColumnAfterGet
            service={GetStockRightTimingListService.getStockRightTimingList}
            Columns={Columns}
            reportFilter={
              {
                isin: this.state.selectedSymbol.isin,
                tracingNo: (this.state.tracingNo == null || this.state.tracingNo == undefined) ? 0 : parseFloat(this.state.tracingNo),
                state: this.state.selectedReviewStatusType.code,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate
              }
            }
            callServiceAgain
            reRender
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}>
            <div className="ml-3" classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={6}>
                  <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)} value={this.state.selectedSymbol} />
                </Grid>
                <Grid item md={6}>
                  <NumberFormatComponent
                    id="" label="کد پیگیری اطلاعیه"
                    value={this.state.tracingNo}
                    handleChange={(value, error) => this.handleChange(value, 'tracingNo')}
                    type="number" />
                </Grid>
              </Grid>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent
                      {...this.state.reviewStatusType}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedReviewStatusType}
                    />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker label="تاریخ شرکت در حق تقدم از" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker label="تاریخ شرکت در حق تقدم تا" handleOnChange={(value) => this.handleDate(value, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )

  }

}

export default GetStockRightTimingListComponent;