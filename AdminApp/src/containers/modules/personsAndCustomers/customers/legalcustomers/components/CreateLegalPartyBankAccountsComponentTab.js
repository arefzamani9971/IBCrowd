import React from 'react';
import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import Form from '../../../../../../shared/components/form/form';
import Fieldset from 'shared/components/fieldset/fieldset';
import Input from 'shared/components/formInput/inputForm';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid } from '@material-ui/core';
// import AddPartyBankAccountService from '../services/AddPartyBankAccountsService';
// import GetPartiesService from '../../customersList/services/GetPartiesService';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import IBAN from 'shared/components/iban/textMask';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import GetAllBankNames from "../../../../../../services/getBanks";
import getBankAccountUsages from "../../../../../../services/getBankAccountUsages";
import GetPartyByIdService from '../../realCustomers/services/GetPartyByIdService';
import AddPartyBankAccountService from '../../bankAccounts/services/AddPartyBankAccountsService';
// import AddPartyBankAccountService from '../../bankAccounts/services/AddPartyBankAccountsService';
// import GetPartyByIdService from '../services/GetPartyByIdService';

class CreateLegalPartyBankAccountsComponentTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

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
            partyFullName: '',
            nationalId: '',
            isIbanCorrect: true

        }



    }

    componentDidMount() {
        GetEnum("BankAccountType", (response) => DropDownListDataProvider(this, "account", response));
        GetAllBankNames((response) => DropDownListDataProvider(this, "bank", response));
        getBankAccountUsages((response) => DropDownListDataProvider(this, "bankAccountUsages", response));
        GetPartyByIdService.getPartyById({ entity: this.props.location.state.partyId }, (res) => {
            this.setState({
                partyFullName: res.result.fullName,
                nationalId: res.result.nationalId
            })
        })
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
            selectedParty: item.value
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
                <Header {...this.props} backParams={
                    this.props.location.state === undefined ? undefined : {

                        // title : 'بازگشت به تب مدیریت حسابهای بانکی',
                        path: this.props.location.state.backPath,
                        customeBackInfo: true,
                        partyId: this.props.location.state.partyId,
                        tabId: 4,

                    }
                } />
                <Form
                    {...this.props}
                    service={AddPartyBankAccountService}
                    entity={
                        {
                            partyId: this.props.location.state.partyId,
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
                    cancelModal={() => { }}
                    afterSubmit={
                        () => {

                            this.props.history.push(
                                {
                                    pathname: "/main/persons/customers/completeRegisterLegalCustomer",
                                    state: {
                                        // title : this.props.location.state.title,
                                        // path : this.props.location.state.backPath,
                                        customeBackInfo: true,
                                        partyId: this.props.location.state.partyId,
                                        tabId: 4,
                                    }
                                }
                            );
                        }
                    }
                    disabled={this.state.selectedBank.codeId == 0 ||
                        this.state.selectedAccount.code == 0 || this.state.accountNumber == '' || !this.state.isIbanCorrect}>

                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <h3><span>نام/ نام خانوادگی: </span><strong>{this.state.partyFullName}</strong></h3>
                            </Grid>
                            <Grid item md={3}>
                                <h3><span>شناسه ملی: </span><strong>{this.state.nationalId}</strong></h3>
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات بانکی'}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.bank}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedBank} required />
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
                                {/* <NumberFormatComponent id="accountNumber" label="شماره حساب" required value={this.state.accountNumber}
                                    handleChange={(value, error) => this.handleChange(value, 'accountNumber')} type="number" /> */}
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
            </React.Fragment>
        )

    }

}

export default CreateLegalPartyBankAccountsComponentTab;


