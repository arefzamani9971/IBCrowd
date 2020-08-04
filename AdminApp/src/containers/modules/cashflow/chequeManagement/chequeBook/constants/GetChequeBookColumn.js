import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import DeleteChequeBookServices from "../services/DeleteChequeBookServices";
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';

const Columns = function (prop, state, classes) {

    return [
        {
            title: "شماره حساب بانک",
            field: "accountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
        },
        {
            title: "عنوان دسته چک",
            field: "title",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px'
        },
        {
            title: "از شماره سریال",
            field: "fromSerial",
            show: true,
            isFixed: true,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "تا شماره سریال",
            field: "toSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "قالب چک",
            field: "printFormat",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '100px'
        },
        {
            title: "دسته چک پیش فرض",
            field: "isDefault",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '150px',
            filter: 'boolean',
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.isDefault} />
                )
            },
        },
        {
            title: "فعال",
            field: "isActive",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '70px',
            filter: "boolean",
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.isActive} />
                )
            },
        },
        {
            title: "کد حساب حسابداری",
            field: "detailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px'
        },
        {
            title: "عنوان حساب حسابداری",
            field: "detailLedgerTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '220px',
            class: "text-right"
        },
        {
            title: "نام بانک",
            field: "bankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px'
        },
        {
            title: "نام شعبه بانک",
            field: "branchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px'
        },
        {
            title: "نوع حساب",
            field: "accountTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "نوع چک",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "تاریخ آخرین ویرایش کننده",
            field: "modifiedJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "عملیات",
            isFixed: true,
            width: "80px",
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Delete deleteService={DeleteChequeBookServices.deleteCashFlowChequeMasterByIdMethod} {...prop} info={event.dataItem} entity={event.dataItem.id} title={event.dataItem.title} />
                        <Edit {...prop} stateParams={{ partyId: event.dataItem.partyId, id: event.dataItem.id, nationalId: event.dataItem.nationalId }} />
                    </td>
                )
            }
        }
    ];

};

export default Columns;