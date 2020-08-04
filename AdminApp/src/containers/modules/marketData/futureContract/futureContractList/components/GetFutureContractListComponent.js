import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import Columns from '../constants/GetFutureContractListColumn';
import GetFutureContractListService from '../services/GetFutureContractListService';
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
import './GetFutureContractListComponent.css';

class GetFutureContractListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSymbol: {},
    };
    this.getSymbolValue = this.getSymbolValue.bind(this);
  }

  componentDidMount() {

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
      },
      sort: [
        {
          field: "created",
          dir: "desc"
        }
      ]
    };
    GetFutureContractListService.getExcelExport(command, 'لیست معاملات آتی سهام');
  }
  getSymbolValue(value){
    this.setState({
      selectedSymbol : value
    });
  }
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container future-contract-list"}>
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
            service={GetFutureContractListService.getAllCashFlowChequeMasterByFilterMethod}
            Columns={Columns}
            reportFilter={
              {
                id: null,
                isin: this.state.selectedSymbol.isin,

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
                <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)}  value={this.state.selectedSymbol} />
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )

  }

}

export default GetFutureContractListComponent;