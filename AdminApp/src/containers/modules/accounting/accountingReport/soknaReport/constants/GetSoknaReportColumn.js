const Columns = function (prop, state, classes) {
    return [
        {
            title: "نام مشتری",
            field: "fullPartyName",
            width: '200px',
            attributes: { class: "text-right" },
            footerTemplate: "<div>جمع صفحه</div><div style='margin-top: 10px'>جمع کل</div>"
        },
        {
            title: "کد ملی",
            field: "nationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "کد حساب",
            field: "detailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "کد بورسی",
            field: "bourseCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "پرداخت",
            field: "payment",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            template: '#if(data.payment>=0){#' +
                '<b>#= Math.abs(data.payment).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(data.payment).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#',
        },
        {
            title: "دریافت",
            field: "deposits",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            template: '#if(data.deposits>=0){#' +
                '<b>#= Math.abs(data.deposits).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(data.deposits).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#',
        },
        {
            title: "مانده",
            field: "remainT0",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            aggregates: ["sum"],
            template: '#if(data.remainT0>=0){#' +
                '<b>#= Math.abs(data.remainT0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(data.remainT0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#',
            footerTemplate:
                '#if(sum > 0 ){#' +
                '<b>#= Math.abs(sum).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(sum).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#' +
            // "<div>#=kendo.toString(sum, 'n0')#</div>" +
                "<div class='total-remain-sum'></div>"

        },
    ];
};


export default Columns;