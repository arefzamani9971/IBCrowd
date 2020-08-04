import { isCheck } from '../../../../../../constants/kendoUiGrid';

const Columns = function () {

    return [
        {
            selectable: "multiple, row",
            width: "20px",
            attributes: { class: "text-center" }
        },
        
        {
            title: "تاریخ",
            field: "dateJalali",
            width: "150px",
            attributes: { class: " text-center " },
        },

        {
            title: "شماره سند تا",
            field: "toVoucherDate",
            width: "150px",
            attributes: { class: " text-center " },
            hidden: true,

        },
        {
            title: "تاریخ شروع",
            field: "startDate",
            width: "150px",
            attributes: { class: "text-center" },
            hidden: true,

        },
        {
            title: "تاریخ پایان",
            field: "endDate",
            width: "150px",
            attributes: { class: "text-center" },
            hidden: true,

        },
        {
            title: "وضعیت سند تسویه",
            field: "isSettled",
            width: "40px",
            template: isCheck("isSettled")
        }


    ];

}


export default Columns;