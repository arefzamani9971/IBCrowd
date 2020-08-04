import React from 'react';
import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import Form from '../../../../../../shared/components/form/form';
import Fieldset from 'shared/components/fieldset/fieldset';
import Input from 'shared/components/formInput/inputForm';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid } from '@material-ui/core';
import AddPartyBankAccountService from '../services/AddPartyBankAccountsService';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import IBAN from 'shared/components/iban/textMask';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import GetAllBankNames from "../../../../../../services/getBanks";
import getBankAccountUsages from "../../../../../../services/getBankAccountUsages";
import GetPartyBankAccountsService from '../../../../personsAndCustomers/customers/bankAccounts/services/GetPartyBankAccountsService'
import GetPartyByIdService from '../../../../personsAndCustomers/customers/realCustomers/services/GetPartyByIdService';




class CreatePartyBankAccounts extends React.Component {
    



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
            isDefault: false,
            purchaseFromBank: false,
            bankTitle: '',
            branchName: '',
            branchCode: '',
            accountNumber: '',
            iban: '',
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
            bankAccountOwnerName: '',

            bankAccountUsages: {
                name: "partyBankAccountUsages",
                field: 'title',
                list: [],
                label: "مورد استفاده بانک"
            },
            partyBankAccountUsages: [],
            selectedParty: {},
            isIbanCorrect: true,
            isChangeParty: true,
            stateInfo: {},
        }
        this.handlePartyChange = this.handlePartyChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleChangeIban = this.handleChangeIban.bind(this);
    }

    componentDidMount() {
        if (this.props.history.location.state) {
            this.setState({

                stateInfo: JSON.parse(this.props.history.location.state)
            }, () => {
                let partyId = this.state.stateInfo.partyId;
                if (partyId > 0) {
                    this.getBankAccountById(partyId);
                }




            })
        }

        GetEnum("BankAccountType", (response) => DropDownListDataProvider(this, "account", response));
        GetAllBankNames((response) => DropDownListDataProvider(this, "bank", response));
        getBankAccountUsages((response) => DropDownListDataProvider(this, "bankAccountUsages", response))


    }




    getBankAccountById(partyId) {
        let command = {
            entity: partyId
        };
        GetPartyByIdService.getPartyById(command, (res) => {
            this.setState({
                selectedParty: res.result,
                isChangeParty: false

            },
            );
        });




    };

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
    handleChangeIban(value, isCorrect) {
        this.setState({
            iban: value.value,
            isIbanCorrect: isCorrect
        })
    }

    render() {

        return (

            <React.Fragment>
                {/*<WrapperPaper />*/}
                <Header {...this.props} back={this.state.stateInfo.backButton ? this.state.stateInfo.backButton : this.props.back}
                    backParams={
                        this.props.location.state === undefined ? undefined : {
                            partyId: this.state.stateInfo.partyId,
                            tabId: this.state.stateInfo.tabId
                        }

                    } />
                <Form
                    {...this.props}
                    {...this.state}
                    service={AddPartyBankAccountService}
                    entity={

                        {
                            partyId: this.state.stateInfo.partyId,
                            bankId: this.state.selectedBank.codeId,
                            branchName: this.state.branchName,
                            branchCode: this.state.branchCode,
                            accountNumber: this.state.accountNumber,
                            iban: this.state.iban,
                            accountType: this.state.selectedAccount.code,
                            bankAccountOwnerName: this.state.bankAccountOwnerName,
                            isDefault: this.state.isDefault,
                            purchaseFromBank: this.state.purchaseFromBank,
                            partyBankAccountUsages: this.state.partyBankAccountUsages.length > 0 ? this.state.partyBankAccountUsages.map(s => { return { id: s.id } }) : []

                        }
                    }
                    redirectPage={this.state.stateInfo.backButton ?  "/main/persons/customers/completeRegisterLegalCustomer" : "/main/persons/customers/managedCustomerContact"}

                    disabled={!this.state.selectedParty.id || this.state.selectedBank.codeId == 0 || this.state.selectedAccount.code == 0 || this.state.accountNumber == '' || !this.state.isIbanCorrect}
                >
                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="margin-bottom-30">

                            {
                                this.state.selectedParty.id && !this.state.isChangeParty ?

                                    <React.Fragment>
                                        <Grid item md={3}>
                                            <h3><span>نام و نام خانوادگی: </span><strong>{this.state.selectedParty.fullName}</strong></h3>
                                        </Grid>

                                        <Grid item md={3}>
                                            <h3><span>
                                                {
                                                    this.state.selectedParty.partyType === 1 ? "کد ملی: " : "شناسه ملی: "
                                                }

                                            </span><strong>{this.state.selectedParty.nationalId}</strong></h3>
                                        </Grid>
                                    </React.Fragment>
                                    :
                                    <Grid item md={12}>
                                        <AutoCompleteComponent
                                            {...this.state.party}
                                            handleChange={(value) => this.handlePartyChange(value)}
                                            value={this.state.selectedParty.fullName}
                                            service={GetPartiesService.simpleSearchCustomers}
                                            required
                                        />
                                    </Grid>
                            }

                        </Grid>
                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات بانکی'}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.bank}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedBank} required />
                                </div>

                            </Grid>
                            <Grid item md={2}>
                                <Input label="کد شعبه" handleChange={(e) => this.handleChange(e, 'branchCode')} value={this.state.branchCode} />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام شعبه" handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.account}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.selectedAccount} required />
                                </div>
                            </Grid>
                            <Grid item md={3}>
                                <Input label="شماره حساب" isLeftStartText={true} handleChange={(e) => this.handleChange(e, 'accountNumber')} value={this.state.accountNumber} required />
                            </Grid>
                            <Grid item md={3}>
                                <IBAN handleChange={(value, isCorrect) => this.handleChangeIban(value, isCorrect)} value={this.state.iban} />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام صاحب حساب" handleChange={(e) => this.handleChange(e, 'bankAccountOwnerName')} value={this.state.bankAccountOwnerName} />
                            </Grid>

                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={5}>
                                <div className="k-rtl">
                                    <MultiSelectComponent {...this.state.bankAccountUsages}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.partyBankAccountUsages} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <FormControlLabel
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

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.purchaseFromBank}
                                        onChange={this.handleChangeCheck('purchaseFromBank')}
                                        value="isDefault"
                                        color="primary"
                                    />
                                }
                                label="خرید از محل بانک"
                            />


                        </Grid>

                    </Fieldset>
                </Form>
            </React.Fragment >
        )

    }

}

export default CreatePartyBankAccounts;


