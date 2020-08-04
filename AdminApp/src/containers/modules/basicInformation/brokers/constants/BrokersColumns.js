import { Edit} from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (prop, state, classes) {
    return [
        {
            title: "عنوان",
            field: "title",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی اوراق",
            field: "tseCode",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "کد بورسی کالا",
            field: "efpCode",
            show: true,
            width: "180px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "کد بورسی انرژی برق",
            field: "ieeCode",
            show: true,
            width: "150px",
            isFixed: false,

        },
        {
            title: "کد بورسی انرژی فیزیکی",
            field: "efpCode",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        } ,
        {
            title: "تاریخ اعتبار از",
            field: "validFromJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ اعتبار تا",
            field: "validUntilJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شناسه اقتصادی",
            field: "nationalId",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        }    
        // {
        //     title: "ویرایش",
        //     field: "accountNumber",
        //     isFixed: true,
        //     width: "100px",
        //     dynamicColumn: true,

        //     cell: (event) => {

        //         return (

        //             <Edit   {...prop} stateParams={{ accountNumber: event.dataItem.accountNumber }} />
        //         )
        //     },

        // },

    ];

}


export default Columns;