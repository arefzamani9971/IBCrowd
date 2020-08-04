import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import Columns from '../constants/GetBondsListColumn';
import BondsListService from '../services/BondsListService';
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
import './GetBondsListComponent.css';


class GetBondsListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSymbol: {},
      filter: {
        logic: "and",
        filters: []
      },
    };
    this.getSymbolValue = this.getSymbolValue.bind(this);
  }

  componentDidMount() {
    
  }

  excelReportHandler = () => {
    var command = {
      reportFilter: {
        isin: this.state.selectedSymbol.isin,
      },
      sort: [
        {
          field: "created",
          dir: "desc"
        }
      ]
    };
    BondsListService.getExcelExport(command, 'لیست اوراق');
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
        <Paper className={"main-paper-container bonds-list"}>
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
            service={BondsListService.getBondList}
            Columns={Columns}
            reportFilter={
              {
                isin: this.state.selectedSymbol.isin,
              }
            }
            callServiceAgain
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

export default GetBondsListComponent;