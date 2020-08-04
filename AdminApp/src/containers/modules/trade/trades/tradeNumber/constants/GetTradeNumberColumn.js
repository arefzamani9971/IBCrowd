const Columns = function () {

    return [
        {
            title: "عملیات",
            width: "100px",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: true,
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
            attributes: { class: "text-center" },
            template:
                '<div  class="text-center">' +
                '<div class="dropdown">' +
                '<button class="btn btn-sm p-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                '<i class="fas fa-edit text-info"></i>' +
                '</button>' +
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                '<span   class="dropdown-item updateFee" >ویرایش کارمزد</span>' +
                '<span   class="dropdown-item assignRightAcceptance" >حق تقدم استفاده نشده</span>' +
                '</div><button class="btn btn-sm text-danger mx-1 p-0 cursor-pointer pdfDownload"><i class="far fa-file-pdf"></i></button></div>' +
                '' +
                '</div>'
        },
        {
            title: "شماره اعلامیه",
            field: "ticketNumber",
            width: "110px",
            show: true,
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "تاریخ معامله",
            field: "dateJalali",
            show: true,
            width: "120px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "ساعت معامله",
            field: "time",
            show: true,
            width: "120",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: " نام مشتری",
            field: "partyFullName",
            width: "300px",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "کد حسابداری",
            field: "detailLedgerCode",
            show: true,
            width: "150px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false,
        },
        {
            title: "کد بورسی",
            field: "tseBourseCode",
            show: true,
            width: "90px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "کد معاملاتی",
            field: "pamCode",
            show: true,
            width: "110px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "شناسه ملی",
            field: "nationalCode",
            show: true,
            width: "110px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "وضعیت",
            field: "transactionStatusEnumTitle",
            show: true,
            width: "110px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "معامله",
            field: "transactionTypeTitle",
            width: "110px",
            show: true,
            attributes: { class: "text-center" },
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "مشتری",
            field: "partyTypeTitle",
            show: true,
            width: "100px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "بازار",
            field: "simpleSecurityExchangeTitle",
            show: true,
            width: "120px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "زیر بازار",
            field: "productTypeTitle",
            show: true,
            width: "120px",
            attributes: { class: "text-center" },
            isFixed: false
        },
        {
            title: "نام صنعت",
            field: "sectorTitle",
            show: true,
            width: "220px",
            attributes: { class: "text-center" },
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "شعبه معامله",
            field: "traderCodeTitle",
            show: true,
            width: "150px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "شعبه مشتری",
            field: "partyBranchTitle",
            show: true,
            width: "150px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "نماد",
            field: "symbol",
            show: true,
            width: "80px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "نام سهم",
            field: "fullProductName",
            show: true,
            width: "240px",
            isFixed: false,
            attributes: { class: "text-center" },
            dynamicColumn: false
        },
        {
            title: "تعداد ",
            field: "volume",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-volume-sum text-right"></div>'
        },
        {
            title: "قیمت",
            field: "price",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" },
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-price-sum text-right"></div>'
        },
        {
            title: " ارزش معامله (سهام در نرخ)",
            field: "value",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "180px",
            isFixed: false,
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-value-sum text-right"></div>',
            dynamicColumn: false,
            class: "text-right"
        },
        {
            title: "کارمزد کارگزاری",
            field: "brokerFee",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-brokerFee-sum text-right"></div>'
        },
        {
            title: "مقدار واقعی کارمزد کارگزاری",
            field: "realFee",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "180px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-realFee-sum text-right"></div>'
        },
        {
            title: "کارمزد سپرده گذاری",
            field: "csdFee",
            show: true,
            width: "140px",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            class: "text-right",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-csdFee-sum text-right"></div>'
        },
        {
            title: "کارمزد بورس اوراق",
            field: "tseFee",
            show: true,
            width: "140px",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            class: "text-right",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-tseFee-sum text-right"></div>'
        },
        {
            title: "کارمزد حق نظارت سازمان",
            field: "seoFee",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "180px",
            class: "text-right",
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
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-tseTmcFee-sum text-right"></div>'
        },
        {
            title: "کارمزد خدمات دسترسی",
            field: "rightToAccessFee",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "160px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-rightToAccessFee-sum text-right"></div>'
        },
        {
            title: "مالیات نقل و انتقال",
            field: "tax",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",
            aggregates: ["sum"],
            attributes: { class: "text-right" },
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-tax-sum text-right"></div>'
        },
        {
            title: "مجموع کارمزد",
            field: "totalFee",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-totalFee-sum text-right"></div>'
        },
        {
            title: "درصد تخفیف",
            field: "discountPercentage",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-center",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-center">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-discountPercentage-sum text-center"></div>'
        },
        {
            title: "مقدار تخفیف ",
            field: "discount",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",
            attributes: { class: "text-right" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-discount-sum text-right"></div>'
        },
        {
            title: "مبلغ تسویه نهایی ",
            field: "netAmount",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",
            aggregates: ["sum"],
            attributes: { class: "text-right" },
            footerTemplate: '<div class="text-right">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-net-amount text-right"></div>'
        }
    ];

}

export default Columns;