
export function Columns6(prop, state, classes) {
    return [
        {
            title: "کد حساب",
            width: '130px',
            field: "accountCode",
            attributes: { class: "text-center" },
            footerTemplate: "جمع کل",
            template: `<a class="account-code" href="${prop.detail[0].path}?accountCode=#=accountCode#">#=accountCode#</a>`
        },
        {
            title: "عنوان حساب",
            field: "accountTitle",
            width: "250px"
        },
        {
            title: " گردش بدهکار تا دوره",
            field: "debitTurnover",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"

        },
        {
            title: "گردش بستانکار تا دوره",
            field: "creditTurnover",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
        },
        {
            title: "گردش بدهکار",
            field: "debitSum",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"

        },
        {
            title: "گردش بستانکار",
            field: "creditSum",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"



        },
        {
            title: "مانده بدهکار",
            field: "debitLeave",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"


        },
        {
            title: "مانده بستانکار",
            field: "creditLeave",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"


        },
        {
            title: "دفتر حساب کل",
            width: "100px",
            attributes: { class: "text-center" },
            // template: '<a class="fas fa-eye general-account-book"></a>'
            template: `<a class="fas fa-eye general-account-book" href="${prop.detail[1].path}?accountCode=#=accountCode#"></a>`

        }

    ];

}

export function Columns4(prop, state, classes) {

    return [
        {

            title: "کد حساب",
            width: '130px',
            field: "accountCode",
            attributes: { class: "text-center" },
            footerTemplate: "جمع کل",
            template: `<a class="account-code" href="${prop.detail[0].path}?accountCode=#=accountCode#">#=accountCode#</a>`
        },
        {
            title: "عنوان حساب",
            field: "accountTitle",
            width: "250px"
        },
        {
            title: "گردش بدهکار",
            field: "debitSum",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"



        },
        {
            title: "گردش بستانکار",
            field: "creditSum",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"

        },

        {
            title: "مانده بدهکار",
            field: "debitLeave",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"

        },
        {
            title: "مانده بستانکار",
            field: "creditLeave",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
        },

        {
            title: "دفتر حساب کل",
            width: "100px",
            attributes: { class: "text-center" },
            // template: '<a class="fas fa-eye general-account-book"></a>'
            template: `<a class="fas fa-eye general-account-book" href="${prop.detail[1].path}?accountCode=#=accountCode#"></a>`

        }
    ];

}



