import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Columns from '../constants/GetOptionsListColumn';
import OptionDetailListService from '../services/OptionDetailListService';
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
import './GetOptionsListComponent.css';

class GetOptionsListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSymbol: {},
      informationType: {
        name: "SelectedInformationType",
        dataTextField: 'fullAccountNumber',
        dataValueField: 'id',
        fieldSearch: 'phrase',
        template: null,
        headerTemplate: null,
        label: "نوع اطلاعیه"
      },
      SelectedInformationType: [],
      putOrCallType: {
        name: "selectedPutOrCallType",
        field: "title",
        label: "نوع معامله",
        list: []
      },
      selectedPutOrCallType: {},
      filter: {
        logic: "and",
        filters: []
      },
      fromDate: new Date(),
      toDate: moment(new Date().setDate(new Date().getDate() + 7)),
      isMinimumWage: false,
    };
    this.getSymbolValue = this.getSymbolValue.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);

  }

  componentDidMount() {
    GetEnum('PutOrCallType', response => DropDownListDataProvider(this, "putOrCallType", response));
  }

  handleChange(value, name) {
    
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
  excelReportHandler = () => {
    var command = {
      reportFilter: {
        id: null,
        isin: this.state.selectedSymbol.isin,
        putOrCallType: this.state.selectedPutOrCallType.code,
      },
      sort: [
        {
          field: "created",
          dir: "desc"
        }
      ]
    };
    OptionDetailListService.getExcelExport(command, 'لیست اختیار معاملات');
  }
  getSymbolValue(value){
    console.log("value : " , value);

    this.setState({
      selectedSymbol : value
    });
  }
  handleDate = (value, name) => {
    this.setState({
      [name]: value
    })
  };
  handleChangeCheck(event, name) {
    this.setState({
        [name]: event.target.checked,
    })
}

  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container index-page"}>
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
            service={OptionDetailListService.getOptionDetailList}
            Columns={Columns}
            reportFilter={
              {
                isin: this.state.selectedSymbol.isin,
                optionType: this.state.selectedPutOrCallType.code,
                dependent:this.state.dependent,
              }
            }
            callServiceAgain
            reRender
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}>
            <div className="ml-3" classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin d-flex align-items-center">
                <Grid item md={6}>
                <SymbolAutoCompleteComponent hasBond={false} handleSymbolChange={(value) => this.getSymbolValue(value)}  value={this.state.selectedSymbol} />
                </Grid>
                <Grid item md={3}>
                  <PersianDatePicker label="تاریخ سررسید از" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={3}>
                  <PersianDatePicker label="تاریخ سررسید تا" handleOnChange={(value) => this.handleDate(value, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>
              </Grid>
              <Grid container spacing={8} className="no-margin d-flex align-items-center">
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent
                      {...this.state.putOrCallType}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedPutOrCallType}
                    />
                  </div>
                </Grid>
                <Grid item md={10}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.dependent}
                        onChange={(e) => this.handleChangeCheck(e, 'dependent')}
                        value="dependent"
                        color="primary"
                      />
                    }
                    label="جستجو اوراق‌های تبعی"
                  />
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )

  }

}

export default GetOptionsListComponent;