import GetBankListComponent from "./bankList/components/GetBankListComponent";
import UpdateBankListComponent from "./bankList/components/UpdateBankListComponent";
import AddBankComponent from "./addBank/components/AddBankComponent";
const route = {
    GetBankListComponent: {
        component: GetBankListComponent,
        title: "لیست بانک‌ها",
        path: "/main/marketData/bank/bank",
        back: null,
        add: null,
        get edit() { return route.UpdateBankListComponent },
        icon: 'fas fa-chart-bar'
    },
    UpdateBankListComponent: {
        component: UpdateBankListComponent,
        title: "به روزرسانی اطلاعات بانک",
        path: "/main/marketData/bank/updateBank",
        get back() { return route.GetBankListComponent },
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    AddBankComponent: {
        component: AddBankComponent,
        title: "افزودن اطلاعات بانک",
        path: "/main/marketData/bank/addBank",
        get back() { return route.GetBankListComponent },
        add: null,
        edit: null,
        icon: 'fas fa-chart-bar'
    }
}

export default route;