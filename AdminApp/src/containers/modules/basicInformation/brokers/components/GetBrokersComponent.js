import React from 'react';
import Paper from '@material-ui/core/Paper';
import Loading from '../../../../../core/Loading';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from "../constants/BrokersColumns";
import GetBrokerService from '../services/GetBrokersService';
import jMoment from 'moment-jalaali';

class GetBrokers extends React.Component {
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

    afterResponse(response){
        var res = response.result
        res.map(item => {
            item.validFromJalali =item.validFrom != null ? jMoment(item.validFrom).format('jYYYY/jMM/jDD') : "";
            item.validUntilJalali =item.validUntil != null ? jMoment(item.validUntil).format('jYYYY/jMM/jDD') : "";

        });
        return response;
    }
    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            return (
                <React.Fragment>
                    <WrapperPaper />
                    <Header {...this.props} />
                    <Paper className={"main-paper-container branch"}>

                        <GridClient
                            {...this.state}
                            service={GetBrokerService.getAllBroker}
                            {...this.props}
                            Columns={Columns}
                            command={
                                {
                                    optionalFilter: {
                                        take: 500,
                                        page: 1

                                    }
                                }
                            } 
                            afterResponse={this.afterResponse}>
                        </GridClient>

                    </Paper>
                </React.Fragment >
            )
        }
    }
}

export default GetBrokers;