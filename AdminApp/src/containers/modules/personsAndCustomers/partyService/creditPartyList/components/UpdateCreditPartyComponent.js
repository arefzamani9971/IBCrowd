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
import PersianDatePicker from 'shared/components/persianDatePicker/imrcDatePicker';
import Form from 'shared/components/form/form';
import styles from 'containers/layout/panel/theme';
import getSimpleMainMarkets from 'services/getSimpleMainMarkets';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import EditCreditPartyService from '../services/EditCreditPartyService';

const today = new Date();

class UpdateCreditPartyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
        }
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    // LIFE_CYCLE
    componentDidMount() {
        this.getCreditPartyById();
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
    }

    // FUNCTIONS
    getCreditPartyById = () => {
        const body = {
            entity: this.props.location.state.stateParams.id
        };
        EditCreditPartyService.getCreditPartyById(body, (response) => {
            this.setState({
                id: response.result.id,
                partyId: response.result.partyId,
                date: response.result.validUntil,
                validFrom: response.result.validFrom,
                archiveNumber: response.result.archiveNumber,
                archiveLetterNumber: response.result.archiveLetterNumber,
                amount: response.result.amount,
                contractAmount: response.result.contractAmount,
                description: response.result.description,
                isActive: response.result.isActive
            }, () => {
                this.getMainMarket(response.result);
                this.getPartyById(response.result);
            })
        });
    };
    getPartyById() {
        let command = {
            entity: this.state.partyId,
        };
        GetPartiesService.getpartybyid(command, (response) => {
            this.setState({
                selectedParty: response.result
            })
        });
    }
    getMainMarket(result) {
        getSimpleMainMarkets((response) => {
            if (response.result) {
                this.setState({
                    selectedMarket: response.result.filter(item => { return item.id == result.mainMarketTypeEnum })[0],
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
                            id: this.state.id,
                            partyId: this.state.selectedParty ? this.state.selectedParty.id : null,
                            validUntil: this.state.date,
                            validFrom: this.state.validFrom,
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
                    service={EditCreditPartyService.updateCreditPartyMethod}
                    disabled={this.state.selectedMarket.id == 0 || !this.state.amount}
                    className="form-height">
                    <Grid container spacing={8}>
                        <Grid item md={10}>
                            <Fieldset legend={'اطلاعات مشتری'}>
                                <Grid container spacing={8} className="margin-bottom-30">
                                    <Grid item md={12}>
                                    <Input label="نام و نام خانوادگی" value={this.state.selectedParty.fullName} disabled />
                                    </Grid>
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

UpdateCreditPartyComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateCreditPartyComponent);