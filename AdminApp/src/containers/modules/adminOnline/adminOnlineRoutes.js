import GetRestrictionComponent from './restriction/components/GetRestrictionComponent';
import AddRestrictionComponent from './restriction/components/AddRestrictionComponent';
import EditRestrictionComponent from './restriction/components/EditRestrictionComponent';


const route= {
   
    GetRestriction :{
        component: GetRestrictionComponent,
        title: "فهرست محدودیت ها",
        path: "/main/adminOnline/getRestrictions",
        back: null,
        get add() { return route.AddRestriction },
        get edit() { return route.EditRestriction },
        icon: 'fas fa-document'
    },

    EditRestriction:{
        component: EditRestrictionComponent,
        title: "ویرایش محدودیت",
        path: "/main/adminOnline/editRestrictions",
        get back() { return route.GetRestriction },
        add: null,
        edit: null,
        icon: 'fas fa-edit'
    },
    AddRestriction:{
        component: AddRestrictionComponent,
        title: "اضافه کردن محدودیت",
        path: "/main/adminOnline/addRestrictions",
        get back() { return route.GetRestriction },
        add: null,
        edit: null,
        icon: 'fas fa-plus'
    }

};

export default route;