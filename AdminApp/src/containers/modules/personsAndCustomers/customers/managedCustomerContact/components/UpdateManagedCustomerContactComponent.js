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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fieldset from 'shared/components/fieldset/fieldset';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import Email from 'shared/components/email/email';
import GetManagedCustomerContactServices from "../services/getManagedCustomerContactService";
import UpdateManagedCustomerContactServices from "../services/updateManagedCustomerContactService";
import GetAllRegion from "../../../../../../services/getRegion";
import PhoneNumber from 'shared/components/phoneNumber/phoneNumber';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';


class UpdateManagedCustomerContactComponent extends React.Component {
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
            phoneCode: '',
            mobile: '',
            fax: '',
            postalCode: '',
            webPage: '',
            email1: '',
            email2: '',
            email3: '',
            isDefault: false,
            description: '',
            upRegionId: '',
            regionId: '',
            addressType: '',
            partyId: '',
            addressLabelValue: 'نشانی',
            homeAddress: '',
            businessAddress: '',
            address: '',
            homePhone: '',
            preHomePhone: '',
            phone: '',
            prePhone: '',
            businessPhone: '',
            preBusinessPhone: '',
            checkPartyType: '',
            fullName: '',
            partyType: 0,
            nationalId: '',
            selectedParty: {
                fullName: ''
            },
            isChangeParty: true,
            stateInfo: {},

        }

    }
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handleChange = (event, name) => {
        if (name === 'selectedPartyAddressType' && this.state.partyType === 2) {
            let addressLabel = `  نشانی ${event.value.title} `;
            this.setState({
                addressLabelValue: addressLabel
            });
        }
        this.setState({
            [name]: event.value
        })

    };


    getAllRegistry() {
        GetAllRegion(null, (response) => {
            DropDownListDataProvider(this, "province", response);
            DropDownListDataProvider(this, "region", response);
            response.result.map(item => {
                if (item.id === this.state.upRegionId) {
                    this.setState({
                        selectedProvince: item
                    })
                }
                if (item.id === this.state.regionId) {
                    this.setState({
                        selectedRegion: item
                    })
                }
            });
        });
    };
    getPartyType() {
        GetEnum('partyaddresstype', (response) => {
            if (this.state.partyType === 2) {
                response.result = response.result.filter(item => { return item.code !== 2000 })
            }
            DropDownListDataProvider(this, "partyAddressType", response);
            response.result.map(item => {
                if (item.code === this.state.addressType) {
                    this.setState({
                        selectedPartyAddressType: item,
                        addressLabelValue: `نشانی ${item.title}`
                    })
                }
            });
        });

    }

    componentDidMount() {

        if (this.props.history.location.state) {

            this.setState({
                stateInfo: typeof this.props.history.location.state === 'string' ? JSON.parse(this.props.history.location.state) : this.props.history.location.state
            }, () => {
                let partyId = this.state.stateInfo.partyId;
                if (partyId > 0) {
                    this.getPartyById(partyId);
                }


            })
        }
    }

    getPartyById(partyId) {
        let command = {
            entity: partyId
        };
        GetPartiesService.getpartybyid(command, (res) => {

            this.setState({
                selectedParty: res.result,
                isChangeParty: false
            }, () => {

                this.getContactById()

            })
        });
    }

    getContactById() {
        let command = {
            entity: this.state.stateInfo.id,
        };

        GetManagedCustomerContactServices.getContactById(command, (res) => {
            this.setState({
                mobile: res.result.mobile,
                fax: res.result.fax,
                postalCode: res.result.postalCode,
                webPage: res.result.webPage,
                email1: res.result.email1,
                email2: res.result.email2,
                email3: res.result.email3,
                upRegionId: res.result.upRegionId,
                regionId: res.result.regionId,
                addressType: res.result.addressType,
                isDefault: res.result.isDefault,
                description: res.result.description,
                partyId: res.result.id,
                checkPartyType: res.result.partyType,
                homeAddress: res.result.homeAddress,
                businessAddress: res.result.businessAddress,
                address: res.result.address,
                homePhone: res.result.homePhone,
                preHomePhone: res.result.preHomePhone,
                phone: res.result.phone,
                prePhone: res.result.prePhone,
                businessPhone: res.result.businessPhone,
                preBusinessPhone: res.result.preBusinessPhone,
                fullName: res.result.fullName,
                partyType: res.result.partyType,
                nationalId: res.result.nationalId

            },
                () => {
                    this.getAllRegistry();
                    this.getPartyType();
                }
            )
        });

    }



    render() {
        let formOutPut = null;
        if (this.state.selectedParty.partyType == 1) {
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
                        <Input label="نشانی منزل" handleChange={(e) => this.handleChange(e, 'homeAddress')} value={this.state.homeAddress} />
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
        } else if (this.state.selectedParty.partyType == 2) {
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
                    </Grid>
                </Grid>
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={2}>
                        <NumberFormatComponent label="تلفن"
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
                        <PhoneNumber
                            require={false}
                            id="mobile" label="شماره همراه"
                            value={this.state.mobile}
                            handleChange={(value) => this.handleChange(value, 'mobile')} type="number"
                        />
                    </Grid>
                    <Grid item md={2}>
                        <NumberFormatComponent id="fax" label="فکس"
                            value={this.state.fax}
                            handleChange={(value) => this.handleChange(value, 'fax')} type="number" />
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

            <React.Fragment>
                <Header {...this.props} back={this.state.stateInfo.backButton ? this.state.stateInfo.backButton : this.props.back}
                    backParams={
                        this.props.location.state === undefined ? undefined : {
                            partyId: this.state.stateInfo.partyId,
                            tabId: this.state.stateInfo.tabId
                        }

                    } />
                <Form
                    {...this.state}
                    {...this.props}
                    className="form-height"
                    service={UpdateManagedCustomerContactServices.updateContactMethod}
                    redirectPage={this.state.stateInfo.backButton ? "/main/persons/customers/completeRegisterLegalCustomer" : "/main/persons/customers/managedCustomerContact"}

                    entity={
                        {
                            id:this.state.stateInfo.id,
                            partyId: this.state.stateInfo.partyId,
                            mobile: this.state.mobile ? (this.state.mobile.length < 11 ? ("09" + this.state.mobile.replace(/ /g, '')) : this.state.mobile.replace(/ /g, '')) : null,
                            fax: this.state.fax,
                            postalCode: this.state.postalCode,
                            webPage: this.state.webPage,
                            email1: this.state.email1,
                            email2: this.state.email2,
                            email3: this.state.email3,
                            upRegionId: this.state.selectedProvince.id ? this.state.selectedProvince.id : null,
                            regionId: this.state.selectedRegion.id ? this.state.selectedRegion.id : null,
                            isDefault: this.state.isDefault,
                            description: this.state.description,
                            addressType: this.state.selectedPartyAddressType.code,
                            homeAddress: this.state.homeAddress,
                            businessAddress: this.state.businessAddress,
                            address: this.state.address,
                            homePhone: this.state.homePhone,
                            preHomePhone: this.state.preHomePhone,
                            phone: this.state.phone,
                            prePhone: this.state.prePhone,
                            businessPhone: this.state.businessPhone,
                            preBusinessPhone: this.state.preBusinessPhone,
                        }
                    }>
                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="margin-bottom-30">
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
                        </Grid>
                    </Fieldset>
                    <br />
                    {formOutPut}
                </Form>
            </React.Fragment>

        )
    }
}
export default withStyles(styles)(UpdateManagedCustomerContactComponent)