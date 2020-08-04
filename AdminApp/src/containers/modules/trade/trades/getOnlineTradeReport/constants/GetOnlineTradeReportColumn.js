const Columns = function (props, state, classes) {

    return [
        {
            title: "نحوه ثبت سفارش",
            field: "serviceName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "مشتریان ابتدای دوره",
            field: "numberOfCustomersFirstDate",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "مشتریان طی دوره",
            field: "numberOfCustomersInDate",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "کل مشتریان",
            field: "totalCustomers",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "مشتریان فعال",
            field: "totalActiveCustomers",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "حجم معاملات ابتدای دوره",
            field: "tradeVolumeFirstDate",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "حجم معاملات طی دوره",
            field: "tradeVolumeInDate",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "مبلغ کل",
            field: "totalAmount",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-right" },
            isFixed: false,
            dynamicColumn: false,
        }
    ];

}

export default Columns;