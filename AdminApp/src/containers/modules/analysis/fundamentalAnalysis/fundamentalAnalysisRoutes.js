import GetFundamentalAnalysisComponent from "./fundamentalAnalysis/components/GetFundamentalAnalysisComponent";
import UpdateFundamentalAnalysisComponent from "./fundamentalAnalysis/components/UpdateFundamentalAnalysisComponent";
import AddFundamentalAnalysisComponent from "./addFundamentalAnalysis/components/AddFundamentalAnalysisComponent";



const route = {
    GetFundamentalAnalysisComponent: {
        component: GetFundamentalAnalysisComponent,
        title: "تحلیل های بنیادی",
        path: "/main/analysis/fundamentalAnalysis/fundamentalAnalysis",
        back: null,
        add: null,
        get edit(){return route.UpdateFundamentalAnalysisComponent},
        icon: 'fas fa-chart-bar'
    },
    UpdateFundamentalAnalysisComponent: {
        component: UpdateFundamentalAnalysisComponent,
        title: "به روز رسانی تحلیل بنیادی",
        path: "/main/analysis/fundamentalAnalysis/updateFundamentalAnalysis",
        get back(){return route.GetFundamentalAnalysisComponent},
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    AddFundamentalAnalysisComponent: {
        component: AddFundamentalAnalysisComponent,
        title: "افزودن تحلیل بنیادی",
        path: "/main/analysis/fundamentalAnalysis/addFundamentalAnalysis",
        get back(){return route.GetFundamentalAnalysisComponent},
        add: null,
        edit: null,
        icon: 'fas fa-chart-bar'
    },


}

export default route;