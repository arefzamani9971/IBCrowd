import GetIndex from "./index/components/GetIndexComponent";
import UpdateIndex from "./index/components/UpdateIndexComponent";
import AdjustedPriceList from "./adjustedPriceList/components/AdjustedPriceListComponent";
import GetCalculateAdjustedPrice from "./calculateAdjustedPrice/components/GetCalculateAdjustedPriceComponent";
import DividendTimingList from "./dividendTimingList/components/DividendTimingListComponent";
import GetStockRightTimingList from "./stockRightTimingList/components/GetStockRightTimingListComponent";
import UpdateStockRightTimingList from "./stockRightTimingList/components/UpdateStockRightTimingListComponent";
import AddStatement from "./addStatement/components/AddStatementComponent";
import UpdateDividendTimingList from './dividendTimingList/components/UpdateDividendTimingListComponent';
import UpdateAdjustedPriceList from './adjustedPriceList/components/UpdateAdjustedPriceList'


const route = {
    GetIndex: {
        component: GetIndex,
        title: "لیست اطلاعیه‌ها",
        path: "/main/statement/statementAndInformation/index",
        back: null,
        add: null,
        get edit(){return route.UpdateIndex},
        icon: 'fas fa-chart-bar'
    },
    UpdateIndex: {
        component: UpdateIndex,
        title: "به روز رسانی اطلاعیه‌ها",
        path: "/main/statement/statementAndInformation/updateIndex",
        get back(){return route.GetIndex},
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    AdjustedPriceList: {
        component: AdjustedPriceList,
        title: "تعدیلات قیمت",
        path: "/main/statement/statementAndInformation/adjustedPrice",
        back: null,
        add: null,
        get edit(){return route.UpdateAdjustedPriceList},
        icon: 'fas fa-chart-bar'
    },
    UpdateAdjustedPriceList: {
        component: UpdateAdjustedPriceList,
        title: "به روز رسانی  تعدیلات قیمت",
        path: "/main/statement/statementAndInformation/updateAdjustedPrice",
        get back(){return route.AdjustedPriceList},
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    GetCalculateAdjustedPricePrice: {
        component: GetCalculateAdjustedPrice,
        title: "محاسبه قیمت تعدیلی",
        path: "/main/statement/statementAndInformation/calculateAdjustedPrice",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-chart-bar'
    },
    DividendTimingList: {
        component: DividendTimingList,
        title: "لیست زمان‌بندی تقسیم سود سهام",
        path: "/main/statement/statementAndInformation/dividendTiming",
        back: null,
        add: null,
        get edit(){return route.UpdateDividendTimingList},
        icon: 'fas fa-chart-bar'
    },
    UpdateDividendTimingList: {
        component: UpdateDividendTimingList,
        title: "به روز رسانی لیست زمان‌بندی تقسیم سود سهام",
        path: "/main/statement/statementAndInformation/updateDividendTiming",
        get back(){return route.DividendTimingList},
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    GetStockRightTimingList: {
        component: GetStockRightTimingList,
        title: "لیست زمان‌بندی شرکت در حق تقدم",
        path: "/main/statement/statementAndInformation/stockRightTiming",
        back: null,
        add: null,
        get edit(){return route.UpdateStockRightTimingList},
        icon: 'fas fa-chart-bar'
    },
    UpdateStockRightTimingList: {
        component: UpdateStockRightTimingList,
        title: "به روز رسانی زمان‌بندی شرکت در حق تقدم",
        path: "/main/statement/statementAndInformation/updateStockRightTiming",
        get back(){return route.GetStockRightTimingList},
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    AddStatement: {
        component: AddStatement,
        title: "افزودن اطلاعیه کدال",
        path: "/main/statement/statementAndInformation/addStatement",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-chart-bar'
    },


}

export default route;