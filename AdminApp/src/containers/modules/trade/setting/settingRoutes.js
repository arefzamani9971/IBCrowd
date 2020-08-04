
import TradeSettingComponent from './components/TradeSettingComponent'
import TradeSettingEditWagefinancialtoolsComponent from './components/tradeSettingEditWagefinancialtoolsComponent';
import TradeSettingEditManagementSymbolTradeComponent from './components/tradeSettingEditManagementSymbolTradeComponent';
import TradeSettingObserveWagefinancialtoolsComponent from './components/tradeSettingObserveWagefinancialtoolsComponent';
import TradeSettingObserveManagementSymbolTradeComponent from './components/tradeSettingObserveManagementSymbolTradeComponent';
const route = {
    tradeSetting: {
        component: TradeSettingComponent,
        title: "تنظیمات معاملات",
        path: "/main/trade/setting/getTradeSetting",
        get back() { return route.dashboard },
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
        get editWage() { return route.tradeSettingEditWagefinancialtools },
        get observeWage() { return route.tradeSettingObserveWagefinancialtools },
        get editSymbolTrade() { return route.tradeSettingEditManagementSymbolTrade },
        get observeSymbolTrade() { return route.tradeSettingObserveManagementSymbolTrade }


    },
    tradeSettingEditWagefinancialtools: {
        component: TradeSettingEditWagefinancialtoolsComponent,
        title: "ویرایش کارمزد ابزارهای مالی",
        path: "/main/trade/setting/editTradeWage",
        get back() { return route.tradeSetting },
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },
    tradeSettingObserveWagefinancialtools: {
        component: TradeSettingObserveWagefinancialtoolsComponent,
        title: "مشاهده کارمزد ابزارهای مالی",
        path: "/main/trade/setting/observeTradeWage",
        get back() { return route.tradeSetting },
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },
    tradeSettingEditManagementSymbolTrade: {
        component: TradeSettingEditManagementSymbolTradeComponent,
        title: "ویرایش مدیریت نماد های معاملاتی",
        path: "/main/trade/setting/editSymbolTrade",
        get back() { return route.tradeSetting },
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },
    tradeSettingObserveManagementSymbolTrade: {
        component: TradeSettingObserveManagementSymbolTradeComponent,
        title: "مشاهده مدیریت نماد های معاملاتی",
        path: "/main/trade/setting/observeSymbolTrade",
        get back() { return route.tradeSetting },
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },
};
export default route;


