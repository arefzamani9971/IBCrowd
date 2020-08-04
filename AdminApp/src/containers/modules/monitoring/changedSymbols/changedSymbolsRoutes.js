




import GetChangeSymbolComponent from "./symbol/components/GetChangeSymbolComponent";
import UpdateChangeSymbolComponent from "./symbol/components/UpdateChangeSymbolComponent";
const route = {
    GetChangeSymbolComponent: {
        component: GetChangeSymbolComponent,
        title: "تغییرات نماد",
        path: "/main/monitoring/changedSymbols/symbol",
        back: null,
        add: null,
        get edit() { return route.UpdateChangeSymbolComponent },
        icon: 'fas fa-chart-bar'
    },
    UpdateChangeSymbolComponent: {
        component: UpdateChangeSymbolComponent,
        title: "به روزرسانی تغییرات نماد",
        path: "/main/monitoring/changedSymbols/updateSymbol",
        get back() { return route.GetChangeSymbolComponent },
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    }
}

export default route;