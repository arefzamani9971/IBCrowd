import React from 'react';

import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
// import GetPartyBankAccountsService from '../services/GetPartyBankAccountsService';
// import GetPartiesService from '../../customersList/services/GetPartiesService';
import Columns from '../constants/GetPartyBankAccountsColumnsTab';
import './GetPartyBankAccountsComponentTab.css';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
// import GetAllRegion from '../../../../../../services/getRegion';
// import GetAllBankNames from '../../../../../../services/getBanks';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetPartyBankAccountsService from '../../bankAccounts/services/GetPartyBankAccountsService';
// import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';

class GetPartyBankAccountsComponentTab extends React.Component {

    
    constructor(props) {
        super(props);

        this.state = {
           
            sort: [{
                field: "created",
                dir: "desc"
            }]
        };
        this.handlePartyChange = this.handlePartyChange.bind(this);
    }
    componentDidMount() {

    }

    handlePartyChange(item){
        // let item = value.value;
        this.setState({
            selectedParty : item.value,
        })
    }
    add = () => {
        this.props.history.push(
            {
              pathname: this.props.addInGridPartyBankAccount.path,
              state: {
                  backPath : "/main/persons/customers/completeRegisterRealCustomer",
                //   title:"تکمیل فرم مشتریان",
                //   tabId: 4,
                  partyId : this.props.location.state && this.props.location.state.customeBackInfo ? this.props.location.state.partyId : this.props.location.state
              }
            }
        );
    }
    edit = (v) => {
        this.props.history.push(
            {
              pathname: this.props.editInGridPartyBankAccount.path,
              state: {
                  id: v,
                  backPath : "/main/persons/customers/completeRegisterRealCustomer",
                //   title:"تکمیل فرم مشتریان",
                //   tabId: 4,
                  partyId : this.props.location.state && this.props.location.state.customeBackInfo ? this.props.location.state.partyId : this.props.location.state
              }
            }
        );
    }
    render() {
        return (
            <React.Fragment>
               
                {/* <Header {...this.props} addIsAlwaysEnabled addByIdStateParams={this.state.selectedParty ? { id: this.state.selectedParty } : undefined} /> */}
                <Paper className={"main-paper-container party-bank-account-managed-realCustomer-tab add-grid"}>

                    <GridServer
                        {...this.props}
                        {...this.state}
                        reportFilter={
                            {
                                // partyId: this.state.selectedParty,
                                partyId: this.props.location.state && this.props.location.state.customeBackInfo ? this.props.location.state.partyId : this.props.location.state,
                                id:0
                            }
                        }
                        service={GetPartyBankAccountsService.getAllPartyBankAccountByFilterMethod}
                        Columns={Columns}
                        sort={this.state.sort}
                        reRender={true}
                        callServiceAgain={true}
                        hasToolbar={{elemnts:[{id: 'add', title: 'افزودن حساب بانکی مشتری', method: this.add}]}}
                        EditCustomerContactTab={this.edit}
                        // classHeightOpenPanel={"height-open-grid"}
                        >
                    </GridServer>

                </Paper>
         
            </React.Fragment>
        )

    }

}

export default GetPartyBankAccountsComponentTab;


