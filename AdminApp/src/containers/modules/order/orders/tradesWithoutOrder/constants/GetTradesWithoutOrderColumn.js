import { OrderSide } from "../../../../../../constants/kendoUiGrid";

const Columns = function (prop, state, classes) {

    return [
        {
            selectable: true,
            width: "40px",
            attributes: { class: "text-center" }
        },
        {
            title: "نوع ",
            field: "transactionTypeTitle",
            template: OrderSide("transactionTypeTitle"),
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه",
            field: "branchName",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "عنوان مشتری",
            field: "partyName",
            width: "200px"
        },
        {
            title: "کدملی",
            field: "nationalId",
            attributes: { class: "text-center" },
            width: "100px"
        },
        {
            title: "کد بورسی",
            field: "bourceCode",
            attributes: { class: "text-center" },
            width: "90px"
        },
        {
            title: "شعبه مشتری",
            field: "customerBranchName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "نماد",
            field: "symbol",
            width: "80px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام شرکت",
            field: "companyName",
            width: "200px"
        },
        {
            title: "بازار",
            field: "simpleSecurityExchangeTitle",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ معامله",
            field: "executedDateJalali",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "تعداد ",
            field: "volume",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" },
            template: '#= Math.abs(volume).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#'
        },
        {
            title: "حداقل قیمت ",
            field: "minPrice",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "حداکثر قیمت",
            field: "maxPrice",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: " قیمت ",
            field: "price",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "مانده کل",
            field: "remainT0",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "مجموع بلوکه",
            field: "blockRemain",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "قابل برداشت",
            field: "cashableRemain",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "اعتبار مشتری",
            field: "credit",
            width: "140px",
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ اعتبار",
            field: "creditDateJalali",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام معرف",
            field: "representativeName",
            width: "200px"
        }
    ];

}

export default Columns;