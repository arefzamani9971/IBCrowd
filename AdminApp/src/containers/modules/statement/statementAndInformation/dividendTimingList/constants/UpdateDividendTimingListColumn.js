
import React from 'react';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';




const Columns = function (prop, state, classes) {
    return [
        {
            title: " مهلت پرداخت سود از",
            field: "chequeSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false,
           
        },
        {
            title: " مهلت پرداخت سود تا",
            field: "chequeStateTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "    از تعداد سهام",
            field: "cashFlowChequeMasterTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "  تا تعداد سهام",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نوع مشتری",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نوع دریافت سود",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "بانک",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "  عملیات",
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