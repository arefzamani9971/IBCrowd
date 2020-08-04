import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Columns from '../constants/GetGroupTypeColumn';
import GetGroupTypesService from '../services/GetGroupTypesService';
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';
import './GetGroupType.css';


class GetGroupTypes extends React.Component {

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

    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container group-type"}>
                    <GridClient
                        {...this.state}
                        {...this.props}
                        service={GetGroupTypesService.getGroupTypes}
                        Columns={Columns}
                        onLoadingChange={this.onLoadingChange}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                    />
                </Paper>

            </React.Fragment>
        )
    }

}

export default withStyles(styles)(GetGroupTypes)

