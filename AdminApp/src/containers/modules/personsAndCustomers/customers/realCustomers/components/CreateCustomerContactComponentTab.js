import React from 'react'
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import Input from 'shared/components/formInput/inputForm';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fieldset from 'shared/components/fieldset/fieldset';
import Email from 'shared/components/email/email';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetAllRegion from "../../../../../../services/getRegion";
import SaveManagedCustomerContactServices from '../../managedCustomerContact/services/saveManagedCustomerContactService';
import GetPartyByIdService from '../services/GetPartyByIdService';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PhoneNumber from 'shared/components/phoneNumber/phoneNumber';


class CreateCustomerContactComponentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: {
                name: "selectedProvince",
                field: "title",
                label: "استان",
                list: []
            },
            selectedProvince: {},
            region: {
                name: "selectedRegion",
                field: "title",
                label: "شهر",
                list: []
            },
            selectedRegion: {},
            partyAddressType: {
                name: "selectedPartyAddressType",
                field: "title",
                label: "نوع نشانی",
                list: []
            },
            selectedPartyAddressType: {},
            addressLabelValue: 'نشانی',
            phoneLabelValue: 'تلفن',
            isDefault: false,
            description: '',
            mobile: '',
            fax: '',
            postalCode: '',
            webPage: '',
            email1: '',
            email2: '',
            email3: '',
            homeAddress: '',
            businessAddress: '',
            address: '',
            homePhone: '',
            preHomePhone: '',
            phone: '',
            prePhone: '',
            businessPhone: '',
            preBusinessPhone: '',
            partyFullName: '',
            nationalId: '',
            partyType: 0,
        }

    }

    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handleChange = (event, name) => {
        if (name === 'selectedPartyAddressType') {
            let addressLabel = `  نشانی ${event.value.title} `;
            let phoneLabel = `  تلفن ${event.value.title} `;
            this.setState({
                [name]: event.value,
                addressLabelValue: addressLabel,
                phoneLabelValue: phoneLabel,
            });
        } else {
            this.setState({
                [name]: event.value,
            })
        }


    };
    getAllRegistry() {
        GetAllRegion(null, (response) => {
            DropDownListDataProvider(this, "province", response);
            DropDownListDataProvider(this, "region", response);
        });
    };
    getPartyType() {
        GetEnum('partyaddresstype', (response) => { DropDownListDataProvider(this, "partyAddressType", response) });
    }
    componentDidMount() {
        this.getAllRegistry();
        this.getPartyType();


        GetPartyByIdService.getPartyById({ entity: this.props.location.state.partyId }, (res) => {
            this.setState({
                partyFullName: res.result.fullName,
                nationalId: res.result.nationalId,
                partyType: res.result.partyType
            })
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} backParams={
                    this.props.location.state === undefined ? undefined : {

                        // title : 'بازگشت به تب اطلاعات تماس',
                        path: this.props.location.state.backPath,
                        customeBackInfo: true,
                        partyId: this.props.location.state.partyId,
                        tabId: 3,

                    }
                } />
                <Form
                    className="form-height"
                    {...this.props}
                    {...this.state}
                    service={SaveManagedCustomerContactServices.saveContactMethod}
                    // redirect={"/main/persons/customers/completeRegister"}
                    // // preSubmit={this.preSubmit}
                    // SubmitTitle={'ذخیره و تکمیل اطلاعات'}
                    // otherAction={[
                    //     {
                    //         color: "#43a047",
                    //         title: 'ذخیره و ثبت مشتری جدید',
                    //         action: {
                    //             isSubmit: true,
                    //             method: this.refresh
                    //         }
                    //     }
                    // ]}
                    entity={
                        {
                            partyId: this.props.location.state.partyId,

                            mobile: this.state.mobile ? (this.state.mobile.length < 11 ? ("09" + this.state.mobile.replace(/ /g, '')) : this.state.mobile.replace(/ /g, '')) : null,
                            fax: this.state.fax,
                            postalCode: this.state.postalCode,
                            webPage: this.state.webPage,
                            imAddress: null,
                            email1: this.state.email1,
                            email2: this.state.email2,
                            email3: this.state.email3,
                            upRegionId: this.state.selectedProvince.id ? this.state.selectedProvince.id : null,
                            isDefault: this.state.isDefault,
                            description: this.state.description,
                            regionId: this.state.selectedRegion.id ? this.state.selectedRegion.id : null,
                            addressType: this.state.selectedPartyAddressType.code,
                            homeAddress: this.state.homeAddress,
                            businessAddress: this.state.businessAddress,
                            address: this.state.address,
                            prePhone: this.state.prePhone,
                            phone: this.state.phone,
                            homePhone: this.state.homePhone,
                            preHomePhone: this.state.preHomePhone,
                            businessPhone: this.state.businessPhone,
                            preBusinessPhone: this.state.preBusinessPhone,
                        }
                    }
                    cancelModal={() => { }}
                    afterSubmit={
                        () => {

                            this.props.history.push(
                                {
                                    pathname: "/main/persons/customers/completeRegisterRealCustomer",
                                    state: {
                                        // title : this.props.location.state.title,
                                        // path : this.props.location.state.backPath,
                                        customeBackInfo: true,
                                        partyId: this.props.location.state.partyId,
                                        tabId: 3,
                                    }
                                }
                            );
                        }
                    }
                >


                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="margin-bottom-30">
                            <Grid item md={3}>
                                <h3><span>نام/ نام خانوادگی: </span><strong>{this.state.partyFullName}</strong></h3>
                            </Grid>
                            <Grid item md={3}>
                                <h3><span>کد ملی: </span><strong>{this.state.nationalId}</strong></h3>
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />


                    <Fieldset legend={'اطلاعات تماس حقیقی'}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <ComboBoxComponent isFilterable {...this.state.province}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedProvince} />
                                {/* <div className="k-rtl">
                            <DropDownComponent {...this.state.province}
                                handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                value={this.state.selectedProvince} />
                        </div> */}
                            </Grid>
                            <Grid item md={2}>
                                <ComboBoxComponent isFilterable {...this.state.region}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedRegion} />
                                {/* <div className="k-rtl">
                            <DropDownComponent {...this.state.region}
                                handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                value={this.state.selectedRegion} />
                        </div> */}
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">

                            <Grid item md={5}>
                                <Input label="نشانی منزل" handleChange={(e) => this.handleChange(e, 'homeAddress')} value={this.state.homeAddress} required />
                            </Grid>
                            <Grid item md={3}>
                                <NumberFormatComponent id="postalCode" label="کد پستی"
                                    value={this.state.postalCode}
                                    handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" format={'##########'} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="homePhone" label="تلفن منزل" required
                                    value={this.state.homePhone}
                                    handleChange={(value, error) => this.handleChange(value, 'homePhone')} type="number" format={'########'} />
                            </Grid>
                            <span className="margin-top-25 margin-right-5"> ـ </span>
                            <Grid item md={1}>
                                <NumberFormatComponent id="phoneCode" label="پیش شماره"
                                    value={this.state.preHomePhone}
                                    handleChange={(value, error) => this.handleChange(value, 'preHomePhone')} type="number" />
                            </Grid>
                            <Grid item md={3}>
                            <PhoneNumber
                            require={true}
                            id="mobile" label="شماره همراه"
                                        value={this.state.mobile}
                                        handleChange={(value) => this.handleChange(value, 'mobile')} type="number"
                           />
                            </Grid>

                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={5}>
                                <Input label="نشانی محل کار" handleChange={(e) => this.handleChange(e, 'businessAddress')} value={this.state.businessAddress} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="homePhone" label="تلفن محل کار"
                                    value={this.state.businessPhone}
                                    handleChange={(value, error) => this.handleChange(value, 'businessPhone')} type="number" format={'########'} />
                            </Grid>
                            <span className="margin-top-25 margin-right-5"> ـ </span>
                            <Grid item md={1}>
                                <NumberFormatComponent id="phoneCode" label="پیش شماره"
                                    value={this.state.preBusinessPhone}
                                    handleChange={(value, error) => this.handleChange(value, 'preBusinessPhone')} type="number" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent label="فکس" handleChange={(e) => this.handleChange(e, 'fax')} type="number" value={this.state.fax} />
                            </Grid>
                            <Grid item md={2}>
                                <Email label="ایمیل" handleChange={(e) => this.handleChange(e, 'email1')} value={this.state.email1} isLeftStartText={true} />
                            </Grid>
                            <Grid item md={2}>
                                <Email label="ایمیل دوم" handleChange={(e) => this.handleChange(e, 'email2')} value={this.state.email2} isLeftStartText={true} />
                            </Grid>
                            <Grid item md={2}>
                                <Email label="ایمیل سوم" handleChange={(e) => this.handleChange(e, 'email3')} value={this.state.email3} isLeftStartText={true} />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="وب سایت" handleChange={(e) => this.handleChange(e, 'webPage')} value={this.state.webPage} isLeftStartText={true} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isDefault}
                                        onChange={this.handleChangeCheck('isDefault')}
                                        value="isDefault"
                                        color="primary"
                                    />
                                }
                                label="اطلاعات پیش فرض"
                            />
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'description')} value={this.state.description} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fieldset>



                </Form>
            </React.Fragment>

        )
    }
}
export default withStyles(styles)(CreateCustomerContactComponentTab)