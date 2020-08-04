import { isCheckByNumber, OrderSide, isCheck } from "../../../../../../constants/kendoUiGrid";

const Columns = function (prop, state, classes) {

    return [
        {
            selectable: true,
            width: "40px",
            attributes: { class: "text-center" }
        },
        {
            title: "جهت سفارش",
            field: "orderSideDescription",
            width: "110px",
            template: OrderSide("orderSideDescription"),
            attributes: { class: "text-center" },
        },
        {
            title: "ارجاع شده",
            field: "isForwarded",
            template: isCheck('isForwarded'),
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "مبدا",
            field: "orderRegisterFromDescription",
            attributes: { class: "text-center" },
            width: "130px"
        },
        {
            title: "نام کاربری",
            field: "createdBy",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "مانده",
            field: "remainT0",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            template: '#if(remainT0>=0){#' +
                '<b>#= Math.abs(remainT0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(remainT0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'
        },
        {
            title: "مانده بلوکه",
            field: "blockRemain",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            template: '#if(blockRemain>=0){#' +
                '<b>#= Math.abs(blockRemain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(blockRemain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'
        },
        {
            title: "تاریخ ثبت سفارش",
            field: "createdJalali",
            width: "140px",
            attributes: { class: "text-center" }
        },
        {
            title: "زمان ثبت سفارش",
            field: "createdTimeOfDay",
            width: "140px",
            attributes: { class: "text-center" }
        },
        {
            title: "نوع سفارش",
            field: "orderTypeDescription",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه مشتری",
            field: "partyBranchName",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه ثبت کننده",
            field: "stationTitle",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-center" },
            aggregates: ["sum"]
        },
        {
            title: "عنوان مشتری",
            field: "partyFullName",
            width: "200px"
        },
        {
            title: "کد بورسی",
            field: "bourseCode",
            width: "90px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد ملی",
            field: "nationalId",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام معرف",
            field: "representativeName",
            width: "200px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام بازاریاب",
            field: "marketerName",
            width: "200px",
            attributes: { class: "text-center" }
        },
        {
            title: "نماد",
            field: "symbol",
            width: "80px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام شرکت",
            field: "companyTitle",
            width: "200px"
        },
        {
            title: "تعداد",
            field: "volume",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"]
        },
        {
            title: "مبلغ (ریال)",
            field: "amount",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"]
        },
        {
            title: "مبلغ باقی مانده",
            field: "remainingAmount",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"]
        },
        {
            title: "تعداد باقی مانده",
            field: "remainingVolume",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"]
        },
        {
            title: "بلوکه سفارشهای باز",
            field: "orderBlock",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"]
        },
        {
            title: "شماره سریال سفارش",
            field: "serialNumber",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "شرط قیمت",
            field: "price",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
        },
        {
            title: "عنوان کاربر",
            field: "modifiedBy",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "آخرین شعبه تخصصی",
            field: "assignedBranchTitle",
            width: "160px",
            attributes: { class: "text-center" }
        },
        {
            title: "مقصد آخرین شعبه تخصصی",
            field: "branchStationTitle",
            width: "190px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد بورس اول",
            field: "firstOldTSEBourseCode",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد بورس دوم",
            field: "secondOldTSEBourseCode",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد بورس سوم",
            field: "thirdOldTSEBourseCode",
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
            title: "وضعیت",
            field: "orderStateDescription",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "درخواست انصراف",
            field: "execuationDateJalali",
            template: isCheck('requestCancel'),
            width: "130px",
            attributes: { class: "text-center" }
        },
        {
            title: "تایید شده",
            field: "volume",
            width: "100px",
            attributes: { class: "text-center" },
            template: isCheckByNumber('isConfirmed')
        },
        {
            title: "چاپ شده",
            field: "isPrinted",
            template: isCheck('isPrinted'),
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "بازار",
            field: "securityExchangeEnumTitle",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "توضیحات مشتری",
            field: "senderDescription",
            width: "250px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
        },
        {
            title: "توضیحات کارگزاری",
            field: "traderDescription",
            width: "250px"
        }
    ];

}

export default Columns;