const Columns = function (prop, state, classes) {

    return [
        {
            title: "معامله",
            field: "ticketNumber",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ معامله",
            field: "dateJalali",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "عنوان مشتری",
            field: "customerName",
            width: "200px"
        },
        {
            title: "شماره قرارداد",
            field: "contrctNumber",
            attributes: { class: "text-center" },
            width: "200px"
        },
        {
            title: "شماره جزء قرارداد",
            field: "contractDetailNumber ",
            attributes: { class: "text-center" },
            width: "200px"
        },
        {
            title: "کد شناسایی معامله",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "200px"
        },
        {
            title: "نام کالا",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "200px"
        },
        {
            title: "نماد کالا",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "زیرگروه کالا",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "گروه کالا",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "گروه اصلی کالا",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "تاریخ تخصیص",
            field: "allocationDate",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "مهلت تسویه",
            field: "allocationDate",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "تاریخ تسویه نهایی",
            field: "finalSettlmentDate",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "نوع قراداد",
            field: "contractType ",
            attributes: { class: "text-center" },
            width: "100px"
        },
        {
            title: "کارگزار طرف مقابل",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "مقدار",
            field: "volume",
            attributes: { class: "text-center" },
            width: "140px"
        },
        {
            title: "قیمت",
            field: "price",
            filter: "numeric",
            attributes: { class: "text-right" },
            format: "{0:n0}",
            width: "140px"
        },
        {
            title: " ارزش معامله",
            field: "value",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            width: "140px"
        },
        {
            title: "کارمزد کارگزاری",
            field: "brokerBuyerFee",
            filter: "numeric",
            attributes: { class: "text-right" },
            format: "{0:n0}",
            width: "140px"
        },
        {
            title: "مقدار واقعی کارمزد کارگزاری",
            field: "realFee",
            filter: "numeric",
            format: "{0:n0}",
            width: "180px",
            attributes: { class: "text-right" }
        },
        {
            title: "درصد تخفیف",
            field: "discountPercentage",
            width: "140px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-center" }
        },
        {
            title: "تخفیف",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "کارمزد شرکت بورس",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "کارمزد سازمان بورس",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "150px",
            attributes: { class: "text-right" }
        },
        {
            title: "کارمزد حق درج",
            field: "insertRightFee",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "جریمه",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "تسویه شده",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "140px",
            attributes: { class: "text-right" }
        },
        {
            title: "نحوه تسویه",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "تاریخ سند تسویه",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "140px"
        },
        {
            title: "مهلت تسویه",
            field: "settlementDate ",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "تاریخ ابطال",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "نوع تسویه",
            field: "settlementType",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "تولید کننده",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "محل تحویل",
            field: "deliveryPlace",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "موسسه حمل ونقل",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "سفارش دهنده",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "مشتری طرف مقابل",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "کد بورسی مشتری",
            field: "detailLedgerCode",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "آدرس مشتری",
            field: "partyFullName",
            width: "250px"
        },
        {
            title: "آدرس تخلیه",
            field: "partyFullName",
            width: "250px"
        },
        {
            title: "موبایل مشتری",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "تلفن مشتری",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "تاریخ تحویل",
            field: "deliveryDate ",
            attributes: { class: "text-center" },
            width: "120px"
        },
        {
            title: "تاریخ ثبت سفارش",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "140px"
        },
        {
            title: "شماره نامه",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "خالص",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "مالیات بر ارزش افزوده",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "160px"
        },
        {
            title: "شماره قبض مالیات بر ارزش افزوده",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "210px"
        },
        {
            title: "تاریخ فیش مالیات بر ارزش افزوده",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "210px"
        },
        {
            title: "مجموع کارمزد",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "140px"
        },
        {
            title: "شناسه ملی",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "110px"
        },
        {
            title: "کد عرضه کننده",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "کد اقتصادی",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "150px"
        },
        {
            title: "کد شناسه مشتری طرف مقابل",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "200px"
        },
        {
            title: "کد اقتصادی مشتری طرف مقابل",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "200px"
        },
        {
            title: "شناسه ملی مشتری طرف مقابل",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "200px"
        },
        {
            title: "آدرس مشتری طرف مقابل",
            field: "partyFullName",
            width: "250px"
        },
        {
            title: "کد بورسی مشتری طرف مقابل",
            field: "partyFullName",
            attributes: { class: "text-center" },
            width: "200px"
        }
    ];

}

export default Columns;