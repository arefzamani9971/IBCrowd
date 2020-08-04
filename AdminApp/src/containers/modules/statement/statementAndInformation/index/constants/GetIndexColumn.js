import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import AdjustedPriceCalculateComponent from 'shared/components/adjustedPriceCalculate/adjustedPriceCalculate';

const Columns = function (prop, state, classes) {

    return [
        {
            title: "نماد",
            field: "symbol",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "80px"
        },
        {
            title: "شناسه",
            field: "isin",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "110px"
        },
        {
            title: "شرکت",
            field: "companyName",
            show: true,
            isFixed: true,
            dynamicColumn: false,
            width: "200px"
        },
        {
            title: "گزارش",
            field: "title",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "300px"
        },
        {
            title: "نوع مجمع",
            field: "assemblyTypeString",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "100px"
        },
        {
            title: "مبلغ سود تقسیمی",
            field: "dividendPerShare",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "130px",
            format: "{0:n0}",
            class: "text-right"
        },
        {
            title: "درصد افزایش سرمایه",
            field: "CapitalChangePercent",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "140px",
            class: "text-right"
        },
        {
            title: "زمان ارسال",
            field: "sentDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "100px"
        },
        {
            title: "زمان انتشار",
            field: "publishDateDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "100px"
        },
        {
            title: "تأیید شده؟",
            field: "generalAssemblyStatus",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            filter: 'boolean',
            width: "100px",
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.generalAssemblyStatus == 1} />
                )
            },
        },
        {
            title: "جزئیات مجمع",
            isFixed: true,
            dynamicColumn: true,
            width: "90px",
            cell: (event) => {
                return (
                    <td>
                        {
                            event.dataItem.hasGeneralAssembly ?
                                <Edit {...prop} stateParams={{ tracingNo: event.dataItem.tracingNo }} /> :
                                ''
                        }
                    </td>
                )
            }
        },
        {
            title: "تعدیلات قیمت",
            isFixed: true,
            dynamicColumn: true,
            width: "90px",
            cell: (event) => {
                return (
                    <td>
                        <AdjustedPriceCalculateComponent info={event.dataItem}></AdjustedPriceCalculateComponent>
                    </td>
                )
            }
        },
        {
            title: "ضمائم",
            isFixed: true,
            dynamicColumn: true,
            width: "90px",
            cell: (event) => {
                return (
                    <td>
                        {
                            event.dataItem.fileUrl ?
                                <a href={event.dataItem.fileUrl} target="_blank">
                                    <i class="far fa-file-pdf" style={{ fontSize: "23px", color: "rgb(238, 10, 10)", cursor: "pointer" }}></i>
                                </a> :
                                ''
                        }
                        {
                            event.dataItem.excelUrl ?
                                <a href={event.dataItem.excelUrl} target="_blank">
                                    <i class="far fa-file-excel" style={{ fontSize: "23px", color: "rgb(24, 163, 105)", marginRight: "15px", cursor: "pointer" }}></i>
                                </a> :
                                ''
                        }
                        {
                            event.dataItem.attachmentUrl ?
                                <a href={event.dataItem.attachmentUrl} target="_blank">
                                    <i class="fas fa-paperclip" style={{ fontSize: "23px", marginRight: "15px", cursor: "pointer" }}></i>
                                </a> :
                                ''
                        }
                    </td>
                )
            }
        }
    ];

};

export default Columns;