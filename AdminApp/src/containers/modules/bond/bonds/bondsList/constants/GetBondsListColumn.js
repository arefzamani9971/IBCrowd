import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import { isCheck } from '../../../../../../constants/kendoUiGrid';

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
            field: "title",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "نماد",
            field: "name",
            show: true,
            isFixed: true,
            dynamicColumn: false
        },
        {
            title: "بازار",
            field: "flowTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "جزئیات",
            field: "hasBondDetails",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            filter: 'boolean',
            cell: (event) => {
                return ( 
                    <CheckColumn status={event.dataItem.hasBondDetails} />
                )
            },
        },
        {
            title: "جزئیات اوراق",
            isFixed: true,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Edit {...prop} stateParams={{ id: event.dataItem.bondDetailsId , isin: event.dataItem.isin}} />
                    </td>
                )
            }
        }
    ];

};

export default Columns;