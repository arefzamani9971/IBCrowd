import GetGeneralLedger from './generalLedger/components/GetGeneralLedgerComponent';
import GetFiscalYears from './fiscalYear/components/GetFiscalYearsComponent';
import AddFiscalYear from './fiscalYear/components/CreateFiscalYearComponent';
import GetFiscalGroups from './fiscalGroup/components/GetFiscalGroupsComponent';
import AddFiscalGroup from './fiscalGroup/components/CreateFiscalGroupComponent';
import GetSubsidiaryLedger from './subsidaryLedger/components/GetSubsidiaryLedgerComponent';
import GetDetailLedger from './detailLedger/components/GetDetailLedgerComponent';
import SaveDetailLedger from './detailLedger/components/SaveDetailLedgerComponent';
import UpdateDetailLedger from './detailLedger/components/UpdateDetailLedgerComponent';
import GetCostCenters from './costCenter/components/GetCostCentersComponent';
import AddCostCenter from './costCenter/components/CreateCostCenterComponent';
import AccountingSettingsComponents from "./setting/components/AccountingSettingsComponents";
import GetManageAccountCodesRelation from './manageAccountCodesRelation/components/GetManageAccountCodesRelationComponent';
import AddManageAccountCodesRelation from './manageAccountCodesRelation/components/CreateManageAccountCodesRelationComponent';
import GetVoucherTypeManagementComponent from './voucherTypeManagement/components/GetVoucherTypeManagementComponent';
import AddVoucherTypeManagementComponent from './voucherTypeManagement/components/AddVoucherTypeManagementComponent';
import EditVoucherTypeManagmentComponent from './voucherTypeManagement/components/EditVoucherTypeManagmentComponent';
import AccountigSettingsComponentMainTab from './setting/components/AccountigSettingsComponentMainTab';
const route={
    GetGeneralLedger:{
        component:GetGeneralLedger,
        title:"حساب کل",
        path:"/main/accounting/base/getGeneralLedger",
        back:null,
        add:null,
        edit:null,
        icon:'fas fa-calculator'
      
    },
    GetSubsidiaryLedger:{
        component:GetSubsidiaryLedger,
        title:"حساب معین",
        path:"/main/accounting/base/getSubsidiaryLedger",
        back:null,
        add:null,
        edit:null,
        icon:'fas fa-calculator'
    },
    GetDetailLedger:{
        component:GetDetailLedger,
        title:"حساب تفصیل",
        path:"/main/accounting/base/getDetailLedger",
        back:null,
        get add(){return route.SaveDetailLedger},
        get edit(){return route.UpdateDetailLedger},
        icon:'fas fa-calculator'
    },
    SaveDetailLedger :{
        component: SaveDetailLedger,
        title: "افزودن حساب تفصیل",
        path: "/main/accounting/base/addDetailLedger",
        get back(){return  route.GetDetailLedger},
        icon: 'fa fa-calculator'
    },
    UpdateDetailLedger :{
        component: UpdateDetailLedger,
        title: "ویرایش حساب تفصیل",
        path: "/main/accounting/base/editDetailLedger",
        get back(){return  route.GetDetailLedger},
        icon: 'fa fa-calculator'
    },
    GetCostCenters:{
        component:GetCostCenters,
        title:"فهرست مراکز هزینه",
        path:"/main/accounting/base/getCostCenters",
        back:null,
        get add(){return route.AddCostCenter},
        edit:null,
        icon:'fas fa-money-check',

    },
    AddCostCenter:{
        component:AddCostCenter,
        title:"افزودن مرکز هزینه",
        path:"/main/accounting/base/addCostCenter",
        get back(){return  route.GetCostCenters},
        add:null,
        edit:null,
        icon:'fa fa-plus'
    },
    GetManageAccountCodesRelation:{
        component:GetManageAccountCodesRelation,
        title:"مدیریت ارتباط حساب ها",
        path:"/main/accounting/base/getManageAccountCodeRelation",
        back:null,
        get add(){return route.AddManageAccountCodesRelation},
        edit:null,
        icon:'fas fa-link',

    },
    AddManageAccountCodesRelation:{
        component:AddManageAccountCodesRelation,
        title:"افزودن ارتباط حساب ها ",
        path:"/main/accounting/base/addAccountCodeRelation",
        get back(){return  route.GetManageAccountCodesRelation},
        add:null,
        edit:null,
        icon:'fa fa-plus'
    },
    GetFiscalGroups:{
        component:GetFiscalGroups,
        title:"فهرست گروههای مالی",
        path:"/main/accounting/base/getFiscalGroups",
        back:null,
        get add(){return route.AddFiscalGroup},
        edit:null,
    },
    AddFiscalGroup:{
        component:AddFiscalGroup,
        title:"افزودن گروه مالی",
        path:"/main/accounting/base/addFiscalGroup",
        get back(){return  route.GetFiscalGroups},
        add:null,
        edit:null,
    },
    GetFiscalYears:{
        component:GetFiscalYears,
        title:"فهرست سالهای مالی",
        path:"/main/accounting/base/getFiscalYears",
        back:null,
        get add(){return route.AddFiscalYear},
        edit:null,
    },
    AddFiscalYear:{
        component:AddFiscalYear,
        title:"افزودن سال مالی",
        path:"/main/accounting/base/addFiscalYear",
        get back(){return route.GetFiscalYears},
        add:null,
        edit:null,
    },

    AccountingSettings:{
        component: AccountigSettingsComponentMainTab,
        title:"",
        path:"/main/accounting/base/setting",
        get back(){return route.backDashboard},
        add:null,
        edit:null,
        // icon:'fa fa-edit'
    },
    backDashboard:{
        path:"/main/dashboard",
        title :"پیشخوان"
    },
    GetVoucherTypeManagement:{
        component: GetVoucherTypeManagementComponent,
        title:"مدیریت نوع سند",
        path:"/main/accounting/base/voucherTypeManagement",
        back: null,
        get add(){return route.AddVoucherTypeManagement},
        get edit(){return route.EditVoucherTypeManagement},
        icon:'fas fa-link'
    },
    AddVoucherTypeManagement:{
        component:AddVoucherTypeManagementComponent,
        title:"افزودن مدیریت نوع سند",
        path:"/main/accounting/base/addVoucherTypeManagement",
        get back(){return route.GetVoucherTypeManagement},
        add:null,
        edit:null,
        icon:'fa fa-plus'
    },
    EditVoucherTypeManagement:{
        component:EditVoucherTypeManagmentComponent,
        title:"ویرایش مدیریت نوع سند",
        path:"/main/accounting/base/editVoucherTypeManagement",
        get back(){return route.GetVoucherTypeManagement},
        add:null,
        edit:null,
        icon:'fa fa-edit'
    },
    
}


export default route;

