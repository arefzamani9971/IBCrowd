import React from 'react'
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
import GetPartiesService from "../../customersList/services/GetPartiesService";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import Input from 'shared/components/formInput/inputForm';
import Checkbox from '@material-ui/core/Checkbox';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fieldset from 'shared/components/fieldset/fieldset';
import Email from 'shared/components/email/email';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetAllRegion from "../../../../../../services/getRegion";
import './GetManagedCustomerContactComponent.css'
import SaveManagedCustomerContactServices from "../services/saveManagedCustomerContactService";
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import GetManagedCustomerContactServices from '../../../customers/managedCustomerContact/services/getManagedCustomerContactService'
import GetPartyByIdService from '../../../../personsAndCustomers/customers/realCustomers/services/GetPartyByIdService';

class CreateManagedCustomerContactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری",
                list: []
            },
            selectedParty: { fullName: '' },
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
            // businessPhone: '',
            mobile: '',
            fax: '',

            // businessAddress: '',
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
            stateInfo: {},
            isChangeParty: true
        }

    }

    handlePartyChange = (item) => {
        this.setState({
            selectedParty: item.value,
        })
    };


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
    getAllRegistry = () => {
        GetAllRegion(null, (response) => {
            DropDownListDataProvider(this, "province", response);
            DropDownListDataProvider(this, "region", response);
        });
    };
    getPartyType = () => {
        GetEnum('partyaddresstype', (response) => { DropDownListDataProvider(this, "partyAddressType", response) });
    }

    componentDidMount() {


        if (this.props.history.location.state) {
            this.setState({
                stateInfo: JSON.parse(this.props.history.location.state)
            }, () => {
                let partyId = this.state.stateInfo.partyId;
                if (partyId > 0) {
                    this.getPartyById(partyId);
                }
            })

        }

    }

    getPartyById = (partyId) => {
        let command = {
            entity: partyId,

        };
        GetPartyByIdService.getPartyById(command, (res) => {
            this.setState({
                selectedParty: res.result,
                isChangeParty: false
            }, () => {


                this.getAllRegistry();
                this.getPartyType();
            });
        });
    }


    render() {

        let formOutPut = null;
        if (this.state.selectedParty.partyType === 1) {
            formOutPut = <Fieldset legend={'اطلاعات تماس حقیقی'}>
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
                        <NumberFormatComponent id="homePhone" label="تلفن منزل"
                            value={this.state.homePhone}
                            handleChange={(value, error) => this.handleChange(value, 'homePhone')} type="number" format={'########'} required />
                    </Grid>
                    <span className="margin-top-25 margin-right-5"> ـ </span>
                    <Grid item md={1}>
                        <NumberFormatComponent id="phoneCode" label="پیش شماره"
                            value={this.state.preHomePhone}
                            handleChange={(value, error) => this.handleChange(value, 'preHomePhone')} type="number" />
                    </Grid>
                    <Grid item md={3}>
                        <NumberFormatComponent id="mobile" label="شماره همراه"
                            value={this.state.mobile}
                            handleChange={(value, error) => this.handleChange(value, 'mobile')} type="number" format={'09## #######'} />
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
        } else if (this.state.selectedParty.partyType === 2) {
            formOutPut = <Fieldset legend={'اطلاعات تماس حقوقی'}>
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={3}>
                        <div className="k-rtl">
                            <DropDownComponent {...this.state.partyAddressType}
                                handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                value={this.state.selectedPartyAddressType} required />
                        </div>
                    </Grid>
                </Grid>
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
                    <Grid item md={8}>
                        <Input label={this.state.addressLabelValue} handleChange={(e) => this.handleChange(e, 'address')} value={this.state.address} required />
                    </Grid>
                </Grid>

                <Grid container spacing={8} className="no-margin">
                    <Grid item md={4}>
                        <NumberFormatComponent id="postalCode" label="کد پستی"
                            value={this.state.postalCode}
                            handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" format={'##########'} />
                        {/*<Input label="کد پستی" handleChange={(e) => this.handleChange(e, 'postalCode')}  />*/}
                    </Grid>
                </Grid>
                <Grid container spacing={8} className="no-margin">
                    {/*<Grid item md={4}>*/}
                    {/*<Input label={this.state.phoneLabelValue} handleChange={(e) => this.handleChange(e, 'homePhone')}  />*/}
                    {/*</Grid>*/}
                    <Grid item md={2}>
                        <NumberFormatComponent label={this.state.phoneLabelValue}
                            value={this.state.phone}
                            handleChange={(value, error) => this.handleChange(value, 'phone')} type="number" format={'########'} required />
                    </Grid>
                    <span className="margin-top-25">ـ</span>
                    <Grid item md={2}>
                        <NumberFormatComponent id="phoneCode" label="پیش شماره تلفن"
                            value={this.state.prePhone}
                            handleChange={(value, error) => this.handleChange(value, 'prePhone')} type="number" />
                    </Grid>
                    <Grid item md={2}>
                        <NumberFormatComponent id="mobile" label="شماره همراه"
                            value={this.state.mobile}
                            handleChange={(value, error) => this.handleChange(value, 'mobile')} type="number" format={'09## #######'} />
                    </Grid>
                    <Grid item md={2}>
                        <NumberFormatComponent label="فکس" handleChange={(e) => this.handleChange(e, 'fax')} type="number" value={this.state.fax} />
                    </Grid>
                </Grid>

                <Grid container spacing={8} className="no-margin">
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
        }

        return (

            < React.Fragment >
                <Header {...this.props} back={this.state.stateInfo.backButton ? this.state.stateInfo.backButton : this.props.back}
                    backParams={
                        this.props.location.state === undefined ? undefined : {
                            partyId: this.state.stateInfo.partyId,
                            tabId: this.state.stateInfo.tabId
                        }

                    } />

                <Form
                    {...this.props}
                    {...this.state}
                    redirectPage={this.state.stateInfo.backButton ? "/main/persons/customers/completeRegisterLegalCustomer" : "/main/persons/customers/managedCustomerContact"}

                    className="form-height"
                    service={SaveManagedCustomerContactServices.saveContactMethod}
                    // redirect={"/main/persons/customers/completeRegisterLegalCustomer"}

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
                            partyId: this.state.stateInfo.partyId,
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
                >
                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="margin-bottom-30">

                            {
                                this.state.selectedParty.id && !this.state.isChangeParty ?
                                    <React.Fragment>
                                        <Grid item md={3}>
                                        
                                            <h3><span>نام و نام خانوادگی: </span><strong>{this.state.selectedParty.fullName}</strong></h3>
                                        </Grid>
                                        {

                                            < Grid item md={3}>
                                                <h3><span>
                                                    {
                                                        this.state.selectedParty.partyType === 1 ? "کد ملی: " : "شناسه ملی: "
                                                    }

                                                </span><strong>{this.state.selectedParty.nationalId}</strong></h3>
                                            </Grid>
                                        }
                                    </React.Fragment>

                                    :
                                    <Grid item md={12}>
                                        <AutoCompleteComplete
                                            {...this.state.party}
                                            handleChange={(value) => this.handlePartyChange(value)}
                                            value={this.state.selectedParty.fullName}
                                            service={GetPartiesService.simpleSearchCustomers}
                                            required />
                                    </Grid>
                            }

                        </Grid>
                    </Fieldset>
                    <br />


                    {
                        formOutPut
                    }



                </Form>
            </React.Fragment >

        )
    }
}

export default withStyles(styles)(CreateManagedCustomerContactComponent)