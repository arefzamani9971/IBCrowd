import GetBondsList from "./bondsList/components/GetBondsListComponent";
import UpdateBondsList from "./bondsList/components/UpdateBondsListComponent";
import GetAccruedInterest from "./accruedInterest/components/GetAccruedInterestComponent";
import GetDailyForwardPrice from "./dailyForwardPrice/components/GetDailyForwardPriceComponent";

const route = {
    GetBondsList: {
        component: GetBondsList,
        title: "لیست اوراق",
        path: "/main/bond/bonds/list",
        back: null,
        add: null,
        get edit() { return route.UpdateBondsList },
        icon: 'fas fa-chart-bar'
    },
    UpdateBondsList: {
        component: UpdateBondsList,
        title: "به روزرسانی لیست اوراق",
        path: "/main/bond/bonds/updateBonds",
        get back() { return route.GetBondsList },
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    GetAccruedInterest: {
        component: GetAccruedInterest,
        title: "سود اوراق",
        path: "/main/bond/bonds/accruedInterest",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    GetDailyForwardPrice: {
        component: GetDailyForwardPrice,
        title: "ارزش روزانه سلف",
        path: "/main/bond/bonds/dailyForwardPrice",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    }
}

export default route;