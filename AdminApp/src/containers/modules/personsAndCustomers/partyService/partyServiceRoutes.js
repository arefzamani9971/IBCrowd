import GetServicesComponent from "./serviceList/components/GetServicesComponent";
import AddServicesComponent from "./serviceList/components/AddServicesComponent";
import GetCustomersServiceComponent from "./customersSerivceList/components/GetCustomersServiceComponent";
import AddCustomerServiceComponent from "./customersSerivceList/components/AddCustomerServiceComponent";
import GetCreditPartyComponent from "./creditPartyList/components/GetCreditPartyComponent";
import AddCreditPartyComponent from "./creditPartyList/components/AddCreditPartyComponent";
import UpdateCreditPartyComponent from "./creditPartyList/components/UpdateCreditPartyComponent";
import GetManagerCustomersFeeComponent from './customerFee/components/GetManagerCustomersFeeComponent';
import AddCustomerFeeComponent from './customerFee/components/AddCustomerFeeComponent';
import UpdateCustomerFeeComponent from './customerFee/components/UpdateCustomerFeeComponent';

const route = {

    GetService: {
        component: GetServicesComponent,
        title: "فهرست خدمات",
        path: "/main/persons/partyService/getServices",
        back : null,
        get add(){return route.AddService},
        // get edit(){return  route.UpdateGroup},
        // get list(){return  route.GetPartiesGroup},
        icon: 'fas fa-list-alt'
    },
    AddService :{
        component: AddServicesComponent,
        title: "افزودن سرویس",
        path: "/main/persons/partyService/addService",
        get back(){return  route.GetService},
        icon: 'fa fa-plus'
    },
    // UpdateGroup :{
    //     component: '',
    //     title: "ویرایش گروه",
    //     path: "/main/persons/partyGroup/updateGroup",
    //     get back(){return  route.GetGroups},
    //     icon: 'fa fa-pencil'
    // },




    GetCustomersService :{
        component: GetCustomersServiceComponent,
        title: "فهرست خدمات مشتریان",
        path: "/main/persons/partyService/getCustomersServices",
        icon: 'fas fa-list-alt',
        get addById(){return route.AddCustomersService},
    },
    AddCustomersService :{
        component: AddCustomerServiceComponent,
        title: "افزودن خدمات مشتریان",
        path: "/main/persons/partyService/addCustomerService",
        get back(){return  route.GetCustomersService},
        icon: 'fa fa-plus'
    },
    GetCreditParty :{
        component: GetCreditPartyComponent,
        title: "فهرست مشتریان اعتباری",
        path: "/main/persons/partyService/getCreditCustomerServices",
        icon: 'fas fa-list-alt',
        get addById(){return route.AddCreditParty},
        get edit(){return route.UpdateCreditParty}
    },
    AddCreditParty :{
        component: AddCreditPartyComponent,
        title: "افزودن مشتریان اعتباری",
        path: "/main/persons/partyService/addCreditCustomerServices",
        get back(){return  route.GetCreditParty},
        icon: 'fa fa-plus'
    },
    UpdateCreditParty :{
        component: UpdateCreditPartyComponent,
        title: "ویرایش مشتریان اعتباری",
        path: "/main/persons/partyService/editCreditCustomerServices",
        get back(){return  route.GetCreditParty},
        icon: 'fa fa-edit'
    },
    GetManagerCustomersFee :{
        component: GetManagerCustomersFeeComponent,
        title: "فهرست مدیریت کارمزد مشتریان",
        path: "/main/persons/partyService/getManagerCustomersFee",
        get add(){return  route.AddCustomerFee},
        get edit(){return route.UpdateCustomerFee},
        icon: 'fas fa-user-friends' 
    },
    AddCustomerFee:{
        component: AddCustomerFeeComponent,
        title: "افزودن کارمزد مشتریان",
        path: "/main/persons/partyService/addCustomerFee",
        get back(){return  route.GetManagerCustomersFee},
        icon: 'fa fa-plus' 
    },
    UpdateCustomerFee :{
        component: UpdateCustomerFeeComponent,
        title: "ویرایش کارمزد مشتریان",
        path: "/main/persons/partyService/editCustomerFee",
        get back(){return  route.GetManagerCustomersFee},
        icon: 'fa fa-edit'
    }
   
}

export default route;