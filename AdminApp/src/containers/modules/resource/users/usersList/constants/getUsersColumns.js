const Columns = function (props) {
    return [
        {
            title: "نام کاربری",
            field: "userName",
            show: true,
            width: "180px",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "نام نام خانوادگی",
            field: "partyName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "ایمیل",
            field: "email",
            show: true,
            width: "180px",
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
        },

        {
            title: "تاریخ ثبت",
            field: "createdJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شعبه",
            field: "branchName",
            show: true,
            width: "200px",
            isFixed: false,
            class: "text-right",
            dynamicColumn: false,
        },
        {
            title: "کد شعبه",
            field: "branchCode",
            show: true,
            width: "120px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نقش",
            field: "roleName",
            show: true,
            width: "150px",
            class: "text-center",
            isFixed: false,
        },
        {
            title: "بازار",
            field: "marketTitles",
            show: true,
            width: "150px",
            isFixed: false,
            class: "text-right",
            dynamicColumn: false,
        },

        // {
        //     title: "ویرایش",
        //     isFixed: true,
        //     width: "100px",
        //     dynamicColumn: true,
        //     cell: (event) => {

        //         let edit = event.dataItem.party.partyType === 1 ? props.edit[0] : props.edit[1];
        //         return (
        //             <Edit   {...props} routeEdit={edit} stateParams={{ partyId: event.dataItem.party.id }} />
        //         )
        //     }
        // }
    ];

}


export default Columns;