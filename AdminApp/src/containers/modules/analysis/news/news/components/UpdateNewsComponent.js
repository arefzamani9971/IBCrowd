import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from 'shared/components/formInput/inputForm'
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
import NewsService from "../services/NewsService";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
class UpdateNewsComponent extends React.Component {

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
                label: "نوع چک",
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
        // NewsService.getcashflowchequemasterbyidMethod(command, (res) => {
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
        //         NewsService.searchBankDepositMethod({ reportFilter: { phrase: '' } }, (res) => {
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
                            // id: this.state.id,
                            // title: this.state.chequeBookTitle,
                            // bankDepositId: this.state.selectedSearchBankDeposit.id,
                            // fromSerial: this.state.fromSerial,
                            // toSerial: this.state.toSerial,
                            // isDefault: this.state.isDefault,
                            // isActive: this.state.isActive,
                            // chequeType: this.state.selectedChequeType.code,
                            // printFormat: 1
                        }
                    }
                    service={NewsService.updatecashflowchequemasterMethod}
                    className="form-height">
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>عنوان</Grid>
                        <Grid item md={6}>تاریخ انتشار</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <Input label="عنوان" handleChange={(e) => this.handleChange(e, 'reportName')} value={this.state.code} />
                        </Grid>
                        <Grid item md={6}>
                            <PersianDatePicker selectedDate={this.state.fromDate} label="تاریخ انتشار" handleOnChange={(value) => this.handleDate(value, 'registerReportDate')} required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={12}>خلاصه خبر</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={12}>
                            <Input label="خلاصه خبر" handleChange={(e) => this.handleChange(e, 'comment')} value={this.state.comment} isMultiLine={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={12}>شرح خبر</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={12}>
                            <Input label="شرح خبر" handleChange={(e) => this.handleChange(e, 'comment')} value={this.state.comment} isMultiLine={true} />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }

}

UpdateNewsComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateNewsComponent);