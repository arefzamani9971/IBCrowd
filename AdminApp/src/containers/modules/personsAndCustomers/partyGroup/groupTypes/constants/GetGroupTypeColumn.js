import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import GetGroupTypesService from '../services/GetGroupTypesService';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';


const Columns = function (prop, state, classes) {
    return [
        {
            title: "عنوان نوع گروه",
            field: "title",
            show: true,
            isFixed: false,
        },
        {
            title: "سیستمی",
            field: "isSystematic",
            show: true,
            width: "150px",
            dynamicColumn: true,

            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.isSystematic} />
                )
            },
        },
        {
            title: "تکراری",
            field: "canDuplicate",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: true,

            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.canDuplicate} />
                )
            },
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            show: true,
            isFixed: false,
        },
        {
            title: "عملیات",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Delete deleteService={GetGroupTypesService.deleteGroupType}  entity={{id:event.dataItem.id,title:event.dataItem.title}} />
                        <Edit {...prop} stateParams={{ id: event.dataItem.id }} />

                    </td>
                )
            }

          
        }
    ];
};


export default Columns;