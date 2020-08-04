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
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import GetChangeSymbolService from "../services/GetChangeSymbolService";
import Input from 'shared/components/formInput/inputForm'

class UpdateChangeSymbolComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            searchBankDeposit: {
                name: "selectedSearchBankDeposit",
                placeholder: "شماره حساب بانکی",
                textField: 'fullAccountNumber',
                keyField: 'id'
            },

            selectedSearchBankDeposit: { id: 0 },
            symbol: {
                name: "selectedSymbol",
                field: "symbol",
                label: "نماد"
            },
            selectedSymbol: { id: 0, fullProductName: '' },

            amountOfTheDocument: '',
            isDefault: true,
            isActive: false,
            fromSerial: null,
            toSerial: null,
            chequeBookTitle: '',
            chequeTypeId: undefined,
            bankDepositIdTemp: undefined,


            chequeType: {
                name: "selectedChequeType",
                field: "title",
                label: "نوع معامله",
                list: []
            },

            selectedChequeType: {},
            fromDate: new Date(),
            toDate: moment(new Date().setDate(new Date().getDate() + 7))
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBankDepositChange = this.handleBankDepositChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
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
    ComboBoxServerSideHandler = (event) => {
        if (event === null) {
            this.setState({
                selectedSearchBankDeposit: {}
            })
        } else {
            this.setState({
                selectedSearchBankDeposit: event
            })
        }
    };
    handleBankDepositChange(item) {
        this.setState({
            selectedSearchBankDeposit: item.value,
        })
    }
    handleCheckChange(event, name) {
        this.setState({
            [name]: event.target.checked,
        })
    }
    componentDidMount() {
        GetEnum('chequetype', response => DropDownListDataProvider(this, "chequeType", response));
    }
    handleSymbolChange(value) {
        this.setState({ selectedSymbol: value.value });
    }

    render() {

        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={{}}
                    className="form-height">
                    <Fieldset style={{ paddingRight: 15, paddingLeft: 15, paddingBottom: 15, marginBottom: 15 }} legend={'اطلاعات نماد'}>
                        <Grid className="mb-3" style={{ marginTop: -20 }} container spacing={8}>
                            <Grid item md={2}>نماد</Grid>
                            <Grid item md={4}>11111</Grid>
                            <Grid item md={2}>شناسه</Grid>
                            <Grid item md={4}>22222</Grid>
                        </Grid>
                        <Grid container spacing={8} className="pl-3">
                            <Grid item md={2}>عنوان</Grid>
                            <Grid item md={4}>33333</Grid>
                        </Grid>
                    </Fieldset>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>شناسه قدیمی</Grid>
                        <Grid item md={6}>تاریخ تغییر</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <Input label="شناسه قدیمی" handleChange={(value) => this.handleChange(value, 'title')} id="title" value={this.state.title} />
                        </Grid>
                        <Grid item md={6}>
                            <PersianDatePicker selectedDate={this.state.toDate} label="تاریخ تغییر" handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>Exchange قدیمی</Grid>
                        <Grid item md={6}>Exchange جدید</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.customerTypeGroup}
                                    handleChange={(value, name) => this.handleChangeCustomerType(value, name)} isFilterable={true}
                                    value={this.state.selectedCustomerTypeGroup} />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.customerTypeGroup}
                                    handleChange={(value, name) => this.handleChangeCustomerType(value, name)} isFilterable={true}
                                    value={this.state.selectedCustomerTypeGroup} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>Board قدیمی</Grid>
                        <Grid item md={6}>Board جدید</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.customerTypeGroup}
                                    handleChange={(value, name) => this.handleChangeCustomerType(value, name)} isFilterable={true}
                                    value={this.state.selectedCustomerTypeGroup} />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.bank}
                                    handleChange={(value, name) => this.handleChangeBank(value, name)} isFilterable={true}
                                    value={this.state.selectedBank} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>وضعیت</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.bank}
                                    handleChange={(value, name) => this.handleChangeBank(value, name)} isFilterable={true}
                                    value={this.state.selectedBank} />
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }

}

UpdateChangeSymbolComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateChangeSymbolComponent);