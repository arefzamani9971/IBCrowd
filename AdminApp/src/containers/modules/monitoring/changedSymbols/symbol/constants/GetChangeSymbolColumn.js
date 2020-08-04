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
            title: "نماد",
            field: "fromSerial",
            show: true,
            isFixed: true,
            dynamicColumn: false
        },
        {
            title: " وضعیت بررسی",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: " شناسه قدیمی",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        
        {
            title: "Board جدید",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "Board قدیم",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
 
        
        {
            title: "exchange جدید",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "exchange قدیم",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "تاریخ تغییر",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "ویرایش",
            isFixed: true,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Edit {...prop} stateParams={{ partyId: event.dataItem.partyId, id: event.dataItem.id, nationalId: event.dataItem.nationalId }} />
                    </td>
                )
            }
        }
    ];

};

export default Columns;