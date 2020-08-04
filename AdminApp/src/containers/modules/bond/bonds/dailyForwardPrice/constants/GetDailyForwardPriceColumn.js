import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';

const Columns = function (prop, state, classes) {

    return [
        {
            title: "شناسه نماد",
            field: "accountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان",
            field: "title",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "تاریخ",
            field: "fromSerial",
            show: true,
            isFixed: true,
            dynamicColumn: false
        },
        {
            title: "قیمت",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        }
    ];

};

export default Columns;