import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Input from 'shared/components/formInput/inputForm';
import Fieldset from 'shared/components/fieldset/fieldset';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import PersianDatePicker from 'shared/components/persianDatePicker/imrcDatePicker';
import Form from 'shared/components/form/form';
import styles from 'containers/layout/panel/theme';
import getSimpleMainMarkets from 'services/getSimpleMainMarkets';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import SaveCreditPartyService from '../services/SaveCreditPartyService';

const today = new Date();

class AddCreditPartyComponent extends React.Component {

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
            
            selectedMarket: { id: 0 },
            isChangeParty : true
        };
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    // LIFE_CYCLE
    componentDidMount() {
        this.getMainMarket();
        this.setSelectedParty();
    }
    // HANDLE_FUNCTIONS
    handleChangeMarket = (value) => {
        this.setState({
            selectedMarket: value.value,
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
    };

    // FUNCTIONS
    setSelectedParty() {
        if (this.props.history.location.state) {
            let party = JSON.parse(this.props.history.location.state).params;
            if (party.id) {
                this.setState({
                    selectedParty: party,
                    isChangeParty: false
                })
            }
        }
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
    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} {...this.state} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            partyId: this.state.selectedParty.id,
                            validUntil: this.state.date,
                            archiveNumber: this.state.archiveNumber,
                            archiveLetterNumber: this.state.archiveLetterNumber,
                            amount: this.state.amount,
                            contractAmount: this.state.contractAmount,
                            mainMarketId: this.state.selectedMarket.id,
                            description: this.state.description,
                            isActive: this.state.isActive
                        }
                    }
                    redirect={"/main/persons/partyService/getCreditCustomerServices"}
                    service={SaveCreditPartyService.savepartyserviceMethod}
                    disabled={this.state.selectedMarket.id == 0 || this.state.selectedParty.id == 0 || !this.state.selectedParty || !this.state.amount}
                    className="form-height">
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
                                                        value={this.state.selectedParty.fullName} />
                                                </div>
                                            </Grid>
                                    }
                                </Grid>
                            </Fieldset>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id=""
                                label="مقدار اعتبار"
                                value={this.state.amount}
                                handleChange={(value, error) => this.handleChange(value, 'amount')}
                                type="number"
                                required />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="تاریخ اتمام اعتبار" handleOnChange={this.handleChangeDate} selectedDate={this.state.date} min={today} />
                        </Grid>
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.market}
                                    handleChange={(value) => this.handleChangeMarket(value)}
                                    value={this.state.selectedMarket} required />
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isActive}
                                        onChange={this.handleChangeCheck('isActive')}
                                        value=""
                                        color="primary" />
                                }
                                label="فعال"
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={8}>
                        <Grid item md={10}>
                            <Fieldset legend={'اطلاعات بایگانی'}>
                                <Grid container spacing={8}>
                                    <Grid item md={4}>
                                        <NumberFormatComponent
                                            id=""
                                            label="عدد شماره بایگانی"
                                            value={this.state.archiveNumber}
                                            handleChange={(value, error) => this.handleChange(value, 'archiveNumber')}
                                            type="number" />
                                    </Grid>
                                    <Grid item md={4}>
                                        <Input label="حرف شماره بایگانی" handleChange={(e) => this.handleChange(e, 'archiveLetterNumber')} value={this.state.archiveLetterNumber} />
                                    </Grid>
                                    <Grid item md={4}>
                                        <NumberFormatComponent
                                            id=""
                                            label="مقدار اعتبار قرارداد"
                                            value={this.state.contractAmount}
                                            handleChange={(value, error) => this.handleChange(value, 'contractAmount')}
                                            type="number" />
                                    </Grid>
                                </Grid>
                            </Fieldset>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item md={10}>
                            <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'description')} value={this.state.description} isMultiLine={true} />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }
}

AddCreditPartyComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddCreditPartyComponent);