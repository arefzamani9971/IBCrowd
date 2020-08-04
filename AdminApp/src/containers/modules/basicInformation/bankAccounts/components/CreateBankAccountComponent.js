import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from 'shared/components/formInput/inputForm'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import AddBankAccountService from '../services/CreateBankAccountService';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import GetAllBankNames from 'services/getBanks';
import GetAllRegion from 'services/getRegion';
import GetMainMarket from 'services/GetMainMarkets';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';

class AddBankAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listEnum: {},
            selectedBank: { codeId: 0 },
            selectedRegion: {},
            selectedAccount: {},
            selectedMainMarkets: [],
            branchCode: '',
            branchName: '',
            accountNumber: '',
            iban: '',
            comment: '',
            maxDepositValue: '',
            maxLoanPayment: '',
            forCustomerDeposit: false,
            forLoanUse: false,
            isIbanCorrect: true,
            bank: {
                name: "selectedBank",
                field: "title",
                label: "نام بانک",
                list: []
            },
            region: {
                name: "selectedRegion",
                field: "title",
                label: "نام شهر",
                list: []
            },
            account: {
                name: "selectedAccount",
                field: "title",
                label: "نوع حساب",
                list: []
            },
            mainMarket: {
                name: "selectedMainMarkets",
                field: "title",
                label: "بازار",
                list: []
            }

        }
        this.successGetAllBankNames = this.successGetAllBankNames.bind(this);
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
        this.successBankAccountType = this.successBankAccountType.bind(this);
        this.successGetMainMarkets = this.successGetMainMarkets.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIban = this.handleChangeIban.bind(this);
        this.getAllRegions = this.getAllRegions.bind(this);
        this.getAllEnums = this.getAllEnums.bind(this);
    }

    componentDidMount() {
        this.getAllEnums();
        this.getAllRegions();
        this.getAllEnumtypes();
    }


    getAllEnums() {
        GetAllBankNames(this.successGetAllBankNames);

    }
    getAllRegions() {
        GetAllRegion(null, this.successGetAllRegionsByFilter)
    }

    successGetAllBankNames(response) {

        if (response.success) {
            this.setState({
                bank: {
                    name: "selectedBank",
                    field: "title",
                    label: "نام بانک",
                    list: response.result
                }
            });
        }



    }

    successGetAllRegionsByFilter(response) {
        if (response.success) {
            this.setState({
                region: {
                    name: "selectedRegion",
                    field: "title",
                    label: "نام شهر",
                    list: response.result
                }
            })

        }
    }

    getAllEnumtypes() {
        GetEnum("BankAccountType", this.successBankAccountType)
        GetMainMarket(this.successGetMainMarkets);
    }

    successBankAccountType(response) {
        if (response.success) {
            this.setState({
                account: {
                    name: "selectedAccount",
                    field: "title",
                    label: "نوع حساب",
                    list: response.result
                }
            })

        }
    }



    successGetMainMarkets(response) {
        if (response.success) {

            this.setState({
                mainMarket: {
                    name: "selectedMainMarkets",
                    field: "title",
                    label: "بازار",
                    list: response.result
                }
            })
        }
    }

    handleChange(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    }

    handleChangeCheck = (event, name) => {
        this.setState({
            [name]: event.target.checked
        })
    };

    handleChangeIban(value, isCorrect) {
        this.setState({
            iban: isCorrect ? value.value : null,
            isIbanCorrect: isCorrect
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={AddBankAccountService.saveBankDeposit}
                    entity={
                        {
                            bankId: this.state.selectedBank.codeId,
                            regionId: this.state.selectedRegion ? this.state.selectedRegion.id : null,
                            branchCode: this.state.branchCode,
                            branchName: this.state.branchName,
                            accountType: this.state.selectedAccount.code,
                            accountNumber: this.state.accountNumber,
                            iban: this.state.iban,
                            comment: this.state.comment,
                            maxDepositValue: this.state.maxDepositValue ? parseInt(this.state.maxDepositValue.replace(/,/g, '')) : '',
                            maxLoanPayment: this.state.maxLoanPayment ? parseInt(this.state.maxLoanPayment.replace(/,/g, '')) : '',
                            mainMarketIds: this.state.selectedMainMarkets.length > 0 ? this.state.selectedMainMarkets.map(s => { return s.id }) : [],
                            forCustomerDeposit: this.state.forCustomerDeposit,
                            forLoanUse: this.state.forLoanUse
                        }
                    }
                    disabled={this.state.selectedBank.codeId == 0 || this.state.accountNumber == '' || (this.state.forCustomerDeposit ? this.state.maxDepositValue == '' : false)
                        || (this.state.forLoanUse ? this.state.maxLoanPayment == '' : false) || this.state.selectedMainMarkets.length == 0 || !this.state.isIbanCorrect}
                    className="form-height"
                >
                    <Grid container spacing={8}>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <div className="k-rtl list-account-bank">
                                    <DropDownComponent {...this.state.bank}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedBank} required />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <ComboBoxComponent isFilterable {...this.state.region}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedRegion} />

                                {/* <div className="k-rtl list-account-bank">
                                    <DropDownComponent {...this.state.region}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedRegion} />
                                </div> */}
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <NumberFormatComponent id="branchCode" label="کد شعبه"
                                    value={this.state.branchCode}
                                    handleChange={(value) => this.handleChange(value, 'branchCode')} type="number" />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <Input label="نام شعبه" handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <div className="k-rtl list-account-bank">
                                    <DropDownComponent {...this.state.account}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.selectedAccount} required />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <Input label="شماره حساب" isLeftStartText={true} handleChange={(e) => this.handleChange(e, 'accountNumber')} value={this.state.accountNumber} required />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <IBAN handleChange={(value, isCorrect) => this.handleChangeIban(value, isCorrect)} value={this.state.iban} />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'comment')} value={this.state.comment} isMultiLine={true} />
                            </Grid>
                        </Grid>

                        <Grid item md={12}>
                            <Grid item md={5}>
                                <div className="k-rtl list-account-bank">
                                    <MultiSelectComponent {...this.state.mainMarket}
                                        handleChange={(value, name) => this.handleChange(value, name)} value={this.state.selectedMainMarkets} required />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.forCustomerDeposit}
                                        onChange={(e) => this.handleChangeCheck(e, 'forCustomerDeposit')}
                                        value="forCustomerDeposit"
                                        color="primary"
                                    />
                                }
                                label="جهت واریز مشتری"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.forLoanUse}
                                        onChange={(e) => this.handleChangeCheck(e, 'forLoanUse')}
                                        value="forLoanUse"
                                        color="primary"
                                    />
                                }
                                label="جهت تسهیلات کارگزاری"
                            />
                        </Grid>
                        {
                            this.state.forCustomerDeposit ?
                                <Grid item md={12}>
                                    <Grid item md={5}>
                                        <NumberFormatComponent id="maxDepositValue" label="حداکثر مبلغ قابل ثبت برای واریز وجه از پنل مشتری" required
                                            value={this.state.maxDepositValue}
                                            handleChange={(value) => this.handleChange(value, 'maxDepositValue')} type="number" isSeparator={true} />
                                    </Grid>
                                </Grid> : ''
                        }

                        {
                            this.state.forLoanUse ?
                                <Grid item md={12}>
                                    <Grid item md={5}>
                                        <NumberFormatComponent id="maxLoanPayment" label="حداکثر مبلغ قابل ثبت برای تسهیلات بانکی" required
                                            value={this.state.maxLoanPayment}
                                            handleChange={(value) => this.handleChange(value, 'maxLoanPayment')} type="number" isSeparator={true} />
                                    </Grid>
                                </Grid>
                                : ''
                        }
                    </Grid>
                </Form>
            </React.Fragment >
        )
    }
}
AddBankAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBankAccount);