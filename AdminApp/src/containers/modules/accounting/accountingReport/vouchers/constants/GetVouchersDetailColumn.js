import React from 'react';
import { Show, Edit, CheckColumn } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (prop, state, classes) {

    return [
        {
            title: "ردیف سند",
            field: "rowNumber",
            show: true,
            width: "8%",
            isFixed: false,
            dynamicColumn: false,
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",

        },
        {
            title: "حساب معین",
            field: "subsidiaryLedgerCode",
            show: true,
            width: "10%",
            isFixed: false,
            dynamicColumn: false,
            class: "text-center",

        },
        {
            title: "عنوان معین",
            field: "subsidiaryLedgerTitle",
            show: true,
            width: "16%",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "حساب تفصیلی",
            field: "detailLedgerCode",
            show: true,
            width: "10%",
            class: "text-center",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "عنوان تفصیلی",
            field: "detailLedgerTitle",
            show: true,
            width: "16%",
            class: "text-right",
            isFixed: false,

        },
        {
            title: "شرح ردیف",
            field: "description",
            show: true,

            class: "text-right font-small",
            isFixed: false,

            dynamicColumn: false,
        },
        {
            title: "بدهکار",
            field: "debit",
            show: true,
            width: "10%",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            class: "text-right",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-right'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-debit-sum text-right"></div>'

        },
        {
            title: "بستانکار",
            field: "credit",
            show: true,
            width: "10%",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            class: "text-left",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-right'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-credit-sum text-right"></div>'

        },



    ];

}


export default Columns;