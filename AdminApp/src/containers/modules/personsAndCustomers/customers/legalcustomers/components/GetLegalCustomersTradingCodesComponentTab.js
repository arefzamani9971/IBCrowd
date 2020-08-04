import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient, GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetLegalCustomersTradingCodesColumnsTab';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';
// import GetPartyRelationService from '../../customersRelation/services/GetCustomersRelationService';
import GetEnum from 'services/getEnum';

import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import './GetLegalCustomersTradingCodesComponentTab.css'
import GetPartiesService from '../../customersList/services/GetPartiesService';
import CustomerTradingCodesService from '../../customerTradingCodes/services/CustomerTradingCodeServices';
// import CustomerTradingCodesService from "../services/CustomerTradingCodeServices";
// import GetPartiesService from "../../customersList/services/GetPartiesService";
function rand() {
    return Math.round(Math.random() * 20) - 10;
}




class GetLegalCustomersTradingCodesComponentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // party: {
            //     name: "selectedParty",
            //     field: "fullName",
            //     placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
            //     list: []
            // },
            sort: [{
                field: "created",
                dir: "desc"
            }],
            // selectedParty: {  fullName : ''},
        }
    }
    // handleParentChange = (item) => {
    //     this.setState({
    //         selectedParty : item.value,
    //     })
    // };
    componentDidMount() {

        if (this.props.history.location.state) {
            let partyId = !this.props.partyId ?
                this.props.history.location.state : this.props.partyId;
        }
    }
    
    add = () => {
        this.props.history.push(

            {
                pathname: this.props.addInGridPartyCode.path,
                state: JSON.stringify({
                    backButton: { path: "/main/persons/customers/completeRegisterLegalCustomer", title: "تکمیل فرم ثبت نام مشتریان " },

                    tabId: 5,
                    partyId: this.props.partyId
                })
            }
        );
    };
    edit = (v) => {
        this.props.history.push(
            {
                pathname: this.props.editInGridPartyCode.path,
                state: JSON.stringify({
                    backButton: { path: "/main/persons/customers/completeRegisterLegalCustomer", title: "تکمیل فرم ثبت نام مشتریان " },

                    tabId: 5,
                    partyId: this.props.partyId
                })
            
            }
        );
    }

  

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {/* <Header {...this.props} /> */}
                <Paper className={"main-paper-container main-height customer-legal-trading-tab add-grid"}>
                
                    <div>
                        <GridServer
                            {...this.state}
                            {...this.props}
                            reportFilter={
                                {
                                    partyId: this.props.partyId
                                    // partyId: this.props.location.state && this.props.location.state.customeBackInfo ? this.props.location.state.partyId : this.props.location.state,
                                    // mainMarketId: 0
                                }
                            }
                            service={CustomerTradingCodesService.getAllPartyMethod}
                            Columns={Columns}
                            sort={this.state.sort}
                            // classHeightOpenPanel={"height-open-grid"}
                            reRender={true}
                            callServiceAgain={true}
                            hasToolbar={{ elemnts: [{ id: 'add', title: 'افزودن کدهای معاملاتی مشتری', method: this.add }] }}
                            EditCustomerContactTab={this.edit}
                        >
                            {/* <div classPage={"height-search"}>
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
                            </div> */}
                        </GridServer>
                    </div>
                </Paper>
            </React.Fragment>

        )
    }


}

export default withStyles(styles)(GetLegalCustomersTradingCodesComponentTab);