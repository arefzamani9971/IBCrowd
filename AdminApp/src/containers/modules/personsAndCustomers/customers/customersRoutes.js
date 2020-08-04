import AddRealCustomer from './realCustomers/components/CreateRealCustomerComponent';
import AddLegalCustomer from './legalcustomers/components/CreateLegalCustomerComponent';
import CompleteForm from './realCustomers/components/CompleteFormComponent';
import GetPartyBankAccounts from './bankAccounts/components/GetPartyBankAccountsComponent';
import GetParties from './customersList/components/GetPartiesComponent'
import EditRealCustomer from './realCustomers/components/UpdateRealCustomerComponent';
import EditLegalCustomer from './legalcustomers/components/UpdateLegalCustomerComponent';
import GetCustomersRelationComponent from "./customersRelation/components/GetCustomersRelationComponent";
import CreateCustomersRelationComponent from "./customersRelation/components/CreateCustomersRelationComponent";
import GetCustomersTradingCodesComponent from './customerTradingCodes/components/GetCustomersTradingCodesComponent';
import CreateCustomersTradingCodesComponent from './customerTradingCodes/components/CreateCustomersTradingCodesComponent';
import EditCustomersTradingCodesComponent from './customerTradingCodes/components/UpdateCustomersTradingCodesComponent';
import CreatePartyBankAccounts from './bankAccounts/components/AddPartyBankAccountsComponent';
import UpdatePartyBankAccounts from "./bankAccounts/components/UpdatePartyBankAccountsComponent";
import GetManagedCustomerContactComponent from "./managedCustomerContact/components/GetManagedCustomerContactComponent";
import CreateManagedCustomerContactComponent from "./managedCustomerContact/components/CreateManagedCustomerContactComponent";
import UpdateManagedCustomerContactComponent from "./managedCustomerContact/components/UpdateManagedCustomerContactComponent";
import GetManageCustomerRecordsComponent from "./manageCustomerRecords/component/GetManageCustomerRecordsComponent";
import AddManageCustomerRecordsComponent from "./manageCustomerRecords/component/AddManageCustomerRecordsComponent";
import GetPartyRoleComponent from './partyRole/components/GetPartyRoleComponent';
import CreatePartyRoleComponent from './partyRole/components/CreatePartyRoleComponent';
import UpdatePartyRoleComponent from "./partyRole/components/UpdatePartyRoleComponent";
import GetCustomerAccountBook from './accountBook/components/GetCustomerAccountBookComponent';


import CreatePersonManagementComponent from './personManagement/components/CreatePersonManagementComponent';
// import ServiceOfRealCustomerComponent from './realCustomers/components/ServiceOfRealCustomerComponent';
import AddCustomerServiceComponent from '../partyService/customersSerivceList/components/AddCustomerServiceComponent';
import CreateServiceOfRealCustomerComponentTab from './realCustomers/components/CreateServiceOfRealCustomerComponentTab';
import CreateCustomerContactComponentTab from './realCustomers/components/CreateCustomerContactComponentTab';
import EditCsutomerContactComponentTab from './realCustomers/components/EditCsutomerContactComponentTab';
import CreatePartyBankAccountsComponentTab from './realCustomers/components/CreatePartyBankAccountsComponentTab';
import EditPartyBankAccountsComponentTab from './realCustomers/components/EditPartyBankAccountsComponentTab';
import CompleteFormComponentLegal from './legalcustomers/components/CompleteFormComponentLegal';
import CreateServiceOfLegalCustomerComponentTab from './legalcustomers/components/CreateServiceOfLegalCustomerComponentTab';
import CreateLegalCustomerContactComponentTab from './legalcustomers/components/CreateLegalCustomerContactComponentTab';
import EditLegalCsutomerContactComponentTab from './legalcustomers/components/EditLegalCsutomerContactComponentTab';
import CreateLegalPartyBankAccountsComponentTab from './legalcustomers/components/CreateLegalPartyBankAccountsComponentTab';
import EditLegalPartyBankAccountsComponentTab from './legalcustomers/components/EditLegalPartyBankAccountsComponentTab';
import UpdateUncompletedCustomerComponent from './realCustomers/components/UpdateUncompletedCustomerComponent';
import UpdateLegalUncompletedCustomerComponent from './legalcustomers/components/UpdateLegalUncompletedCustomerComponent';
import GetIncompletePartyListComponent from '../partyReports/incompletePartyList/components/GetIncompletePartyListComponent';
import CreateCustomersTradingCodesComponentTab from './realCustomers/components/CreateCustomersTradingCodesComponentTab';
import EditCustomersTradingCodesComponentTab from './realCustomers/components/EditCustomersTradingCodesComponentTab';
import CreateLegalCustomersTradingCodesComponentTab from './legalcustomers/components/CreateLegalCustomersTradingCodesComponentTab';
import EditLegalCustomersTradingCodesComponentTab from './legalcustomers/components/EditLegalCustomersTradingCodesComponentTab';
const route = {
    AddRealCustomer: {
        component: AddRealCustomer,
        title: "ثبت مشتری حقیقی",
        path: "/main/persons/customers/addRealCustomer",
        get back() { return route.GetParties },
        icon: 'fas fa-user-plus'
    },
    AddLegalCustomer: {
        component: AddLegalCustomer,
        title: "ثبت مشتری حقوقی",
        path: "/main/persons/customers/addLegalCustomer",
        get back() { return route.GetParties },
        icon: 'fas fa-building'
    },
    EditRealCustomer: {
        component: EditRealCustomer,
        title: "ویرایش مشتری حقیقی",
        path: "/main/persons/customers/editRealCustomer",
        get back() { return route.GetParties },
        icon: 'fas fa-edit'
    },
    EditLegalCustomer: {
        component: EditLegalCustomer,
        title: "ویرایش مشتری حقوقی",
        path: "/main/persons/customers/editLegalCustomer",
        get back() { return route.GetParties },
        icon: 'fas fa-edit'
    },


    // UpdateUnCompletedParty:{
    //     component: UpdateUncompletedCustomerComponent,
    //     title: 'ویراش مشتریان حقیقی ناقص',
    //     path: '/main/persons/customers/updateUncompletedParty',
    //     icon:'fas fa-edit',
    //     add: null,
    //     get back(){return route.GetIncompletePartyList},
    // },
    // UpdateLegalUnCompletedParty:{
    //     component: UpdateLegalUncompletedCustomerComponent,
    //     title: 'ویراش مشتریان حقوقی ناقص',
    //     path: '/main/persons/customers/updateLegalUncompletedParty',
    //     icon:'fas fa-edit',
    //     add: null,
    //     get back(){return route.GetIncompletePartyList},
    // },





    // تب تکمیل مشتری حقیقی

    // CompleteForm: {
    //     component: CompleteForm,
    //     // title: "تکمیل ثبت نام مشتری حقیقی",
    //     path: "/main/persons/customers/completeRegisterRealCustomer",

        // get back() { return route.GetParties },
        // get addInGridService() { return route.AddCustomersService },
        // get addInGridCustomerContact() { return route.AddCustomerContact },
        // get editInGridCustomerContact() { return route.EditCustomerContact },
        // get addInGridPartyBankAccount() { return route.AddPartyBankAccounts },
        // get editInGridPartyBankAccount() { return route.EditPartyBankAccounts },
        // get addInGridPartyTradingCode() { return route.AddPartyTradingCode },
        // get editInGridPartyTradingCode() { return route.EditPartyTradingCode },       
    //     icon: 'fas fa-building'
    // },


    // AddPartyTradingCode: {
    //     component: CreateCustomersTradingCodesComponentTab,
    //     title: "افزودن کدهای معاملاتی مشتری",
    //     path: "/main/persons/customers/createCustomersTradingCodesComponentTab",
    //     get back() { return route.CompleteForm },
    //     icon: 'fa fa-plus'
    // },
    // EditPartyTradingCode: {
    //     component: EditCustomersTradingCodesComponentTab,
    //     title: "ویرایش کدهای معاملاتی مشتری",
    //     path: "/main/persons/customers/editCustomersTradingCodesComponentTab",
    //     get back() { return route.CompleteForm },
    //     icon: 'fa fa-edit'
    // },

    // AddCustomersService: {
    //     component: CreateServiceOfRealCustomerComponentTab,
    //     title: "افزودن خدمات مشتریان",
    //     path: "/main/persons/customers/createServiceOfRealCustomerComponentTab",
    //     get back() { return route.CompleteForm },
    //     icon: 'fa fa-plus'
    // },
    // AddCustomerContact: {
    //     component: CreateCustomerContactComponentTab,
    //     title: "افزودن تماس با مشتری",
    //     path: "/main/persons/customers/createCustomerContactComponentTab",
    //     get back() { return route.CompleteForm },
    //     icon: 'fa fa-plus'
    // },
    // EditCustomerContact: {
    //     component: EditCsutomerContactComponentTab,
    //     title: "ویرایش تماس با مشتری",
    //     path: "/main/persons/customers/editCustomerContactComponentTab",
    //     get back() { return route.CompleteForm },
    //     icon: 'fa fa-edit'
    // },
    // AddPartyBankAccounts: {
    //     component: CreatePartyBankAccountsComponentTab,
    //     title: "افزودن حساب بانکی مشتری",
    //     path: "/main/persons/customers/createPartyBankAccountsComponentTab",
    //     get back() { return route.CompleteForm },
    //     icon: 'fa fa-plus'
    // },
    // EditPartyBankAccounts: {
    //     component: EditPartyBankAccountsComponentTab,
    //     title: "ویرایش حساب بانکی مشتری",
    //     path: "/main/persons/customers/editPartyBankAccountsComponentTab",
    //     get back() { return route.CompleteForm },
    //     icon: 'fa fa-edit'
    // },

    // تب تکمیل مشتری حقیقی





    // تب تکمیل مشتری حقوقی
    CompleteFormLegal: {
        component: CompleteFormComponentLegal,

        // title: "تکمیل ثبت نام مشتری حقوقی",
        path: "/main/persons/customers/completeRegisterLegalCustomer",
        get back() { return route.GetParties },
        get addInGridService() { return route.AddCustomersService },
        get addInGridCustomerContact() { return route.AddCustomerContact },
        get editInGridCustomerContact() { return route.EditCustomerContact },
        get addInGridPartyBankAccount() { return route.AddPartyBankAccounts },
        get editInGridPartyBankAccount() { return route.EditPartyBankAccounts },
        get addInGridPartyCode() { return route.AddPartyCode },
        get editInGridPartyCode() { return route.EditPartyCode },
        icon: 'fas fa-building'
    },

    AddCustomersService: {
        component: AddCustomerServiceComponent,
        title: "افزودن خدمات مشتریان",
        path: "/main/persons/partyService/addCustomerService",
        get back() { return route.CompleteFormLegal },
        icon: 'fa fa-plus'

    },


    AddCustomerContact: {
        component: CreateManagedCustomerContactComponent,
        title: "افزودن تماس با مشتری",
        path: "/main/persons/customers/addManagedCustomerContact",
        get back() { return route.GetManagedCustomerContact },

        icon: 'fas fa-plus'

    },

    AddPartyCode: {
        component: CreateCustomersTradingCodesComponent,
        title: "افزودن کدهای معاملاتی مشتری",
        path: "/main/persons/customers/addCustomersTradingCodes",
        get back() { return route.GetCustomersTradingCodes },
        icon: 'fa fa-plus'
    },

    EditPartyCode: {
        component: EditCustomersTradingCodesComponent,
        title: "ویرایش کدهای معاملاتی مشتری",
        path: "/main/persons/customers/editCustomersTradingCodes",
        get back() { return route.GetCustomersTradingCodes },
        icon: 'fa fa-edit'
    },

    AddPartyBankAccounts: {
        component: CreatePartyBankAccounts,
        title: "افزودن حساب بانکی مشتری",
        path: "/main/persons/customers/addPartyBankAccount",
        get back() { return route.GetManagerBankAccounts },
        icon: 'fa fa-plus'
    },
    EditPartyBankAccounts: {
        component: UpdatePartyBankAccounts,
        title: "ویرایش حساب بانکی مشتری",
        path: "/main/persons/customers/updatePartyBankAccount",
        get back() { return route.GetManagerBankAccounts },
        icon: 'fa fa-edit'
    },
    EditCustomerContact: {
        component: UpdateManagedCustomerContactComponent,
        title: "ویرایش تماس با مشتری",
        path: "/main/persons/customers/updateManagedCustomerContact",
        get back() { return route.GetManagedCustomerContact },
        icon: 'fa fa-edit'
    },

    // تب تکمیل مشتری حقوقی








    GetParties: {
        component: GetParties,
        title: "فهرست مشتریان",
        path: "/main/persons/customers/getCustomers",
        get add() { return [route.AddRealCustomer, route.AddLegalCustomer] },
        get edit() { return [route.EditRealCustomer, route.EditLegalCustomer] },
        // get editUncompleted(){return [route.UpdateUnCompletedParty , route.UpdateLegalUnCompletedParty]},
        icon: 'fas fa-users'
    },

    // GetIncompletePartyList: {
    //     component: GetIncompletePartyListComponent,
    //     title: "فهرست مشتریان ناقص",
    //     path: "/main/persons/partyReports/incompletePartyList",
    //     back : null,
    //     add: null,
    //     edit: null,
    //     get editUncompleted(){return [route.UpdateUnCompletedParty , route.UpdateLegalUnCompletedParty]},
    //     // get edit(){return  route.UpdateGroup},
    //     // get list(){return  route.GetPartiesGroup},
    //     icon: 'fas fa-list-alt'
    // },


    GetManagerBankAccounts: {
        component: GetPartyBankAccounts,
        title: "مدیریت حسابهای بانکی",
        path: "/main/persons/customers/getPartyBankAccounts",
        get addById() { return route.AddBankAccountCustomer },
        get edit() { return route.UpdateBankAccountCustomer },
        icon: "fas fa-money-check"
    },
    AddBankAccountCustomer: {
        component: CreatePartyBankAccounts,
        title: "افزودن حساب بانکی مشتری",
        path: "/main/persons/customers/addPartyBankAccount",
        get back() { return route.GetManagerBankAccounts },
        icon: 'fas fa-plus',
    },
    UpdateBankAccountCustomer: {
        component: UpdatePartyBankAccounts,
        title: "به روز رسانی حساب بانکی مشتری",
        path: "/main/persons/customers/updatePartyBankAccount",
        get back() { return route.GetManagerBankAccounts },
        icon: 'fas fa-edit',
    },
    GetCustomersRelation: {
        component: GetCustomersRelationComponent,
        title: "ارتباط بین مشتریان",
        path: "/main/persons/customers/getCustomersRelation",
        back: null,
        icon: 'fa fa-link',
        get add() { return route.AddCustomersRelation }
    },
    AddCustomersRelation: {
        component: CreateCustomersRelationComponent,
        title: "افزودن ارتباط بین مشتری",
        path: "/main/persons/customers/addCustomersRelation",
        get back() { return route.GetCustomersRelation },
        icon: 'fas fa-plus'
    },
    GetCustomersTradingCodes: {
        component: GetCustomersTradingCodesComponent,
        title: "کد های معاملاتی مشتری",
        path: "/main/persons/customers/getCustomerTradingCodes",
        icon: 'fas fa-link',
        get addById() { return route.AddCustomerTradingCodes },
        get edit() { return route.EditCustomerTradingCodes },
    },
    EditCustomerTradingCodes: {
        component: EditCustomersTradingCodesComponent,
        title: "ویرایش کدهای معاملاتی مشتری",
        path: "/main/persons/customers/editCustomersTradingCodes",
        get back() { return route.GetCustomersTradingCodes },
        icon: 'fas fa-edit'
    },
    AddCustomerTradingCodes: {
        component: CreateCustomersTradingCodesComponent,
        title: "افزودن کد های معاملاتی مشتری",
        path: "/main/persons/customers/addCustomersTradingCodes",
        get back() { return route.GetCustomersTradingCodes },
        icon: 'fas fa-plus'
    },

    GetManagedCustomerContact: {
        component: GetManagedCustomerContactComponent,
        title: "مدیریت تماس با مشتری",
        path: "/main/persons/customers/managedCustomerContact",
        icon: 'fas fa-link',
        get addById() { return route.AddManagedCustomerContact },
        get edit() { return route.UpdateManagedCustomerContact },
    },

    AddManagedCustomerContact: {
        component: CreateManagedCustomerContactComponent,
        title: "افزودن تماس با مشتری",
        path: "/main/persons/customers/addManagedCustomerContact",
        get back() { return route.GetManagedCustomerContact },
        icon: 'fas fa-plus'
    },


    UpdateManagedCustomerContact: {
        component: UpdateManagedCustomerContactComponent,
        title: "ویرایش تماس با مشتری",
        path: "/main/persons/customers/updateManagedCustomerContact",
        get back() { return route.GetManagedCustomerContact },
        icon: 'fas fa-edit'
    },
    GetManageCustomerRecords: {
        component: GetManageCustomerRecordsComponent,
        title: "مدیریت مدارک مشتری",
        path: "/main/persons/customers/managerCustomerDocuments",
        icon: 'fas fa-link',
        get addById() { return route.AddManageCustomerRecords },

    },

    AddManageCustomerRecords: {
        component: AddManageCustomerRecordsComponent,
        title: "افزودن مدارک مشتری",
        path: "/main/persons/customers/addManageCustomerRecords",
        icon: 'fas fa-plus',
        get back() { return route.GetManageCustomerRecords },
    },
    GetPartyRole: {
        component: GetPartyRoleComponent,
        title: "مدیریت اشخاص",
        path: "/main/persons/customers/getManagerPersons",
        icon: 'fas fa-plus',
        get add() { return [route.AddPartyRole, route.AddPersonManagement] },
        get edit() { return route.UpdatePartyRole }
    },
    AddPartyRole: {
        component: CreatePartyRoleComponent,
        title: "افزودن نقش مشتریان",
        path: "/main/persons/customers/addPartyRole",
        icon: 'fas fa-plus',
        get back() { return route.GetPartyRole },
    },
    UpdatePartyRole: {
        component: UpdatePartyRoleComponent,
        title: "ویرایش نقش مشتریان",
        path: "/main/persons/customers/editPartyRole",
        icon: 'fas fa-edit',
        get back() { return route.GetPartyRole },
    },
    CustomerAccountBook: {
        component: GetCustomerAccountBook,
        title: "دفتر حساب مشتری",
        path: "/main/persons/customers/getAccountBook",
        icon: 'fas fa-book',
        back: null
    },
    AddPersonManagement: {
        component: CreatePersonManagementComponent,
        title: 'افزودن شخص جدید',
        path: '/main/persons/customers/addPersonManagement',
        icon: 'fas fa-plus',
        add: null,
        get back() { return route.GetPartyRole },
    },














};

export default route;