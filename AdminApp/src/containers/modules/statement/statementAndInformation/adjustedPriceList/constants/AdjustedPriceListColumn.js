import React from 'react';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
/////////////////////////////////////////////////////////////////////////////////////
import AdjustedPriceListService from '../services/AdjustedPriceListService';

const Columns = function (prop, state, classes) {
    return [
        {
            title: "شناسه نماد",
            field: "chequeSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "نماد",
            field: "chequeStateTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "قیمت پایانی",
            field: "cashFlowChequeMasterTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "قیمت تعدیل شده",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "آخرین قیمت معامله شده",
            field: "description",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "آخرین قیمت معامله شده ی تعدیل شده",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "تاریخ",
            field: "description",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان مجمع",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "نوع مجمع",
            field: "description",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "جزییات مجمع",
            field: "closingPrice",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            cell: (event) => {
                return (
                    <td>
                        <Edit {...prop} stateParams={{ partyId: event.dataItem.partyId, id: event.dataItem.id, nationalId: event.dataItem.nationalId }} />
                    </td>
                )
            }
        },
        {
            title: "محاسبه قیمت تعدیلی",
            field: "closingPrice",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            cell: (event) => {
                return (
                    <td>
                        <button className="btn btn-primary">محاسبه</button>
                    </td>
                )
            }
        }
    ];
}

export default Columns;