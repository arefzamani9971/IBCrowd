import React from 'react';
// import { Delete} from 'shared/components/kendoGrid/kendoGrid';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';
// import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
// import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
// import DeleteManagedCustomerContactServices from "../services/deleteManagedCustomerContactService";

const Columns = function (props, list, classes) {
    return [
        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                let edit = event.dataItem.partyType === 1 ? props.edit[0] : props.edit[1];

                return (
                    <Edit  {...props} edit={edit} routeEdit={edit} stateParams={{ partyId: event.dataItem.id }} />
                )
            }
        },
        {
            title: "نام و نام خانوادگی مشتری",
            field: "fullName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
            width: "250px"
        },
        {
            title: "کد ملی",
            field: "nationalId",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد حساب",
            field: "detailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "150px"
        },
        {
            title: "تاریخ ثبت",
            field: "createdJalai",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalai",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کارت ملی",
            field: "nationalCard",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.nationalCard} />
                )
            }
        },
        {
            title: "پشت کارت ملی",
            field: "behindOfNationalCard",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.behindOfNationalCard} />
                )
            }
        },
        {
            title: "صفحه اول شناسنامه",
            field: "firstPageOfIdentificationCard",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.firstPageOfIdentificationCard} />
                )
            }
        },
        {
            title: "صفحه دوم شناسنامه",
            field: "secondPageOfIdentificationCard",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.secondPageOfIdentificationCard} />
                )
            }
        },
        {
            title: "گذرنامه",
            field: "passport",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.passport} />
                )
            }
        },
        {
            title: "تصوی امضا",
            field: "signImage",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.signImage} />
                )
            }
        },
        {
            title: "فرم تعهدنامه",
            field: "commitmentForm",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.commitmentForm} />
                )
            }
        },
        {
            title: "تاییدیه حساب بانکی",
            field: "bankAccountConfirmation",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.bankAccountConfirmation} />
                )
            }
        },
        {
            title: "تصویر قرارداد آنلاین",
            field: "onlineContractImage",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.onlineContractImage} />
                )
            }
        },
        {
            title: "تصویر قرارداد آفلاین",
            field: "offlineContractImage",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.offlineContractImage} />
                )
            }
        },
        
        {
            title: "کد پستی",
            field: "postalCode",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.postalCode} />
                )
            }
        },
        {
            title: "روزنامه رسمی",
            field: "officialNewspaper",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.officialNewspaper} />
                )
            }
        },
        {
            title: "سایر",
            field: "postalCode",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.postalCode} />
                )
            }
        }
       
    ];

}


export default Columns;