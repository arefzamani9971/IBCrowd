import React from 'react';
import { Access } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (props) {
    return [
        {
            title: "نام المان",
            field: "buttonName",
            show: true,
            width: "350px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان المان",
            field: "buttonTitle",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "دسترسی",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <Access {...props} dataItem={event.dataItem} />
                )
            }
        },

    ];

}


export default Columns;