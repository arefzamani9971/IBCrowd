import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import SaveFutureContractService from "../services/SaveFutureContractService";
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';


class SaveFutureContractComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSymbol: {},
            selectedBaseSymbol: {},

            futuresContractMarginType: {
                name: "selectedFuturesContractMarginType",
                field: "title",
                label: "نوع مارجین",
                list: []
            },
            selectedFuturesContractMarginType: { code: 0, title: '' },
            exerciseDate:null,
            validFrom:null,
            validTo:null,


        };
        this.handleChange = this.handleChange.bind(this);
        this.getSymbolValue = this.getSymbolValue.bind(this);
        this.getBaseSymbolValue = this.getBaseSymbolValue.bind(this);

    }

    componentDidMount() {
        GetEnum('FuturesContractMarginType', response => DropDownListDataProvider(this, "futuresContractMarginType", response));
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
    getSymbolValue(value) {
        this.setState({
            selectedSymbol: value
        });
    }
    getBaseSymbolValue(value) {
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
                    disabled={true}
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            isin: this.state.selectedSymbol.isin,
                            exerciseDate: this.state.exerciseDate,
                            contractSize: parseInt(this.state.contractSize),
                            basePrice: this.state.basePrice,
                            firstMargin: this.state.firstMargin,
                            validFrom: this.state.validFrom,
                            validTo: this.state.validTo,
                            minimumMargin: this.state.minimumMargin,
                            coagulationFactor: this.state.coagulationFactor,
                            baseAssetIsin: this.state.selectedBaseSymbol.isin,
                            marginType: this.state.selectedFuturesContractMarginType.code,
                        }
                    }

                    disabled={

                        (this.state.selectedSymbol.isin == null || this.state.selectedSymbol.isin == undefined) ||
                        (this.state.selectedBaseSymbol.isin == null || this.state.selectedBaseSymbol.isin == undefined) ||
                        (this.state.exerciseDate == null || this.state.exerciseDate == undefined) || 
                        (this.state.contractSize == null || this.state.contractSize == undefined) ||
                        (this.state.basePrice == '' || this.state.basePrice == null) ||
                        (this.state.firstMargin == '' || this.state.firstMargin == null) ||
                        (this.state.validFrom == '' || this.state.validFrom == null) ||
                        (this.state.validTo == '' || this.state.validTo == null) ||
                        (this.state.minimumMargin == '' || this.state.minimumMargin == null) ||
                        (this.state.coagulationFactor == '' || this.state.coagulationFactor == null) ||
                        (this.state.selectedFuturesContractMarginType.code == '' || this.state.selectedFuturesContractMarginType.code == null) 
                     
                    }
                    service={SaveFutureContractService.saveFutureContracts}
                    className="form-height">
                   
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)} value={this.state.selectedSymbol} />

                        </Grid>
                        <Grid item md={6}>
                            <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getBaseSymbolValue(value)} value={this.state.selectedBaseSymbol} />

                        </Grid>
                        <Grid item md={6}>
                            <PersianDatePicker label="از معتبر" handleOnChange={(value) => this.handleDate(value, 'validFrom')} selectedDate={this.state.validFrom} />
                        </Grid>
                        <Grid item md={6}>
                            <PersianDatePicker label="تا معتبر" handleOnChange={(value) => this.handleDate(value, 'validTo')} selectedDate={this.state.validTo} />
                        </Grid>
                        <Grid item md={6}>
                            <PersianDatePicker label="تاریخ سررسید (اعمال)" handleOnChange={(value) => this.handleDate(value, 'exerciseDate')} selectedDate={this.state.exerciseDate} />
                        </Grid>
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.futuresContractMarginType}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedFuturesContractMarginType} />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="firstMargin" label="مارجین اولیه"
                                value={this.state.firstMargin}
                                handleChange={(value, error) => this.handleChange(value, 'firstMargin')}
                                type="number"
                                isSeparator={true} />
                        </Grid><Grid item md={6}>
                            <NumberFormatComponent
                                id="minimumMargin" label="حداقل مارجین"
                                value={this.state.minimumMargin}
                                handleChange={(value, error) => this.handleChange(value, 'minimumMargin')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="coagulationFactor" label="ضریب گرد کردن"
                                value={this.state.coagulationFactor}
                                handleChange={(value, error) => this.handleChange(value, 'coagulationFactor')}
                                type="number"
                                isSeparator={true} />
                        </Grid><Grid item md={6}>
                            <NumberFormatComponent
                                id="basePrice" label="قیمت پایه"
                                value={this.state.basePrice}
                                handleChange={(value, error) => this.handleChange(value, 'basePrice')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="contractSize" label="اندازه قرارداد"
                                value={this.state.contractSize}
                                handleChange={(value, error) => this.handleChange(value, 'contractSize')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                
         
                
                </Form>
            </React.Fragment>
        )
    }

}

SaveFutureContractComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SaveFutureContractComponent);