import GetFutureContractListComponent from "./futureContractList/components/GetFutureContractListComponent";
import UpdateFutureContractListComponent from "./futureContractList/components/UpdateFutureContractListComponent";
import SaveFutureContractComponent from "./saveFutureContract/components/SaveFutureContractComponent";
const route = {
    GetFutureContractListComponent: {
        component: GetFutureContractListComponent,
        title: "لیست معاملات آتی سهام",
        path: "/main/marketData/futureContract/futureContract",
        back: null,
        add: null,
        get edit() { return route.UpdateFutureContractListComponent },
        icon: 'fas fa-chart-bar'
    },
    UpdateFutureContractListComponent: {
        component: UpdateFutureContractListComponent,
        title: "به روزرسانی معاملات آتی سهام",
        path: "/main/marketData/futureContract/updateFutureContract",
        get back() { return route.GetFutureContractListComponent },
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    SaveFutureContractComponent: {
        component: SaveFutureContractComponent,
        title: "افزودن معاملات آتی سهام",
        path: "/main/marketData/futureContract/saveFutureContract",
        get back() { return route.GetFutureContractListComponent },
        add: null,
        edit: null,
        icon: 'fas fa-chart-bar'
    }
}

export default route;