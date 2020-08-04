import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import moment from 'moment';
import Columns from '../constants/GetIndexColumn';
import GetIndexService from '../services/GetIndexService';
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
import './GetIndexComponent.css';
class GetIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      assemblyStatus: {
        name: "selectedAssemblyStatus",
        field: "title",
        label: "وضعیت مجمع",
        list: []
      },
      selectedAssemblyStatus: { code: 0, title: '' },
      statementType: {
        name: "selectedStatementType",
        field: "title",
        label: "نوع اطلاعیه",
        list: []
      },
      selectedStatementType: { code: 0, title: '' },
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
      filter: {
        logic: "and",
        filters: []
      },
      fromDate: new Date(),
      toDate: moment(new Date().setDate(new Date().getDate() + 7))
    };
    this.getSymbolValue = this.getSymbolValue.bind(this);
    this.handleSymbolChange = this.handleSymbolChange.bind(this);

  }

  componentDidMount() {
    GetEnum('AssemblyStatus', response => DropDownListDataProvider(this, "assemblyStatus", response));
    GetEnum('StatementType', response => DropDownListDataProvider(this, "statementType", response));
  }

  excelReportHandler = () => {
    var command = {
      reportFilter: {
        isin: this.state.selectedSymbol.isin,
        types: this.state.selectedStatementType && this.state.selectedStatementType.length > 0 ? this.state.selectedStatementType.map(b => b.code) : [],
        assemblyStatus: this.state.selectedAssemblyStatus.code,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate
      },
      sort: [
        {
          field: "created",
          dir: "desc"
        }
      ]
    };
    // GetIndexService.getExcelExport(command, 'لیست اطلاعیه ها');
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
  handleSymbolChange(value) {
    console.log("value : ", value);

    this.setState({ selectedSymbol: value.value }
    );
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
            service={GetIndexService.getStatementList}
            Columns={Columns}
            reportFilter={
              {
                isin: this.state.selectedSymbol.isin,
                types: this.state.selectedStatementType && this.state.selectedStatementType.length > 0 ? this.state.selectedStatementType.map(b => b.code) : [],
                assemblyStatus: this.state.selectedAssemblyStatus.code,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate
              }
            }
            callServiceAgain
            reRender
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}>
            <div className="ml-3" classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin d-flex align-items-center">
                <Grid item md={6}>
                  <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)} value={this.state.selectedSymbol} />
                </Grid>
                <Grid item md={6}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.statementType}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedStatementType} />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={8} className="no-margin d-flex align-items-center">
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent
                      {...this.state.assemblyStatus}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedAssemblyStatus}
                    />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker label="زمان انتشار از" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker label="زمان انتشار تا" handleOnChange={(value) => this.handleDate(value, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )

  }

}

export default GetIndex;