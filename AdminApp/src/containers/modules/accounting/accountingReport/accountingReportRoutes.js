import GetVouchersMaster from './vouchers/components/GetVouchersMasterComponent';
import UploadExcelVoucher from './vouchers/components/UploadExcelVoucherComponent';
import { CreateVoucher } from './vouchers/components/AddVoucherComponent'
import GetGeneralLedgerBalance from './generalLedgerBalance/components/GetGeneralLedgerBalanceComponent';
import GetSubsidiaryLedgerBalance from './subsidiaryLedgersBalance/components/GetSubsidiaryLedgerBalanceComponent';
import GetVoucherDetail from './vouchers/components/GetVoucherDetailComponent';
import GetDetailLedgerBalance from './detailLedgerBalannce/components/GetDetailLedgerBalanceComponent';
import GetGeneralAccountBook from './accountBookReport/components/GetGeneralAccountBookComponent';
import GetSubsidiaryAccountBook from './accountBookReport/components/GetSubsidiaryAccountBookComponent';
import GetDetailAccountBook from './accountBookReport/components/GetDetailAccountBookComponent';
import GetLiquidityReport from './liquidityReport/components/GetLiquidityReportComponent';
import GetSoknaReportComponent from './soknaReport/components/GetSoknaReportComponent';
import GetIncomeStatement from './incomeStatement/components/incomeStatementComponent';
import BalanceSheetComponent from './balanceSheet/components/BalanceSheetComponent';
import GetNewsPaperReportMonthlyVoucherTypeComponent from './newsPaperReportMonthlyVoucherType/components/GetNewsPaperReportMonthlyVoucherTypeComponent';
const route = {
    GetGeneralLedgerBalance: {
        component: GetGeneralLedgerBalance,
        title: "تراز آزمایشی کل",
        path: "/main/accounting/report/getGeneralLedgerBalance",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-calculator',
        get detail() { return [route.GetSubsidiaryLedgerBalance, route.GetGeneralAccountBook] }
    },
    GetSubsidiaryLedgerBalance: {
        component: GetSubsidiaryLedgerBalance,
        title: "تراز آزمایشی معین",
        path: "/main/accounting/report/getSubsidiaryLedgerBalance",
        get back() { return route.GetGeneralLedgerBalance },
        get detail() { return [route.GetDetailLedgerBalance, route.GetSubsidiaryAccountBook] },
        // browserBack:true,

        add: null,
        edit: null,
        icon: 'fas fa-calculator'
    },
    GetDetailLedgerBalance: {
        component: GetDetailLedgerBalance,
        title: "تراز آزمایشی تفصیل",
        path: "/main/accounting/report/getDetailLedgerBalance",
        get back() { return route.GetSubsidiaryLedgerBalance },
        get detail() { return route.GetDetailAccountBook },

        add: null,
        edit: null,
        icon: 'fas fa-calculator'
    },
    GetGeneralAccountBook: {
        component: GetGeneralAccountBook,
        title: "دفتر حساب کل",
        path: "/main/accounting/report/getGeneralAccountBook",
        add: null,
        edit: null,
        icon: 'fas fa-calculator'

    },
    IncomeStatement: {
        component: GetIncomeStatement,
        title: "صورت سود و زیان",
        path: "/main/accounting/report/getIncomeStatement",
        add: null,
        edit: null,
        icon: 'fas fa-calculator'

    },
    Balancesheet: {
        component: BalanceSheetComponent,
        title: "ترازنامه",
        path: "/main/accounting/report/getBalanceSheet",
        add: null,
        edit: null,
        icon: 'fas fa-calculator'

    },
    GetSubsidiaryAccountBook: {
        component: GetSubsidiaryAccountBook,
        title: "دفتر حساب معین",
        path: "/main/accounting/report/getSubsidiaryAccountBook",
        add: null,
        edit: null,
        icon: 'fas fa-calculator'

    },
    GetDetailAccountBook: {
        component: GetDetailAccountBook,
        title: "دفتر حساب تفصیل",
        path: "/main/accounting/report/getDetailAccountBook",
        add: null,
        edit: null,
        icon: 'fas fa-calculator'
    },
    GetVouchersMaster: {
        component: GetVouchersMaster,
        title: "فهرست اسناد",
        path: "/main/accounting/report/getVouchersMaster",
        back: null,
        get detail() { return route.GetVoucherDetail },
        get add() { return route.AddVoucher },
        get edit() { return route.UpdateVoucher },
        get upload() { return route.UploadExcelVoucher },
        icon: 'fas fa-document'
    },
    GetVoucherDetail: {
        component: GetVoucherDetail,
        title: "مشاهده سند",
        path: "/main/accounting/report/getVoucherDetail",
        get back() { return route.GetVouchersMaster },
        add: null,
        edit: null,
        icon: 'fas fa-eye'
    },
    AddVoucher: {
        component: CreateVoucher,
        title: "افزودن سند دستی",
        path: "/main/accounting/report/addVoucher",
        get back() { return route.GetVouchersMaster },
        add: null,
        edit: null,
        icon: 'fas fa-plus'
    },
    UploadExcelVoucher: {
        component: UploadExcelVoucher,
        title: "ورود سند از اکسل",
        path: "/main/accounting/report/uploadExcelVoucher",
        get back() { return route.GetVouchersMaster },
        add: null,
        edit: null,
        icon: 'fas fa-upload'
    },
    // CopyVoucher: {
    //     component: CopyVoucher,
    //     title: "کپی کردن سند",
    //     path: "/main/accounting/report/copyVoucher",
    //     get back() { return route.GetVouchersMaster },
    //     add: null,
    //     edit: null,
    //     icon: 'far fa-copy'
    // },
    UpdateVoucher: {
        component: CreateVoucher,
        title: "ویرایش سند",
        path: "/main/accounting/report/editVoucher",
        get back() { return route.GetVouchersMaster },
        add: null,
        edit: null,
        icon: 'fas fa-edit'

    },
    LiquidityReport: {
        component: GetLiquidityReport,
        title: "گزارش نقدینگی",
        path: "/main/accounting/report/getLiquidityreport",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-money-bill-alt'

    },


    SoknaReport: {
        component: GetSoknaReportComponent,
        title: "گزارش سکنی",
        path: "/main/accounting/report/getSoknaReport",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-money-bill-alt'
    },




    NewsPaperReportMonthlyVoucherType: {
        component: GetNewsPaperReportMonthlyVoucherTypeComponent,
        title: "گزارش دفتر روزنامه",
        path: "/main/accounting/report/getNewsPaperReportMonthlyVoucherType",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-money-bill-alt'
    }

}


export default route;

