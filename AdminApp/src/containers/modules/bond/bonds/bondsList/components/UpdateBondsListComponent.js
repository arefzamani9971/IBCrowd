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
import moment from 'moment';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import BondsListService from './../services/BondsListService';
import symbolAutoCompleteService from './../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteService';

class UpdateBondsListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            interestPeriod: {
                name: "selectedInterestPeriod",
                field: "title",
                label: "دوره پرداخت",
                list: []
            },
            selectedInterestPeriod: {},
            bondSecurityType: {
                name: "selectedBondSecurityType",
                field: "title",
                label: "نوع اوراق",
                list: []
            },
            selectedBondSecurityType: {},
            symbolFullTitle: '',
            faceValue: 0,
            publishDate: null,
            usanceDate: null,
            seoPermission : null,
            secondaryTradingStartDate: null,
            subscriptionStart: null,
            subscriptionEnd: null,
            interest: null,
            id: 0,
            isin : ''

        };
    }
    componentDidMount() {
        let id = this.props.location.state.id;
        let isin = this.props.location.state.isin;
        symbolAutoCompleteService.getSymbolNameByIsin(isin, (res) => {
            this.setState({
                isin,
                symbolFullTitle: res.title
            });
        });
        if (id > 0) {
            this.setState({
                id
            });
            BondsListService.getBondDetailsById(id, (res) => {
                this.setValueForUpdate(res);
            });
        } else {
            GetEnum('InterestPeriod', response => DropDownListDataProvider(this, "interestPeriod", response));
            GetEnum('BondSecurityType', response => DropDownListDataProvider(this, "bondSecurityType", response));
        }
    }

    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }

    handleCheckChange(event, name) {
        this.setState({
            [name]: event.target.checked,
        })
    }
    handleDate(value, name) {
        this.setState({
            [name]: value
        })
    }

    setValueForUpdate(res) {
        this.setState({
            faceValue: res.faceValue,
            secondaryTradingStartDate: res.secondaryTradingStartDate,
            publishDate: res.publishDate,
            usanceDate: res.usanceDate,
            subscriptionStart: res.subscriptionStart,
            subscriptionEnd: res.subscriptionEnd,
            interest: res.interest,
            redemptionPercent: res.redemptionPercent,
            yearDuration: res.yearDuration,
            interestPayCount: res.interestPayCount,
            seoPermission: res.seoPermission,
        }, () => {
            let { interestPeriod, bondSecurityType } = this.state;
            GetEnum('InterestPeriod', response => {
                interestPeriod.list = response
                this.setState({
                    selectedInterestPeriod: response.filter(item => item.code == res.interestPeriod)[0],
                    interestPeriod
                })
            });
            GetEnum('BondSecurityType', response => {
                bondSecurityType.list = response
                this.setState({
                    selectedBondSecurityType: response.filter(item => item.code == res.securityType)[0],
                    bondSecurityType
                })
            });
        });
    }
    makeNumberFromString(value) {
        return parseFloat((value).toString().replace(/,/g, ''));
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
                            id: this.state.id,
                            isin : this.state.isin,
                            faceValue: this.makeNumberFromString(this.state.faceValue),
                            secondaryTradingStartDate: new Date(this.state.secondaryTradingStartDate),
                            publishDate: new Date(this.state.publishDate),
                            usanceDate: new Date(this.state.usanceDate),
                            subscriptionStart: new Date(this.state.subscriptionStart),
                            subscriptionEnd: new Date(this.state.subscriptionEnd),
                            interest: parseFloat(this.state.interest),
                            redemptionPercent: parseFloat(this.state.redemptionPercent),
                            yearDuration: parseFloat(this.state.yearDuration),
                            interestPayCount: parseFloat(this.state.interestPayCount),
                            seoPermission: this.state.seoPermission,
                            interestPeriod: this.state.selectedInterestPeriod.code,
                            securityType: this.state.selectedBondSecurityType.code
                        }
                    }
                    service={BondsListService.saveBondDetails}
                    className="form-height">
                    <Fieldset style={{ paddingRight: 15, paddingLeft: 15, paddingBottom: 15, marginBottom: 15 }} legend={'جزئیات اوراق'}>
                        <Grid style={{ marginTop: -20 }} container spacing={8}>
                            <Grid item md={2}>نماد</Grid>
                            <Grid item md={4}>{this.state.symbolFullTitle}</Grid>
                        </Grid>
                    </Fieldset>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="faceValue" label="ارزش اسمی"
                                value={this.state.faceValue}
                                handleChange={(value, error) => this.handleChange(value, 'faceValue')}
                                type="number"
                                isDecimalSeparator
                                isSeparator
                            />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="تاریخ آغاز معاملات ثانویه" handleOnChange={(value) => this.handleDate(value, 'secondaryTradingStartDate')} selectedDate={this.state.secondaryTradingStartDate} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="تاریخ انتشار" handleOnChange={(value) => this.handleDate(value, 'publishDate')} selectedDate={this.state.publishDate} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="تاریخ سررسید" handleOnChange={(value) => this.handleDate(value, 'usanceDate')} selectedDate={this.state.usanceDate} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} className="pl-3 pt-3">
                        <Grid item md={3}>
                            <PersianDatePicker label="آغاز پذیره‌نویسی" handleOnChange={(value) => this.handleDate(value, 'subscriptionStart')} selectedDate={this.state.subscriptionStart} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="پایان پذیره‌نویسی" handleOnChange={(value) => this.handleDate(value, 'subscriptionEnd')} selectedDate={this.state.subscriptionEnd} />
                        </Grid>
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.bondSecurityType}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedBondSecurityType} />
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="interest" label="بهره سالانه"
                                value={this.state.interest}
                                handleChange={(value, error) => this.handleChange(value, 'interest')}
                                type="number"
                                isDecimalSeparator
                                isSeparator
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 pt-3">

                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="redemptionPercent" label="نرخ جبرانی"
                                value={this.state.redemptionPercent}
                                handleChange={(value, error) => this.handleChange(value, 'redemptionPercent')}
                                type="number"
                                isDecimalSeparator

                            />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="yearDuration" label="مدت (سال)"
                                value={this.state.yearDuration}
                                handleChange={(value, error) => this.handleChange(value, 'yearDuration')}
                                type="number"
                                isDecimalSeparator

                            />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="interestPayCount" label="تعداد دفعات پرداخت سود در سال"
                                value={this.state.interestPayCount}
                                handleChange={(value, error) => this.handleChange(value, 'interestPayCount')}
                                type="number"
                                isDecimalSeparator

                            />
                        </Grid>
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.interestPeriod}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedInterestPeriod} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mb-3">

                        <Grid item md={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.seoPermission}
                                        onChange={(value) => this.handleCheckChange(value, 'seoPermission')}
                                        value="seoPermission"
                                        color="primary" />
                                }
                                label="دارای مجوز سازمان"
                            />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment >
        )
    }

}

UpdateBondsListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateBondsListComponent);