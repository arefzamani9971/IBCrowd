import React from 'react';
import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import GetPartyBankAccountsService from '../services/GetPartyBankAccountsService';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import Columns from '../constants/partyBankAccountsColumns';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import IBAN from 'shared/components/iban/textMask';
import './GetPartyBanckAccountComponent.css';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import GetAllBankNames from "../../../../../../services/getBanks";
import getBankAccountUsages from "../../../../../../services/getBankAccountUsages";
// import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';

class GetPartyBankAccounts extends React.Component {

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
            selectedParty: {
                fullName: ''
            },
            sort: [{
                field: "created",
                dir: "desc"
            }],
            isDefault: false,
            account: {
                name: "selectedAccount",
                field: "title",
                label: "نوع حساب",
                list: []
            },
            bank: {
                name: "selectedBank",
                field: "title",
                label: "نام بانک",
                list: []
            },
            selectedAccount: {},
            selectedBank: {},
            bankAccountUsages: {
                name: "partyBankAccountUsages",
                field: 'title',
                list: [],
                label: "مورد استفاده بانک"
            },
            partyBankAccountUsages: [],
            branchName: '',
            accountNumber: '',
            iban: '',
            isIbanCorrect: false,
            defaultAccount: {
                name: "selectedDefaultAccount",
                field: 'title',
                list: [
                    {
                        id: -1,
                        title: "همه"
                    },
                    {
                        id: 1,
                        title: "دارد"
                    },
                    {
                        id: 2,
                        title: "ندارد"
                    }

                ],
                label: "حساب پیش فرض"
            },
            selectedDefaultAccount: { id: -1, title: "همه" }

        };
        this.handlePartyChange = this.handlePartyChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
    }

    componentDidMount() {
        GetEnum("BankAccountType", (response) => DropDownListDataProvider(this, "account", response));
        GetAllBankNames((response) => DropDownListDataProvider(this, "bank", response));
        getBankAccountUsages((response) => DropDownListDataProvider(this, "bankAccountUsages", response))
    }

    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };

    handlePartyChange(item) {
        this.setState({
            selectedParty: item.value,
        })
    }

    render() {
        console.log('this.state.selectedParty',this.state.selectedParty)
        console.log('this.props.selectedParty',this.props.selectedParty)

        return (
            <React.Fragment>
                <Header {...this.props} stateParams={this.state.selectedParty ? {  partyId: this.state.selectedParty.id  } : null}/>
                {/* <Header {...this.props} /> */}
                <Paper className={"main-paper-container party-bank-account-managed"}>

                    <GridServer
                        {...this.props}
                        {...this.state}
                        reportFilter={
                            {
                                partyId: this.state.selectedParty.partyId,
                                // partyId: this.props.partyId,
                                bankId: this.state.selectedBank.codeId,
                                branchName: this.state.branchName,
                                accountType: this.state.selectedAccount.code,
                                accountNumber: this.state.accountNumber,
                                iban: this.state.iban,
                                isDefault: this.state.selectedDefaultAccount.id === 1 ? true : this.state.selectedDefaultAccount.id === 2 ? false : null,
                                bankAccountUsageIds: this.state.partyBankAccountUsages.map(item => { return item.id })
                            }
                        }
                        service={GetPartyBankAccountsService.getAllPartyBankAccountByFilterMethod}
                        Columns={Columns}
                        sort={this.state.sort}
                        reRender={true}
                        callServiceAgain={true}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}>
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={12}>
                                    <AutoCompleteComplete
                                        {...this.state.party}
                                        handleChange={(value) => this.handlePartyChange(value)}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.simpleSearchCustomers} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.bank}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedBank} hasAll />
                                    </div>

                                </Grid>
                                <Grid item md={2}>
                                    <Input label="نام شعبه" handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.account}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.selectedAccount} hasAll />
                                    </div>
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="شماره حساب" isLeftStartText={true} handleChange={(e) => this.handleChange(e, 'accountNumber')} value={this.state.accountNumber} />
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="شماره شبا"
                                        value={this.state.iban}
                                        handleChange={(value) => this.handleChange(value, 'iban')} isLeftStartText={true}/>

                                </Grid>

                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                {/* <Grid item md={2}>
                                    <FormControlLabel className="d-flex align-items-center"
                                        control={
                                            <Checkbox
                                                checked={this.state.isDefault}
                                                onChange={this.handleChangeCheck('isDefault')}
                                                value="isDefault"
                                                color="primary"
                                            />
                                        }
                                        label="حساب پیش فرض"
                                    />

                                </Grid> */}
                                <Grid item md={2}>
                                    <DropDownComponent {...this.state.defaultAccount}
                                        handleChange={(value, name) => this.handleChange(value, name)} value={this.state.selectedDefaultAccount} />
                                </Grid>
                                <Grid item md={10}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent {...this.state.bankAccountUsages}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.partyBankAccountUsages} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>

                </Paper>
            </React.Fragment>
        )

    }

}

export default GetPartyBankAccounts;


