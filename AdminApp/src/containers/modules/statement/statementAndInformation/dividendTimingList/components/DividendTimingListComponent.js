import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import DividendTimingListService from '../services/DividendTimingListService';
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from "@material-ui/core/Grid";
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Columns from '../constants/DividendTimingListColumn';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
import './DividendTimingListComponent.css';

class DividendTimingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSymbol: {},
      partyType: {
        name: "selectedPartyType",
        field: "title",
        label: "نوع مشتری",
        list: []
      },
      selectedPartyType: {code: 0, title: ''},
      reviewStatusType: {
        name: "selectedReviewStatusType",
        field: "title",
        label: "وضعیت بررسی",
        list: []
      },
      selectedReviewStatusType: { code: 0, title: '' },
      open: false,
      isDetailReport: false,
      fromDate:null,
      toDate:null,
      tracingNo:0,
      
    };
    this.search = this.search.bind(this);
    this.getSymbolValue = this.getSymbolValue.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    //TODO Services to fill the dropdown for selecting symbol ;
    GetEnum('ReviewStatusType', response => DropDownListDataProvider(this, "reviewStatusType", response));
    GetEnum('PartyType', response => DropDownListDataProvider(this, "partyType", response));

  }

  search() {


  }
  handleExpandSearchPanel = () => {
    this.setState({
      open: !this.state.open
    })
  };

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
    var command = {
      reportFilter: {
        isin: this.state.selectedSymbol.isin,
        fromDate:this.state.fromDate,
        toDate:this.state.toDate,
        tracingNo: parseInt(this.state.tracingNo),
        state: this.state.selectedReviewStatusType.code,
        partyType: this.state.selectedPartyType.code,
        isDetailReport:this.state.isDetailReport
      },
      sort: [
        {
          field: "created",
          dir: "desc"
        }
      ]
    };
    DividendTimingListService.getExcelExport(command, 'تعدیلات قیمت');

  }
  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container dividend-timing"}>
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
            service={DividendTimingListService.getAllDividendTimingList}
            Columns={Columns}
            reportFilter={
              {
                isin: this.state.selectedSymbol.isin,
                fromDate:this.state.fromDate,
                toDate:this.state.toDate,
                tracingNo: parseInt(this.state.tracingNo),
                state: this.state.selectedReviewStatusType.code,
                partyType: this.state.selectedPartyType.code,
                isDetailReport:this.state.isDetailReport
              }
            }
            callServiceAgain
            reRender
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}
          >
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={6}>
                  <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)} value={this.state.selectedSymbol} />
                </Grid>
                <Grid item md={2}>
                <NumberFormatComponent
                                id="tracingNo" label="کد پیگیری اطلاعیه"
                                value={this.state.tracingNo}
                                handleChange={(value, error) => this.handleChange(value, 'tracingNo')}
                                type="number"
                                isDecimalSeparator
                                isSeparator
                            />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.fromDate} label=" تاریخ دریافت سود از " handleOnChange={(value) => this.handleDate(value, 'fromDate')} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.toDate} label=" تاریخ دریافت تا" handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent {...this.state.partyType}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedPartyType} required />
                  </div>
                </Grid>

                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent 
                      {...this.state.reviewStatusType}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedReviewStatusType}
                      required
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

export default DividendTimingList;