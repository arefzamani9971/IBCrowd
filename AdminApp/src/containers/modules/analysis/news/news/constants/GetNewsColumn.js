import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';

const Columns = function (prop, state, classes) {

    return [
        {
            title: "عنوان",
            field: "accountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "تاریخ انتشار",
            field: "title",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "120px",
        },

        {
            title: "ویرایش",
            isFixed: true,
            dynamicColumn: true,
            width: "90px",
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