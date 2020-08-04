import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm'
import Columns from '../constants/GetBrokerListColumn';
import GetBrokerListService from '../services/GetBrokerListService';
import './GetBrokerListComponent.css';

class GetBrokerListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
    this.handleChange = this.handleChange.bind(this);
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
      
      },
      sort: [
        {
          field: "created",
          dir: "desc"
        }
      ]
    };
    GetBrokerListService.getExcelExport(command, 'لیست کارگزارها');
  }
  
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container broker-list"}>
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
            service={GetBrokerListService.getAllCashFlowChequeMasterByFilterMethod}
            Columns={Columns}
            reportFilter={
              {
                
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
                  <Input label="عنوان" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                </Grid>
                <Grid item md={6}>
                  <Input label="شناسه بانک" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )

  }

}

export default GetBrokerListComponent;