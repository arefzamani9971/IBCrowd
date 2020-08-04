import React from 'react';
import moment from 'moment';
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/pureForm';
import { Grid, withStyles } from '@material-ui/core';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import AutoCompleteComponent from '../../../../../../shared/components/dropDown/autocomplete';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GetPartiesService from "../../../../personsAndCustomers/customers/customersList/services/GetPartiesService";
import Fieldset from 'shared/components/fieldset/fieldset';
import Paper from "@material-ui/core/Paper";
import SaveAccountSettingServices from "../services/SaveAccountSettingServices";

class AccountingSettingsComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupLength: '',
            generalLedgerCodeLength: '',
            subsidiaryLedgerCodeLength: '',
            detailLedgerCodeLength: '',


            relationBetweenSubsidiaryAndDetailGroupIsRequired: false,
            // VoucherMasterDescriptionIsRequired: false,
            // VoucherDetailDescriptionIsRequired: false,
            voucherDescriptionIsRequired: false,
            voucherRowIsRequired: false,
            documentRegulator: {
                name: "documentRegulatorSelected",
                field: "title",
                label: "نوع تایید کنده سند",
                list: []
            },
            documentRegulatorSelected: { code: 0, title: '' },
            accountCodeSelectionType: {
                name: "accountCodeSelectionTypeSelected",
                field: "title",
                label: "نحوه انتخاب کد حساب در ثبت سند حسابداری",
                list: [],
            },
            accountCodeSelectionTypeSelected: { code: 0, title: '' },
            defaultVoucherLockerUserName: {
                name: "defaultVoucherLockerUserNameSelected",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                list: [],
                label: 'نام کاربری قفل گذار خودکار اسناد'
            },
            defaultVoucherLockerUserNameSelected: { fullName: '', userName: '' },
            defaultVoucherCreatorUserName: {
                name: "defaultVoucherCreatorUserNameSelected",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                list: [],
                label: 'جستجوی نام تنظیم کننده سند'
            },
            defaultVoucherCreatorUserNameSelected: { fullName: '', userName: '' },
            defaultDocumentRegulatorUserName: {
                name: "defaultDocumentRegulatorUserNameSelected",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                list: [],
                label: 'جستجوی تایید کننده سند'
            },
            defaultDocumentRegulatorUserNameSelected: { fullName: '', userName: '' },
            financialManagerUserName: {
                name: "financialManagerUserNameSelected",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                list: [],
                label: 'جستجوی نام مدیر مالی'
            },
            financialManagerUserNameSelected: { fullName: '', userName: '' },
            DefaultDocumentRegulatorUserNameShow: true,
            startDate: moment(new Date()),
            endDate: moment(new Date())

        };



    }
    componentDidMount() {
        this.getCurrentAccountSetting();

    }

    getCurrentAccountSetting() {
        SaveAccountSettingServices.getCurrentAccountSetting((response) => {
            if (response.result) {
                let settingInfo = response.result;
                this.setState({
                    settingInfo: settingInfo,
                    groupLength: settingInfo.accountTypeSetting.groupLength,
                    generalLedgerCodeLength: settingInfo.accountTypeSetting.generalLedgerCodeLength,
                    subsidiaryLedgerCodeLength: settingInfo.accountTypeSetting.subsidiaryLedgerCodeLength,
                    detailLedgerCodeLength: settingInfo.accountTypeSetting.detailLedgerCodeLength,
                    relationBetweenSubsidiaryAndDetailGroupIsRequired: settingInfo.relationBetweenSubsidiaryAndDetailGroupIsRequired,
                    voucherDescriptionIsRequired: settingInfo.voucherDescriptionIsRequired,
                    voucherRowIsRequired: settingInfo.voucherRowIsRequired,
                    startDate: settingInfo.dateFilter.startDate,
                    endDate: settingInfo.dateFilter.endDate,
                    defaultVoucherLockerUserNameSelected: {
                        fullName: settingInfo.defaultVoucherLockerUserName
                    },
                    defaultVoucherCreatorUserNameSelected: {
                        fullName: settingInfo.defaultVoucherCreatorUserName
                    },
                    defaultDocumentRegulatorUserNameSelected: {
                        fullName : settingInfo.defaultDocumentRegulatorUserName
                    },
                    financialManagerUserNameSelected:{
                        fullName : settingInfo.financialManagerUserName
                    }

                }, () => {
                    this.getDropDown();
                })
            }
        })
    }

    getDropDown() {
        GetEnum("documentregulator", (response) => DropDownListDataProvider(this, "documentRegulator", response, () => {
            let documentregulator = response.result.filter(item => { return item.code == this.state.settingInfo.documentRegulator })[0];
            this.setState({
                documentRegulatorSelected: documentregulator
            })
        }));
        GetEnum("accountcodeselectiontype", (response) => DropDownListDataProvider(this, "accountCodeSelectionType", response, () => {
            let accountcodeselectiontype = response.result.filter(item => { return item.code == this.state.settingInfo.accountCodeSelectionType })[0];
            this.setState({
                accountCodeSelectionTypeSelected: accountcodeselectiontype
            })
        }));

    }

    handleChange = (value, name) => {
        let item = value.value;
        if (name === 'documentRegulatorSelected') {
            if (item.code == 1) {
                this.setState({
                    DefaultDocumentRegulatorUserNameShow: false,
                })
            } else {
                this.setState({
                    DefaultDocumentRegulatorUserNameShow: true,
                })
            }
        }
        this.setState({
            [name]: item
        });
    };
    handleChangeCheck = (event, name) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handleDate(value, name) {
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    service={SaveAccountSettingServices.SaveAccountSetting}
                    {...this.props}
                    {...this.state}
                    notRedirect
                    entity={
                        {
                            // dateFilter: {
                            //     startDate: this.state.startDate,
                            //     endDate: this.state.endDate
                            // },
                            accountTypeSetting: {
                                groupLength: parseInt(this.state.groupLength, 10),
                                generalLedgerCodeLength: parseInt(this.state.generalLedgerCodeLength, 10),
                                subsidiaryLedgerCodeLength: parseInt(this.state.subsidiaryLedgerCodeLength, 10),
                                detailLedgerCodeLength: parseInt(this.state.detailLedgerCodeLength, 10),
                            },
                            relationBetweenSubsidiaryAndDetailGroupIsRequired: this.state.relationBetweenSubsidiaryAndDetailGroupIsRequired,
                            voucherMasterDescriptionIsRequired: this.state.VoucherMasterDescriptionIsRequired,
                            voucherDetailDescriptionIsRequired: this.state.VoucherDetailDescriptionIsRequired,
                            accountCodeSelectionType: this.state.accountCodeSelectionTypeSelected.code,
                            defaultVoucherLockerUserName: this.state.defaultVoucherCreatorUserNameSelected.userName,
                            defaultVoucherCreatorUserName: this.state.defaultVoucherCreatorUserNameSelected.userName,
                            documentRegulator: this.state.documentRegulatorSelected.code,
                            defaultDocumentRegulatorUserName: this.state.defaultDocumentRegulatorUserNameSelected.userName,
                            financialManagerUserName: this.state.financialManagerUserNameSelected.userName,
                            voucherDescriptionIsRequired: this.state.voucherDescriptionIsRequired,
                            voucherRowIsRequired: this.state.voucherRowIsRequired,
                            validFrom : this.state.startDate,
                            toDate: this.state.endDate
                        }
                    }
                    className="form-height"
                >
                    <Fieldset legend={'تنظیمات طول کد حسابداری'}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="groupLength" label="طول کد گروه"
                                    value={this.state.groupLength}
                                    handleChange={(value, error) => this.handleChange(value, 'groupLength')} type="number" format={'##'} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="generalLedgerCodeLength" label="طول کد کل"
                                    value={this.state.generalLedgerCodeLength}
                                    handleChange={(value, error) => this.handleChange(value, 'generalLedgerCodeLength')} type="number" format={'##'} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="subsidiaryLedgerCodeLength" label="طول کد معین"
                                    value={this.state.subsidiaryLedgerCodeLength}
                                    handleChange={(value, error) => this.handleChange(value, 'subsidiaryLedgerCodeLength')} type="number" format={'##'} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="detailLedgerCodeLength" label="طول کد تفصیل"
                                    value={this.state.detailLedgerCodeLength}
                                    handleChange={(value, error) => this.handleChange(value, 'detailLedgerCodeLength')} type="number" format={'##'} />
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={4}>
                            <FormControlLabel
                                label="اجباری بودن ارتباط معین با طبقه تفصیلی"
                                className="my-3"
                                control={
                                    <Checkbox
                                        checked={this.state.relationBetweenSubsidiaryAndDetailGroupIsRequired}
                                        onChange={(value) => this.handleChangeCheck(value, 'relationBetweenSubsidiaryAndDetailGroupIsRequired')}
                                        value=""
                                        color="primary"
                                    />
                                }

                            />
                        </Grid>
                        <Grid item md={4}>
                            <FormControlLabel
                                label="اجباری بودن شرح سند"
                                className="my-3"
                                control={
                                    <Checkbox
                                        checked={this.state.voucherDescriptionIsRequired}
                                        onChange={(value) => this.handleChangeCheck(value, 'voucherDescriptionIsRequired')}
                                        value=""
                                        color="primary"
                                    />
                                }

                            />
                        </Grid>
                        <Grid item md={4}>
                            <FormControlLabel
                                label="اجباری بودن شرح ردیف سند"
                                className="my-3"
                                control={
                                    <Checkbox
                                        checked={this.state.voucherRowIsRequired}
                                        onChange={(value) => this.handleChangeCheck(value, 'voucherRowIsRequired')}
                                        value=""
                                        color="primary"
                                    />
                                }

                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={3}>
                            <PersianDatePicker selectedDate={this.state.startDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'startDate')} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'endDate')} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">


                        <Grid item md={4}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.accountCodeSelectionType}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.accountCodeSelectionTypeSelected}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">

                        <Grid item md={8}>
                            <AutoCompleteComponent
                                {...this.state.defaultVoucherLockerUserName}
                                handleChange={(value) => this.handleChange(value, 'defaultVoucherLockerUserNameSelected')}
                                value={this.state.defaultVoucherLockerUserNameSelected.fullName}
                                service={GetPartiesService.simpleSearchCustomers} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">

                        <Grid item md={8}>
                            <AutoCompleteComponent
                                {...this.state.defaultVoucherCreatorUserName}
                                handleChange={(value) => this.handleChange(value, 'defaultVoucherCreatorUserNameSelected')}
                                value={this.state.defaultVoucherCreatorUserNameSelected.fullName}
                                service={GetPartiesService.simpleSearchCustomers} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={2}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.documentRegulator}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.documentRegulatorSelected}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    {
                        this.state.DefaultDocumentRegulatorUserNameShow
                            ?
                            <Grid container spacing={8} className="no-margin">

                                <Grid item md={8}>
                                    <AutoCompleteComponent
                                        {...this.state.defaultDocumentRegulatorUserName}
                                        handleChange={(value) => this.handleChange(value, 'defaultDocumentRegulatorUserNameSelected')}
                                        value={this.state.defaultDocumentRegulatorUserNameSelected.fullName}
                                        service={GetPartiesService.simpleSearchCustomers} />
                                </Grid>
                            </Grid>
                            :
                            null
                    }

                    <Grid container spacing={8} className="no-margin">

                        <Grid item md={8}>
                            <AutoCompleteComponent
                                {...this.state.financialManagerUserName}
                                handleChange={(value) => this.handleChange(value, 'financialManagerUserNameSelected')}
                                value={this.state.financialManagerUserNameSelected.fullName}
                                service={GetPartiesService.simpleSearchCustomers} />
                        </Grid>
                    </Grid>

                </Form>
            </React.Fragment>

        )
    }
}
export default withStyles(styles)(AccountingSettingsComponents)