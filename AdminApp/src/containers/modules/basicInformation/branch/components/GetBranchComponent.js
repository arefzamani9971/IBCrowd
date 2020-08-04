import React from 'react';
import Paper from '@material-ui/core/Paper';
import Loading from '../../../../../core/Loading';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import GetBranchService from '../services/GetBranchService';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from "../constants/branchColumns";

class GetBranch extends React.Component {
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
    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            return (
                <React.Fragment>
                    <Header {...this.props} />
                    <Paper className={"main-paper-container branch"}>

                        <GridClient
                            {...this.state}
                            service={GetBranchService.getBranchesByFilter}
                            {...this.props}
                            Columns={Columns}
                            command={
                                {
                                    optionalFilter: {
                                        take: 500,
                                        page: 1

                                    }
                                }
                            } >;
                        </GridClient>

                    </Paper>
                </React.Fragment >
            )
        }
    }
}

export default GetBranch;