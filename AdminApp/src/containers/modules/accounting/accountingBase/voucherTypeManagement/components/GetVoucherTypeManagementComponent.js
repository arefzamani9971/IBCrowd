import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetVoucherTypeManagementcolumn';
import "./GetVoucherTypeManagementComponent.css";
import GetVoucherTypeManagamentService from '../services/GetVoucherTypeManagamentService';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';


class GetVoucherTypeManagementComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            priority: 0,
            ChangePriorityModal: false,

            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container voucherTypeManagement"}>
                    <GridClient
                        {...this.state}
                        {...this.props}
                        service={GetVoucherTypeManagamentService.getallvouchercategoriesMethod}
                        Columns={Columns}
                        onLoadingChange={this.onLoadingChange}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                    >
                    </GridClient>
                </Paper>
              
            </React.Fragment>
        )
    }

}


export default withStyles(styles)(GetVoucherTypeManagementComponent);
