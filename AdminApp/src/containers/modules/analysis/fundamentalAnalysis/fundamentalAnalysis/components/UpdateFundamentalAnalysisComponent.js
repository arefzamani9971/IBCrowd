import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Input from 'shared/components/formInput/inputForm'
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import moment from 'moment';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetEnum from 'services/getEnum';
import FundamentalAnalysisService from "../services/FundamentalAnalysisService";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
class UpdateFundamentalAnalysisComponent extends React.Component {

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
        // FundamentalAnalysisService.getcashflowchequemasterbyidMethod(command, (res) => {
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
        //         FundamentalAnalysisService.searchBankDepositMethod({ reportFilter: { phrase: '' } }, (res) => {
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
                    disabled={true}
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
                    service={FundamentalAnalysisService.updatecashflowchequemasterMethod}
                    className="form-height">
                   <Grid container spacing={8} className="pl-3">
            <Grid item md={12} className="mt-3">
              <div className="k-rtl">

                <Input
                  isMultiLine={true}
                  rows={7}
                  handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                  label="خلاصه معرفی"
                />
              </div>
            </Grid>
            <Grid item md={12} className="mt-3">
              <div className="k-rtl">

                <Input
                  isMultiLine={true}
                  rows={7}
                  handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                  label="معرفی کامل"
                />
              </div>
            </Grid>
            <Grid item md={12} className="mt-3">
              <div className="k-rtl">

                <Input
                  isMultiLine={true}
                  rows={7}
                  handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                  label="خلاصه بررسی هوشمند بنیادی"
                />
              </div>
            </Grid>

            <Grid item md={4} className="mt-3">
              <Input
                keyDownPress={true}
                id="" label="نکات برجسته"
                value={this.state.amountOfTheDocument}
                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                handleKeyDown={(value)=>this.handleKeyUp(value)}
                type="text"

              />
            </Grid>
            <Grid item md={4} className="mt-3">
              <Input

                id="" label="پارامترهای اثر گذار بر شرکت"
                value={this.state.amountOfTheDocument}
                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                type="text"

              />

            </Grid>
            <Grid item md={12} className="mt-3">
              <div className="k-rtl">

                <Input
                  isMultiLine={true}
                  rows={3}
                  handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                  label="نظرنهایی تحلیل گر"
                />
              </div>
            </Grid>

            <Grid item md={3}>
              <NumberFormatComponent id="lot" label="حداکثر قیمت پیشنهادی"
                value={this.state.lot}
                handleChange={(value) => this.handleChange(value, 'lot')}
                type="number"

              />
            </Grid>
            <Grid item md={3}>
              <NumberFormatComponent id="lot" label="حداقل قیمت پیشنهادی"
                value={this.state.lot}
                handleChange={(value) => this.handleChange(value, 'lot')}
                type="number"

              />
            </Grid>
            <Grid item md={3}>
              <NumberFormatComponent id="lot" label="حداکثر  ارزش منصفانه"
                value={this.state.lot}
                handleChange={(value) => this.handleChange(value, 'lot')}
                type="number"

              />
            </Grid>
            <Grid item md={3}>
              <NumberFormatComponent id="lot" label="حداقل  ارزش منصفانه"
                value={this.state.lot}
                handleChange={(value) => this.handleChange(value, 'lot')}
                type="number"

              />
            </Grid>
          </Grid>
                </Form>
            </React.Fragment>
        )
    }

}

UpdateFundamentalAnalysisComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateFundamentalAnalysisComponent);