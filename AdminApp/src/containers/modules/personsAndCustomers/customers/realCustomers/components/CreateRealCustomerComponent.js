import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from 'shared/components/formInput/inputForm'
import Email from 'shared/components/email/email'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Form from 'shared/components/form/form';
import AddRealCustomerService from '../services/CrateRealCustomerService';
import IBAN from 'shared/components/iban/textMask';
import PhoneNumber from 'shared/components/phoneNumber/phoneNumber';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';
import GetEnum from 'services/getEnum';
import GetAllBankNames from '../../../../../../services/getBanks';
import GetAllRegion from '../../../../../../services/getRegion';
import GetMainMarket from '../../../../../../services/GetMainMarkets';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import { initialState } from '../constants/CreateRealCustomerInitialstates';
import DropDownListDataProvider from '../../../../../../core/dropDownListDataProvider';
import getBankAccountUsages from "../../../../../../services/getBankAccountUsages";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import { connect } from "react-redux";

class AddRealCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.state.userInfo = this.props.userInfo;

        this.getAllEnumtypes = this.getAllEnumtypes.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIban = this.handleChangeIban.bind(this);
        this.handleBirthDate = this.handleBirthDate.bind(this);
        this.getAllRegistry = this.getAllRegistry.bind(this);
        this.successGetGender = this.successGetGender.bind(this);
        this.getBranchByFilter = this.getBranchByFilter.bind(this);
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
    }

    async componentDidMount() {
        this.getAllRegistry();
        this.getAllEnumtypes();
        this.getBranchByFilter();
        this.setState(this.getInitialState());
    }

    componentDidUpdate(preProps) {
        if (preProps.userInfo != this.props.userInfo) {
            this.setState({
                userInfo: this.props.userInfo
            });
        }
    }

    getInitialState() {
        let initState = JSON.parse(JSON.stringify(initialState));
        return initState;
    }

    getAllRegistry() {
        GetAllRegion(null, this.successGetAllRegionsByFilter);
    }
    successGetAllRegionsByFilter(response) {
        DropDownListDataProvider(this, "birthDatePlace", response);
        DropDownListDataProvider(this, "identityPlace", response);
        DropDownListDataProvider(this, "province", response);
        DropDownListDataProvider(this, "region", response);
    }
    getAllEnumtypes() {

        GetEnum("Gender", this.successGetGender);
        GetEnum("MaritalStatus", (response) => DropDownListDataProvider(this, "maritalStatus", response));
        GetEnum("BankAccountType", (response) => DropDownListDataProvider(this, "account", response));
        GetAllBankNames((response) => DropDownListDataProvider(this, "bank", response));
        GetMainMarket((response) => DropDownListDataProvider(this, "mainMarket", response));
        getBankAccountUsages((response) => DropDownListDataProvider(this, "bankAccountUsages", response))
    }

    /*eslint array-callback-return: "off"*/
    successGetGender(response) {
        if (response.success) {
            var list = []
            response.result.map(item => {
                if (item.code !== 0) {
                    list.push(item);
                }
            })
            this.setState({
                selectedGender: list[0],
                gender: {
                    name: "selectedGender",
                    field: "title",
                    label: "جنسیت",
                    type: "client",
                    list: list
                }
            })
        }
    }


    getBranchByFilter() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1

            }
        };
        GetBranchService.getBranchesByFilter(command, (response) => {
            if (response.success) {
                this.setState({
                    selectedBranch: response.result.filter(item => { return item.id === this.state.userInfo.branchId })[0],
                    branch: {
                        name: "selectedBranch",
                        field: "title",
                        label: "عنوان شعبه کارگزاری",
                        list: response.result
                    }
                })
            }

        });
    }

    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };

    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }

    handleBirthDate(value) {
        this.setState({
            birthDate: value
        })
    }


    refresh() {
        this.setState(this.getInitialState());
        this.getAllRegistry();
    }
    handleRepresentativeChange = (item) => {
        this.setState({
            selectedRepresentative: item.value,
        })
    };
    handleChangeIban(value, isCorrect) {
        this.setState({
            iban: value.value,
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
                    service={AddRealCustomerService.saveParty}
                    entity={
                        {
                            party: {
                                nationalId: this.state.nationalCode,
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,
                                fatherName: this.state.fatherName,
                                birthDate: this.state.birthDate,
                                identityCard: this.state.identityCard,
                                identitySerialLetter: this.state.selectedSerialLetter.text,
                                identitySerialShortNumber: this.state.identitySerialShortNumber,
                                identitySerialLongNumber: this.state.identitySerialLongNumber,
                                birthPlaceId: this.state.selectedBirthDatePlace.id ? this.state.selectedBirthDatePlace.id : null,
                                issuePlaceId: this.state.selectedIdentityPlace.id ? this.state.selectedIdentityPlace.id : null,
                                gender: this.state.selectedGender.code,
                                maritalStatus: this.state.selectedMaritalStatus.code,
                                branchId: this.state.selectedBranch ? this.state.selectedBranch.id : null,
                                partyType: 1,
                                // partyType: this.state.partyType,
                                representativeId: this.state.selectedRepresentative.id,
                                isForeignCustomer: this.state.isForeignCustomer
                            },
                            contact: {
                                upRegionId: this.state.selectedProvince.id ? this.state.selectedProvince.id : null,
                                regionId: this.state.selectedRegion.id ? this.state.selectedRegion.id : null,
                                postalCode: this.state.postalCode ? this.state.postalCode.replace(/-/g, '') : null,
                                mobile: this.state.mobile ? (this.state.mobile.length < 11 ? ("09" + this.state.mobile.replace(/ /g, '')) : this.state.mobile.replace(/ /g, '')) : null,
                                email1: this.state.email1,
                                addressType: 2000,
                                homePhone: this.state.homePhone,
                                preHomePhone: this.state.preHomePhone,
                                originalBusinessPhone: this.state.businessPhone,
                                preBusinessPhone: this.state.preBusinessPhone,
                                homeAddress: this.state.homeAddress,
                                businessAddress: this.state.businessAddress,

                            },
                            partyBankAccount: {
                                bankId: this.state.selectedBank.codeId,
                                branchCode: this.state.branchCode,
                                branchName: this.state.branchName,
                                accountType: this.state.selectedAccount.code,
                                accountNumber: this.state.accountNumber,
                                iban: this.state.iban,
                                bankAccountOwnerName: this.state.bankAccountOwnerName,
                                purchaseFromBank: this.state.purchaseFromBank,
                                // partyBankAccountUsages: this.state.partyBankAccountUsages
                            },
                            mainMarket: this.state.selectedMainMarkets.length > 0 ? this.state.selectedMainMarkets.map(s => { return s.id }) : []
                        }
                    }
                    disabled={this.state.firstName == '' || this.state.lastName == '' || this.state.nationalCode == '' ||
                        this.state.identityCard == '' || this.state.fatherName == '' || this.state.homeAddress == '' ||
                        this.state.mobile == '' || this.state.homePhone == '' || this.state.selectedBank.codeId == 0
                        || this.state.selectedAccount.code == 0 || this.state.accountNumber == '' || this.state.selectedBranch.id == 0 ||
                        this.state.selectedMainMarkets.length == 0 || this.state.birthDate == null || this.state.branch.id == 0 || !this.state.isIbanCorrect}
                    redirect={"/main/persons/customers/completeRegisterLegalCustomer"}
                    SubmitTitle={'ذخیره و تکمیل اطلاعات'}
                    otherAction={[
                        {
                            color: "#43a047",
                            title: 'ذخیره و ثبت مشتری جدید',
                            action: {
                                isSubmit: true,
                                method: this.refresh
                            }
                        }
                    ]}
                    className="form-height">
                    <Fieldset legend={'اطلاعات فردی'}>

                        <Grid container spacing={16} className="no-margin">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isForeignCustomer}
                                        onChange={this.handleChangeCheck('isForeignCustomer')}
                                        value="isForeignCustomer"
                                        color="primary"
                                    />
                                }
                                label="اتباع خارجی"
                            />
                            {
                                !this.state.isForeignCustomer ?

                                    <Grid item md={2}>
                                        <NationalCode id="nationalCode" label="کد ملی"
                                            value={this.state.nationalCode}
                                            handleChange={(value) => this.handleChange(value, 'nationalCode')} type="number" />
                                    </Grid> :

                                    <Grid item md={2}>
                                        <NumberFormatComponent id="nationalCode" label="کد اتباع خارجی"
                                            value={this.state.nationalCode}
                                            required
                                            format={'###############'}
                                            handleChange={(value) => this.handleChange(value, 'nationalCode')} type="number" />
                                    </Grid>
                            }

                            <Grid item md={2}>
                                <Input label="نام" handleChange={(e) => this.handleChange(e, 'firstName')} value={this.state.firstName} required />
                            </Grid>
                            <Grid item md={3} className="width-md-4">
                                <Input label="نام خانوادگی" handleChange={(e) => this.handleChange(e, 'lastName')} value={this.state.lastName} required />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام پدر" handleChange={(e) => this.handleChange(e, 'fatherName')} value={this.state.fatherName} required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <PersianDatePicker selectedDate={this.state.birthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} required />
                            </Grid>
                            <Grid item md={3}>
                                <Grid container spacing={16}>
                                    <Grid item md={7}>

                                        <div className="k-rtl">
                                            <DropDownComponent {...this.state.serialLetter}
                                                handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                                value={this.state.selectedSerialLetter} />
                                        </div>
                                    </Grid>
                                    <Grid item md={5}>
                                        <NumberFormatComponent id="identitySerialShortNumber" label="سری شناسنامه"
                                            value={this.state.identitySerialShortNumber}
                                            handleChange={(value, error) => this.handleChange(value, 'identitySerialShortNumber')} type="number" format={'##'} mask={'_'} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="identitySerialLongNumber" label="سریال شناسنامه"
                                    value={this.state.identitySerialLongNumber}
                                    handleChange={(value, error) => this.handleChange(value, 'identitySerialLongNumber')} type="number" format={'######'} mask={'_'} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="identityCard" label="شماره شناسنامه"
                                    value={this.state.identityCard}
                                    handleChange={(value, error) => this.handleChange(value, 'identityCard')} type="number" format={'##########'} required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <ComboBoxComponent isFilterable {...this.state.birthDatePlace}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedBirthDatePlace} />
                                {/* <div className="k-rtl">
                                    <DropDownComponent {...this.state.birthDatePlace}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedBirthDatePlace} />
                                </div> */}
                            </Grid>
                            <Grid item md={2}>
                                <ComboBoxComponent isFilterable {...this.state.identityPlace}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedIdentityPlace} />
                                {/* <div className="k-rtl">
                                    <DropDownComponent {...this.state.identityPlace}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedIdentityPlace} />
                                </div> */}
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.gender}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                        value={this.state.selectedGender} />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.maritalStatus}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                        value={this.state.selectedMaritalStatus} />
                                </div>
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات تماس'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <ComboBoxComponent isFilterable {...this.state.province}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedProvince} />
                                {/* <div className="k-rtl">
                                    <DropDownComponent {...this.state.province}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedProvince} />
                                </div> */}
                            </Grid>
                            <Grid item md={2}>
                                <ComboBoxComponent isFilterable {...this.state.region}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedRegion} />
                                {/* <div className="k-rtl">
                                    <DropDownComponent {...this.state.region}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedRegion} />
                                </div> */}
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={5}>
                                <Input label="نشانی منزل" handleChange={(e) => this.handleChange(e, 'homeAddress')} value={this.state.homeAddress} required />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="postalCode" label="کد پستی"
                                    value={this.state.postalCode}
                                    handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" format={'#####-#####'} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="homePhone" label="تلفن منزل"
                                    value={this.state.homePhone}
                                    handleChange={(value, error) => this.handleChange(value, 'homePhone')} type="number" format={'########'} required />
                            </Grid>
                            <span className="margin-top-25">ـ</span>
                            <Grid item md={1}>
                                <NumberFormatComponent id="phoneCode" label="پیش شماره"
                                    value={this.state.preHomePhone}
                                    handleChange={(value, error) => this.handleChange(value, 'preHomePhone')} type="number" format={'#####'} />
                            </Grid>
                            <Grid item md={3}>
                                <PhoneNumber
                                require={true}
                                id="mobile" label="شماره همراه"
                                            value={this.state.mobile}
                                            handleChange={(value) => this.handleChange(value, 'mobile')} type="number"
                               />
                            </Grid>

                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={5}>
                                <Input label="نشانی محل کار" handleChange={(e) => this.handleChange(e, 'businessAddress')} value={this.state.businessAddress} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="homePhone" label="تلفن محل کار"
                                    value={this.state.businessPhone}
                                    handleChange={(value, error) => this.handleChange(value, 'businessPhone')} type="number" format={'########'} />
                            </Grid>
                            <span className="margin-top-25">ـ</span>
                            <Grid item md={1}>
                                <NumberFormatComponent id="phoneCode" label="پیش شماره"
                                    value={this.state.preBusinessPhone}
                                    handleChange={(value, error) => this.handleChange(value, 'preBusinessPhone')} type="number" />
                            </Grid>

                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <Email handleChange={(e) => this.handleChange(e, 'email1')} value={this.state.email1} isLeftStartText={true} />
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات بانکی'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>

                                <DropDownComponent {...this.state.bank}
                                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedBank} required />

                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="branchCode" label="کد شعبه"
                                    value={this.state.branchCode}
                                    handleChange={(value) => this.handleChange(value, 'branchCode')} type="number" />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام شعبه" handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.account}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.selectedAccount} required />
                                </div>
                            </Grid>



                        </Grid>

                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <Input label="شماره حساب" isLeftStartText={true} handleChange={(e) => this.handleChange(e, 'accountNumber')} value={this.state.accountNumber} required />
                            </Grid>
                            <Grid item md={3}>
                                <IBAN handleChange={(value, isCorrect) => this.handleChangeIban(value, isCorrect)} value={this.state.iban} />
                            </Grid>
                            <Grid item md={3}>
                                <Input label="نام صاحب حساب" handleChange={(e) => this.handleChange(e, 'bankAccountOwnerName')} value={this.state.bankAccountOwnerName} />
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.purchaseFromBank}
                                        onChange={this.handleChangeCheck('purchaseFromBank')}
                                        value="purchaseFromBank"
                                        color="primary"
                                    />
                                }
                                label="خرید از محل بانک"
                            />
                        </Grid>
                    </Fieldset>
                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={2}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.branch}
                                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                    value={this.state.selectedBranch} required />
                            </div>
                        </Grid>
                        <Grid item md={4}>
                            <div className="k-rtl">
                                <MultiSelectComponent {...this.state.mainMarket}
                                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedMainMarkets}
                                    required />
                            </div>
                        </Grid>

                    </Grid>
                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={10}>
                            <AutoCompleteComponent
                                {...this.state.representative}
                                handleChange={(value) => this.handleRepresentativeChange(value)}
                                service={GetPartiesService.getAllRepresentativeForSearch}
                                value={this.state.selectedRepresentative.fullName}
                            />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment >
        )
    }
}

AddRealCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddRealCustomer));
