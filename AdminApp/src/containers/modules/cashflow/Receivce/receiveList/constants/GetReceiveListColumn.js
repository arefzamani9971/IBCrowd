const Columns = function (prop, state, classes) {

    return [
        {
            selectable: "multiple, row",
            width: "40px",
            attributes: { class: "text-center" }
        },
        {
            title: "عملیات",
            width: "70px",
            template:
                '<div style="text-align: center;">'
                +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'
                +
                '</div>'
        },
        {
            title: "نام مشتری",
            field: "fromPartyFullName",
            footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
            width: '200px'
        },
        {
            title: "وضعیت",
            field: "stateTitle",
            width: '110px',
            attributes: { class: "text-center" }
        },
        {
            title: "مبلغ",
            field: "amount",
            filter: "numeric",
            format: "{0:n0}",
            width: '140px',
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-amount-sum'></div>"
        },
        {
            title: "مبلغ درخواستی",
            field: "requestedAmount",
            filter: "numeric",
            format: "{0:n0}",
            width: '140px',
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-requestedAmount-sum'></div>"
        },
        {
            title: "بانک دریافتی",
            field: "toBankDepositTitle",
            width: '200px'
        },
        {
            title: "شرح",
            field: "description",
            width: '250px'
        },
        {
            title: "شماره سند بانکی",
            field: "trakingNumber",
            width: '130px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ درخواست",
            field: "requestedDateJalali",
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ انجام",
            field: "dueDateJalali",
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه ایجاد کننده",
            field: "branchName",
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "مبدا ثبت",
            field: "orderRegisterFromTitle",
            width: '130px',
            attributes: { class: "text-center" }
        },
        {
            title: "کد حسابداری مشتری",
            field: "fromDetailLedgerCode",
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "شناسه ملی",
            field: "fromNationalId",
            width: '100px',
            attributes: { class: "text-center" }
        },
        {
            title: "بازار",
            field: "mainMarketTitle",
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "نوع تراکنش",
            field: "transactionTypeTitle",
            width: '110px',
            attributes: { class: "text-center" }
        },
        {
            title: "انتقال وجه با",
            field: "cashFlowCategoryTitle",
            width: '130px',
            attributes: { class: "text-center" }
        },
        {
            title: "دلیل",
            field: "reasonTitle",
            width: '250px'
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "آخرین ویرایشگر",
            field: "modifiedByName",
            width: '150px',
            attributes: { class: "text-center" }
        }
    ];

};

export default Columns;