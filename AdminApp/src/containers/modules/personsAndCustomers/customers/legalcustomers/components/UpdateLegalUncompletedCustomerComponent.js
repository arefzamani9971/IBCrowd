import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Input from 'shared/components/formInput/inputForm'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Form from 'shared/components/form/form';
import EditRealCustomerService from '../../realCustomers/services/UpdateRealCustomerService';
import IBAN from 'shared/components/iban/textMask';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';
import Email from 'shared/components/email/email';
import GetEnum from 'services/getEnum';
import PhoneNumber from 'shared/components/phoneNumber/phoneNumber';
import GetAllBankNames from 'services/getBanks';
import GetAllRegion from 'services/getRegion';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import { customerTemplateForRepresentativeAutoComplete, customerHeaderTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate'
import GetPartiesService from '../../customersList/services/GetPartiesService';
import UpdateUncompletedPartyService from '../../realCustomers/services/UpdateUncompletedPartyService';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
const initialState = {
    registerNumber: '',
    nationalId: '',
    ecomomicCode: '',
    name: '',
    postalCode: null,
    phoneCode: '',
    businessPhone: '',
    businessAddress: '',
    mobile: null,
    email1: null,
    webPage: null,
    branchCode: '',
    branchName: '',
    accountNumber: '',
    iban: null,
    bankAccountOwnerName: '',
    registerDate: null,
    purchaseFromBank: false,
    registerPlace: {
        name: "selectedRegisterPlace",
        field: "title",
        label: "محل ثبت",
        list: []
    },
    mainMarket: {
        name: "selectedMainMarkets",
        field: "title",
        label: "بازار",
        list: []
    },
    bank: {
        name: "selectedBank",
        field: "title",
        label: "نام بانک",
        list: []
    },
    province: {
        name: "selectedProvince",
        field: "title",
        label: "استان",
        list: []
    },
    region: {
        name: "selectedRegion",
        field: "title",
        label: "شهر",
        list: []
    },
    account: {
        name: "selectedAccount",
        field: "title",
        label: "نوع حساب",
        list: []
    },
    branch: {
        name: "selectedBranch",
        field: "title",
        label: "عنوان شعبه کارگزاری",
        list: []
    },
    selectedRegisterPlace: { title: '', id: 0 },
    selectedAccount: {},
    selectedProvince: { title: '', id: 0 },
    selectedRegion: { title: '', id: 0 },
    selectedBank: {},
    selectedBranch: {},
    selectedMainMarkets: {},

    partyAddressType: {
        name: "selectedPartyAddressType",
        field: "title",
        label: "نوع نشانی",
        list: []
    },
    selectedPartyAddressType: {},
    AddressTypeId: '',

    partyInfo: {
        party: {
            id: '',
        },
        contact: {
            id: '',
        },
        partyBankAccount: {
            id: '',
        }
    },
    phone: '',
    prePhone: '',
    address: '',
    addressLabelValue: 'نشانی',
    phoneLabelValue: 'تلفن',
    representative: {
        name: "selectedRepresentative",
        field: "fullName",
        placeholder: "جستجوی معرف بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر و شماره تفصیل",
        list: [],
        template: customerTemplateForRepresentativeAutoComplete,
        headerTemplate: customerHeaderTemplateForRepresentativeAutoComplete,
        label: 'نام و نام خانوادگی معرف'

    },
    selectedRepresentative: { fullName: '', id: 0 },
    isIbanCorrect: true,
    isForeignCustomer: false

};

class UpdateLegalUncompletedCustomerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
        this.successGetCustomerById = this.successGetCustomerById.bind(this);
        this.successBankAccountType = this.successBankAccountType.bind(this);
        this.successGetAllBankNames = this.successGetAllBankNames.bind(this);
        this.successGetBranchesByFilter = this.successGetBranchesByFilter.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIban = this.handleChangeIban.bind(this);
        this.handleRegisterDate = this.handleRegisterDate.bind(this);
        this.getAllRegistry = this.getAllRegistry.bind(this);
        this.getBranchByFilter = this.getBranchByFilter.bind(this);
    }

    /*eslint array-callback-return: "off"*/
    async componentDidMount() {

        this.getCustomerById();
        this.setState(this.getInitialState());
        GetEnum('partyaddresstype', (response) => { DropDownListDataProvider(this, "partyAddressType", response); });
    }

    getInitialState() {
        let initState = JSON.parse(JSON.stringify(initialState));
        return initState;
    }

    getCustomerById = () => {

        if (this.props.location.state && this.props.location.state.partyId) {
            var command = {
                entity: this.props.location.state.partyId
            }
            EditRealCustomerService.getCustomerById(command, this.successGetCustomerById);
        } else {
            this.props.history.push(this.props.back.path);
        }
    }

    successGetCustomerById(response) {
        if (response.success) {
            var res = response.result;
            this.setState({
                partyInfo: res,
                nationalId: res.party.nationalId,
                name: res.party.name,
                ecomomicCode: res.party.ecomomicCode,
                registerNumber: res.party.registerNumber,
                registerDate: res.party.registerDateJalali != '' ? res.party.registerDate : null,
                postalCode: res.contact.postalCode,
                businessPhone: res.contact.businessPhone,
                mobile: res.contact.mobile != null ? res.contact.mobile.slice(2) : res.contact.mobile,
                email1: res.contact.email1,
                webPage: res.contact.webPage,
                businessAddress: res.contact.businessAddress,
                branchCode: res.partyBankAccount.branchCode,
                branchName: res.partyBankAccount.branchName,
                accountNumber: res.partyBankAccount.accountNumber,
                bankAccountOwnerName: res.partyBankAccount.bankAccountOwnerName,
                purchaseFromBank: res.partyBankAccount.purchaseFromBank,
                iban: res.partyBankAccount.iban,
                AddressTypeId: res.contact.addressType,
                phone: res.contact.phone,
                prePhone: res.contact.prePhone,
                address: res.contact.address,
                selectedRepresentative: {
                    fullName: res.party.representativeName,
                    id: res.party.representativeId
                },
                isForeignCustomer: res.party.isForeignCustomer
            }, function () {
                this.getAllRegistry();
                this.getAllEnumtypes();
                this.getBranchByFilter();
                GetEnum('partyaddresstype', (response) => {

                    for (let i = 0; i < response.result.length; i++) {
                        if (response.result[i].code === this.state.AddressTypeId) {
                            this.setState({
                                selectedPartyAddressType: response.result[i]
                            })
                        }
                    }
                });

            });
        };
    }

    getAllRegistry() {
        GetAllRegion(null, this.successGetAllRegionsByFilter);
    }
    successGetAllRegionsByFilter(response) {
        if (response.success) {
            response.result.map(item => {
                if (item.id === this.state.partyInfo.party.registerPlaceId) {
                    this.setState({
                        selectedRegisterPlace: item,
                    })
                }
                if (item.id === this.state.partyInfo.contact.regionId) {
                    this.setState({
                        selectedRegion: item,
                    })
                }
                if (item.id === this.state.partyInfo.contact.upRegionId) {
                    this.setState({
                        selectedProvince: item,
                    })
                }
            })
            this.setState({
                registerPlace: {
                    name: "selectedRegisterPlace",
                    field: "title",
                    label: "محل ثبت",
                    list: response.result
                },
            })
            this.setState({
                region: {
                    name: "selectedRegion",
                    field: "title",
                    label: "شهر",
                    type: "client",
                    list: response.result
                }
            })
            this.setState({
                province: {
                    name: "selectedProvince",
                    field: "title",
                    label: "استان",
                    type: "client",
                    list: response.result
                }
            })

        }
    }
    getAllEnumtypes() {
        GetEnum("BankAccountType", this.successBankAccountType);
        GetAllBankNames(this.successGetAllBankNames);
    }

    successBankAccountType(response) {
        if (response.success) {
            response.result.map(item => {
                if (item.code === this.state.partyInfo.partyBankAccount.accountType) {
                    this.setState({
                        selectedAccount: item,
                    })
                }
            })
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


    successGetAllBankNames(response) {
        if (response.success) {
            response.result.map(item => {
                if (item.codeId === this.state.partyInfo.partyBankAccount.bankId) {
                    this.setState({
                        selectedBank: item,
                    });
                }
            })

            this.setState({
                bank: {
                    name: "selectedBank",
                    field: "title",
                    label: "نام بانک",
                    type: "client",
                    list: response.result
                }
            });

        }
    }

    getBranchByFilter() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1

            }
        };
        GetBranchService.getBranchesByFilter(command, this.successGetBranchesByFilter)
    }
    successGetBranchesByFilter(response) {
        if (response.success) {
            response.result.map(item => {
                if (item.id === this.state.partyInfo.party.branchId) {
                    this.setState({
                        selectedBranch: item,
                    });
                }
            });
            this.setState({
                branch: {
                    name: "selectedBranch",
                    field: "title",
                    label: "عنوان شعبه کارگزاری",
                    type: "client",
                    list: response.result
                }
            });


        }
    }

    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })

    };

    handleChange(event, name) {
        if (name === 'selectedPartyAddressType') {
            let addressLabel = `  نشانی ${event.value.title} `;
            let phoneLabel = `  تلفن ${event.value.title} `;
            this.setState({
                [name]: event.value,
                addressLabelValue: addressLabel,
                phoneLabelValue: phoneLabel,
            });
        } else {
            this.setState({
                [name]: event.value,
            })
        }
    }
    handleRegisterDate(value) {
        this.setState({
            registerDate: value
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
            iban: isCorrect ? value.value : null,
            isIbanCorrect: isCorrect
        })
    }

    render() {
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={UpdateUncompletedPartyService.updatepartyforuncompletedpartyMethod}
                    entity={
                        {
                            party: {
                                id: this.state.partyInfo.party.id,
                                nationalId: this.state.nationalId,
                                name: this.state.name,
                                registerNumber: this.state.registerNumber,
                                registerDate: this.state.registerDate,
                                ecomomicCode: this.state.ecomomicCode,
                                registerPlaceId: this.state.selectedRegisterPlace.id ? this.state.selectedRegisterPlace.id : null,
                                branchId: this.state.selectedBranch.id,
                                partyType: 2,
                                representativeId: this.state.selectedRepresentative.id,
                                isForeignCustomer: this.state.isForeignCustomer
                            },
                            contact: {
                                id: this.state.partyInfo.contact.id,
                                partyId: this.state.partyInfo.party.id,
                                upRegionId: this.state.selectedProvince.id ? this.state.selectedProvince.id : null,
                                regionId: this.state.selectedRegion.id ? this.state.selectedRegion.id : null,
                                postalCode: this.state.postalCode ? this.state.postalCode.replace(/-/g, '') : null,
                                businessPhone: this.state.phoneCode + this.state.businessPhone,
                                mobile: this.state.mobile ? (this.state.mobile.length < 11 ? ("09" + this.state.mobile.replace(/ /g, '')) : this.state.mobile.replace(/ /g, '')) : null,
                                email1: this.state.email1,
                                webPage: this.state.webPage,
                                businessAddress: this.state.businessAddress,
                                addressType: this.state.selectedPartyAddressType.code,
                                originalPhone: this.state.phone,
                                prePhone: this.state.prePhone,
                                address: this.state.address,
                            },
                            partyBankAccount: {
                                id: this.state.partyInfo.partyBankAccount.id,
                                partyId: this.state.partyInfo.party.id,
                                bankId: this.state.selectedBank.codeId,
                                branchCode: this.state.branchCode,
                                branchName: this.state.branchName,
                                accountType: this.state.selectedAccount.code,
                                accountNumber: this.state.accountNumber,
                                iban: this.state.iban,
                                bankAccountOwnerName: this.state.bankAccountOwnerName,
                                purchaseFromBank: this.state.purchaseFromBank
                            }
                        }
                    }
                    SubmitTitle={'ذخیره'}
                    disabled={this.state.name == '' || this.state.name == null || (this.state.isForeignCustomer ? false : this.state.nationalId == '') ||
                        this.state.selectedPartyAddressType.code === 0 ||
                        this.state.address == '' || this.state.address == null || this.state.phone == '' || this.state.phone == null ||
                        this.state.selectedBank.codeId == 0
                        || this.state.selectedAccount.code == 0 || this.state.accountNumber == '' || this.state.accountNumber == null ||
                        this.state.selectedBranch.id == 0 ||
                        this.state.mainMarket.length == 0 || !this.state.isIbanCorrect}
                    className="form-height">
                    <Fieldset legend={'اطلاعات مشتری'}>

                        <Grid container spacing={16} className="no-margin">

                            <Grid item md={5}>
                                <Input label="نام شرکت" handleChange={(e) => this.handleChange(e, 'name')} value={this.state.name} required />
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isForeignCustomer}
                                        onChange={this.handleChangeCheck('isForeignCustomer')}
                                        value="isForeignCustomer"
                                        color="primary"
                                        disabled
                                    />
                                }
                                label="اتباع خارجی"
                            />
                            {
                                !this.state.isForeignCustomer ?

                                    <Grid item md={2}>
                                        <NumberFormatComponent id="nationalId"
                                            label="شناسه ملی"
                                            value={this.state.nationalId}
                                            handleChange={(value, error) => this.handleChange(value, 'nationalId')}
                                            type="number"
                                            format={'###########'}
                                            required
                                            disabled />
                                    </Grid> :

                                    <Grid item md={2}>
                                        <NumberFormatComponent label="شماره گذرنامه"
                                            value={this.state.nationalId}
                                            format={'###############'}
                                            handleChange={(value) => this.handleChange(value, 'nationalId')} type="number" />
                                    </Grid>
                            }

                            <Grid item md={2}>
                                <NumberFormatComponent id="ecomomicCode" label="شماره اقتصادی"
                                    value={this.state.ecomomicCode}
                                    handleChange={(value, error) => this.handleChange(value, 'ecomomicCode')} type="number" format={'##############'} />
                            </Grid>

                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="registerNumber" label="شماره ثبت"
                                    value={this.state.registerNumber}
                                    handleChange={(value, error) => this.handleChange(value, 'registerNumber')} type="number" format={'###########'} mask={'_'} />
                            </Grid>
                            <Grid item md={2}>
                                <ComboBoxComponent isFilterable {...this.state.registerPlace}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedRegisterPlace} />
                                {/* <div className="k-rtl">
                                    <DropDownComponent {...this.state.registerPlace}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedRegisterPlace} />
                                </div> */}
                            </Grid>
                            <Grid item md={2}>

                                <PersianDatePicker label="تاریخ ثبت" handleOnChange={this.handleRegisterDate} selectedDate={this.state.registerDate} />
                            </Grid>


                        </Grid>

                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات تماس'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.partyAddressType}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                        value={this.state.selectedPartyAddressType}
                                        required />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <ComboBoxComponent isFilterable {...this.state.province}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedProvince} />
                                {/* <div className="k-rtl">
                                    <DropDownComponent {...this.state.province}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="province" isFilterable={true}
                                        value={this.state.selectedProvince} />
                                </div> */}
                            </Grid>
                            <Grid item md={2}>
                                <ComboBoxComponent isFilterable {...this.state.region}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedRegion} />
                                {/* <div className="k-rtl">
                                    <DropDownComponent {...this.state.region}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="region" isFilterable={true}
                                        value={this.state.selectedRegion} />
                                </div> */}
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={8}>
                                <Input label={this.state.addressLabelValue} handleChange={(e) => this.handleChange(e, 'address')} value={this.state.address} required />
                            </Grid>

                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="postalCode" label="کد پستی"
                                    value={this.state.postalCode}
                                    handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" format={'#####-#####'} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent label={this.state.phoneLabelValue}
                                    value={this.state.phone}
                                    handleChange={(value, error) => this.handleChange(value, 'phone')} type="number" format={'########'} required />
                            </Grid>
                            <span className="margin-top-25">ـ</span>
                            <Grid item md={1}>
                                <NumberFormatComponent id="phoneCode" label="پیش شماره"
                                    value={this.state.prePhone}
                                    handleChange={(value, error) => this.handleChange(value, 'prePhone')} type="number" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <PhoneNumber
                                    require={false}
                                    id="mobile" label="شماره همراه"
                                    value={this.state.mobile}
                                    handleChange={(value) => this.handleChange(value, 'mobile')} type="number"
                                />
                            </Grid>
                            <Grid item md={3}>
                                <Email handleChange={(e) => this.handleChange(e, 'email1')} value={this.state.email1} isLeftStartText={true} />
                            </Grid>
                            <Grid item md={3}>
                                <Input label="وب سایت" handleChange={(e) => this.handleChange(e, 'webPage')} value={this.state.webPage} isLeftStartText={true} />
                            </Grid>
                        </Grid>

                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات بانکی'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.bank}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="bank" isFilterable={true} value={this.state.selectedBank} required />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="branchCode" label="کد شعبه"
                                    value={this.state.branchCode}
                                    handleChange={(value) => this.handleChange(value, 'branchCode')} type="number" />
                            </Grid>
                            <Grid item md={3}>
                                <Input label="نام شعبه" handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.account}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="account" isFilterable={false} value={this.state.selectedAccount} required />
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
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.branch}
                                    handleChange={(value, name) => this.handleChange(value, name)} nameFeild="branch" isFilterable={true}
                                    value={this.state.selectedBranch} required />
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

UpdateLegalUncompletedCustomerComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateLegalUncompletedCustomerComponent);