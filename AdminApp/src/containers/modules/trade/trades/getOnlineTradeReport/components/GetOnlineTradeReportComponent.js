import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetOnlineTradeReportColumn';
import Grid from '@material-ui/core/Grid';
import './GetOnlineTradeReportComponent.css';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
import GetOnlineTradeReportServices from '../services/GetOnlineTradeReportServices';




class GetOnlineTradeReportComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


            startDate: new Date(),
            endDate: new Date(),
        };
    }
    
    handleDate = (value, name) => {
        this.setState({
            [name]: value,
        })
    }

 
    excelReportHandler = () => {
        var command = {
            reportFilter: {
                dateFilter: {
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                }
            },
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        };
        GetOnlineTradeReportServices.getExcelExport(command, 'معاملات مشتریان اینترنتی');

    }
    pdfReportHandler = () => {
        var command = {
            reportFilter: {

                dateFilter: {
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                }
            },
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        };
        GetOnlineTradeReportServices.getPdfExport(command, 'معاملات مشتریان اینترنتی');
    }

  
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container GetOnlineTradeReport"}>
                  <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "",
                                dir: ""
                            }
                        ]}
                        reloadColumnAfterGet
                        service={GetOnlineTradeReportServices.getonlinetradereportMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                dateFilter: {
                                    startDate: this.state.startDate,
                                    endDate: this.state.endDate
                                }
                            }
                        }
                        classHeightOpenPanel={"height-open-grid"}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        callServiceAgain
                        reRender
                        hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}
                    >
                        <div classPage={"height-search"}>
                        <Grid container spacing={8} className="no-margin">
                           
                         
                       
                            <Grid item md={5}>
    
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.startDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value,'startDate')}/>
                                    {/* <PersianDatePicker selectedDate={this.state.BirthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} /> */}
                            </Grid>
                            <Grid item md={5}>
                           
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value,'endDate')}/>
                                    {/* <PersianDatePicker selectedDate={this.state.BirthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} /> */}
                       
                            </Grid>
                        </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetOnlineTradeReportComponent;
