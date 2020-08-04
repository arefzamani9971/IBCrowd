import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm'
import Columns from '../constants/GetFundamentalAnalysisColumn';
import FundamentalAnalysisService from '../services/FundamentalAnalysisService';
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
import './GetFundamentalAnalysisComponent.css';
class GetFundamentalAnalysisComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSymbol: {},
    };
    this.getSymbolValue = this.getSymbolValue.bind(this);
  }

  componentDidMount() {

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
    // FundamentalAnalysisService.getExcelExport(command, 'لیست اطلاعیه ها');
  }

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
  getSymbolValue(value) {
    this.setState({
      selectedSymbol: value
    });
  }
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container fundamental-analysis"}>

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
            service={FundamentalAnalysisService.getStatementList}
            Columns={Columns}
            reportFilter={
              {
                isin: this.state.selectedSymbol.isin,
              }
            }
            callServiceAgain
            requestToService={false}
            noSearch={true}
            reRender
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}>
            <div className="ml-3" classPage={"height-search"} >
              <Grid container spacing={8} className="no-margin d-flex align-items-center">
                <Grid item md={6}>
                  <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)} value={this.state.selectedSymbol} />
                </Grid>
                <Grid item md={6}>
                  <Input label="عنوان شرکت" handleChange={(e) => this.handleChange(e, 'reportName')} value={this.state.code} />
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )

  }

}

export default GetFundamentalAnalysisComponent;