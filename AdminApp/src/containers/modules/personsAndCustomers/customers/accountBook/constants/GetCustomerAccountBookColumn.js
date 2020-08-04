export function Column() {
    return [
        {
            title: "تاریخ",
            field: "voucherDateJalali",
            width: "200px",
            attributes: { class: "text-center" },
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>"
        },
        {
            title: "شرح سند",
            field: "description",
            width: "400px"

        },
        {
            title: " بدهکار",
            field: "debit",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: "<div class='total-debit text-right'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-debit-sum text-right"></div>'
        },
        {
            title: " بستانکار",
            field: "credit",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: "<div class='total-credit text-right'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-credit-sum text-right"></div>'
        },

        {
            title: "مانده بدهکار",
            field: "debitRemain",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-right'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-debit-remain text-right"></div>'
        },
        {
            title: "مانده بستانکار",
            field: "creditRemain",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-right'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-credit-remain text-right"></div>'
        },
        {
            title: "مانده کل",
            field: "remain",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            template: '#if(data.remain>=0){#' +
                '<b>#= Math.abs(data.remain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(data.remain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#',
            footerTemplate: '<div class="text-right total-page-reamin"></div>' +
                '<div class="total-remain-sum text-right"></div>',
            field: "remain"
        },
    ];

}
