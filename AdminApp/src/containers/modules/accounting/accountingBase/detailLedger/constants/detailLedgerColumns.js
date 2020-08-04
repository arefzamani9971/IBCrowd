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
            title: "کد",
            field: "code",
            show: true,
            width: "105px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "عنوان",
            field: "title",
            show: true,
            width: "400px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان نوع حساب تفصیلی",
            field: "accountClassTitle",
            show: true,
            width: "500px",
            attributes: { class: "text-center" },
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "فعال",
            field: "status",
            width: '80px',
            show: true,
            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-left" },
            template: isCheck("status")
        },
        {
            title: "مرکز هزینه اجباری",
            field: "requiredCostCenter",
            width: '80px',
            show: true,
            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-left" },
            template: isCheck("requiredCostCenter")
        },
        {
            title: "آنالیز پذیر",
            field: "isAnalyzable",
            width: '80px',
            show: true,
            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-left" },
            template: isCheck("isAnalyzable")
        },
        {
            title: "تفصیل پذیر",
            field: "hasDetail",
            width: '80px',
            show: true,
            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-left" },
            template: isCheck("hasDetail")
        },
        {
            title: "گزارش فصلی",
            field: "requiredSeasonalReport",
            width: '80px',
            show: true,
            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-left" },
            template: isCheck("requiredSeasonalReport")
        },
        {
            title: "توضیحات",
            field: "description",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false
        }
    ];

}

export default Columns;