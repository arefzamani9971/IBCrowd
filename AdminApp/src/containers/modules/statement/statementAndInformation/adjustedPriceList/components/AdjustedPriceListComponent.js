import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
/////////////////////////////////////////////////////////////////////////////////////
import Header from 'shared/components/stateHeader/stateHeader'
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
/////////////////////////////////////////////////////////////////////////////////////
import AdjustedPriceListService from '../services/AdjustedPriceListService';
import Columns from '../constants/AdjustedPriceListColumn';
import './AdjustedPriceListComponent.css';

class AdjustedPriceList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedSymbol: {},
      fromDate: new Date(),
      toDate: moment(new Date().setDate(new Date().getDate() + 7))
    };
    this.getSymbolValue = this.getSymbolValue.bind(this);
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
    //     isin: this.state.selectedSymbol.isin,
    //     fromDate: this.state.fromDate,
    //     toDate: this.state.toDate
    //   },
    //   sort: [
    //     {
    //       field: "created",
    //       dir: "desc"
    //     }
    //   ]
    // };
    // AdjustedPriceListService.getExcelExport(command, 'تعدیلات قیمت');
  };

  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container adjustPrice"}>
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
            service={AdjustedPriceListService.getAdjustedPriceList}
            Columns={Columns}
            reportFilter={{
              isin: this.state.selectedSymbol.isin,
              fromDate: this.state.fromDate,
              toDate: this.state.toDate
            }}
            callServiceAgain
            reRender
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}>
            <div className="ml-3" classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={6}>
                  <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)} value={this.state.selectedSymbol} />
                </Grid>
                <Grid item md={3}>
                  <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')} />
                </Grid>
                <Grid item md={3}>
                  <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )
  }

}

export default AdjustedPriceList;