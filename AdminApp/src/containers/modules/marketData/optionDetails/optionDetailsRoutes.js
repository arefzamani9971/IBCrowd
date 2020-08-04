import GetOptionsListComponent from "./optionsList/components/GetOptionsListComponent";
import UpdateOptionsListComponent from "./optionsList/components/UpdateOptionsListComponent";
import SaveOptionDetailComponent from "./saveOptionDetail/components/SaveOptionDetailComponent";
const route = {
    GetOptionsListComponent: {
        component: GetOptionsListComponent,
        title: "لیست اختیار معامله",
        path: "/main/marketData/optionDetails/options",
        back: null,
        add: null,
        get edit() { return route.UpdateOptionsListComponent },
        icon: 'fas fa-chart-bar'
    },
    UpdateOptionsListComponent: {
        component: UpdateOptionsListComponent,
        title: "به روزرسانی اختیار معامله",
        path: "/main/marketData/optionDetails/updateOptions",
        get back() { return route.GetOptionsListComponent },
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    SaveOptionDetailComponent: {
        component: SaveOptionDetailComponent,
        title: "افزودن اختیار معامله",
        path: "/main/marketData/optionDetails/saveOptionDetail",
        get back() { return route.GetOptionsListComponent },

        add: null,
        edit: null,
        icon: 'fas fa-chart-bar'
    }
}

export default route;