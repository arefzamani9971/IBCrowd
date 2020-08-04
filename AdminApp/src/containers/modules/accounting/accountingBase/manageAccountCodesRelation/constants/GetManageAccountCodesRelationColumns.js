import { isCheck } from "constants/kendoUiGrid";

const Columns = function (prop, state, classes) {

    return [
        {
            selectable: true,
            width: "50px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد حساب",
            field: "subsidiaryAndDetail",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-center" }
        },
        {
            title: "نام کامل",
            field: "fullTitle",
            show: true,
            width: "500px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد حساب معین",
            field: "subsidiaryLedgerCode",
            show: true,
            width: "130px",
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-center" }
        },
        {
            title: "عنوان حساب معین",
            field: "subsidiaryLedgerTitle",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-center" }
        },
        {
            title: "کد حساب تفصیل",
            field: "detailLedgerCode",
            show: true,
            width: "130px",
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-center" }
        },
        {
            title: "عنوان حساب تفصیل",
            field: "detailLedgerTitle",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-center" }
        },
        {
            title: "فعال",
            field: "status",
            width: '150px',
            show: true,
            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-center" },
            template: isCheck("status")
        },
        {
            title: "عملیات",
            width: '120px',
            template: '<div style="text-align: center;">' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'+
                '</div>'
        }
    ];

}

export default Columns;