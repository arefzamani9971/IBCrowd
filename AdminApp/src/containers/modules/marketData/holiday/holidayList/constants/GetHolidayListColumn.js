import React from 'react';
///////////////////////////////////////////////////////////////////////////////
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
///////////////////////////////////////////////////////////////////////////////
import HolidayService from '../services/HolidayService';

const Columns = function (prop, state, classes) {

    return [
        {
            title: "تاریخ",
            field: "dateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان",
            field: "reason",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "حذف",
            isFixed: true,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Delete deleteService={HolidayService.deleteHoliday} {...prop} info={event.dataItem} entity={event.dataItem.id} />
                    </td>
                )
            }
        },
        {
            title: "ویرایش",
            isFixed: true,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Edit {...prop} stateParams={{ id: event.dataItem.id }} />
                    </td>
                )
            }
        }
    ];

};

export default Columns;