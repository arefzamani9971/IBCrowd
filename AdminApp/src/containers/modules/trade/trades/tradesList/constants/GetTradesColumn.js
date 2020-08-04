const Columns = function (prop, state, classes) {

    return [
        {
            title: "شماره اعلامیه",
            field: "ticketNumber",
            width: "110px",
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
            attributes: { class: "text-center" }
        },
        {
            title: "نماد",
            field: "symbol",
            width: "80px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام سهم",
            field: "fullProductName",
            attributes: { class: "text-center" },
            width: "240px"
        },
        {
            title: "معامله",
            field: "transactionTypeTitle",
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "تعداد ",
            field: "volume",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-volume-sum text-right"></div>'
        },
        {
            title: "قیمت",
            field: "price",
            filter: "numeric",
            attributes: { class: "text-right" },
            format: "{0:n0}",
            width: "140px",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-price-sum text-right"></div>'
        },
        {
            title: " ارزش معامله (سهام در نرخ)",
            field: "value",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            width: "180px",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-value-sum text-right"></div>'
        },
        {
            title: "مبلغ تسویه نهایی",
            field: "netAmount",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            aggregates: ["sum"],
            attributes: { class: "text-right" },
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-netAmount-sum text-right"></div>'
        },
        {
            title: "نام مشتری",
            field: "partyFullName",
            width: "200px"
        },
        {
            title: "تاریخ معامله",
            field: "dateJalaliSimple",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "ساعت معامله",
            field: "time",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "مجموع کارمزد",
            field: "totalFee",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-totalFee-sum text-right"></div>'
        },
        {
            title: "کارمزد کارگزاری",
            field: "brokerFee",
            filter: "numeric",
            attributes: { class: "text-right" },
            format: "{0:n0}",
            width: "140px",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-brokerFee-sum text-right"></div>'
        },
        {
            title: "مالیات نقل و انتقال",
            field: "tax",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            aggregates: ["sum"],
            attributes: { class: "text-right" },
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-tax-sum text-right"></div>'
        },
        {
            title: "تخفیف",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-discount-sum text-right"></div>'
        },
        {
            title: "کد حسابداری",
            field: "detailLedgerCode",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد بورسی",
            field: "tseBourseCode",
            width: "90px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد معاملاتی",
            field: "pamCode",
            width: "140px",
            attributes: { class: "text-center" }
        },
        {
            title: "شناسه ملی",
            field: "nationalCode",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "وضعیت",
            field: "transactionStatusEnumTitle",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "مشتری",
            field: "partyTypeTitle",
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "بازار",
            field: "simpleSecurityExchangeTitle",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "زیر بازار",
            field: "productTypeTitle",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام صنعت",
            field: "sectorTitle",
            attributes: { class: "text-center" },
            width: "220px"
        },
        {
            title: "شعبه مشتری",
            field: "partyBranchTitle",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه معامله",
            field: "traderCodeTitle",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "مقدار واقعی کارمزد کارگزاری",
            field: "realFee",
            filter: "numeric",
            format: "{0:n0}",
            width: "180px",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-realFee-sum text-right"></div>'
        },
        {
            title: "کارمزد سپرده گذاری",
            field: "csdFee",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-csdFee-sum text-right"></div>'
        },
        {
            title: "کارمزد بورس اوراق",
            field: "tseFee",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-tseFee-sum text-right"></div>'
        },
        {
            title: "کارمزد حق نظارت سازمان",
            field: "seoFee",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-seoFee-sum text-right"></div>'
        },
        {
            title: "کارمزد مدیریت فناوری",
            field: "tseTmcFee",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-tseTmcFee-sum text-right"></div>'
        },
        {
            title: "کارمزد خدمات دسترسی",
            field: "rightToAccessFee",
            width: "160px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-rightToAccessFee-sum text-right"></div>'
        },
        {
            title: "درصد تخفیف",
            field: "discountPercentage",
            width: "120px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-center" },
            aggregates: ["sum"]
        }
    ];

}

export default Columns;