import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import toastr from 'toastr';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Button from '@material-ui/core/Button';
import Submit from 'shared/components/submitAction/actionSubmit';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import getSimpleMainMarkets from 'services/getSimpleMainMarkets';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
// import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import PersianDatePicker from 'shared/components/persianDatePicker/imrcDatePicker';

import { getServicesHeaderTemplate, getServicesTemplate } from 'constants/autoCompleteTemplate';
import GetCustomersServicesSerivce from '../../../partyService/customersSerivceList/services/GetCustomersServicesSerivce';
import SaveCustomerServicesService from '../../../partyService/customersSerivceList/services/SaveCustomerServicesService';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import GetPartyByIdService from '../services/GetPartyByIdService';


class CreateServiceOfRealCustomerComponentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getServices: {
                name: "selectedGetServices",
                field: "title",
                headerTemplate: getServicesHeaderTemplate,
                template: getServicesTemplate,
                fieldSearch: 'phrase',
                placeholder: "جستجوی سرویس  بر اساس عنوان و توضیحات",
                label: "عنوان سرویس",
                list: []
            },
            selectedGetServices: { title: '', id: 0 },
            archiveLetterNumber: '',
            archiveNumber: undefined,
            description: '',
            isActive: true,
            contractAmount: undefined,
            amount: undefined,
            date: null,

            market: {
                name: "selectedMarket",
                field: "title",
                label: "بازار",
                list: []
            },

            serviceList: {
                name: "selectedService",
                field: "title",
                label: "عنوان خدمت",
                list: []
            },
            selectedService: { id: 0 },
            
            selectedMarket: { id: 0 },
            partyFullName: '',
            nationalId: ''
            // stateBack :
            // this.props.location.state && this.props.location.state.backPath ? 
            // {
            //     title : 'بازگشت به تب خدمات',
            //     path : this.props.location.state.backPath,
            //     customeBackInfo : true,
            //     partyId : this.props.location.state.partyId,
            //     tabId: 2,
            // } : {},



        }

        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    handleChangeMarket = (value) => {

        this.setState({
            selectedMarket: value.value,

        })

    };

   

    componentDidMount() {
        GetCustomersServicesSerivce.getservicesMethod({}, (response) => {
            DropDownListDataProvider(this, "serviceList", response);
        })
        GetPartyByIdService.getPartyById({ entity: this.props.location.state.partyId }, (res) => {
            this.setState({
                partyFullName: res.result.fullName,
                nationalId: res.result.nationalId,
            }, () => {
                this.getMainMarket();
            })
        })
    }

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

    // handleChange = (item,name) => {
    //     this.setState({
    //       [name]: item.value
    //     });

    // }
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
        return (
            <React.Fragment>
                <Header {...this.props} backParams={
                    this.props.location.state === undefined ? undefined : {



                        // title : 'بازگشت به تب خدمات',
                        path: this.props.location.state.backPath,
                        customeBackInfo: true,
                        partyId: this.props.location.state.partyId,
                        tabId: 2

                    }
                } />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            partyId: this.props.location.state.partyId,
                            serviceId: this.state.selectedGetServices.id,
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
                    // redirect={this.props.location.state !== undefined ? "/main/persons/customers/completeRegister": "/main/persons/partyService/customerServiceList"}
                    service={SaveCustomerServicesService.savepartyserviceMethod}
                    disabled={this.state.selectedMarket.id == 0 || this.state.selectedGetServices.id == 0}
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
                                        tabId: 2,
                                    }
                                }
                            );
                        }
                    }
                    className="form-height">
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
                                    handleChange={(value) => this.handleChangeMarket(value)} isFilterable={false}
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
CreateServiceOfRealCustomerComponentTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateServiceOfRealCustomerComponentTab);