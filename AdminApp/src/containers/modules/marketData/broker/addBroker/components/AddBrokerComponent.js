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
import Input from 'shared/components/formInput/inputForm'
import moment from 'moment';
import styles from 'containers/layout/panel/theme';
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import AddBrokerService from "../services/AddBrokerService";

class AddBrokerComponent extends React.Component {

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



    componentDidMount() {

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

                        }
                    }
                    service={AddBrokerService.updatecashflowchequemasterMethod}
                    className="form-height">

                    <Grid container spacing={8} className="pl-3 pt-3">
                        <Grid item md={3}>
                            <Input label="نام کارگزاری" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                        <Grid item md={3}>
                            <Input label="نام لاتین کارگزاری" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                        <Grid item md={3}>
                            <Input label="کد" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                        <Grid item md={3}>
                            <Input label="شناسه ملی" handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="از معتبر" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="تا معتبر" handleOnChange={(value) => this.handleDate(value, 'ToDate')} selectedDate={this.state.ToDate} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} className="pl-3">

                    </Grid>

                    <Grid container spacing={8} className="pl-3">

                    </Grid>
                </Form>
            </React.Fragment>
        )
    }

}

AddBrokerComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBrokerComponent);