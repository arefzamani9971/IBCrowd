import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';


const Columns = function (props, state, classes) {
    return [
        {


            title: "تاریخ",
            width: '180px',
            field: "voucherDateJalali",
            show: true,

        },

        {
            title: " مانده بانک و صندوق",
            field: "bankRemainValue",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let bankRemainValue = Math.abs(event.dataItem.bankRemainValue).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.bankRemainValue >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {bankRemainValue}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({bankRemainValue})
                            </b>
                        </td>

                    )
                }
            },


        },
        {
            title: "اسناد در جریان وصول",
            field: "voucherRemainReceivables",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let voucherRemainReceivables = Math.abs(event.dataItem.voucherRemainReceivables).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.voucherRemainReceivables >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {voucherRemainReceivables}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({voucherRemainReceivables})
                            </b>
                        </td>

                    )
                }
            },

        },
        {
            title: "بدهکار پایاپای",
            field: "debitClearing",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let debitClearing = Math.abs(event.dataItem.debitClearing).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.debitClearing >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {debitClearing}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({debitClearing})
                            </b>
                        </td>

                    )
                }
            },
            

        },
        {
            title: "بستانکار پایاپای",
            field: "creditClearing",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let creditClearing = Math.abs(event.dataItem.creditClearing).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.creditClearing >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {creditClearing}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({creditClearing})
                            </b>
                        </td>

                    )
                }
            },
            
        

        },
        {
            title: "خالص پایاپای",
            field: "netClearingValue",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let netClearingValue = Math.abs(event.dataItem.netClearingValue).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.netClearingValue >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {netClearingValue}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({netClearingValue})
                            </b>
                        </td>

                    )
                }
            },
         



        },
        {
            title: "مانده بورس",
            field: "leaveTse",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            dynamicColumn: true,
            cell: (event) => {
                let leaveTse = Math.abs(event.dataItem.leaveTse).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.leaveTse >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {leaveTse}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({leaveTse})
                            </b>
                        </td>

                    )
                }
            },
            hidden: true

        },
        {
            title: "مانده فرابورس",
            field: "leaveIfb",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            dynamicColumn: true,
            cell: (event) => {
                let leaveIfb = Math.abs(event.dataItem.leaveIfb).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.leaveIfb >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {leaveIfb}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({leaveIfb})
                            </b>
                        </td>

                    )
                }
            },
            hidden: true


        },
        {
            title: "مانده بدهکار مشتریان",
            field: "debitCustomers",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            class: "text-right",
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let debitCustomers = Math.abs(event.dataItem.debitCustomers).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.debitCustomers >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {debitCustomers}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({debitCustomers})
                            </b>
                        </td>

                    )
                }
            },
         


        },
        {
            title: "مانده بستانکار مشتریان",
            field: "creditCustomers",
            width: "200px",
            filter: "numeric",
            class: "text-right",
            format: "{0:n0}",
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let creditCustomers = Math.abs(event.dataItem.creditCustomers).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.creditCustomers >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {creditCustomers}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({creditCustomers})
                            </b>
                        </td>

                    )
                }
            },
        },

        {
            title: "خالص مانده مشتریان",
            field: "customersRemain",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            class: "text-right",
            aggregates: ["sum"],
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let customersRemain = Math.abs(event.dataItem.customersRemain).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.customersRemain >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {customersRemain}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({customersRemain})
                            </b>
                        </td>

                    )
                }
            },
        },

        {
            title: "مانده کیش",
            field: "kishRemainValue",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            class: "text-right",
            aggregates: ["sum"],
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let kishRemainValue = Math.abs(event.dataItem.kishRemainValue).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.kishRemainValue >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {kishRemainValue}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({kishRemainValue})
                            </b>
                        </td>

                    )
                }
            },
        },

        {
            title: "مازاد (کسری)",
            field: "deficitOrExcessRemain",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            class: "text-right",
            aggregates: ["sum"],
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                let deficitOrExcessRemain = Math.abs(event.dataItem.deficitOrExcessRemain).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
                if (event.dataItem.deficitOrExcessRemain >= 0) {

                    return (
                        <td className="text-right">
                            <b>
                                {deficitOrExcessRemain}
                            </b>
                        </td>
                    )
                } else {
                    return (
                        <td className="text-right">
                            <b className="red-color">
                               ({deficitOrExcessRemain})
                            </b>
                        </td>

                    )
                }
            },
          


        },
        {
            title: "عملیات",
            field: "id",
            width: "100px",
            show: true,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <span class="fas fa-file-excel liquidity-excel font-20 ml-2"></span>
                        <span class="fas fa-file-pdf liquidity-pdf font-20"></span>
                    </td>
                )
            },

        }

    ];

}
export default Columns;
