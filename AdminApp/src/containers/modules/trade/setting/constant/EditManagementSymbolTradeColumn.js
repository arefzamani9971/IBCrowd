import React from 'react';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';
import {Show} from 'shared/components/kendoGrid/kendoGrid'

const Columns = function (props, state, classes) {
    return [

       
        {
            title: "عنوان نماد",
            field: "symbol",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: " نام شرکت",
            field: "title",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: " نماد سپرده گذاری",
            field: "csdSymbol",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شناسه",
            field: "Isin",
            show: true,
            width: "150px",
            class: "text-center",
            isFixed: false,
            dynamicColumn: false,
        },

        {
            title: "وضعیت",
            field: "status",
            show: true,
            width: "90px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نوع ابزار مالی",
            field: "accountingType",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: " نوع نماد",
            field: "productType",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: " نوع ETF",
            field: "etfType",
            show: true,
            width: "180px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: " نوع بورس",
            field: "stockExchangeId",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: " روز تسویه",
            field: "settlementDay",
            show: true,
            width: "100px",
            class: "text-center",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: " نام صنعت",
            field: "sectorId",
            show: true,
            width: "290px",
            class: "text-right",
            isFixed: false,
        },
        {
            title: "  معتبر از",
            field: "validFrom",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: " معتبر تا",
            field: "validTo",
            show: true,
            width: "160px",
            isFixed: false,
            dynamicColumn: false,
        }
        ,
        {
            title: "عملیات",
            isFixed: true,
            width: "80px",
            dynamicColumn: true,
            cell: (event) => {
                props.editSymbolTrade.id = event.dataItem.id
                
                return (
                    <Edit   {...props} routeEdit={props.editSymbolTrade} stateParams={props.editSymbolTrade.id}  />
                )
            }
        },
        {
            title: "مشاهده",
            isFixed: true,
            width: "80px",
            dynamicColumn: true,
            cell: (event) => {
              
                return (
                    <Show   {...props} detail={props.observeSymbolTrade} stateParams={props.observeSymbolTrade.id}  />
                )
            }
        }


    ];

}


export default Columns;