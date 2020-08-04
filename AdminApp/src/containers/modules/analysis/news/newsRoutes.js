import GetNewsComponent from "./news/components/GetNewsComponent";
import UpdateNewsComponent from "./news/components/UpdateNewsComponent";
import AddNewsComponent from "./addNews/components/AddNewsComponent";



const route = {
    GetNewsComponent: {
        component: GetNewsComponent,
        title: "اخبار",
        path: "/main/analysis/news/news",
        back: null,
        add: null,
        get edit() { return route.UpdateNewsComponent },
        icon: 'fas fa-chart-bar'
    },
    UpdateNewsComponent: {
        component: UpdateNewsComponent,
        title: "به روز رسانی خبر",
        path: "/main/analysis/news/updateNews",
        get back() { return route.GetNewsComponent },
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    AddNewsComponent: {
        component: AddNewsComponent,
        title: "افزودن خبر",
        path: "/main/analysis/news/addNews",
        get back() { return route.GetNewsComponent },
        add: null,
        edit: null,
        icon: 'fas fa-chart-bar'
    },


}

export default route;