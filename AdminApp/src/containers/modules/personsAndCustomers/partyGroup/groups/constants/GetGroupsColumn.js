import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import GetGroupsService from '../services/GetGroupsService';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';


const Columns = function (props) {

    return [

        {
            title: "عنوان گروه",
            field: "title",
            show: true,


        },
        {
            title: "وضعیت",
            width: "100px",
            show: true,
            dynamicColumn: true,

            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.status} />
                )
            },

        },
        {
            title: "نوع گروه",
            field: "groupType.title",
            width: "120px",
            show: true,

        },
        {
            title: "تاریخ ایجاد",
            width: "120px",
            field: "createdJalali",
            show: true,

        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            width: "180px",
            show: true,
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            width: "120px",
            show: true,


        },
        {
            title: "ویرایش کننده",
            field: "modifiedByName",
            width: "180px",
            show: true,
        },
        {

            title: "عملیات",
            width: '150px',
            show: true,
            dynamicColumn: true,
            cell: (event) => {

                return (
                    <td>
                        <Edit {...props} stateParams={{ id: event.dataItem.id }} />
                        <Delete deleteService={GetGroupsService.deleteGroup} entity={{ id: event.dataItem.id, title: event.dataItem.title }} />
                        <span
                            onClick={() => props.onChangePage(event.dataItem)}
                            class="fas fa-list list"></span>

                    </td>
                )
            }


        }
    ];
};


export default Columns;