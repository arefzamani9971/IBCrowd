const Columns = function (prop, state, classes) {

    return [
        {
            title: 'خرید',
            columns: [
                {
                    title: "کد شعبه",
                    field: "buyDetails.branchCode",
                    attributes: { class: "text-center" },
                    width: "100px"
                },
                {
                    title: "نام شعبه",
                    field: "buyDetails.branchTitle",
                    attributes: { class: "text-center" },
                    width: "150px"
                },
                {
                    title: "نوع تراکنش",
                    field: "buyDetails.transactionTypeTitle",
                    attributes: { class: "text-center" },
                    width: "110px"
                },
                {
                    title: "مبلغ",
                    field: "buyDetails.volume",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد کارگزاری",
                    field: "buyDetails.brokerFee",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد سپرده گزاری",
                    field: "buyDetails.csdFee",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد مدیریت فناوری",
                    field: "buyDetails.tseTmcFee",
                    width: "160px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد بورس مربوطه",
                    field: "buyDetails.tseFee",
                    width: "160px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد حق نظارت سازمان",
                    field: "buyDetails.seoFee",
                    width: "170px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "مالیات",
                    field: "buyDetails.tax",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد رایان بورس",
                    field: "buyDetails.rayanBourseFee",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد حق دسترسی",
                    field: "buyDetails.rightToAccessFee",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "مبلغ کل",
                    field: "buyDetails.totalPrice",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "سود اوراق مشارکت",
                    field: "buyDetails.couponAmount",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "تخفیف",
                    field: "buyDetails.discount",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "مبلغ خالص",
                    field: "buyDetails.netAmount",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "مشتری",
                    field: "buyDetails.partyTypeTitle",
                    attributes: { class: "text-center" },
                    width: "100px"
                },
            ]
        },
        {
            title: 'فروش',
            columns: [
                {
                    title: "کد شعبه",
                    field: "sellDetails.branchCode",
                    attributes: { class: "text-center" },
                    width: "100px"
                },
                {
                    title: "نام شعبه",
                    field: "sellDetails.branchTitle",
                    attributes: { class: "text-center" },
                    width: "250px"
                },
                {
                    title: "نوع تراکنش",
                    field: "sellDetails.transactionTypeTitle",
                    attributes: { class: "text-center" },
                    width: "110px"
                },
                {
                    title: "مبلغ",
                    field: "sellDetails.volume",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد کارگزاری",
                    field: "sellDetails.brokerFee",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد سپرده گزاری",
                    field: "sellDetails.csdFee",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد مدیریت فناوری",
                    field: "sellDetails.tseTmcFee",
                    width: "160px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد بورس مربوطه",
                    field: "sellDetails.tseFee",
                    width: "160px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد حق نظارت سازمان",
                    field: "sellDetails.seoFee",
                    width: "170px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "مالیات",
                    field: "sellDetails.tax",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد رایان بورس",
                    field: "sellDetails.rayanBourseFee",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "کارمزد حق دسترسی",
                    field: "sellDetails.rightToAccessFee",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "مبلغ کل",
                    field: "sellDetails.totalPrice",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "سود اوراق مشارکت",
                    field: "sellDetails.couponAmount",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "تخفیف",
                    field: "sellDetails.discount",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "مبلغ خالص",
                    field: "sellDetails.netAmount",
                    width: "140px",
                    filter: "numeric",
                    attributes: { class: "text-right" },
                    format: "{0:n0}"
                },
                {
                    title: "مشتری",
                    field: "sellDetails.partyTypeTitle",
                    attributes: { class: "text-center" },
                    width: "100px"
                },
            ]
        }
    ];

}

export default Columns;