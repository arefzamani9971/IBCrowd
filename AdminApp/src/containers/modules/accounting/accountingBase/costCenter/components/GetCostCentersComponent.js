import React from 'react';
import Paper from '@material-ui/core/Paper';
import GetCostCentersService from '../services/GetCostCentersService';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/costCenterColumns';
class GetCostCenters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]

        }
    }
    excelReportHandler = () => {
        var command = {
            OptionalFilter: {
                sort: [
                    {
                        field: "created",
                        dir: "desc"
                    }
                ]
            }
        }
        GetCostCentersService.getExcelExport(command, 'cost-center');
    }
    pdfReportHandler = () => { }
    render() {
        return (
            <React.Fragment>

                <Header {...this.props} />
                <Paper className={"main-paper-container cost-center "}>
                    <GridClient
                        {...this.state}
                        {...this.props}
                        service={GetCostCentersService.getCostCenters}
                        Columns={Columns}
                        onLoadingChange={this.onLoadingChange}
                        hasToolbar={{ haveExcelPfdReport: { excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler } }}
                    />
                </Paper>
            </React.Fragment>
        )
    }
}

export default GetCostCenters;