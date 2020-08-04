import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import Input from 'shared/components/formInput/inputForm'
import GetEnum from 'services/getEnum';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import moment from 'moment';
import Columns from '../constants/GetNewsColumn';
import NewsService from '../services/NewsService';
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
import './GetNewsComponent.css';
class GetNewsComponent extends React.Component {

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
      selectedSymbol:{},
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
    // var command = {
    //   reportFilter: {
    //     isin: '',
    //     types: [
    //       0
    //     ],
    //     isin: this.state.selectedSymbol.isin,
    //     assemblyStatus: this.state.selectedAssemblyStatus.code,
    //     assemblyType: this.state.selectedStatementType.code
    //   },
    //   sort: [
    //     {
    //       field: "created",
    //       dir: "desc"
    //     }
    //   ]
    // };
    // NewsService.getExcelExport(command, 'لیست اطلاعیه ها');
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

  getSymbolValue(value){
    this.setState({
      selectedSymbol : value
    });
  }
  handleSymbolChange(value) {
    console.log("value : " , value);
    
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
            service={NewsService.getStatementList}
            Columns={Columns}
            reportFilter={
              {
                title: this.state.title,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate
              }
            }
            callServiceAgain
            requestToService={false}
            noSearch={true}
            reRender
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}>
            <div className="ml-3" classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin d-flex align-items-center">
                <Grid item md={6}>
                <Input label="عنوان خبر" handleChange={(e) => this.handleChange(e, 'reportName')} value={this.state.title} />
                </Grid>
                <Grid item md={3}>
                  <PersianDatePicker label="زمان انتشار از" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={3}>
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

export default GetNewsComponent;