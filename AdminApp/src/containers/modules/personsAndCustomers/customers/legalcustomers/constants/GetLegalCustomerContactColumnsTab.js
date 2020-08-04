import React from 'react';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
import DeleteManagedCustomerContactServices from '../../managedCustomerContact/services/deleteManagedCustomerContactService';

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
                        <Delete deleteService={DeleteManagedCustomerContactServices.deleteContactByIdMethod}  info={event.dataItem} entity={event.dataItem.id}  {...props}  fullName={event.dataItem.fullName}/>
                        {/* <Edit {...props} stateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/> */}
                        <span class="fas fa-edit edit" style={{color: 'rgb(33, 150, 243)', cursor: 'pointer', fontSize: '15px', margin:' 5px',}} onClick={() => props.EditCustomerContactTab(event.dataItem.id)}></span>
                        
                    </td>
                )
            }
        },
        {
            title: "نام/ نام خانوادگی",
            field: "fullName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
            width: "150px"
        },
        {
            title: "شناسه ملی",
            field: "nationalId",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تلفن",
            field: "phone",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تلفن محل کار",
            field: "businessPhone",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تلفن منزل",
            field: "homePhone",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شماره همراه",
            field: "mobile",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "فکس",
            field: "fax",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نوع نشانی",
            field: "addressTypeTitle",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نشانی",
            field: "address",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false,
        },

        {
            title: "نشانی محل کار",
            field: "businessAddress",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نشانی منزل",
            field: "homeAddress",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد پستی",
            field: "postalCode",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "وب سایت",
            field: "webPage",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "--",
            field: "imAddress",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "ایمیل اول",
            field: "email1",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "ایمیل دوم",
            field: "email2",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "ایمیل سوم",
            field: "email3",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "استان",
            field: "upRegionTitle",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شهر",
            field: "regionTitle",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "پیش فرض",
            field: "isDefault",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.isDefault} />
                )
            },
        },
        {
            title: "توضیحات",
            field: "description",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تلفن به همراه پیش شماره",
            field: "fullPhoneNumber",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ ویراش",
            field: "modifiedJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        }
       

    ];
}


export default Columns;