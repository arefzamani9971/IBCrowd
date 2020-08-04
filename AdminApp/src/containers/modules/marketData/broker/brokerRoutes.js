import GetBrokerListComponent from "./brokerList/components/GetBrokerListComponent";
import UpdateBrokerListComponent from "./brokerList/components/UpdateBrokerListComponent";
import AddBrokerComponent from "./addBroker/components/AddBrokerComponent";
const route = {
    GetBrokerListComponent: {
        component: GetBrokerListComponent,
        title: "لیست کارگزارها",
        path: "/main/marketData/broker/broker",
        back: null,
        add: null,
        get edit() { return route.UpdateBrokerListComponent },
        icon: 'fas fa-chart-bar'
    },
    UpdateBrokerListComponent: {
        component: UpdateBrokerListComponent,
        title: "به روزرسانی اطلاعات کارگزاری",
        path: "/main/marketData/broker/updateBroker",
        get back() { return route.GetBrokerListComponent },
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    AddBrokerComponent: {
        component: AddBrokerComponent,
        title: "افزودن اطلاعات کارگزاری",
        path: "/main/marketData/broker/addBroker",
        get back() { return route.GetBrokerListComponent },
        add: null,
        edit: null,
        icon: 'fas fa-chart-bar'
    }
}

export default route;