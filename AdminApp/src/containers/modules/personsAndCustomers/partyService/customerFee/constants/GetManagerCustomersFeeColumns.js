import React from 'react';
import { CheckColumn } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import GetManagerCustomersFeeService from '../services/GetManagerCustomersFeeService';
const Columns = function (props) {
    return [
        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                let partyFullName = "";
                if (event.dataItem.partyFullName == "") {
                    partyFullName = event.dataItem.groupTitle;
                } else {
                    partyFullName = event.dataItem.partyFullName;
                }
                return (
                    
                    <td>
                        <Edit  {...props} routeEdit={props.edit} stateParams={{ id: event.dataItem.id }} />
                        <Delete deleteService={GetManagerCustomersFeeService.deletePartyTradeDiscount}  {...props} info={event.dataItem}
                            entity={event.dataItem.id} fullName={partyFullName} />
                    </td>
                )
            },

        },
        {
            title: "عنوان مشتری",
            field: "partyFullName",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right"

        },
        {
            title: "کد معاملاتی",
            field: "pamCode",
            show: true,
            width: "100px",
            class: "text-center",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شناسه ملی",
            field: "nationalId",
            show: true,
            width: "100px",
            class: "text-center",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "نماد",
            field: "symbol",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "شناسه نماد",
            field: "isin",
            show: true,
            width: "100px",
            class: "text-center",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "عنوان شرکت",
            field: "productTitle",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "عنوان گروه",
            field: "groupTitle",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "همه نمادها",
            show: true,
            width: "80px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.allSymbols} />
                )
            },
        },
        {
            title: "وضعیت",
            field: "status",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.status == 1} />
                )
            },


        },
        {
            title: "اولویت",
            field: "priority",
            show: true,
            width: "80px",
            class: "text-center",
            isFixed: false,
            dynamicColumn: false

        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            show: true,
            width: "100px",
            class: "text-center",
            isFixed: false,
            dynamicColumn: false

        },
        {
            title: "ایجادکننده",
            field: "createdByName",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false

        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            show: true,
            width: "100px",
            class: "text-center",
            isFixed: false,
            dynamicColumn: false

        },
        {
            title: "آخرین ویرایشگر",
            field: "modifiedByName",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false

        }
       

    ];

}


export default Columns;