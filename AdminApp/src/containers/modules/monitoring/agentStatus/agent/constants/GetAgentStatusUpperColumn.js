const UpperColumns = function (prop, state, classes) {

    return [  {
        title: "نام سرویس",
        field: "accountNumber",
        show: true,
        isFixed: false,
        dynamicColumn: false
    },
    {
        title: "توضیحات",
        field: "title",
        show: true,
        isFixed: false,
        dynamicColumn: false
    },
    {
        title: "وضعیت",
        field: "fromSerial",
        show: true,
        isFixed: true,
        dynamicColumn: false
    },
    {
        title: "راه اندازی مجدد",
        field: "fromSerial",
        show: true,
        isFixed: true,
        dynamicColumn: false
    }];

}

export default UpperColumns;
