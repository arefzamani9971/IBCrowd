import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetCustomersInternetactivityColumn';
import Grid from '@material-ui/core/Grid';
import './GetCustomersInternetactivityComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import GetCustomersInternetactivityServices from '../services/GetCustomersInternetactivityServices';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import moment from 'moment';

class GetCustomersInternetactivityComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری"
            },
            selectedParty: { fullName: '', id: 0 },
            startDate: moment(new Date()).add(-1, "months"),
            endDate: new Date(),
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    componentDidMount() {

    }
    handlePartyChange = (value) => {
        let item = value.value;
        this.setState({
            selectedParty: item
        })
    };

    excelReportHandler = () => {
        // alert('excel')
        var command = {
            reportFilter: {

                partyId: this.state.selectedParty.id,
                dateFilter: {
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                }

            },
            sort: [
                {
                    field: "numberOfDayThatCustomerDoesTrade",
                    dir: "asc"
                }
            ]
        };
        GetCustomersInternetactivityServices.getExcelExport(command, 'فعالیت اینترنتی مشتریان');

    }
    pdfReportHandler = () => {
        // alert('pdf')
        var command = {
            reportFilter: {
                partyId: this.state.selectedParty.id,
                dateFilter: {
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                }

            },
            sort: [
                {
                    field: "NumberOfDayThatCustomerDoesTrade",
                    dir: "asc"
                }
            ]
        };
        GetCustomersInternetactivityServices.getPdfExport(command, 'فعالیت اینترنتی مشتریان');
    }
    handleChangeDate = (value, name) => {

        this.setState({
            [name]: value
        })

    }

    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container customersInternetactivity"}>
                    <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "NumberOfDayThatCustomerDoesTrade",
                                dir: "asc"
                            }
                        ]}
                        reloadColumnAfterGet
                        service={GetCustomersInternetactivityServices.getcustomersinternetactivityMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                partyId: this.state.selectedParty.id,
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
                                <Grid item md={12}>
                                    <AutoCompleteComponent {...this.state.party}
                                        handleChange={(value) => this.handlePartyChange(value)}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.simpleSearchCustomers} />
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.startDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "startDate")} />
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "endDate")} />
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetCustomersInternetactivityComponent;
