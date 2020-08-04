import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Input from 'shared/components/formInput/inputForm';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import getSimpleMainMarkets from 'services/getSimpleMainMarkets';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import PersianDatePicker from 'shared/components/persianDatePicker/imrcDatePicker';
import GetCustomersServicesSerivce from '../services/GetCustomersServicesSerivce';
import { getServicesHeaderTemplate, getServicesTemplate } from 'constants/autoCompleteTemplate';
import SaveCustomerServicesService from '../services/SaveCustomerServicesService';
import GetPartyByIdService from '../../../../personsAndCustomers/customers/realCustomers/services/GetPartyByIdService';
import GetMainMarket from 'services/GetMainMarkets';

class AddCustomerServiceComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری",
                list: []
            },
            selectedParty: {
                fullName: '',
                id: 0
            },
            serviceList: {
                name: "selectedService",
                field: "title",
                label: "عنوان خدمت",
                list: []
            },
            selectedService: { id: 0 },

            archiveLetterNumber: '',
            archiveNumber: undefined,
            description: '',
            isActive: true,
            contractAmount: undefined,
            amount: undefined,
            date: null,

            market: {
                name: "selected",
                field: "title",
                label: "بازار",
                list: []
            },
            selectedMarket: { id: 0 },
            stateInfo: {},
            isChangeParty: true
        }

        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    handleChangeMarket = (value) => {
        this.setState({
            selectedMarket: value.value,

        })
    };


    componentDidMount() {

        if (this.props.history.location.state) {
            this.setState({
                stateInfo: JSON.parse(this.props.history.location.state)
            }, () => {
                let partyId = this.state.stateInfo.partyId
                if (partyId > 0) {
                    this.setSelectedService(partyId);
                }
            })



        }

        GetMainMarket({}, (response) =>
            DropDownListDataProvider(this, "market", response));
        this.getMainMarket();
        GetCustomersServicesSerivce.getservicesMethod({}, (response) => {
            DropDownListDataProvider(this, "serviceList", response);
        })


    }
    setSelectedService(partyId) {
        let command = {
            entity:partyId
        };
        GetPartyByIdService.getPartyById(command, (res) => {
            this.setState({
                selectedParty: res.result,
                isChangeParty: false
            },
                () => {
                    this.getMainMarket();
                }
            );
        });



    };
    getMainMarket() {
        getSimpleMainMarkets((response) => {
            if (response.result) {
                this.setState({
                    selectedMarket: response.result.filter(item => { return item.id == 1 })[0],
                    market: {
                        name: "selectedMarket",
                        field: "title",
                        label: "بازار",
                        list: response.result
                    }
                })
            }
        });
    }
    handleChange = (item, name) => {
        this.setState({
            [name]: item.value
        });

    }
    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handleChangeDate(value) {
        this.setState({
            date: value,
        })
    }
    render() {
        console.log('BB',this.state.stateInfo.backButton)   
        console.log('vvv', this.state.selectedParty)   


        return (
            <React.Fragment>
                <Header {...this.props} back={this.state.stateInfo.backButton ? this.state.stateInfo.backButton : this.props.back}
                    backParams={
                        this.props.location.state === undefined ? undefined : {
                            partyId: this.state.stateInfo.partyId,
                            tabId: this.state.stateInfo.tabId,
                        }

                    } />


                <Form
                    {...this.props}
                    {...this.state}
                    
                    entity={
                        {
                            partyId: this.state.stateInfo.partyId,
                            serviceId: this.state.selectedService.id,
                            validUntil: this.state.date,
                            archiveNumber: this.state.archiveNumber,
                            archiveLetterNumber: this.state.archiveLetterNumber,
                            amount: this.state.amount,
                            contractAmount: this.state.contractAmount,
                            mainMarketId: this.state.selectedMarket.id,
                            description: this.state.description,
                            isActive: this.state.isActive,
                            description: this.state.description
                        }
                    }
                    redirectPage= {this.state.stateInfo.backButton ? "/main/persons/customers/completeRegisterLegalCustomer" : "/main/persons/partyService/getCustomersServices"}
                    service={SaveCustomerServicesService.savepartyserviceMethod}
                    disabled={this.state.selectedMarket.id == 0 || this.state.selectedParty.id == 0 || this.state.selectedService.id == 0}
                    className="form-height"
                >


                    <Grid container spacing={8}>
                        <Grid item md={10}>
                            <Fieldset legend={'اطلاعات مشتری'}>
                                <Grid container spacing={8} className="margin-bottom-30">
                                    {
                                        this.state.selectedParty.id && !this.state.isChangeParty ?
                                            <React.Fragment>
                                                <Grid item md={3}>
                                                    <h3>
                                                        <span>نام و نام خانوادگی: </span><strong>{this.state.selectedParty.fullName}</strong>
                                                    </h3>
                                                </Grid>
                                                <Grid item md={3}>
                                                    <h3>
                                                        <span>
                                                            {
                                                                this.state.selectedParty.partyType === 1 ? "کد ملی: " : "شناسه ملی: "
                                                            }

                                                        </span>
                                                        <strong>{this.state.selectedParty.nationalId}</strong>
                                                    </h3>
                                                </Grid>
                                            </React.Fragment>
                                            :
                                            <Grid item md={12}>
                                                <div className="k-rtl">
                                                    <AutoCompleteComponent
                                                        {...this.state.party}
                                                        required
                                                        handleChange={(value) => this.handleChange(value, 'selectedParty')}
                                                        service={GetPartiesService.simpleSearchCustomers}
                                                        value={this.state.selectedParty.fullName}
                                                    />
                                                </div>
                                            </Grid>
                                    }
                                </Grid>
                            </Fieldset>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item md={7}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.serviceList}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedService}
                                    hasAll />
                            </div>



                        </Grid>
                        <Grid item md={3}>
                            {/* <NoDataDatePicker isNull={true} selectedDate={this.state.date} label="تاریخ اعتبار خدمت" handlehDate={this.date}/>             */}
                            <PersianDatePicker label="تاریخ اعتبار خدمت" handleOnChange={this.handleChangeDate} selectedDate={this.state.date} />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={8}>
                        <Grid item md={10}>
                            <Fieldset legend={'شماره بایگانی'}>
                                <Grid container spacing={8}>
                                    <Grid item md={6}>
                                        <NumberFormatComponent
                                            id=""
                                            label="عدد"
                                            value={this.state.archiveNumber}
                                            handleChange={(value, error) => this.handleChange(value, 'archiveNumber')}
                                            type="number" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <Input label="حرف" handleChange={(e) => this.handleChange(e, 'archiveLetterNumber')} value={this.state.archiveLetterNumber} />
                                    </Grid>

                                </Grid>
                            </Fieldset>
                        </Grid>
                    </Grid>

                    <Grid container spacing={8}>

                        <Grid item md={4}>
                            <NumberFormatComponent
                                id=""
                                label="مقدار"
                                value={this.state.amount}
                                handleChange={(value, error) => this.handleChange(value, 'amount')}
                                type="number"
                            />
                        </Grid>
                        <Grid item md={4}>
                            <NumberFormatComponent
                                id=""
                                label="مقدار قرار داد"
                                value={this.state.contractAmount}
                                handleChange={(value, error) => this.handleChange(value, 'contractAmount')}
                                type="number"
                            />
                        </Grid>
                        <Grid item md={2}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.market}
                                    handleChange={(value) => this.handleChangeMarket(value)}
                                    value={this.state.selectedMarket} required />
                            </div>
                        </Grid>

                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item md={10}>
                            <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'description')} value={this.state.description} isMultiLine={true} />
                        </Grid>

                    </Grid>
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isActive}
                                        onChange={this.handleChangeCheck('isActive')}
                                        value=""
                                        color="primary"
                                    />
                                }
                                label="فعال"
                            />
                        </Grid>
                    </Grid>


                </Form>
            </React.Fragment>
        )
    }
}
AddCustomerServiceComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    hasHeader: false

};



export default withStyles(styles)(AddCustomerServiceComponent);
