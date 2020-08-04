import React from 'react';

import { Edit, CheckColumn, Delete } from 'shared/components/kendoGrid/kendoGrid';
import DeleteServicesService from '../services/DeleteServicesService';
// import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
const Columns = function (prop, state, classes) {
    return [
        {
            title: "عنوان",
            field: "title",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "توضیحات",
            field: "description",
            show: true,
            isFixed: false,
            class: "text-right",
            dynamicColumn: false,


        },
        {
            title: "ویرایش",
            // field: "accountNumber",
            isFixed: true,
            width: "100px",
            dynamicColumn: true,

            cell: (event) => {
                return (

                    <Delete  deleteService={DeleteServicesService.deleteserviceMethod} {...prop} info={event.dataItem} entity={{id: event.dataItem.id}} title={event.dataItem.title} />
                )
            },

        },

    

    ];

}


export default Columns;