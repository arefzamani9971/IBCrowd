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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IBAN from 'shared/components/iban/textMask';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import GetAllBankNames from "../../../../../../services/getBanks";
import GetPartyCodeWithMainMarketsService from "../../customerTradingCodes/services/GetPartyCodeWithMainMarkets";
// import GetPartyBankAccountsService from "../services/GetPartyBankAccountsService";
// import UpdatePartyBankAccountService from "../services/UpdatePartyBankAccountService";
import getBankAccountUsages from "../../../../../../services/getBankAccountUsages";
import { GetMultiSelectElementMoreItem } from "../../../../../../core/getMultiSelectElement";
import GetPartiesService from '../../customersList/services/GetPartiesService';
import GetPartyBankAccountsService from '../../bankAccounts/services/GetPartyBankAccountsService';
import UpdatePartyBankAccountService from '../../bankAccounts/services/UpdatePartyBankAccountService';
// import GetPartyBankAccountsService from '../../bankAccounts/services/GetPartyBankAccountsService';
// import UpdatePartyBankAccountService from '../../bankAccounts/services/UpdatePartyBankAccountService';
let test = [];
class EditLegalPartyBankAccountsComponentTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDefault: false,
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
            bankID: null,
            accountType: null,
            bankAccountOwnerName: '',
            purchaseFromBank: false,

            bankAccountUsages: {
                name: "partyBankAccountUsages",
                field: 'title',
                list: [],
                label: "مورد استفاده بانک"
            },
            partyBankAccountUsages: [],


            partyFullName: '',
            nationalId: '',
            isIbanCorrect: true,

            stateBack:
                this.props.location.state && this.props.location.state.backPath ?
                    {
                        title: 'بازگشت به تب مدیریت حسابهای بانکی',
                        path: this.props.location.state.backPath,
                        customeBackInfo: true,
                        partyId: this.props.location.state.partyId,
                        tabId: 4,
                    } : {},
        }

    }

    componentDidMount() {
        GetEnum("BankAccountType", (response) => DropDownListDataProvider(this, "account", response));
        GetAllBankNames((response) => DropDownListDataProvider(this, "bank", response));

        this.getPartyBankAccountByFilter();
    }
    getPartyBankAccountByFilter = () => {

        const body = {
            entity: this.props.location.state.id,
            // mainMarketId: 1 //this is fix

        };
        GetPartyBankAccountsService.getPartyBankAccountByIdMethod(body, (response) => {
            this.setState({
                branchName: response.result.branchName,
                branchCode: response.result.branchCode,
                accountNumber: response.result.accountNumber,
                iban: response.result.iban,
                isDefault: response.result.isDefault,
                bankID: response.result.bankId,
                accountType: response.result.accountType,
                partyId: response.result.partyId,
                id: response.result.id,
                bankAccountOwnerName: response.result.bankAccountOwnerName,
                purchaseFromBank: response.result.purchaseFromBank,
                partyBankAccountUsages: response.result.partyBankAccountUsages
            }, () => {
                getBankAccountUsages((response) => {
                    DropDownListDataProvider(this, "bankAccountUsages", response);
                });
                let command = {
                    entity: this.state.partyId,
                };
                GetPartiesService.getpartybyid(command, (response) => {
                    this.setState({
                        partyFullName: response.result.fullName,
                        nationalId: response.result.nationalId
                    })
                });
                GetAllBankNames((response) => {
                    for (let i = 0; i < response.result.length; i++) {
                        if (response.result[i].codeId === this.state.bankID) {
                            this.setState({
                                selectedBank: response.result[i]
                            })
                        }
                    }
                });
                GetEnum("BankAccountType", (response) => {
                    for (let i = 0; i < response.result.length; i++) {
                        if (response.result[i].code === this.state.accountType) {
                            this.setState({
                                selectedAccount: response.result[i]
                            })
                        }
                    }
                });


            })
        });
    };
    handleChange = (value, name) => {
        let item = value.value;
        if ([name] == 'partyBankAccountUsages') {
            // let getResponseObjectFormat = {
            //     success: true,
            //     result: test.push(value.value),
            // }
            // getBankAccountUsages((response) => {DropDownListDataProvider(this,"bankAccountUsages", getResponseObjectFormat)});
            this.setState({
                [name]: item
            })
        } else {
            this.setState({
                [name]: item
            })
        }
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
                <WrapperPaper />
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
                    service={UpdatePartyBankAccountService}
                    entity={
                        {
                            partyId: this.props.location.state.partyId,
                            bankId: this.state.selectedBank.codeId,
                            branchName: this.state.branchName,
                            branchCode: this.state.branchCode,
                            accountNumber: this.state.accountNumber,
                            iban: this.state.iban,
                            accountType: this.state.selectedAccount.code,
                            isDefault: this.state.isDefault,
                            id: this.state.id,
                            bankAccountOwnerName: this.state.bankAccountOwnerName,
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
                    disabled={this.state.selectedBank.codeId == 0 || this.state.selectedAccount.code == 0 || this.state.accountNumber == '' || !this.state.isIbanCorrect}
                >
                    <br />
                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="margin-bottom-30">
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
                            <Grid item md={10}>
                                <div className="k-rtl">
                                    <MultiSelectComponent {...this.state.bankAccountUsages} dataItemKey="title"
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.partyBankAccountUsages} />
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

export default EditLegalPartyBankAccountsComponentTab;


