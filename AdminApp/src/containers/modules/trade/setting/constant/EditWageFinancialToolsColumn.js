

const Columns = function () {

    return [
        
        {
            title: "عنوان ابزار مالی",
            field: "settingType",
            width: "180px",
            attributes: { class: "text-center" },
        },
        {
            title: " معتبر از ",
            field: "fromDate",
            width: "180px",
            attributes: { class: "text-center" },

        }
        ,
        {
            title: " معتبر تا ",
            field: "toDate",
            width: "180px",
            attributes: { class: "text-center" },

        },
        {
            title: "  ایجاد کننده ",
            field: "createdBy",
            width: "180px",
            attributes: { class: "text-center" },

        },
        {
            title: "  آخرین ویرایش کننده ",
            field: "modifiedBy",
            width: "180px",
            attributes: { class: "text-center" },

        },
        {
            title: "عملیات",
            // field: "ticketNumber",
            width: "50px",
            show: true,
            class: "text-right",

            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-center" },
            template:
                '<div  class="text-center">' +
                '<button class="btn btn-sm text-primary mx-1 p-0 cursor-pointer" id="openEditPage"> <i class="fas fa-edit"></i></button></div>'+
                ''+
                '</div>'
        }
        ,{
            title: "مشاهده",
            // field: "ticketNumber",
            width: "50px",
            show: true,
            class: "text-right",

            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-center" },
            template:
                '<div  class="text-center">' +
                '<button class="btn btn-sm text-primary mx-1 p-0 cursor-pointer" id="openObservationPage"> <i class="far fa-eye"></i></button></div>'+
                ''+
                '</div>'
        }
        
       
       



    ];

}


export default Columns;