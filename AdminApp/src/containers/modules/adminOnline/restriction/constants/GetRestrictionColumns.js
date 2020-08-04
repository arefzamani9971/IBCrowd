import React from 'react'
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import GetRestrictionService from '../services/GetRestrictionService';

const Columns = function (props) {

    return [
        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Delete deleteService={GetRestrictionService.deleteBrokerRule} {...props} info={event.dataItem} entity={event.dataItem.id}
                            title={event.dataItem.name} />
                        <Edit {...props} stateParams={{id: event.dataItem.id}} />
                    </td>
                )
            }
        },
        {
            title: "نام محدودیت",
            field: "name",
            show: true,
            width: "180px"
        },
        {
            title: "جهت سفارش",
            field: "orderTitle",
            show: true,
            width: "100px",
            class: "text-center"
        },
        {
            title: "کاربران",
            field: "users",
            show: true,
            width: "200px"
        },
        {
            title: "نمادها",
            field: "isiNs",
            show: true,
            width: "200px"
        },
        {
            title: "گروه نمادها",
            field: "isinGroups",
            show: true,
            width: "200px"
        },
        {
            title: "صنعت ها",
            field: "industries",
            show: true,
            width: "200px"
        },
        {
            title: "توضیحات",
            field: "returnErrorDescription",
            show: true,
            width: "250px"
        },
        {
            title: "فعال",
            field: "enabled",
            show: true,
            width: "80px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.enabled} />
                )
            },
        },
        {
            title: "وضعیت",
            field: "stateTitle",
            show: true,
            width: "150px",
            class: "text-center"
        },
        {
            title: "از تاریخ",
            field: "fromDate",
            show: true,
            width: "120px",
            class: "text-center"
        },
        {
            title: "تا تاریخ",
            field: "toDate",
            show: true,
            width: "120px",
            class: "text-center"
        },
        {
            title: "از زمان",
            field: "fromTime",
            show: true,
            width: "120px",
            class: "text-center"
        },
        {
            title: "تا زمان",
            field: "toDate",
            show: true,
            width: "120px",
            class: "text-center"
        }


    ]
}

export default Columns;