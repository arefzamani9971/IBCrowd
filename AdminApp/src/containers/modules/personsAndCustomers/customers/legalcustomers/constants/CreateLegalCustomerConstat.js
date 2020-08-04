import moment from "moment";
import { customerTemplateForRepresentativeAutoComplete, customerHeaderTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate'
export const initialState = {
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
        list: [],
    },
    bank: {
        name: "selectedBank",
        field: "title",
        label: "نام بانک",
        list: [],
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
    selectedRegisterPlace: {},
    selectedAccount: { code: 0 },
    selectedProvince: {},
    selectedRegion: {},
    selectedBank: { codeId: 0 },
    selectedBranch: { id: 0 },
    selectedMainMarkets: [],


    // bankAccountUsages: {
    //     name:"partyBankAccountUsages",
    //     field:'title',
    //     list:[],
    //     label:"مورد استفاده بانک"
    // },
    // partyBankAccountUsages: {},

    phone: '',
    prePhone: '',
    address: '',

    partyAddressType: {
        name: "selectedPartyAddressType",
        field: "title",
        label: "نوع نشانی",
        list: []
    },
    selectedPartyAddressType: { code: 0 },



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
    isForeignCustomer : false
};
