import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/getUsersColumns';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';
import GetUsersService from '../services/GetUsersService';

import './GetUsersComponent.css';
class GetUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pharse: '',
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]


        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {


    }


    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };

    afterResponse(response) {
        var res = response.result
        res.map(item => {
            if (item.marketTitles.length > 0) {
                let markets = ""
                item.marketTitles.map(market => {
                    markets = markets + market + ", "
                })
                item.marketTitles = markets;
                item.marketTitles = item.marketTitles.slice(0, -2);
            }

        });
        return response;
    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container party"}>
                    <GridServer
                        reportFilter={
                            {
                                pharse: this.state.pharse
                            }
                        }
                        {... this.props}
                        {... this.state}
                        // preSearch={this.preSearch}
                        service={GetUsersService.getAllUsers}
                        Columns={Columns}
                        sort={this.state.sort}
                        classHeightOpenPanel={"height-open-grid"}
                        reRender={true}
                        afterResponse={this.afterResponse}>

                        <div classPage={"height-search"}>

                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <Input label="جستجو" handleChange={(e) => this.handleChange(e, 'phrase')} value={this.state.phrase} />
                                </Grid>
                            </Grid>
                        </div>

                    </GridServer>
                </Paper>
            </React.Fragment>
        );

    }
}

export default withStyles(styles)(GetUsers);