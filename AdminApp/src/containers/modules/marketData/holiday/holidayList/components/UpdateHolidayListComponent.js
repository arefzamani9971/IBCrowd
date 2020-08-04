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
import HolidayService from "../services/HolidayService";
import Input from 'shared/components/formInput/inputForm'

class UpdateHolidayListComponent extends React.Component {

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
                label: "نوع مارجین",
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
        // let command = {
        //     entity: this.props.location.state.id
        // };
        // GetEnum('chequetype', response => DropDownListDataProvider(this, "chequeType", response));
        // HolidayService.getcashflowchequemasterbyidMethod(command, (res) => {
        //     let { title, isActive, isDefault, fromSerial, toSerial, chequeType, bankDepositId, id } = res.result;
        //     this.setState({
        //         id: id,
        //         chequeBookTitle: title,
        //         isActive: isActive,
        //         isDefault: isDefault,
        //         fromSerial: fromSerial,
        //         toSerial: toSerial,
        //         chequeTypeId: chequeType,
        //         bankDepositIdTemp: bankDepositId
        //     }, () => {
        //         GetEnum('chequetype', response => {
        //             for (let i = 0; i < response.result.length; i++) {
        //                 if (response.result[i].code == this.state.chequeTypeId) {
        //                     this.setState({
        //                         selectedChequeType: response.result[i]
        //                     })
        //                 }
        //             }
        //         });
        //         HolidayService.searchBankDepositMethod({ reportFilter: { phrase: '' } }, (res) => {
        //             for (let i = 0; i < res.result.length; i++) {
        //                 if (res.result[i].id == this.state.bankDepositIdTemp) {
        //                     this.setState({
        //                         selectedSearchBankDeposit: res.result[i]
        //                     })
        //                 }
        //             }
        //         })
        //     });
        // })
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
                    entity={
                        {
                        }
                    }
                    service={HolidayService.updatecashflowchequemasterMethod}
                    className="form-height">

                    <Fieldset style={{ paddingRight: 15, paddingLeft: 15, paddingBottom: 15, marginBottom: 15 }} legend={' ویرایش تعطیلات'}>
                        <Grid className="mb-3" style={{ marginTop: -20 }} container spacing={8}>
                            <Grid item md={2}>
                                <PersianDatePicker selectedDate={this.state.toDate} label=" تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                            </Grid>
                            <Grid item md={5} >
                                <Input label=" توضیحات" required handleChange={(value) => this.handleChange(value, 'title')} id="title" value={this.state.title} />
                            </Grid>

                        </Grid>
                    </Fieldset>

                </Form>
            </React.Fragment>
        )
    }

}

UpdateHolidayListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateHolidayListComponent);