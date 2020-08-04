import React from 'react';
import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
// import GetPartyBankAccountsService from '../services/GetPartyBankAccountsService';
// import GetPartiesService from '../../customersList/services/GetPartiesService';
import Columns from '../constants/GetLegalPartyBankAccountsColumnsTab';
import './GetLegalPartyBankAccountsComponentTab.css';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
// import GetAllBankNames from '../../../../../../services/getBanks';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetPartyBankAccountsService from '../../bankAccounts/services/GetPartyBankAccountsService';
// import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';

class GetLegalPartyBankAccountsComponentTab extends React.Component {


    
    constructor(props) {
        super(props);

        this.state = {

            sort: [{
                field: "created",
                dir: "desc"
            }]
        };
    }

    componentDidMount() {

       
    }

    handlePartyChange = (item) => {
        this.setState({
            selectedParty: item.value
        })
    }

    add = () => {
        this.props.history.push(
            {
                pathname: this.props.addInGridPartyBankAccount.path,
                state: JSON.stringify({
                    backButton: { path: "/main/persons/customers/completeRegisterLegalCustomer", title: "تکمیل فرم ثبت نام مشتریان " },
                    tabId: 4,
                    partyId: this.props.partyId
                })
            }
        )
    }
    edit = (v) => {
        
        this.props.history.push(
            {
                pathname: this.props.editInGridPartyBankAccount.path,
                state: JSON.stringify({
                    backButton: { path: "/main/persons/customers/completeRegisterLegalCustomer", title: "تکمیل فرم ثبت نام مشتریان " },
                    id: v,
                    tabId: 4,
                    partyId: this.props.partyId
                })

            }
        );
    }
    render() {

        console.log('backButton',this.props.backButton)
        console.log('back',this.props.back)

        return (

            <React.Fragment>

                {/* <Header {...this.props} addIsAlwaysEnabled addByIdStateParams={this.state.selectedParty ? { id: this.state.selectedParty } : undefined} /> */}
                <Paper className={"main-paper-container  main-height legal-party-bank-account-managed-realCustomer-tab add-grid"}>

                    <GridServer
                        {...this.props}
                        {...this.state}
                        reportFilter={
                            {
                                partyId: this.props.partyId,
                                // partyId: this.props.location.state && this.props.location.state.customeBackInfo ? this.props.location.state.partyId : this.props.location.state,
                                id: 0
                            }
                        }

                        service={GetPartyBankAccountsService.getAllPartyBankAccountByFilterMethod}
                        Columns={Columns}
                        sort={this.state.sort}
                        reRender={true}
                        callServiceAgain={true}
                        hasToolbar={{ elemnts: [{ id: 'add', title: 'افزودن حساب بانکی مشتری', method: this.add }] }}
                        EditCustomerContactTab={this.edit}
                    // classHeightOpenPanel={"height-open-grid"}
                    >
                    </GridServer>


                </Paper>

            </React.Fragment>
        )

    }

}

export default GetLegalPartyBankAccountsComponentTab;


