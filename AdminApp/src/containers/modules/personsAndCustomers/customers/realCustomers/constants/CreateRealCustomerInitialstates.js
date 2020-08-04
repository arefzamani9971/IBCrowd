import serials from 'constants/serial';
import { customerTemplateForRepresentativeAutoComplete, customerHeaderTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate'
export const initialState = {
    nationalCode: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    postalCode: '',
    phoneCode: '',
    mobile: '',
    email1: '',
    branchCode: '',
    branchName: '',
    accountNumber: '',
    iban: '',
    bankAccountOwnerName: '',
    birthDate: null,
    selectedSerialLetter: {},
    purchaseFromBank: false,
    serialLetter: {
        name: "selectedSerialLetter",
        field: "text",
        label: "حروف سری شناسنامه",
        type: "client",
        list: serials
    },
    identityCard: '',
    identitySerialLongNumber: '',
    identitySerialShortNumber: '',

    birthDatePlace: {
        name: "selectedBirthDatePlace",
        field: "title",
        label: "محل تولد",
        list: []
    },
    identityPlace: {
        name: "selectedIdentityPlace",
        field: "title",
        label: "محل صدور شناسنامه",
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
    // bankAccountUsages: {
    //     name:"partyBankAccountUsages",
    //     field:'title',
    //     list:[],
    //     label:"مورد استفاده بانک"
    // },
    // partyBankAccountUsages: {},
    mainMarket: {
        name: "selectedMainMarkets",
        field: 'title',
        list: [],
        label: "بازار"
    },
    gender: {
        name: "selectedGender",
        field: "title",
        label: "جنسیت",
        list: []
    },
    maritalStatus: {
        name: "selectedMaritalStatus",
        field: "title",
        label: "وضعیت تاهل",
        list: []
    },

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
    branch: {
        name: "selectedBranch",
        field: "title",
        label: "عنوان شعبه کارگزاری",
        list: []
    },
    selectedBirthDatePlace: {},
    selectedIdentityPlace: {},
    selectedGender: {},
    selectedMaritalStatus: {},
    selectedAccount: {},
    selectedProvince: {},
    selectedRegion: {},
    selectedBank: {},
    selectedBranch: {},
    selectedMainMarkets: [],

    homePhone: '',
    preHomePhone: '',
    businessPhone: '',
    preBusinessPhone: '',

    homeAddress: '',
    businessAddress: '',

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
    userInfo: {},
    isIbanCorrect : true,
    isForeignCustomer:false
};