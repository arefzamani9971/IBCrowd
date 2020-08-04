import React from 'react';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import Form from '../../../../../../shared/components/form/form';
import Fieldset from 'shared/components/fieldset/fieldset';
import Input from 'shared/components/formInput/inputForm';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid } from '@material-ui/core';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IBAN from 'shared/components/iban/textMask';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import GetAllBankNames from "../../../../../../services/getBanks";
import GetPartyBankAccountsService from "../services/GetPartyBankAccountsService";
import UpdatePartyBankAccountService from "../services/UpdatePartyBankAccountService";
import getBankAccountUsages from "../../../../../../services/getBankAccountUsages";
import GetPartyByIdService from '../../../../personsAndCustomers/customers/realCustomers/services/GetPartyByIdService';


class UpdatePartyBankAccounts extends React.Component {

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
            stateInfo: {},


            bankAccountUsages: {
                name: "partyBankAccountUsages",
                field: 'title',
                list: [],
                label: "مورد استفاده بانک"
            },
            partyBankAccountUsages: [],
            isIbanCorrect: true
        }
        this.handleChangeIban = this.handleChangeIban.bind(this);

    }

    componentDidMount() {
        if (this.props.history.location.state) {
            this.setState({
                stateInfo: typeof this.props.history.location.state === 'string' ? JSON.parse(this.props.history.location.state) : this.props.history.location.state
                // stateInfo: JSON.parse(this.props.history.location.state)
            }, () => {
                let partyId = this.state.stateInfo.partyId;
                if (partyId > 0) {
                    this.getPartyById(partyId);
                }

            })
        }
        GetEnum("BankAccountType", (response) => DropDownListDataProvider(this, "account", response));
        GetAllBankNames((response) => DropDownListDataProvider(this, "bank", response));
    }
    getPartyById = (partyId) => {

        const body = {
            entity: partyId
            // mainMarketId: 1 //this is fix

        };
        GetPartyByIdService.getPartyById(body, (res) => {
            this.setState({
                selectedParty: res.result,
                isChangeParty: false
            },()=>{
                this.getPartyBankAccountById()
            }
            );
        });
    };
        getPartyBankAccountById() {
            let command = {
                entity: this.state.stateInfo.id,
            };
        GetPartyBankAccountsService.getPartyBankAccountByIdMethod(command, (response) => {
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
        }
        )}
   
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
        console.log('bank',this.state.bank)
        return (
            <React.Fragment>
                <WrapperPaper />
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
                    service={UpdatePartyBankAccountService}
                    entity={
                        {
                            id:this.state.stateInfo.id,
                            partyId: this.state.stateInfo.partyId,
                            bankId: this.state.selectedBank.codeId,
                            branchName: this.state.branchName,
                            branchCode: this.state.branchCode,
                            accountNumber: this.state.accountNumber,
                            iban: this.state.iban,
                            accountType: this.state.selectedAccount.code,
                            isDefault: this.state.isDefault,
                            bankAccountOwnerName: this.state.bankAccountOwnerName,
                            purchaseFromBank: this.state.purchaseFromBank,
                            partyBankAccountUsages: this.state.partyBankAccountUsages.length > 0 ? this.state.partyBankAccountUsages.map(s => { return { id: s.id } }) : []
                        }
                    }
                    disabled={this.state.selectedBank.codeId == 0 || this.state.selectedAccount.code == 0 || this.state.accountNumber == '' || !this.state.isIbanCorrect}
                    redirectPage={this.state.stateInfo.backButton ? "/main/persons/customers/completeRegisterLegalCustomer" : "/main/persons/customers/getPartyBankAccounts"}

                >
                    <br />
                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="margin-bottom-30">
                            <Grid item md={12}>
                                <Input label="نام و نام خانوادگی" value={this.state.selectedParty.fullName} disabled />
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات بانکی'}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">

                                    <DropDownComponent
                                     {...this.state.bank}
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

export default UpdatePartyBankAccounts;


