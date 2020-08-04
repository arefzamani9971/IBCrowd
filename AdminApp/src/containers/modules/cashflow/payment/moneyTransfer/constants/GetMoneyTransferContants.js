const Columns = function (prop, state, classes) {

    return [
        {
            selectable: true,
            width: "40px",
            attributes: { class: "text-center" }
        },
        {
            title: "عملیات",
            isFixed: true,
            width: "70px",
            dynamicColumn: true,
            template: '<div style="text-align: center;">'
                +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px"></span>' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px"></span>'
                +
                '</div>'
        },
        {
            title: "انتقال دهنده",
            field: "transmitterFullName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>"
        },
        {
            title: "کد حسابداری انتقال دهنده",
            field: "transmitterDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '180px',
            attributes: { class: "text-center" }
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
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '140px',
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-amount-sum'></div>"
        },
        {
            title: "شناسه ملی انتقال دهنده",
            field: "transmitterNationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "انتقال گیرنده",
            field: "receiverFullName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "کد حسابداری انتقال گیرنده",
            field: "receiverDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '180px',
            attributes: { class: "text-center" }
        },
        {
            title: "شناسه ملی انتقال گیرنده",
            field: "receiverNationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ انجام",
            field: "dueDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "شرح",
            field: "description",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '250px'
        },
        {
            title: "شماره سند",
            field: "trakingNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه ایجاد کننده",
            field: "branchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "بازار",
            field: "mainMarketTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "آخرین ویرایشگر",
            field: "modifiedByName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        }
    ];

};

export default Columns;