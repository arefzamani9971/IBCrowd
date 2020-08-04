const Columns = function (prop, state, classes) {

    return [
        {
            selectable: "multiple, row",
            width: "40px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام مشتری",
            field: "toPartyFullName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>"
        },
        {
            title: "وضعیت",
            field: "stateTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
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
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            filter: "numeric",
            format: "{0:n0}",
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-amount-sum'></div>"
        },
        {
            title: "مبلغ درخواستی",
            field: "requestedAmount",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '140px',
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            filter: "numeric",
            format: "{0:n0}",
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-requestedAmount-sum'></div>"
        },
        {
            title: "بانک پرداختی",
            field: "fromBankDepositTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "نام بانک پرداختی",
            field: "fromBankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "کد شعبه بانک پرداختی",
            field: "fromBranchCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "نام شعبه بانک پرداختی",
            field: "fromBranchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
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
            title: "شماره سند بانکی",
            field: "trakingNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '130px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ درخواست",
            field: "requestedDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
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
            title: "تلفن ضروری",
            field: "necessaryPhone",
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
            title: "مبدا ثبت",
            field: "orderRegisterFromTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '130px',
            attributes: { class: "text-center" }
        },
        {
            title: "کد حسابداری مشتری",
            field: "toDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "شناسه ملی",
            field: "toNationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '100px',
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
            title: "شماره حساب بانکی مشتری",
            field: "toPartyAccountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره شبای مشتری",
            field: "toPartyIBAN",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "دسته چک",
            field: "chequeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره سریال برگه چک",
            field: "chequeNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "نوع تراکنش",
            field: "transactionTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '110px',
            attributes: { class: "text-center" }
        },
        {
            title: "انتقال وجه با",
            field: "cashFlowCategoryTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '130px',
            attributes: { class: "text-center" }
        },
        {
            title: "دلیل",
            field: "reasonTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '250px'
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
            width: '170px',
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
        },
        {
            title: "عملیات",
            isFixed: true,
            width: "70px",
            dynamicColumn: true,
            template: '<div style="text-align: center;">'
                +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>'
                +
                '</div>'
        }
    ];

};

export default Columns;