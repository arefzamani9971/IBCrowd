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
import GetFutureContractListService from "../services/GetFutureContractListService";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import UpdateFutureContractListService from "../services/UpdateFutureContractListService";
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';


class UpdateFutureContractListComponent extends React.Component {

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
            selectedSymbol: {},
            selectedBaseSymbol: {},
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
        this.getSymbolValue = this.getSymbolValue.bind(this);
        this.getBaseSymbolValue = this.getBaseSymbolValue.bind(this);
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
        // GetFutureContractListService.getcashflowchequemasterbyidMethod(command, (res) => {
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
        //         GetFutureContractListService.searchBankDepositMethod({ reportFilter: { phrase: '' } }, (res) => {
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
    getSymbolValue(value){
        this.setState({
          selectedSymbol : value
        });
      }
      
      getBaseSymbolValue(value){
        this.setState({
            selectedBaseSymbol : value
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
                            // isin: this.state.selectedSymbol.isin,
                            // isinBase: this.state.selectedBaseSymbol.isin,
                        }
                    }
                    service={UpdateFutureContractListService.updatecashflowchequemasterMethod}
                    className="form-height">
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>نماد</Grid>
                        <Grid item md={6}>نماد پایه</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                        <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)}  value={this.state.selectedSymbol} />

                        </Grid>
                        <Grid item md={6}>
                        <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getBaseSymbolValue(value)}  value={this.state.selectedBaseSymbol} />

                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>معتبر از</Grid>
                        <Grid item md={6}>معتبر تا</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <PersianDatePicker label="از معتبر" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
                        </Grid>
                        <Grid item md={6}>
                            <PersianDatePicker label="تا معتبر" handleOnChange={(value) => this.handleDate(value, 'ToDate')} selectedDate={this.state.ToDate} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>تاریخ سررسید</Grid>
                        <Grid item md={36}>نوع مارجین</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <PersianDatePicker label="تاریخ سررسید" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
                        </Grid>
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    isFilterable
                                    hasAll
                                    {...this.state.chequeType}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedChequeType} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>مارجین اولیه</Grid>
                        <Grid item md={6}>حداقل مارجین</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="مارجین اولیه"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid><Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="حداقل مارجین"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>ضریب گرد کردن</Grid>
                        <Grid item md={6}>قیمت پایه</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="ضریب گرد کردن"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid><Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="قیمت پایه"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>اندازه قرارداد</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="اندازه قرارداد"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }

}

UpdateFutureContractListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateFutureContractListComponent);