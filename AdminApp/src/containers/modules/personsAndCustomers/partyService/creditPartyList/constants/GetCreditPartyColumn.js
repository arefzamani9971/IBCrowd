import { isCheck } from "constants/kendoUiGrid";

const Columns = function (prop, state, classes) {
    return [
        {
            selectable: true,
            width: "60px",
            attributes: { class: "text-center" }
        },
        {
            title: "عملیات",
            width: "150px",
            template:
                '<div style="text-align: center;">'
                +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'
                +
                '</div>',
        },
        {
            title: "نام کامل مشتری",
            field: "partyFullName",
            width: '200px',
            attributes: { class: "text-right" }
        },
        {
            title: "مبلغ اعتبار",
            field: "amount",
            width: '200px',
            attributes: { class: "text-right" },
            filter: "numeric",
            format: "{0:n0}"
        },
        {
            title: "مبلغ قرارداد",
            field: "contractAmount",
            attributes: { class: "text-right" },
            filter: "numeric",
            format: "{0:n0}"
        },
        {
            title: "شماره بایگانی",
            field: "archiveNumber",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "حرف شماره بایگانی",
            field: "archiveLetterNumber",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "فعال",
            field: "isActive",
            width: '200px',
            show: true,
            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-center" },
            template: isCheck("isActive")
        },
        {
            title: "توضیحات",
            field: "description",
            width: '200px',
            attributes: { class: "text-right" }
        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "آخرین ویرایش کننده",
            field: "modifiedByName",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ شروع اعتبار",
            field: "validFromJalali",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ اتمام اعتبار ",
            field: "validUntilJalali",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ ثبت",
            field: "createdJalali",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            width: '200px',
            attributes: { class: "text-center" }
        }
    ];
};

export default Columns;