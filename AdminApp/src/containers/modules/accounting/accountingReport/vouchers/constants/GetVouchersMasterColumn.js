import { isCheck } from '../../../../../../constants/kendoUiGrid';

const Columns = function () {

    return [
        {
            selectable: "multiple, row",
            width: "50px",
            attributes: { class: "text-center" }
        },
        {
            title: "عملیات",
            width: "100px",
            template: '<div style="text-align: center;">' +
                '#if(isEditable){#' +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>#}#' +
                '#if(isDeletable){#' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>#}#' +
                '</div>',
            footerTemplate: "<div class='d-flex'>جمع صفحه</div><div class='d-flex'>جمع کل</div>",
        },
        // {
        //     title: "جزییات",
        //     field: "id",
        //     isFixed: true,
        //     width: "100px",
        //     dynamicColumn: true,

        //     template: '<div class="id text-center"><span class="k-icon k-i-eye"></span></div>'
        // },
        {
            title: "شماره سند",
            field: "voucherNumber",
            width: "150px",
            attributes: { class: "voucherNumber text-center cursor-pointer text-blue" },
        },
        {
            title: "تاریخ سند",
            field: "voucherDateJalali",
            width: "150px",
            attributes: { class: "text-center" },
        },
        {
            title: "شرح",
            field: "description",
            width: "180px",
        },
        {
            title: "شعبه",
            field: "branchName",
            attributes: { class: "text-center" },
            width: "150px",
        },
        {
            title: "نوع ثبت",
            field: "insertModeTitle",
            width: "150px",
            attributes: { class: "text-center" },
            class: "text-right",
        },
        {
            title: "نوع سند",
            field: "voucherCategoryTitle",
            attributes: { class: "text-center" },
            width: "150px",
        },
        {
            title: "وضعیت سند",
            field: "voucherStateEnumTitle",
            attributes: { class: "text-center" },
            width: "150px",
        },
        {
            title: "شماره سریال",
            field: "serialNumber",
            width: "150px",
            attributes: { class: "text-center" },
        },
        {
            title: "شماره سند روزانه",
            field: "dailyNumber",
            width: "150px",
            attributes: { class: "text-center" },
        },
        {
            title: " قفل",
            field: "lockedBy",
            template: '<div style="text-align: center;">' +
                '#if(isLocked){#' +
                '<span class="fas fa-lock lock" style="color: orange ; font-size: 15px; margin: 5px;"></span>#}#' +
                '</div>',
            width: "150px"
        },
        {
            title: "قفل گذار",
            field: "lockedByName",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            width: "150px",
            attributes: { class: "text-center direction-ltr" }
        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            attributes: { class: "text-center" },
            width: "150px"
        },

        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            width: "150px",
            attributes: { class: "text-center direction-ltr" }
        },
        {
            title: "آخرین ویراستار",
            field: "modifiedByName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "پیوست",
            field: "hasAttachment",
            width: "110px",
            attributes: { class: "text-center" },
            template: isCheck("hasAttachment")
        },
        {
            title: "مبلغ سند",
            field: "amount",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            attributes: { class: "text-right" },
            footerTemplate: "<div class='text-right'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-amount-sum text-right"></div>'

        },



    ];

}


export default Columns;