import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetAllProductsPaging from '../../../../../../services/getProducts';
import moment from 'moment';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetEnum from 'services/getEnum';

import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import OptionDetailListService from "../services/OptionDetailListService";
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';


class UpdateOptionsListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSearchBankDeposit: { id: 0 },
            putOrCallType: {
                name: "selectedPutOrCallType",
                field: "title",
                label: "نوع معامله",
                list: []
            },
            selectedPutOrCallType:{},
            id:0,
            selectedSymbol: {},
            selectedBaseSymbol: {},
            exerciseDate:null,
            validFrom:null,
            validTo:null,


        };
        this.handleChange = this.handleChange.bind(this);
        this.getSymbolValue = this.getSymbolValue.bind(this);
        this.getBaseSymbolValue = this.getBaseSymbolValue.bind(this);

    }

    componentDidMount() {
        GetEnum('PutOrCallType', response => DropDownListDataProvider(this, "putOrCallType", response));
    }

    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    handleDate(value, name) {
        this.setState({
            [name]: value
        })
    }
    handleCheckChange(event, name) {
        this.setState({
            [name]: event.target.checked,
        })
    }
    getSymbolValue(value) {
        console.log("value : " , value);
        
        this.setState({
            selectedSymbol: value
        });
    }
    getBaseSymbolValue(value) {
        console.log("value : " , value);

        this.setState({
            selectedBaseSymbol: value
        });
    }


    render() {

        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            isin:this.state.selectedSymbol.isin,
                            baseAssetIsin:this.state.selectedBaseSymbol.isin,
                            exercisePrice:parseFloat(this.state.exercisePrice),
                            exerciseDate:this.state.exerciseDate,
                            isDependent:this.state.isDependent,
                            contractSize:parseFloat(this.state.contractSize),
                            validFrom:this.state.validFrom,
                            validTo:this.state.validTo,
                            putOrCall:this.state.selectedPutOrCallType.code
                        }
                    }
                    service={OptionDetailListService.updatecashflowchequemasterMethod}
                    className="form-height">
                    <Fieldset style={{ paddingRight: 15, paddingLeft: 15, paddingBottom: 15, marginBottom: 15 }} legend={''}>
                        <Grid style={{ marginTop: -20 }} container spacing={8}>
                            <Grid item md={2}>نماد</Grid>
                            <Grid item md={4}>11111</Grid>
                        </Grid>
                    </Fieldset>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>نماد</Grid>
                        <Grid item md={6}>نماد پایه</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)} value={this.state.selectedSymbol} required />

                        </Grid>
                        <Grid item md={6}>
                            <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getBaseSymbolValue(value)} value={this.state.selectedBaseSymbol} required/>

                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={3}>قیمت سررسید</Grid>
                        <Grid item md={3}>حجم سررسید</Grid>
                        <Grid item md={3}>معتبر از</Grid>
                        <Grid item md={3}>معتبر تا</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="exercisePrice" label="قیمت سررسید"
                                value={this.state.exercisePrice}
                                handleChange={(value, error) => this.handleChange(value, 'exercisePrice')}
                                type="number"
                                isDecimalSeparator
                                isSeparator
                                />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="contractSize" label="حجم سررسید"
                                value={this.state.contractSize}
                                handleChange={(value, error) => this.handleChange(value, 'contractSize')}
                                type="number"
                                isDecimalSeparator
                                isSeparator
                               />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker required label="از معتبر" handleOnChange={(value) => this.handleDate(value, 'validFrom')} selectedDate={this.state.validFrom} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker required label="تا معتبر" handleOnChange={(value) => this.handleDate(value, 'validTo')} selectedDate={this.state.validTo} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={3}>تاریخ سررسید</Grid>
                        <Grid item md={3}>نوع معامله</Grid>
              
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={3}>
                            <PersianDatePicker required label="تاریخ سر رسید" handleOnChange={(value) => this.handleDate(value, 'exerciseDate')} selectedDate={this.state.exerciseDate} />
                        </Grid>
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.putOrCallType}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedPutOrCallType}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isDependent}
                                        onChange={(value) => this.handleCheckChange(value, 'isDependent')}
                                        value="isDependent"
                                        color="primary" />
                                }
                                label="تبعی"
                            />
                        </Grid>
                    </Grid>
                 
                </Form>
            </React.Fragment>
        )
    }

}

UpdateOptionsListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateOptionsListComponent);