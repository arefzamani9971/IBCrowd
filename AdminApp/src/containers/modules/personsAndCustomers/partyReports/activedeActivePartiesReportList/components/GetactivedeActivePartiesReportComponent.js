import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetActivedeActivePartiesReportColumn';
import Grid from '@material-ui/core/Grid';
import './GetActivedeActivePartiesReportComponent.css';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
import GetActivedeActivePartiesReportServices from '../services/GetActivedeActivePartiesReportServices';



class GetActivedeActivePartiesReportComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
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
                startDate: this.state.startDate,
                endDate: this.state.endDate
            },
            sort: [
                {
                    field: "partyType",
                    dir: "asc"
                }
            ]
        };
        GetActivedeActivePartiesReportServices.getExcelExport(command, 'مشتریان فعال و غیرفعال');

    }
    pdfReportHandler = () => {

        var command = {
            reportFilter: {

                startDate: this.state.startDate,
                endDate: this.state.endDate

            },
            sort: [
                {
                    field: "partyType",
                    dir: "asc"
                }
            ]
        };
        GetActivedeActivePartiesReportServices.getPdfExport(command, 'مشتریان فعال و غیرفعال');
    }


    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container activedeactiveparties"}>
                    <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "partyType",
                                dir: "asc"
                            }
                        ]}
                        reloadColumnAfterGet
                        service={GetActivedeActivePartiesReportServices.activedeactivepartiesreportMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                dateFilter: {
                                    startDate: this.state.startDate,
                                    endDate: this.state.endDate
                                }
                            }
                        }
                        callServiceAgain
                        reRender
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        hasToolbar={{ haveExcelPfdReport: { excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler } }}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.startDate} label="ابتدای دوره" handleOnChange={(value) => this.handleDate(value, 'startDate')} />
                                    {/* <PersianDatePicker selectedDate={this.state.BirthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} /> */}
                                </Grid>
                                <Grid item md={5}>

                                    <NoDataDatePicker isNull={true} selectedDate={this.state.endDate} label="انتهای دوره" handleOnChange={(value) => this.handleDate(value, 'endDate')} />
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

export default GetActivedeActivePartiesReportComponent;
