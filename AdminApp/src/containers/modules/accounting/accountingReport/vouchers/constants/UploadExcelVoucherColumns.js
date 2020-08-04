const Columns = function (prop, state, classes) {

    return [
        {
            title: "شماره قرارداد",
            field: "info",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-center" },
        },
        {
            title: "پیغام",
            field: "error",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-right" },
        },
    ];
    
};

export default Columns;