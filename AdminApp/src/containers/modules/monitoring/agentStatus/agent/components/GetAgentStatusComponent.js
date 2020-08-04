import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import styles from 'containers/layout/panel/theme';
import GetAgentStatusService from "../services/GetAgentStatusService";
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import UpperColumns from '../constants/GetAgentStatusUpperColumn';
import Paper from '@material-ui/core/Paper';
import LowerColumns from './../constants/GetAgentStatusLowerColumn';
import './GetAgentStatusComponent.css'
class GetAgentStatusComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container agent-status-upper-table h-50 mb-3"}>
                    <div className="py-2 text-center">وضعیت جاب‌ها</div>
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
                        service={GetAgentStatusService.getAllCashFlowChequeMasterByFilterMethod}
                        Columns={UpperColumns}
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

                    </GridServer>

                </Paper>

                <Paper className={"main-paper-container agent-status-lower-table h-50"}>
                <div className="py-2 text-center">آخرین تاریخ به‌روزشدن داده‌ها</div>
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
                        service={GetAgentStatusService.getAllCashFlowChequeMasterByFilterMethod}
                        Columns={LowerColumns}
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

                    </GridServer>
                </Paper>
            </React.Fragment>
        )
    }

}

GetAgentStatusComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GetAgentStatusComponent);