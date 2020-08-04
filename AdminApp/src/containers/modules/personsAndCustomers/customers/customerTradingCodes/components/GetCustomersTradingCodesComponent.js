import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetCustomersTradingCodesColumn';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme'
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import './GetCustomerTradingComponent.css'
import CustomerTradingCodesService from "../services/CustomerTradingCodeServices";
import GetPartiesService from "../../customersList/services/GetPartiesService";


class GetCustomersTradingCodesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری",
                list: []
            },
            sort: [{
               field: "created",
                dir: "desc"
            }],
            selectedParty: { fullName: '' }

        }
    }
    handleParentChange = (item) => {
        this.setState({
            selectedParty: item.value,
        })
    };

    componentDidMount() {    
     
        }
        
    render() {
        console.log('this.state.party',this.state.party)
        const { classes } = this.props;
        return (
            <React.Fragment>
               <Header {...this.props} stateParams={this.state.selectedParty ? { partyId: this.state.selectedParty.id } : null}/>
                <Paper className={"main-paper-container customer-trading"}>
                    <GridServer
                        {...this.state}
                        {...this.props}
                        reportFilter={
                            {
                                partyId: this.state.selectedParty ? this.state.selectedParty.id : 0,
                                mainMarketId: 0
                            }
                        }
                        service={CustomerTradingCodesService.getAllPartyMethod}
                        Columns={Columns}
                        sort={this.state.sort}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        reRender={true}
                        callServiceAgain={true}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={6}>
                                    <AutoCompleteComponent
                                        {...this.state.party}
                                        handleChange={(value) => this.handleParentChange(value)}
                                        service={GetPartiesService.simpleSearchCustomers}
                                        value={this.state.selectedParty.fullName}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>
        )
    }


}

export default withStyles(styles)(GetCustomersTradingCodesComponent);