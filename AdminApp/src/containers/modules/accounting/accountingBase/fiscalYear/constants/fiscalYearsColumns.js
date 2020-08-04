import React from 'react';
import { Edit, CheckColumn } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (prop, state, classes) {
    return [
        {
            title: "عنوان",
            field: "title",
            show: true,
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "گروه مالی",
            field: "fiscalGroupTitle",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "از تاریخ",
            field: "startDateJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false


        },
        {
            title: "تا تاریخ",
            field: "endDateJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false
        },
        // TODO Mr.Nazari said
        // {
        //     title: "ویرایش",
        //     field: "code",
        //     isFixed: true,
        //     width: "100px",
        //     dynamicColumn: true,

        //     cell: (event) => {

        //         return (

        //             <Edit   {...prop} stateParams={{ accountNumber: event.dataItem.accountNumber }} />
        //         )
        //     },

        // },

    ];

}


export default Columns;