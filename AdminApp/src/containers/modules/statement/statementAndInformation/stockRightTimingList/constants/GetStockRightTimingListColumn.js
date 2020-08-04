import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';

const Columns = function (prop, state, classes) {

    return [
        {
            title: "شناسه نماد",
            field: "isin",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان",
            field: "symbolTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "کد پیگیری اطلاعیه",
            field: "tracingNo",
            show: true,
            isFixed: true,
            dynamicColumn: false
        },
        {
            title: "مهلت شرکت در حق تقدم از",
            field: "fromDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "مهلت شرکت در حق تقدم تا",
            field: "toDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "وضعیت بررسی",
            field: "reviewStatusTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "جزئیات اوراق",
            isFixed: true,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Edit {...prop} stateParams={{ tracingNo: event.dataItem.tracingNo }} />
                    </td>
                )
            }
        }
    ];

};

export default Columns;