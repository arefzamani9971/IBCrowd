import GetHolidayListComponent from "./holidayList/components/GetHolidayListComponent";
import UpdateHolidayListComponent from "./holidayList/components/UpdateHolidayListComponent";
import AddHolidayComponent from "./addHoliday/components/AddHolidayComponent";
const route = {
    GetHolidayListComponent: {
        component: GetHolidayListComponent,
        title: "لیست تعطیلات",
        path: "/main/marketData/holiday/holiday",
        back: null,
        add: null,
        get edit() { return route.UpdateHolidayListComponent },
        icon: 'fas fa-chart-bar'
    },
    UpdateHolidayListComponent: {
        component: UpdateHolidayListComponent,
        title: "به روزرسانی تعطیلات",
        path: "/main/marketData/holiday/updateHoliday",
        get back() { return route.GetHolidayListComponent },
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },
    AddHolidayComponent: {
        component: AddHolidayComponent,
        title: "افزودن تعطیلات",
        path: "/main/marketData/holiday/addHoliday",
        get back() { return route.GetHolidayListComponent },
        add: null,
        edit: null,
        icon: 'fas fa-chart-bar'
    }
}

export default route;