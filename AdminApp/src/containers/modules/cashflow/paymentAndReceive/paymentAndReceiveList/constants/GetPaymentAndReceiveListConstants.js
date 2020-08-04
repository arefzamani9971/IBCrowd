import { isCheck } from "../../../../../../constants/kendoUiGrid";

const Columns = function (prop, state, classes) {

    return [
        {
            title: "نوع تراکنش",
            field: "transactionTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '110px',
            footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
            attributes: { class: "text-center" }
        },
        {
            title: "نام مشتری",
            field: "partyFullName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
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
            title: "مبلغ باقیمانده سند",
            field: "remainValue",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '140px',
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            attributes: { class: "text-right" },
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-requestedAmount-sum'></div>"
        },
        {
            title: "مبلغ درخواستی",
            field: "requestedAmount",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '140px',
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            attributes: { class: "text-right" },
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-remainValue-sum'></div>"
        },
        {
            title: "مبلغ تایید شده",
            field: "amount",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '140px',
            aggregates: ["sum"],
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-amount-sum'></div>"
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
            title: "تاریخ انجام",
            field: "dueDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "تفصیل مبدا",
            field: "fromDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '100px',
            attributes: { class: "text-center" }
        },
        {
            title: "تفصیل مقصد",
            field: "toDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "معین مبدا",
            field: "fromSubsidiaryLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '100px',
            attributes: { class: "text-center" }
        },
        {
            title: "معین مقصد",
            field: "toSubsidiaryLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "شناسه ملی",
            field: "nationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '100px',
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه مشتری",
            field: "customerBranchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "بانک پرداختی",
            field: "fromBankDepositTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
        },
        {
            title: "نام بانک پرداختی",
            field: "fromBankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "حساب پرداختی کارگزاری",
            field: "fromAccountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه پرداختی کارگزاری",
            field: "fromBranchCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "نام شعبه پرداختی کارگزاری",
            field: "fromBranchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "نام بانک دریافتی کارگزاری",
            field: "toBankDepositTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "بانک دریافتی کارگزاری",
            field: "toBankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "حساب دریافتی کارگزاری",
            field: "toAccountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "حساب مشتری",
            field: "toPartyAccountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "بانک مشتری",
            field: "toPartyBankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره شبای مشتری",
            field: "toPartyIBAN",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره پیگیری",
            field: "trakingNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره سند حسابداری",
            field: "voucherNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره سند بانکی",
            field: "receiptNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "نوع دریافت و پرداخت",
            field: "cashFlowTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px',
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
            title: "علت واریز وجه",
            field: "reasonTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '250px'
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
            title: "شرح مشتری",
            field: "customerDescription",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '250px'
        },
        {
            title: "شرح کارگزاری",
            field: "brokerDescription",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '250px'
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
            title: "تلفن ضروری",
            field: "necessaryPhone",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه ثبت کننده",
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
            title: "تایید کننده",
            field: "confirmerName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '150px'
        },
        {
            title: "تاریخ تایید",
            field: "confirmationDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ حذف",
            field: "deletionDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '120px',
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
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "وضعیت برگه چک",
            field: "chequeStatusTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '170px',
            attributes: { class: "text-center" }
        },
        {
            title: "پیوست",
            field: "hasAttachment",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '80px',
            template: isCheck("hasAttachment")
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