import React from 'react';
import Paper from '@material-ui/core/Paper';
import GetGeneralLedgerService from '../services/GetGeneralLedgerService';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/generalLedgerColumns';

class GetGeneralLedger extends React.Component {
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
        sort: [
            {
                field: "created",
                dir: "desc"
            }
        ]
       }
        GetGeneralLedgerService.getExcelExport(command,'general-ledger');
    }
    pdfReportHandler= () => {
        var command = {
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
           }
        GetGeneralLedgerService.getPdfExport(command,'general-ledger');
    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container general-ledger"}>
                    <GridClient
                        {...this.state}
                        {...this.props}
                        service={GetGeneralLedgerService.getGeneralLedgers}
                        Columns={Columns}
                        hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}  
                    />
                </Paper>
            </React.Fragment>
        )
    }
}

export default GetGeneralLedger;