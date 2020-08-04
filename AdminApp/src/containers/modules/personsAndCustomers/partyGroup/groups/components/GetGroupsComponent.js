import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Columns from '../constants/GetGroupsColumn';
import GetGroupsService from '../services/GetGroupsService';
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import './GetGrops.css';

class GetGroups extends React.Component {

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
    onChangePage = (dataItem) => {

        this.props.history.push(
            {
                pathname: this.props.list.path,
                state: {
                    id: dataItem.id,
                    title: dataItem.title
                }

            })
    }

    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container group-type"}>
                    <GridClient
                        {...this.state}
                        {...this.props}
                        service={GetGroupsService.getAllGroupByFilter}
                        Columns={Columns}
                        onChangePage={this.onChangePage}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                    />
                </Paper>

            </React.Fragment>
        )
    }

}


export default GetGroups

