import { isCheck } from "constants/kendoUiGrid";

const Columns = function (prop, state, classes) {

    return [
        {
            title: "عنوان مشتری",
            field: "fullName",
            footerTemplate:
                "<div style='text-align: right !important;'>جمع صفحه</div>" +
                "<div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
            width: '200px'
        },
        {
            title: "کد حساب",
            field: "detailLedgerCode",
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "کارمزد خرید",
            field: "buyBrokerFee",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-buyBrokerFee-sum'></div>"
        },
        {
            title: "کارمزد فروش",
            field: "sellBrokerFee",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-sellBrokerFee-sum'></div>"
        },
        {
            title: "مجموع کارمزد",
            field: "totalBrokerFee",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-totalBrokerFee-sum'></div>"
        },
        {
            title: "تخفیف",
            field: "disCount",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-disCount-sum'></div>"
        },
        {
            title: "مقدار واقعی کارمزد",
            field: "realFee",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-realFee-sum'></div>"
        },
        {
            title: "مالیات",
            field: "tax",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-tax-sum'></div>"
        },
        {
            title: "مبلغ خرید",
            field: "buyPrice",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-buyPrice-sum'></div>"
        },
        {
            title: "مبلغ فروش",
            field: "sellPrice",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-sellPrice-sum'></div>"
        },
        {
            title: "مبلغ کل",
            field: "totalPrice",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-totalPrice-sum'></div>"
        },
        {
            title: "مبلغ خالص فروش",
            field: "sellNetAmount",
            width: '140px',
            attributes: { class: "text-right" }
            , format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-sellNetAmount-sum'></div>"
        },
        {
            title: "مبلغ خالص خرید",
            field: "buyNetAmount",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-buyNetAmount-sum'></div>"
        },
        {
            title: "اعتبار",
            field: "creditAmount",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-creditAmount-sum'></div>"
        },
        {
            title: "کد بورسی",
            field: "tseBourseCode",
            attributes: { class: "text-center" },
            width: '90px'
        },
        {
            title: "کد معاملاتی",
            field: "pamTSECode",
            width: '110px',
            attributes: { class: "text-center" }
        },
        {
            title: "کد شعبه",
            field: "branchId",
            width: '100px',
            attributes: { class: "text-center" }
        },
        {
            title: "معرف",
            field: "representativeName",
            width: '200px'
        },
        {
            title: "شناسه ملی",
            field: "nationalId",
            width: '110px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره تلفن",
            field: "phone",
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "شناسه پستی",
            field: "address",
            width: '250px'
        },
        {
            title: "شهر محل سکونت",
            field: "regionTitle",
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "کد پستی",
            field: "postalCode",
            width: '110px',
            attributes: { class: "text-center" }
        },
        {
            title: "پست الکترونیکی",
            field: "email",
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره حساب",
            field: "accountFullName",
            width: '150px',
            attributes: { class: "text-center" }
        },
        {
            title: "نام پدر",
            field: "fatherName",
            width: '100px'
        },
        {
            title: "جنسیت",
            field: "genderTitle",
            width: '90px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره شناسنامه",
            field: "identityCard",
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ تولد",
            field: "birthDateJalali",
            width: '120px',
            attributes: { class: "text-center" }
        },
        {
            title: "وضعیت تاهل",
            field: "maritalStatus",
            attributes: { class: "text-center" },
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '120px',
            template: isCheck("maritalStatus")
        },
        {
            title: "بازاریاب",
            field: "marketerName",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "حجم معاملات",
            field: "volumeTransaction",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-volumeTransaction-sum'></div>"
        },
        {
            title: "حجم کارمزد",
            field: "volumeFee",
            width: '140px',
            attributes: { class: "text-right" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: right !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: right !important;margin-top: 10px' class='total-volumeFee-sum'></div>"
        },
        {
            title: "مشتری",
            field: "partyTypeTitle",
            width: '100px',
            attributes: { class: "text-center" }
        }
    ];

};

export default Columns;