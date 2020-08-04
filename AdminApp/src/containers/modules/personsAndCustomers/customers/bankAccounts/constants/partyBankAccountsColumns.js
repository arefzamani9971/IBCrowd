import React from 'react';
// import { Edit, Delete } from 'shared/components/kendoGrid/kendoGrid';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
// import DeleteCustomersTradingCode from "../../customerTradingCodes/services/DeleteCustomersTradingCodeServices";
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import DeletePartyBankAccountService from "../services/deletePartyBankAccountService";
const Columns = function (props, state, classes) {
    return [
        {
            
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Delete  {...props} deleteService={DeletePartyBankAccountService}  info={event.dataItem} entity={{id: event.dataItem.id, partyId: event.dataItem.partyId}}  fullName={event.dataItem.fullAccountTitle} title={event.dataItem.bankTitle}/>
                        <Edit {...props} stateParams={{ partyId: event.dataItem.partyId, id: event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}} />

                    </td>
                )
            }
        },
        {
            title: "نام و نام خانوادگی مشتری",
            field: "partyFullName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
            width: '230px'
        },
        {
            title: "کد ملی",
            field: "nationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "مشتری",
            field: "partyTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "نام بانک",
            field: "bankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "نام شعبه",
            field: "branchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "استفاده برای",
            field: "bankAccountUsagesTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "کد شعبه",
            field: "branchCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "نوع حساب",
            field: "accountTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px'
        },
        {
            title: "شماره حساب",
            field: "accountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شبا",
            field: "iban",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "نام صاحب حساب",
            field: "bankAccountOwnerName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "حساب پیش فرض",
            field: "isDefault",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '150px',
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.isDefault} />
                )
            },
        },
        {
            title: "خرید از محل بانک",
            field: "purchaseFromBank",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '150px',
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.purchaseFromBank} />
                )
            },
        }
        
    ];

}


export default Columns;