import React from 'react';
import Paper from '@material-ui/core/Paper';
import GetSubsidiaryLedgerService from '../services/GetSubsidiaryLedgerService'
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/subsidiaryLedgerColumns';

class GetSubsidiaryLedger extends React.Component {
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

    componentDidMount() {
    }
    excelReportHandler = () => {
        var command = {
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        }
        GetSubsidiaryLedgerService.getExcelExport(command, 'subsidiary-ledger');
    }
    pdfReportHandler = () => { }
    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container subsidiary-ledger"}>
                    <GridClient
                        {...this.state}
                        {...this.props}
                        service={GetSubsidiaryLedgerService.getsubsidiaryledgers}
                        Columns={Columns}
                        hasToolbar={{ haveExcelPfdReport: { excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler } }}
                    />
                </Paper>
            </React.Fragment>
        )

    }
}

export default GetSubsidiaryLedger;