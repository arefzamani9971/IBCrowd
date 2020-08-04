import { isCheckByNumber, OrderSide } from "../../../../../../constants/kendoUiGrid";

const Columns = function (prop, state, classes) {

    return [
        {
            title: "جهت سفارش",
            field: "orderSideDescription",
            width: "110px",
            template: OrderSide("orderSideDescription"),
            attributes: { class: "text-center" },
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>"
        },
        {
            title: "کد ملی",
            field: "nationalId",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "عنوان مشتری",
            field: "partyFullName",
            width: "200px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد بورسی",
            field: "bourseCode",
            width: "90px",
            attributes: { class: "text-center" }
        },
        {
            title: "از تاریخ",
            field: "validFromJalali",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "تا تاریخ",
            field: "validUntilJalali",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ سفارش",
            field: "dateJalali",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ انجام سفارش",
            field: "execuationDateJalali",
            width: "140px",
            attributes: { class: "text-center" }
        },
        {
            title: "مبلغ (ریال)",
            field: "amount",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-amount-sum text-right"></div>'
        },
        {
            title: "تعداد",
            field: "volume",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            template: '#= Math.abs(volume).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#',
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-volume-sum text-right"></div>'
        },
        {
            title: "قیمت",
            field: "price",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-price-sum text-right"></div>'
        },
        {
            title: "مبلغ باقی مانده",
            field: "remainingAmount",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-remainingAmount-sum text-right"></div>'
        },
        {
            title: "تعداد باقی مانده",
            field: "remainingVolume",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-remainingVolume-sum text-right"></div>'
        },
        {
            title: "نام صنعت",
            field: "sectorTitle",
            attributes: { class: "text-center" },
            width: "220px"
        },
        {
            title: "وضعیت",
            field: "orderStateDescription",
            attributes: { class: "text-center" },
            width: "110px"
        },
        {
            title: "شماره سریال",
            field: "serialNumber",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "نوع سفارش",
            field: "orderTypeDescription",
            attributes: { class: "text-center" },
            width: "110px"
        },
        {
            title: "ISIN",
            field: "isin",
            attributes: { class: "text-center" },
            width: "110px"
        },
        {
            title: "نام نماد",
            field: "symbol",
            attributes: { class: "text-center" },
            width: "80px"
        },
        {
            title: "نام سهم (شرکت)",
            field: "productTitle",
            attributes: { class: "text-center" },
            width: "170px"
        },
        {
            title: "بازار",
            field: "stockExchangeTitle",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "شعبه ثبت کننده ",
            field: "branchName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "ارجاع به شعبه",
            field: "assignedBranchTitle",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "آخرین شعبه تخصیصی",
            field: "assignedBranchStation",
            attributes: { class: "text-center" },
            width: "160px"
        },
        {
            title: "توضیحات مشتری",
            field: "senderDescription",
            attributes: { class: "text-right" },
            width: "250px"
        },
        {
            title: "توضیحات کارگزاری",
            field: "traderDescription",
            attributes: { class: "text-right" },
            width: "250px"
        },
        {
            title: "علت ارجاع",
            field: "orderRejectionReasonTitle",
            attributes: { class: "text-right" },
            width: "250px"
        },
        {
            title: "عنوان کاربر",
            field: "createdByTitle",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "زمان ثبت سفارش",
            field: "createdJalali",
            attributes: { class: "text-center" },
            width: "140px"
        },
        {
            title: "چاپ شده؟",
            field: "isPrinted",
            width: "100px",
            attributes: { class: "text-center" },
            template: isCheckByNumber("isPrinted")
        },
        {
            title: "امضاء شده؟",
            field: "isConfirmed",
            width: "110px",
            attributes: { class: "text-center" },
            template: isCheckByNumber("isConfirmed")
        },
        {
            title: "درخواست انصراف",
            field: "requestCancel",
            width: "140px",
            attributes: { class: "text-center" },
            template: isCheckByNumber("requestCancel")
        },
        {
            title: "زمان درخواست انصراف",
            field: "requestCancelationTimeJalali",
            attributes: { class: "text-center" },
            width: "160px"
        },
        {
            title: "مبدا ثبت",
            field: "orderRegisterFromDescription",
            attributes: { class: "text-center" },
            width: "130px"
        },
        {
            title: "تاریخ ایجاد",
            field: "modifiedBy",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "ایجاد کننده",
            field: "createdBy",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "آخرین ویرایشگر",
            field: "modifiedByTitle",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "عملیات",
            isFixed: true,
            width: "70px",
            dynamicColumn: true,
            template:
                '#if(state === 4 || state === 5 || state === 6 || state === 8 ){ # ' +
                '<div style="text-align: center;">'
                +
                '<span class="fas fa-eye detail" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>'
                +
                '</div> #}# '
        }
    ];

}

export default Columns;