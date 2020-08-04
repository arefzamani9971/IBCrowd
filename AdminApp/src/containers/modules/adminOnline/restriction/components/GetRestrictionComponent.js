import React from 'react';
import GetRestrictionService from '../services/GetRestrictionService';
import Columns from '../constants/GetRestrictionColumns';
import Header from 'shared/components/stateHeader/stateHeader';
import Paper from '@material-ui/core/Paper';
import { GridServer } from '../../../../../shared/components/kendoGrid/kendoGrid';
import './Restriction.css';

class GetRestrictionComponent extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container detail-ledger"}>
                    <GridServer
                        service={GetRestrictionService.getBrokerRules}
                        Columns={Columns}
                        isAnotherRequestService
                        command={
                            {
                                page: 1,
                                pageSize: 50,
                            }
                        }
                    // classMainHeightOpenPanel={"main-paper-container-server-open"}
                    // hasToolbar={{ haveExcelPfdReport: { excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler } }}
                    >
                        <div classPage={"height-search"}>
                            {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={4} className="padding-right-10">
                                    <Input label="عنوان" handleChange={this.handleChangeTitle} value={this.state.title} />
                                </Grid>
                                <Grid item md={2} className="padding-right-10">
                                    <Input label="از کد" handleChange={this.handleChangeFromCode} type="number" min={this.state.toCode} value={this.state.fromCode} />
                                </Grid>
                                <Grid item md={2} className="padding-right-10">
                                    <Input label="تا کد" type="number" min={this.state.fromCode} handleChange={this.handleChangeToCode} value={this.state.toCode} />
                                </Grid>
                            </Grid> */}
                        </div>


                    </GridServer>
                </Paper>
            </React.Fragment>
        )
    }
}

export default GetRestrictionComponent;