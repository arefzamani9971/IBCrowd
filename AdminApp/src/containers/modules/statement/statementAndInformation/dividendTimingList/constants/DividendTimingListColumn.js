
import React from 'react';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';




const Columns = function (prop, state, classes) {
    return [
        {
            title: "شناسه نماد",
            field: "chequeSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false,
           
        },
        {
            title: " عنوان",
            field: "chequeStateTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "   کدپیگیری اطلاعیه",
            field: "cashFlowChequeMasterTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: " وضعیت بررسی",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "  جزییات",
            field: "closingPrice",
            show: true,
            isFixed: false,
            dynamicColumn: false,
          
            cell: (event) => {
                return (
                    <td>
                        <Edit {...prop} stateParams={{ partyId: event.dataItem.partyId, id: event.dataItem.id, nationalId: event.dataItem.nationalId }} />
                    </td>
                )
            }
        },
    ];

}

export default Columns;