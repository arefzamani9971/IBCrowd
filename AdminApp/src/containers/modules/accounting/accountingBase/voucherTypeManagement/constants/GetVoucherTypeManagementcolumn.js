import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import DeleteVoucherTypeManagementService from '../services/DeleteVoucherTypeManagementService';
import ChangeVoucherTypeManagementPriorityService from '../services/ChangeVoucherTypeManagementPriorityService';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Priority from 'shared/components/kendoGrid/priorityButton/priorityButtonWithoutTD'


const Columns = function (prop, state, classes) {

    return [

        {
            title: "کد",
            field: "code",
            show: true,
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "عنوان",
            field: "title",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-right" }
        },
        {


            title: "سیستمی",
            field: "isSystematic",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            filter: 'boolean',
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.isSystematic} />
                )
            },
        },
        {
            title: "رتبه مرتب سازی",
            field: "priority",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد روز قفل گذار",
            field: "dayOfAutomaticLock",
            show: true,
            isFixed: false,
            dynamicColumn: false,

        },
        {
            title: "قفل گذار",
            field: "automaticLockedByUserName",
            show: true,
            isFixed: false,
            dynamicColumn: false,

        },
        {
            title: "موعد تسویه",
            field: "SettelmentDay",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "تغییر اولویت",
            field: "editPriority",
            width: "80px",
            show: true,
            isFixed: true,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Priority priorityService={ChangeVoucherTypeManagementPriorityService.updatevouchercategorypriorityMethod}
                          
                         info={event.dataItem}
                        />
                    </td>

                )

            }
        },
        {
            title: "عملیات",
            width: "100px",
            show: true,
            isFixed: true,
            dynamicColumn: true,

            cell: (event) => {
                return (
                    <td>
                        <Delete deleteService={DeleteVoucherTypeManagementService.deletevouchercategoryMethod} {...prop} info={event.dataItem} entity={event.dataItem.code} />
                        <Edit {...prop} stateParams={{ code: event.dataItem.code, id: event.dataItem.id }} />
                    </td>
                )
            }


        },
    ];
};


export default Columns;