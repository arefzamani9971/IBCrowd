import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
///////////////////////////////////////////////////////////////////////////////
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import Input from 'shared/components/formInput/inputForm'
///////////////////////////////////////////////////////////////////////////////
import HolidayService from '../services/HolidayService';
import Columns from '../constants/GetHolidayListColumn';
import './GetHolidayListComponent.css';

class GetHolidayListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inDate: null,
      reason: ''
    };
  }

  handleDate(value, name) {
    this.setState({
      [name]: value
    })
  };
  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
  excelReportHandler = () => {
    // var command = {
    //   reportFilter: {
    //     inDate: this.state.inDate ? new Date(this.state.inDate) : null,
    //     reason: this.state.reason
    //   },
    //   sort: [
    //     {
    //       field: "created",
    //       dir: "desc"
    //     }
    //   ]
    // };
    // HolidayService.getExcelExport(command, 'لیست تعطیلات');
  }

  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container holiday-page"}>
          <GridServer
            {...this.props}
            {...this.state}
            sort={[
              {
                field: "inDate",
                dir: "desc"
              }
            ]}
            reloadColumnAfterGet
            service={HolidayService.getHolidayList}
            Columns={Columns}
            reportFilter={
              {
                inDate: this.state.inDate ? new Date(this.state.inDate) : null,
                reason: this.state.reason
              }
            }
            callServiceAgain
            reRender
            classMainHeightOpenPanel={"main-paper-container-server-open"}
            hasToolbar={{ haseExcelReport: { excelReportHandler: this.excelReportHandler } }}>
            <div className="ml-3" classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.inDate} label="تاریخ" handleOnChange={(value) => this.handleDate(value, 'inDate')} />
                </Grid>
                <Grid item md={4} >
                  <Input label="دلایل تعطیلی" handleChange={(value) => this.handleChange(value, 'reason')} id="reason" value={this.state.reason} />
                </Grid>
              </Grid>
            </div>
          </GridServer>
        </Paper>
      </React.Fragment>
    )
  }

}

export default GetHolidayListComponent;