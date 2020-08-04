import React from 'react';
const Columns = function (prop, state) {
    return [

        {
            title: "کد حساب",
            field: "accountCode",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ سند",
            field: "voucherDateJalali",
            show: true,
            width: "200px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false,
        },
        {
            title: "عنوان حساب",
            field: "accountTitle",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "شناسه حساب",
            field: "accountId",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "جمع بدهکار",
            field: "debitSum",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-right" }
        },
        {
            title: "جمع بستانکار",
            field: "creditSum",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-right" }
        },

        {
            title: "مانده بدهکار",
            field: "debitLeave",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-right" },

        },
        {
            title: "مانده بستانکار",
            field: "creditLeave",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-right" },
            template: '#if(creditLeave>=0){#' +
            '<b>#= Math.abs(creditLeave).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
            'else {#' +
            '<b class="red-color">(#= Math.abs(creditLeave).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#',

        },

    ];
};


export default Columns;