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
            title: "عنوان دارایی پایه",
            field: "fromSerial",
            show: true,
            isFixed: true,
            dynamicColumn: false
        },
        {
            title: "تاریخ قرارداد",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "نوع مارجین",
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