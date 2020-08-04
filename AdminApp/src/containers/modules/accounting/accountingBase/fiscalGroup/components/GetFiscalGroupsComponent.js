/* #region imports */
import React from 'react';
import Loading from 'core/Loading';
import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/layout/panel/theme';
import GetFiscalGroupsService from '../services/GetFiscalGroupsService';
import Header from 'shared/components/stateHeader/stateHeader';
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/fiscalGroupColumns';
/* #endregion */

class GetFiscalGroups extends React.Component {
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
            OptionalFilter: {
                sort: [
                    {
                        field: "created",
                        dir: "desc"
                    }
                ]
            }
        }
        GetFiscalGroupsService.getExcelExport(command,'fiscal-group');
     }
     pdfReportHandler= () => {}

    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            return (
                <React.Fragment>
                    <Header {...this.props} />
                    <Paper className={"main-paper-container fiscal-group"}>
                        <GridClient
                            {...this.state}
                            {...this.props}
                            service={GetFiscalGroupsService.getFiscalGroups}
                            Columns={Columns}
                            hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}
                        />
                    </Paper>
                </React.Fragment>
            );
        }
    }

}

export default withStyles(styles)(GetFiscalGroups);
